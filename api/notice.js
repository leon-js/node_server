const mysql = require('mysql');
const dbConfig = require('../utils/db');
const sqlMap = require('../utils/sqlMap');
const moment = require('moment')
const md5 = require('js-md5')
const {checkToken} = require('./utils')

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
  selectNotice(req, res, next) {
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
          const {studentId,start} = req.body
          const sql = sqlMap.selectNotice;
          const s = start * 10
          
          connection.query(sql,[studentId], (err, result) => {
            if (err) {
              error(res)
              console.log(err)
            }

            if (result) {
              res.json({
                code: 200,
                msg: '获取消息通知成功',
                data: {
                  list: result.slice(0,s),
                  total: result.length
                }
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
  lookoverNotice(req, res, next) {
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
          const {id} = req.body
          const sql = sqlMap.lookoverNotice;
          
          connection.query(sql,[id], (err, result) => {
            if (err) {
              error(res)
              console.log(err)
            }

            if (result.affectedRows) {
              res.json({
                code: 200,
                msg: '已查看',
                data: true
              })
            }
            
            connection.release();
          })
        })
      }
    })
  },
}

