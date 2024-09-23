const express = require('express')
const router = express.Router()
const conn = require('../db.demo')

router.use(express.json())

//로그인
router.post('/login', function(req, res){
    const {email, password} = req.body

    conn.query(
        `SELECT * FROM users Where email = ?`, email,
        function (err, results) {
            let loginUser = results[0]
            if (loginUser && loginUser.password == password) {
                    res.status(200).json({
                         message : `${loginUser.name}님 로그인 되었습니다.`
                     })
            } else {
                res.status(404).json({
                    message : '이메일 또는 비밀번호가 틀렸습니다.'
                })
            }
        }
    );
})

//회원 가입
router.post('/join', function(req, res){

    if (req.body == {}) {
        res.status(400).json({
            message : `입력 값을 다시 확인해 주세요.`
        })
    } else {
       const {email, name, password, contact} = req.body

       conn.query(
        `INSERT INTO users (email, name, password, contact) 
        VALUES (?, ?, ?, ?)`, [email, name, password, contact],
        function (err, results, fields) {
            res.status(201).json(results)
        }
        );
}
})

//회원 개별 조회
router.get('/users', function(req, res){
    let {email} = req.body

    conn.query(
        `SELECT * FROM users WHERE email = ?`, email,
        function (err, results) {
            res.status(200).json (results)
        }
        );
})

// 회원 탈퇴
router.delete('/users', function(req, res){
    let {email} = req.body

    conn.query(
        `DELETE FROM users WHERE email = ?`, email,
        function (err, results) {
            res.status(200).json (results)
        }
        );

})

module.exports = router