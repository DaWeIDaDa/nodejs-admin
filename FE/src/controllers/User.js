import userLoginView from '../views/user-login.art'
import userRegterView from '../views/user-register.art'

let url = '' 
let result = ''
export default{
    async renderLogin(){
        result= await this.isSignin()
        let html = userLoginView({
            isSignin :result.ret,
            username:result.data.username
        })
        $('#user-login').html(html)
        this.bindLoginEvent()
        this.bindEventOut()
    },
    async renderReg(){
        result= await this.isSignin()
        let html = userRegterView({
            isSignin:result.ret
        })
        $('#user-register').html(html)
        this.bindRegEvent()
    },
    bindLoginEvent(){     
        
        $('#btn-submit-login').on("click",()=>{
            let username = $("#username").val()
            let password = $("#password").val()
            let data = {
                username,
                password
            }
            $.ajax({
                url : "/api/users/signin",
                data,
                type:'post',
                success:(result)=>{
                    if(result.ret){
                        let html = userLoginView({
                            isSignin : true,
                            username : result.data.username
                        })
                                    
                        $("#user-login").html(html)
                        $('#user-register').html(
                            userRegterView({
                            isSignin :true
                        }))
                        this.bindEventOut()
                    }else{
                        alert(result.data.msg)
                    }
                }
            })
        })    
    },
    isSignin(){
        return $.ajax({
            url : '/api/users/isSignin',
            dataType:'json',
            success(res){
                return res
            }
        })
    },
    bindRegEvent(){
        // $("#btn-signup").on("click",()=>{
        //     url = '/api/users/signup'
        // })
        $('#btn-submit-reg').on("click",()=>{
            let username = $("#username-reg").val()
            let password = $("#password-reg").val()
            let data = {
                username,
                password
            }
            // let data = $("#user-form-reg").serialize()
            // console.log(data)
            $.ajax({
                url : "/api/users/signup",
                data,
                type:'post',
                success(result){                  
                    alert(result.data.msg)
                }
            })
        })
    },
    bindEventOut(){
        $("#btn-signout").on("click",()=>{
            $.ajax({
                url : "/api/users/signout",
                success(){
                    location.reload()
                }
            })
        })
    }
}





