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
  releaseBlog(req, res, next) {
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
          const {titleName, content, coverURL, news, study, college} = req.body
          const sql = sqlMap.releaseBlog;
          const createDate = moment().valueOf()
          const createTime = moment(createDate).format('YYYY-MM-DD HH:mm:ss')
          const {studentId,realName,userName,collegeName,collegeId,classId,className,avatarUrl,defaultAvatar} = data
          const guid = md5(`${studentId}_${titleName}_${createDate}`)
          
          connection.query(sql,[guid,studentId,realName,userName,titleName,content,coverURL,createDate,createTime,collegeName,collegeId,classId,className,avatarUrl || defaultAvatar,news || null,study || null,college || 0], (err, result) => {
            if (err) {
              error(res)
              console.log(err)
            }

            if (result.affectedRows) {
              res.json({
                code: 200,
                msg: '发布成功',
                data: guid
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
  detailBlog(req, res, next) {
    const token = req.headers.token

    checkToken(token,(bool, data) => {
      pool.getConnection((err, connection) => {
        const sql = sqlMap.detailBlog
        const {guid} = req.body
        
        connection.query(sql,[guid], (err, result) => {
          if (err) {
            error(err)
          }

          const response = result[0]

          response.userName = data ? data.userName : null

          if (result.length) {
            res.json({
              code: 200,
              msg: '查询博客成功',
              data: response
            })
            
            if ((data && data.studentId) !== result[0].studentId) {
              const count = result[0].viewCount + 1
              this.updataViewCount(guid, count)
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
    })
  },
  updataViewCount(guid, viewCount) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updataViewCount;
      connection.query(sql,[viewCount, guid], (err, result) => {
        if (err) {
          error(err)
        }

        connection.release();
      })
    })
  },
  updataBlog(req, res, next) {
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
          const sql = sqlMap.updataBlog
          const {guid, titleName, content, coverURL} = req.body
          
          connection.query(sql,[titleName, content, coverURL, guid], (err, result) => {
            if (err) {
              error(res)
            }

            if (result.affectedRows) {
              res.json({
                code: 200,
                msg: '编辑博客成功',
                data: null
              })
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
  selectBlogTeachAndstudents(req, res, next) {
    pool.getConnection((err, connection) => {
      const sql = sqlMap.selectBlogTeachAndstudents
      
      connection.query(sql,[0,5], (err, result) => {
        if (err) {
          error(res)
        }

        res.json({
          code: 200,
          msg: '查询博客成功',
          data: result
        })

        connection.release();
      })
    })
  },
  selectBlogTop(req, res, next) {
    pool.getConnection((err, connection) => {
      const sql = sqlMap.selectBlogTop
      
      connection.query(sql,[], (err, result) => {
        if (err) {
          error(res)
        }

        res.json({
          code: 200,
          msg: '查询博客TOP成功',
          data: result
        })

        connection.release();
      })
    })
  },
  thumbsUpBlog(req, res, next) {
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
          const sql = sqlMap.thumbsUpBlog
          const {thumbsUp, thumbsUpUser, guid, titleName, studentId, notice} = req.body
          const {realName} = data
          const createDate = moment().valueOf()
          const createTime = moment(createDate).format('YYYY-MM-DD HH:mm:ss')
          const id = md5(`${studentId}_${titleName}_${createDate}`)
          
          connection.query(sql,[thumbsUp, thumbsUpUser, guid], (err, result) => {
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
                    id,
                    `你的博客【${titleName}】获得了点赞`,
                    studentId,
                    'blogup',
                    'blogup',
                    createTime,
                    createDate,
                    `${realName}的点赞`,
                    guid
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
  deleteBlog(req, res, next) {
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
          const sql = sqlMap.deleteBlog
          const {guid} = req.body
          
          connection.query(sql,[guid], (err, result) => {
            if (err) {
              error(res)
            }

            if (result.affectedRows) {
              res.json({
                code: 200,
                msg: '删除博客成功',
                data: null
              })
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
  bloglist(req, res, next) {
    pool.getConnection((err, connection) => {
      const {titleName} = req.body
      const sql = `SELECT * FROM Blog WHERE titleName LIKE '%${titleName}%' ORDER BY createDate DESC`
      connection.query(sql,[], (err, result) => {
        if (err) {
          error(res)
        }

        res.json({
          code: 200,
          msg: '查询博客',
          data: result
        })

        connection.release();
      })
    })
  }
}

