const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据是需要
const express = require('express');
const app = express();

app.use(bodyParser.json());
// 后端api路由
app.use('/api', routerApi);
// app.get("/",(req,res) => {
//   // res.write(`<link href="favicon.ico" rel="shortcut icon"></link>`)
//   res.send("INDES");
// })

// app.get('/api/getArticle', (req, res, next) => {
//   res.json({
//       data: '后台返回结果 getArticle'
//     });

// })

// 监听端口
const port = 5000;

app.listen(port,() => {
    console.log(`Server started on ${port}`);
})