var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var User = require('../models/users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await User.findAll();
  res.json(users);
});

/* ADD Users */
router.post('/', async function(req, res, next) {
  
  const jane = await User.create({
    username: 'janedoe',
    password: '123',
    email: 'janedoe@email.com',
    active: 1
  });
  
  if(jane) {
    let response = {
      message: "Data berhasil ditambahkan",
    }
    res.json(response);
  }
  
  // //1. Konek ke database
  // const connection = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   password: '', 
  //   database: 'pweba'
  // });
  // connection.connect();
  
  // //2. Ambil data yang dikirimkan oleh pengguna
  // let email = req.body.email;
  // let username = req.body.username;
  // let password = req.body.password;
  // let active = req.body.active;
  
  // //3. Tambahkan data yang didapatkan ke dalam database
  // let sql = 'INSERT INTO users ' +
  // '(username, password, email, active, created_at, updated_at) ' +
  // 'VALUES (?, ?, ?, ?, NOW(), NOW())';
  
  // connection.query(sql, [username, password, email, active], (err, rows, fields) => {
  //   if(err) throw err;
  //   //4. Berikan response ke pengguna
  //   let response = {
  //     message: "Data berhasil ditambahkan",
  //     newId: rows.insertId,
  //     affectedRows: rows.affectedRows
  //   }
  //   res.json(response);
  // });
  
  // //5. Close connection
  // connection.end();
});

/* EDIT Users */
router.post('/:id/edit', function(req, res, next) {
  //1. Koneksi ke database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'pweba'
  });
  connection.connect();
  
  //2. Ambil parameter (SUKMA) Ambil ID data (PUTRA)
  let id = req.params.id;
  
  //3. Ambil data baru yang dikirim oleh pengguna
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let active = req.body.active;
  
  //3. Update data yang lama
  let sql = 'UPDATE users SET email=?,username=?,password=?,active=?,updated_at=NOW() WHERE id = ?';
  connection.query(sql, [email, username, password, active, id], function (err, rows, fields) {
    if(err) throw err;
    //5. Kirim response ke pengguna
    let response = {
      message: "Data berhasil diubah",
      affectedRows: rows.affectedRows
    }
    res.json(response);
  });
  //6  Close connection
  connection.end();
});

/* DELETE Users */
router.post('/:id/delete', function(req, res, next) {
  //1. Koneksi ke database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'pweba'
  });
  connection.connect();
  
  //2. Ambil parameter (SUKMA) Ambil ID data (PUTRA)
  let id = req.params.id;
  
  let sql = "DELETE FROM users WHERE id = ?";
  
  connection.query(sql, [id], function (err, rows, fields) {
    if(err) throw err;
    //5. Kirim response ke pengguna
    let response = {
      message: "Data berhasil dihapus",
      affectedRows: rows.affectedRows
    }
    res.json(response);
  });
  //6  Close connection
  connection.end();
  
});

module.exports = router;
