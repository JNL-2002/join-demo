const express = require('express')
const router = express.Router()
router.use(express.json())

let db = new Map()
let id = 1

//로그인
router.post('/login', function(req, res){
    const {userId, password} = req.body
    let loginUser = {}

    db.forEach(function(user, id){
        if (user.userId === userId) {
            loginUser = user
        }
    })

    if (isNotEmpty(loginUser)) {
        res.status(200).json({
            message : '회원님의 아이디가 일치합니다.'
        })
        if(loginUser.password === password) {
            res.status(200).json({
                message : '회원님의 비밀번호가 일치합니다.'
            })
        } else {
            res.status(400).json({
                message : '회원님의 비밀번호가 틀렸습니다.'
            })
        }
    } else {
        res.status(400).json({
            message : '입력하신 아이디는 없는 아이디 입니다.'
        })
    }
})

function isNotEmpty(obj) {
    if (Object.keys(obj).length) {
        return true
    } else {
        return false
    }
}

//회원 가입
router.post('/join', function(req, res){

    if (req.body == {}) {
        res.status(400).json({
            message : `입력 값을 다시 확인해 주세요.`
        })
    } else {
        const {userId} = req.body
        db.set(userId, req.body)
    res.status(201).json({
        message : `${db.get(userId).name}님 환영합니다.`
    })
}
})

//회원 개별 조회
router.get('/users', function(req, res){
    let {userId} = req.body

    const user = db.get(userId)
    if (user) {
        res.status(200).json ({
            userId : user.userId,
            name : user.name
        })
    } else {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    }
})

// 회원 탈퇴
router.delete('user/:id', function(req, res){
    let {userId} = req.body

    const user = db.get(userId)
    if (user) {
        db.delete(id)
        res.status(200).json ({
            message : `${user.name}님 다음에 또 뵙겠습니다.`
        })
    } else {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    }
})

module.exports = router