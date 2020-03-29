const mysql = require('mysql');
const dbConfig = require('../utils/db');
const sqlMap = require('../utils/sqlMap');
const moment = require('moment')
const md5 = require('js-md5')

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
  updateToken(e) {
    const {studentId} = e
    const userToken = md5(`${studentId}_${moment().valueOf()}`)

    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateToken;
      connection.query(sql,[userToken, studentId], (err, result) => {
        if (err) {
          error(res)
        }

        connection.release();
      })
    })
  },

  // token时效验证
  checkToken(token, cb) {
    if (!token) {
      cb(false)

      return
    }
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectLastLoginDate;
      
      connection.query(sql,[token], (err, result) => {
        if (err) {
          error(err)
        }

        if (result.length) {
          const data = result[0]
          const {lastLoginDate} = data

          if (moment().valueOf() - Number(lastLoginDate) > 24 * 60 * 60 * 1000) {
            cb(false)
          } else {
            cb(true, data)
          }
        } else {
          cb(false)
        }

        connection.release();
      })
    })
  },

  // 写入消息通知
  releaseNotice(e) {

    pool.getConnection((err, connection) => {
      var sql = sqlMap.releaseNotice;
      connection.query(sql,[...e], (err, result) => {
        if (err) {
          console.log(err)
        }

        connection.release();
      })
    })
  }
}