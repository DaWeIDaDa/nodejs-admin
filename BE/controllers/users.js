const userModel = require('../models/users')
const toolsUtil = require('../utils/tools')
module.exports = {
    async signup(req,res,next){
        res.set('content-type','application/json;charset=utf-8')
        let {username,password} = req.body
        console.log(username,password)
        let result = await userModel.findOne(username)
        if(result){
            res.render('error',{
                data:JSON.stringify({
                    msg:"用户已经注册"
                })
            })
        }else{
            let newPassword =await toolsUtil.crypt(password)
            let result = await userModel.save({
                username,
                password:newPassword
            })
            if(result){
                res.render('succ',{
                    data : JSON.stringify({
                        msg :"恭喜您,注册成功"
                    })
                })
            }else{
                res.render('error',{
                    data : JSON.stringify({
                        msg :"很抱歉，注册失败"
                    })
                })
            }

        }
    },
    async signin(req,res,next){ 
        res.set('content-type','application/json;charset=utf-8')
        let {username,password} = req.body
        let result = await userModel.findOne(username)
        console.log(result)
        if(result){
            if(await toolsUtil.compare(password,result.password)){
                req.session.username = username
                res.render('succ',{
                    data : JSON.stringify({
                        msg :"登录成功",
                        username
                    })
                })
            }else{
                res.render('error',{
                    data : JSON.stringify({
                        msg :"账号或密码错误"
                    })
                })
            }
        }else{
            res.render('error',{
                data : JSON.stringify({
                    msg :"账号或密码错误"
                })
            })
        }
    },
    async isSignin(req,res,next){
        res.set('content-type','application/json;charset=utf-8')
        let username = req.session.username
        let url = req.url
        if(username){
            if(url == '/isSignin'){
                res.render('succ',{
                    data : JSON.stringify({
                        msg :"用户有权限",
                        username
                    })
                })
            }else{           
                next()
            }
        }else{
            res.render('error',{
                data : JSON.stringify({
                    msg :"用户没有权限"
                })
            })
        }
    },
    async signout(req,res,next){
        res.set('content-type','application/json;charset=utf-8')
        req.session = null
        res.render('succ',{
            data : JSON.stringify({
                msg : "用户退出成功"
            })
        })
    }
}