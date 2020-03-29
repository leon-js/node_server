const mysql = require('mysql');
const dbConfig = require('../utils/db');
const sqlMap = require('../utils/sqlMap');
const moment = require('moment')
const md5 = require('js-md5')
const {checkToken,releaseNotice} = require('./utils')

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

const error = (res) => {
  res.json({
    code:1,
    msg: '未知原因，请通知网站管理员 15958651599'
  })
}

module.exports = {
  applyTopic(req, res, next) {
    const token = req.headers.token

    checkToken(token,(bool, data) => {
      if (!bool) {
        return res.json({
          code: 0,
          msg: '登录过期，请重新登录',
          data: null
        })
      } else {
        pool.getConnection((err, connection) => {
          const {topicName, mean} = req.body
          const sql = sqlMap.applyTopic;
          const createDate = moment().valueOf()
          const createTime = moment(createDate).format('YYYY-MM-DD HH:mm:ss')
          const {studentId,realName} = data
          const id = md5(`${studentId}_${topicName}_${createDate}`)
          
          connection.query(sql,[id,studentId,topicName,mean,createTime,createDate,realName], (err, result) => {
            if (err) {
              error(res)
            }

            if (result.affectedRows) {
              res.json({
                code: 200,
                msg: '申请成功，等待审批',
                data: id
              })
              releaseNotice([
                id,
                `你的话题【${topicName}】申请已提交，耐心等待审批`,
                studentId,
                'applytopic',
                'applytopic',
                createTime,
                createDate,
                'system',
                null
              ])
            } else {
              res.json({
                code: 0,
                msg: '意外错误，请重新登录后尝试',
                data: null
              })
            }
    
            connection.release();
          })
        })
      }
    })
  },
  systemTopicList(req, res, next) {
    const token = req.headers.token

    checkToken(token,(bool, data) => {
      if (!bool) {
        return res.json({
          code: 0,
          msg: '登录过期，请重新登录',
          data: null
        })
      } else {
        pool.getConnection((err, connection) => {
          const { topicName, status, pageIndex, pageSize } = req.body
          const sql = `SELECT * FROM Topic WHERE topicName LIKE '%${topicName}%' AND status = ? ORDER BY createDate DESC`
          // LIMIT ?,?

          connection.query(sql,[status], (err, result) => {
            if (err) {
              error(res)
            }
            // console.log(result, 1)
            // (pageIndex-1)*pageSize,pageSize
            const data = {
              list: result.slice((pageIndex-1)*pageSize,pageSize),
              pageIndex,
              pageSize,
              total: result.length
            }
            res.json({
              code: 200,
              msg: '获取申请的话题',
              data
            })

    
            connection.release();
          })
        })
      }
    })
  },
  approvalTopic(req, res, next) {
    const token = req.headers.token

    checkToken(token,(bool, data) => {
      if (!bool) {
        return res.json({
          code: 0,
          msg: '登录过期，请重新登录',
          data: null
        })
      } else {
        pool.getConnection((err, connection) => {
          const {realName} = data
          const {status, opinion, id, studentId, topicName} = req.body
          const sql = sqlMap.approvalTopic
          const createDate = moment().valueOf()
          const createTime = moment(createDate).format('YYYY-MM-DD HH:mm:ss')
          const guid = md5(`${studentId}_${topicName}_${createDate}`)

          connection.query(sql,[status,opinion,createTime,createDate,realName,id], (err, result) => {
            if (err) {
              error(res)
              console.log(err)
            }

            if (result.affectedRows) {
              res.json({
                code: 200,
                msg: '审批成功',
                data: null
              })
              releaseNotice([
                guid,
                `你的话题【${topicName}】申请${status === 2 ? '通过' : '未通过'}`,
                studentId,
                'applytopic',
                'applytopic',
                createTime,
                createDate,
                realName,
                null
              ])
            }
    
            connection.release();
          })
        })
      }
    })
  },
}

