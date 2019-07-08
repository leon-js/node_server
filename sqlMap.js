var sqlMap = {
    setUpdate: 'UPDATE content SET title = ?,detailed= ?  WHERE id=?',
    getContentAll: 'SELECT * FROM content WHERE userid = ? ORDER BY time DESC limit 12',
    getUsers: 'SELECT * FROM users',
    // 新旧共用api getUsers
    getValue: 'SELECT * FROM content WHERE id = ?',
    getContentAllforKind: 'SELECT * FROM content WHERE kind=(SELECT kind FROM kinds WHERE id = ?) AND userid = ? ORDER BY time DESC',
    addValue: 'INSERT INTO content (title,detailed,time,kind,dateTim,userid) VALUES (?,?,?,?,?,?)',
    getKind: 'SELECT kind FROM kinds WHERE id=?',
    deleteValue: 'DELETE FROM content WHERE id=?',
    getDeveloperBlog: 'select * from content where userid = 2 order by id desc limit 12',
    addUsers: 'INSERT INTO users (username,AccountNumber,password,sudo) VALUES (?,?,?,?);',
    
    //新api
    changeHeadimg: 'UPDATE users SET Head_portrait = ? where username = ?',
    selectHeadimg: 'SELECT Head_portrait FROM users WHERE username = ?',
    register: 'INSERT INTO users (username,AccountNumber,password) VALUES (?,?,?)',
    selectClassification: 'SELECT classification FROM users WHERE username = ?',
    addClassification: 'UPDATE users SET classification = ? WHERE username = ?',
    getContentforKind: 'SELECT uname,title,headimg,dateTim,star,kind,id,praiseUsers FROM content WHERE kind = ? AND uname = ? ORDER BY time DESC',
    isStar: 'UPDATE content SET star = ?,praiseUsers = ? WHERE id = ?',

    // 测试api
    jsonpTest: 'select * from users'
  }
  
  module.exports = sqlMap;