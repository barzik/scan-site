const mysql = require('mysql');

class DBConnection {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
    });
  }

  readScans(word) {
    return new Promise((resolve, reject) => {
      const columns = ['scan_id', 'timestamp', 'url', 'keyword', 'found'];
      this.pool.query(
        'SELECT ?? FROM scans WHERE keyword = ?',
        [columns, word],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        },
      );
    });
  }

  writeScans(scan) {
    return new Promise((resolve, reject) => {
      this.pool.query(
        'INSERT INTO scans SET ?',
        [scan],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        },
      );
    });
  }
}

module.exports = new DBConnection();
