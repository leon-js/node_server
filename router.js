const express = require('express');
const router = express.Router();
const userInfo = require('./api/userInfo');
const blog = require('./api/blog');
const dynamics = require('./api/dynamics');
const topic = require('./api/topic');
const notice = require('./api/notice');
const news = require('./api/news');
const study = require('./api/study');

// applearningwebserver

// 登录校验
router.post('/loginCheck',(req, res, next) => {
    userInfo.loginCheck(req, res, next);
});

// 获取用户信息
router.post('/getUserinfo',(req, res, next) => {
    userInfo.getUserinfo(req, res, next);
});

// 更新用户数据
router.post('/updatePersonalData',(req, res, next) => {
    userInfo.updatePersonalData(req, res, next);
});

// 更新用户联系方式数据
router.post('/updateConectData',(req, res, next) => {
    userInfo.updateConectData(req, res, next);
});

// 写入博客
router.post('/releaseBlog',(req, res, next) => {
    blog.releaseBlog(req, res, next);
});

// 查看博客
router.post('/detailBlog',(req, res, next) => {
    blog.detailBlog(req, res, next);
});

// 编辑博客
router.post('/updataBlog',(req, res, next) => {
    blog.updataBlog(req, res, next);
});

// 发布动态
router.post('/releaseDynamics',(req, res, next) => {
    dynamics.releaseDynamics(req, res, next);
});

// 首页查询学生博客
router.post('/selectBlogTeachAndstudents',(req, res, next) => {
    blog.selectBlogTeachAndstudents(req, res, next);
});

// 话题申请
router.post('/applyTopic',(req, res, next) => {
    topic.applyTopic(req, res, next);
});

// 消息通知
router.post('/selectNotice',(req, res, next) => {
    notice.selectNotice(req, res, next);
});

// 消息通知被查看
router.post('/lookoverNotice',(req, res, next) => {
    notice.lookoverNotice(req, res, next);
});

// 后台系统获取话题
router.post('/systemTopicList',(req, res, next) => {
    topic.systemTopicList(req, res, next);
});

// 审批话题
router.post('/approvalTopic',(req, res, next) => {
    topic.approvalTopic(req, res, next);
});

// 强势围观查询（其实就是博客 根据查看次数和点赞次数排序，优先点赞）
router.post('/selectBlogTop',(req, res, next) => {
    blog.selectBlogTop(req, res, next);
});

// 博客点赞修改
router.post('/thumbsUpBlog',(req, res, next) => {
    blog.thumbsUpBlog(req, res, next);
});

 // 获取我的动态
router.post('/selectMyDynamics',(req, res, next) => {
    dynamics.selectMyDynamics(req, res, next);
});

// 动态点赞修改
router.post('/thumbsUpDynamics',(req, res, next) => {
    dynamics.thumbsUpDynamics(req, res, next);
});

// dashboard获取动态
router.post('/selectDynamics',(req, res, next) => {
    dynamics.selectDynamics(req, res, next);
});

// 获取学院新闻
router.post('/colloegeNewsList',(req, res, next) => {
    news.colloegeNewsList(req, res, next);
});

// 删除博客
router.post('/deleteBlog',(req, res, next) => {
    blog.deleteBlog(req, res, next);
});

// 获取学习天地
router.post('/studyList',(req, res, next) => {
    study.studyList(req, res, next);
});

// 获取博客列表
router.post('/bloglist',(req, res, next) => {
    blog.bloglist(req, res, next);
});


module.exports = router;