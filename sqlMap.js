var sqlMap = {
    // getValue: 'SELECT * FROM content WHERE id = ?',
    setUpdate: 'UPDATE content SET title = ?,detailed= ?  WHERE id=?',
    // getContentAll: 'select * from content order by time desc'
    getContentAll: 'SELECT * FROM content WHERE userid = ? ORDER BY time DESC limit 12',
    getUsers: 'SELECT * FROM users',
    getValue: 'SELECT * FROM content WHERE id = ?',
    getContentAllforKind: 'SELECT * FROM content WHERE kind=(SELECT kind FROM kinds WHERE id = ?) AND userid = ? ORDER BY time DESC',
    addValue: 'INSERT INTO content (title,detailed,time,kind,dateTim,userid) VALUES (?,?,?,?,?,?)',
    getKind: 'SELECT kind FROM kinds WHERE id=?',
    deleteValue: 'DELETE FROM content WHERE id=?',
    getDeveloperBlog: 'select * from content where userid = 2 order by id desc limit 12',
    addUsers: 'INSERT INTO users (username,AccountNumber,password,sudo) VALUES (?,?,?,?);',
    changeHeadimg: 'UPDATE users SET Head_portrait = ? where username = ?',
    selectHeadimg: 'SELECT Head_portrait FROM users WHERE username = ?'
  }
  
  module.exports = sqlMap;