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
  studyList(req, res, next) {
    const token = req.headers.token

    pool.getConnection((err, connection) => {
      const { titleName, pageIndex, pageSize } = req.body
      const sql = `SELECT * FROM Blog WHERE titleName LIKE '%${titleName}%' AND study = ? ORDER BY createDate DESC`
      // LIMIT ?,?

      connection.query(sql,[1], (err, result) => {
        if (err) {
          error(res)
        }
        // console.log(result, 1)
        // (pageIndex-1)*pageSize,pageSize
        const data = {
          list: result.slice((pageIndex-1)*pageSize,pageSize * pageIndex),
          pageIndex,
          pageSize,
          total: result.length
        }
        res.json({
          code: 200,
          msg: '获取学院新闻',
          data
        })


        connection.release();
      })
    })
  },
}

