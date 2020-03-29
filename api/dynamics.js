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
  releaseDynamics(req, res, next) {
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
          const {content, imgUrlarray, topic, topicId} = req.body
          const sql = sqlMap.releaseDynamics;
          const createDate = moment().valueOf()
          const createTime = moment(createDate).format('YYYY-MM-DD HH:mm:ss')
          const {studentId,realName,userName,collegeName,className,avatarUrl,defaultAvatar} = data
          const id = md5(`${studentId}_${imgUrlarray}_${createDate}`)
          const thumbsUp = 0
          
          connection.query(sql,[id,studentId,realName,userName || realName,content,createDate,createTime,collegeName,className,thumbsUp,imgUrlarray,topic || null,topicId || null,avatarUrl || defaultAvatar], (err, result) => {
            if (err) {
              error(res)
              console.log(err)
            }

            if (result.affectedRows) {
              res.json({
                code: 200,
                msg: '发布成功',
                data: id
              })
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
  selectMyDynamics(req, res, next) {
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
          const {start} = req.body
          const {studentId} = data
          let s = 0
          if (start) {
            s = start * 10
          }
          const sql = sqlMap.selectMyDynamics;
          
          connection.query(sql,[studentId,0,s || 10], (err, result) => {
            if (err) {
              error(res)
            }

            res.json({
              code: 200,
              msg: '我发布的动态',
              data: result
            })
    
            connection.release();
          })
        })
      }
    })
  },
  thumbsUpDynamics(req, res, next) {
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
          const sql = sqlMap.thumbsUpDynamics
          // const {thumbsUp, thumbsUpUser, id, notice} = req.body
          const {thumbsUp, thumbsUpUser, id, studentId, notice} = req.body
          const {realName} = data
          const createDate = moment().valueOf()
          const createTime = moment(createDate).format('YYYY-MM-DD HH:mm:ss')
          const guid = md5(`${studentId}_${createDate}`)
          
          connection.query(sql,[thumbsUp, thumbsUpUser, id], (err, result) => {
            if (err) {
              error(res)
            }

            if (result.affectedRows) {
              res.json({
                code: 200,
                msg: '点赞或取消点赞',
                data: true
              })
              if (notice) {
                if (studentId !== data.studentId) {
                  releaseNotice([
                    guid,
                    `你的动态获得了点赞`,
                    studentId,
                    'dynamics',
                    'dynamics',
                    createTime,
                    createDate,
                    `${realName}的点赞`,
                    id
                  ])
                }
              }
            } else {
              res.json({
                code: 0,
                msg: '意外错误(或该博客不存在)，请重新登录(或输入正确guid)后尝试',
                data: null
              })
            }
    
            connection.release();
          })
        })
      }
    })
  },
  selectDynamics(req, res, next) {
    pool.getConnection((err, connection) => {
      const {start} = req.body
      let s = 0
      if (start) {
        s = start * 10
      }
      const sql = sqlMap.selectDynamics;
      
      connection.query(sql,[0,s || 10], (err, result) => {
        if (err) {
          error(res)
        }

        res.json({
          code: 200,
          msg: '动态广场',
          // data: result
          data: {
            list: result,
            total: result.length,
            original: s
          }
        })

        connection.release();
      })
    })

  },
}

