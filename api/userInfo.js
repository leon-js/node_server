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
  loginCheck(req, res, next) {
    const {studentId, password} = req.body

    pool.getConnection((err, connection) => {
      var sql = sqlMap.loginCheck;
      connection.query(sql,[studentId, password], (err, result) => {
        if (err) {
          error(res)
        }
        
        if (result.length) {
          const data = result[0]
          const lastLoginDate = moment().valueOf()
          const userToken = md5(`${studentId}_${lastLoginDate}`)
          const lastLoginTime = moment(lastLoginDate).format('YYYY-MM-DD HH:mm:ss')
          data.userToken = userToken
          data.lastLoginDate = lastLoginDate
          data.lastLoginTime = lastLoginTime

          res.json({
            code: 200,
            msg: '登录成功，登录有效期7天',
            data
          })

          this.lastLoginDateUpdate({
            studentId,
            lastLoginDate,
            userToken,
            lastLoginTime
          })
        } else {
          res.json({
            code: 0,
            msg: '账号或密码错误',
            data: null
          })
        }

        connection.release();
      })
    })
  },
  lastLoginDateUpdate(e) {
    const {studentId, lastLoginDate, lastLoginTime, userToken} = e

    pool.getConnection((err, connection) => {
      var sql = sqlMap.lastLoginDateUpdate;
      connection.query(sql,[lastLoginDate, lastLoginTime, userToken, studentId], (err, result) => {
        if (err) {
          error(res)
        }

        connection.release();
      })
    })
  },
  updatePersonalData(req, res, next) {
    const token = req.headers.token
    const {userName, phone, qq, wechat} = req.body

    checkToken(token,(bool, data) => {
      if (!bool) {
        return res.json({
          code: 0,
          msg: '登录过期，请重新登录',
          data: null
        })
      } else {
        pool.getConnection((err, connection) => {
          const sql = Object.keys(req.body).length === 1 ? sqlMap.updatePersonalData : sqlMap.updateConectData
          const reqArr = Object.keys(req.body).length === 1 ? [userName, token] : [phone, qq, wechat, token]

          connection.query(sql,[...reqArr], (err, result) => {
            if (err) {
              error(res)
            }

            if (result.affectedRows) {
              res.json({
                code: 200,
                msg: '修改成功',
                data: null
              })
              this.updateUserNameBlog(userName, data.studentId)
              this.updateUserNameDynamics(userName, data.studentId)
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
  getUserinfo(req, res, next) {
    const token = req.headers.token

    checkToken(token,(bool) => {
      if (!bool) {
        return res.json({
          code: 0,
          msg: '登录过期，请重新登录',
          data: null
        })
      } else {
        pool.getConnection((err, connection) => {
          var sql = sqlMap.getUserinfo;
          connection.query(sql,[token], (err, result) => {
            if (err) {
              error(res)
            }

            if (result.length) {
              res.json({
                code: 200,
                msg: '用户信息',
                data: result[0]
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
  updateUserNameBlog(userName, studentId) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateUserNameBlog;
      connection.query(sql,[userName, studentId], (err, result) => {
        if (err) {
          console.log(err)
        }

        connection.release();
      })
    })
  },
  updateUserNameDynamics(userName, studentId) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateUserNameDynamics;
      connection.query(sql,[userName, studentId], (err, result) => {
        if (err) {
          console.log(err)
        }

        connection.release();
      })
    })
  },
}

