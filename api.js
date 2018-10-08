const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

module.exports = {
  getValue(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getValue;
      connection.query(sql, [id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  setUpdate(req, res, next) {
    console.log(req.body);
    var title = req.body.title, detailed = req.body.detailed,id = req.body.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setUpdate;
      connection.query(sql, [title, detailed,id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  getContentAll(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getContentAll;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  getUsers(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getUsers;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  getContentAllforKind(req, res, next) {
    var kind = req.query.kind;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getContentAllforKind;
      connection.query(sql,[kind], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  getKind(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getKind;
      connection.query(sql, [id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  addValue(req, res, next) {
    var title = req.body.title,
    detailed = req.body.detailed,
    time = req.body.time,
    kind = req.body.kind,
    dateTim = req.body.dateTim;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.addValue;
      connection.query(sql,[title,detailed,time,kind,dateTim], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },

}
