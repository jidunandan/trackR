const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
UserSchema.pre('save', function (next) {
    console.log("PRE SAVE")

    const user = this;
    if (!user.isModified('password')) {
        return next()
    }
    bcrpyt.genSalt(10, (err, salt) => {
        if (err)
            return next(err)
        bcrpyt.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err)
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function (candidatePassword) {
    const user = this
   // console.log(user.password)
    return new Promise((resolve, reject) => {
        bcrpyt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err){
                reject(err)
            }
                
            if (!isMatch){
                reject(false)
            }
                

            resolve(true)
        })
    })
}

mongoose.model('User', UserSchema)