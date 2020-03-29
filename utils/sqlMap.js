var sqlMap = {
    // applearningwebserver

    // 登录校验
    loginCheck: 'SELECT studentId,avatarUrl,defaultAvatar,collegeName,collegeId,realName,userName,className,classId,userActions,createYear,province,city,lastLoginDate,lastLoginTime,userToken,gender,phone,qq,wechat,teacher FROM Userinfo WHERE studentId = ? AND password = ?',
    
    // 获取用户信息
    getUserinfo: 'SELECT studentId,avatarUrl,defaultAvatar,collegeName,collegeId,realName,userName,className,classId,userActions,createYear,province,city,lastLoginDate,lastLoginTime,userToken,gender,phone,qq,wechat,teacher FROM Userinfo WHERE userToken = ?',
    
    // 最后登录时间更新
    lastLoginDateUpdate: 'UPDATE Userinfo SET lastLoginDate = ?,lastLoginTime = ?, userToken = ?  WHERE studentId = ?',
    
    // 更新token
    updateToken: 'UPDATE Userinfo SET userToken = ?  WHERE studentId = ?',
    
    // 更新用户数据
    updatePersonalData: 'UPDATE Userinfo SET userName = ?  WHERE userToken = ?',

    // 更新用户联系方式数据
    updateConectData: 'UPDATE Userinfo SET phone = ?, qq = ?, wechat = ?  WHERE userToken = ?',

    // 查询最后登录时间
    selectLastLoginDate: 'SELECT * FROM Userinfo WHERE userToken = ?',

    // 修改头像
    updateAvatarUrl: 'UPDATE Userinfo SET avatarUrl = ?  WHERE userToken = ?',

    // 查询当前头像
    queryAvatarUrl: 'SELECT avatarUrl FROM Userinfo WHERE userToken = ?',

    // 写入博客
    releaseBlog: 'INSERT INTO Blog (guid,studentId,realName,userName,titleName,content,coverURL,createDate,createTime,collegeName,collegeId,classId,className,avatarUrl,news,study,college) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',

    // 查看博客
    detailBlog: 'SELECT * FROM Blog WHERE guid = ?',

    // 增加查看次数
    updataViewCount: 'UPDATE Blog SET viewCount = ?  WHERE guid = ?',

    // 编辑博客
    updataBlog: 'UPDATE Blog SET titleName = ?,content = ?,coverURL = ?  WHERE guid = ?',

    // 当用户修改了昵称
    updateUserNameBlog: 'update Blog set userName = ? where studentId = ?',

    // 当用户修改了昵称
    updateUserNameDynamics: 'update Dynamics set userName = ? where studentId = ?',

    // 发布动态
    releaseDynamics: 'INSERT INTO Dynamics (id,studentId,realName,userName,content,createDate,createTime,collegeName,className,thumbsUp,imgUrlarray,topic,topicId,avatarUrl) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',

    // 首页查询学生博客
    selectBlogTeachAndstudents: 'SELECT * FROM Blog WHERE college = 1 ORDER BY createTime DESC LIMIT ?,?',

    // 话题申请
    applyTopic: 'INSERT INTO Topic (id,studentId,topicName,mean,createTime,createDate,createUser) VALUES (?,?,?,?,?,?,?)',

    // 消息通知
    selectNotice: 'SELECT * FROM Notice WHERE studentId = ? ORDER BY createTime DESC',

    // 写入消息通知
    releaseNotice: 'INSERT INTO Notice (id,title,studentId,type,typeid,createTime,createDate,source,blogId) VALUES (?,?,?,?,?,?,?,?,?)',

    // 消息通知被查看
    lookoverNotice: 'UPDATE Notice SET lookover = 1  WHERE id = ?',

    // 审批话题
    approvalTopic: 'UPDATE Topic SET status = ?,opinion = ?,approvalTime = ?,approvalDate = ?,approvalUser = ? WHERE id = ?',

    // 强势围观查询（其实就是博客 根据查看次数和点赞次数排序，优先点赞）
    selectBlogTop: 'SELECT * FROM Blog ORDER BY thumbsUp DESC,viewCount DESC,createDate DESC LIMIT 0,10',

    // 博客点赞修改
    thumbsUpBlog: 'UPDATE Blog SET thumbsUp = ?,thumbsUpUser = ? WHERE guid = ?',

    // 获取我的动态
    selectMyDynamics: 'SELECT * FROM Dynamics WHERE studentId = ? ORDER BY createDate DESC LIMIT ?,?',

    // 动态点赞修改
    thumbsUpDynamics: 'UPDATE Dynamics SET thumbsUp = ?,thumbsUpUser = ? WHERE id = ?',

    // dashboard获取动态
    selectDynamics: 'SELECT * FROM Dynamics ORDER BY createDate DESC LIMIT ?,?',

    // 删除博客
    deleteBlog: 'DELETE FROM Blog WHERE guid = ?'


  }
  
  module.exports = sqlMap;