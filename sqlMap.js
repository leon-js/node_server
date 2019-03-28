var sqlMap = {
    // getValue: 'SELECT * FROM content WHERE id = ?',
    setUpdate: 'UPDATE content SET title = ?,detailed= ?  WHERE id=?',
    // getContentAll: 'select * from content order by time desc'
    getContentAll: 'SELECT * FROM content WHERE userid = ? ORDER BY time DESC',
    getUsers: 'SELECT * FROM users',
    getValue: 'SELECT * FROM content WHERE id = ?',
    getContentAllforKind: 'SELECT * FROM content WHERE kind=(SELECT kind FROM kinds WHERE id = ?) AND userid = ? ORDER BY time DESC',
    addValue: 'INSERT INTO content (title,detailed,time,kind,dateTim,userid) VALUES (?,?,?,?,?,?)',
    getKind: 'SELECT kind FROM kinds WHERE id=?',
    deleteValue: 'DELETE FROM content WHERE id=?',
    getDeveloperBlog: 'select * from content where userid = 2 order by id desc limit 12'
  }
  
  module.exports = sqlMap;