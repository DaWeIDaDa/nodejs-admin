const mongoose = require('../utils/db')

const model = mongoose.model('users',{
    username:String,
    password:String
})

module.exports = {
    findOne(username){
        return model.findOne({username})
    },
    save({username,password}){
        let user = new model({
            username,
            password
        })
        return user.save()
    }
}