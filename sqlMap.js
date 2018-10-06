var sqlMap = {
    // getValue: 'SELECT * FROM content WHERE id = ?',
    setUpdate: 'UPDATE content SET title = ?,detailed= ?  WHERE id=?',
    // getContentAll: 'select * from content order by time desc'
    getContentAll: 'SELECT * FROM content ORDER BY time DESC',
    getUsers: 'SELECT * FROM users',
    getValue: 'SELECT * FROM content WHERE id = ?',
    getContentAllforKind: 'select * from content where kind=(select kind from kinds where id = ?)'
  }
  
  module.exports = sqlMap;