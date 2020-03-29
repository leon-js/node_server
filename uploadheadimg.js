// const mysql = require('mysql');
// const dbConfig = require('./utils/db');
// const sqlMap = require('./utils/sqlMap');
// var fs = require('fs');
// var headimgpath = 'http://localhost:5000/headimg/';

// const pool = mysql.createPool({
//   host: dbConfig.mysql.host,
//   user: dbConfig.mysql.user,
//   password: dbConfig.mysql.password,
//   database: dbConfig.mysql.database,
//   port: dbConfig.mysql.port,
//   multipleStatements: true    // 多语句查询
// });
// // upload.js

// var express = require('express');
// var router = express.Router();

// var fs = require('fs');
// var multer  = require('multer');

// // 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // 接收到文件后输出的保存路径（若不存在则需要创建）
//         cb(null, 'img/headimg');
//     },
//     filename: function (req, file, cb) {

//         console.log(req)

//         var uname = req.query.uname;
//         const originalname = file.originalname;
//         var index = originalname.indexOf('.');
//         var suffix = originalname.substring(index);
//         var Head_portrait = headimgpath + req.query.uname+suffix;

//         // pool.getConnection((err, connection) => {
//         //     var sql = sqlMap.selectHeadimg;
//         //     connection.query(sql, [uname], (err, result) => {
//         //         console.log(result,11111);
//         //         console.log(JSON.stringify(result));
//         //         const a = JSON.stringify(result);
//         //         const b = JSON.parse(a);
//         //         // console.log(b[0].Head_portrait);
//         //         const bindex = b[0].Head_portrait.lastIndexOf('/');
//         //         const headimg = b[0].Head_portrait.substring(bindex+1);
//         //         console.log(headimg);
//         //         fs.unlink('./img/headimg/'+headimg, function (err) {
//         //                 if (err) return console.log(err);
//         //                 // console.log('文件删除成功');
//         //             })
//         //         connection.release();
//         //     })
//         // })
//         // pool.getConnection((err, connection) => {
//         //     var sql = sqlMap.changeHeadimg;
//         //     connection.query(sql, [Head_portrait,uname], (err, result) => {
//         //         connection.release();
//         //     })
//         // })
//         // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
//         // cb(null, Date.now() + "-" + file.originalname);  
//         // const originalname = file.originalname;
//         // var index = originalname.indexOf('.');
//         // var suffix = originalname.substring(index);
//         cb(null, req.query.uname+suffix);  
//     }
// });

// // 创建文件夹
// var createFolder = function(folder){
//     try{
//         // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
//         // 如果文件路径不存在将会抛出错误"no such file or directory"
//         fs.accessSync(folder); 
//     }catch(e){
//         // 文件夹不存在，以同步的方式创建文件目录。
//         fs.mkdirSync(folder);
//     }  
// };

// var uploadFolder = './img/headimg';
// createFolder(uploadFolder);

// // 创建 multer 对象
// var upload = multer({ storage: storage });

// /* POST upload listing. */
// router.post('/', upload.single('file'), function(req, res, next) {
//     var file = req.file;
//     console.log(req.headers.token)
//     console.log(file)
//     // var query = req.query;
//     // console.log('上传用户：%s', query.uname)
//     // console.log('文件类型：%s', file.mimetype);
//     // console.log('原始文件名：%s', file.originalname);
//     // console.log('文件大小：%s', file.size);
//     // console.log('文件保存路径：%s', file.path);
//     // 接收文件成功后返回数据给前端
//     res.json({res_code: '0'});
//     // console.log(req.query)
// });

// // 导出模块（在 app.js 中引入）
// module.exports = router;

const mysql = require('mysql');
const dbConfig = require('./utils/db');
const sqlMap = require('./utils/sqlMap');
const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

let express = require('express');
let multer = require('multer');
let fs = require("fs");
let path = require("path");
let router = express.Router();
const {checkToken} = require('./api/utils');
const url = 'http://localhost:5000/';

router.post('/', multer({
      //设置文件存储路径
     dest: 'upload'   //upload文件如果不存在则会自己创建一个。
 }).single('file'), function (req, res, next) {
    const token = req.headers.token

    checkToken(token, (bool, data) => {
        const {studentId} = data
        if (!bool) {
            return res.json({
                code: 0,
                msg: '登录过期，请重新登录',
                data: null
            })
        } else {
            if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
                res.render("error", {message: "上传文件不能为空！"});
                return
            } else {
               let file = req.file;
               let fileInfo = {};
               console.log(file);
               const httpurlAvatar = url + token + file.originalname

                pool.getConnection((err, connection) => {
                    const sqlRemove = sqlMap.queryAvatarUrl;
                    connection.query(sqlRemove, [token], (err, result) => {
                        console.log(result[0])
                        if (result[0].avatarUrl) {
                            let avatarUrl = result[0].avatarUrl
                            avatarUrl = avatarUrl.split('/')[avatarUrl.split('/').length - 1]
                            fs.unlink('./upload/'+avatarUrl, function (err) {
                                if (err) return console.log(err);
                            })
                        }
                    })

                    const sqlUpdate = sqlMap.updateAvatarUrl
                    connection.query(sqlUpdate, [httpurlAvatar, token], (err, result) => {
                        console.log(result)
                        fs.renameSync('./upload/' + file.filename, `./upload/${token}${file.originalname}`);//这里修改文件名字，比较随意。
                        // 获取文件信息
                        fileInfo.mimetype = file.mimetype;
                        fileInfo.originalname = file.originalname;
                        fileInfo.size = file.size;
                        fileInfo.path = file.path;
                        // connection.release();
                    })

                    const updateBlogAvatarUrl = 'update Blog set avatarUrl = ? where studentId = ?'
                    connection.query(updateBlogAvatarUrl,[httpurlAvatar, studentId], (err, result) => {
                        if (err) {
                          console.log(err)
                        }
                
                        // connection.release();
                      })

                    const updateDynamicsAvatarUrl = 'update Dynamics set avatarUrl = ? where studentId = ?'
                    connection.query(updateDynamicsAvatarUrl,[httpurlAvatar, studentId], (err, result) => {
                        if (err) {
                          console.log(err)
                        }
                
                        connection.release();
                      })
                })
        
               // 设置响应类型及编码
               res.set({
                 'content-type': 'application/json; charset=utf-8'
                });
        
               res.json({
                   code: 200,
                   msg: '头像更换成功',
                   data: null
               });
            }
        }
    })
    // if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
    //     res.render("error", {message: "上传文件不能为空！"});
    //     return
    // } else {
    //    let file = req.file;
    //    let fileInfo = {};
    //    console.log(file);
    //    fs.renameSync('./upload/' + file.filename, './upload/' + file.originalname);//这里修改文件名字，比较随意。
    //    // 获取文件信息
    //    fileInfo.mimetype = file.mimetype;
    //    fileInfo.originalname = file.originalname;
    //    fileInfo.size = file.size;
    //    fileInfo.path = file.path;

    //    // 设置响应类型及编码
    //    res.set({
    //      'content-type': 'application/json; charset=utf-8'
    //     });

    //    res.end("上传成功！");
    // }
 });

 module.exports = router;
