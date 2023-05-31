const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByName, getUserById) {

    const authenticateUser = async (docName, docPassword, done) => {
        const user = getUserByName(docName)
        if(user == null){
            return done(null, false, { message : 'No user with that name'})
        }

        try{
            if( await bcrypt.compare(docPassword, user.password)){
                return done(null, user)
            }else{
                return done(null, false, { message : 'Password Incorrect'})
            }
        }catch(e){
            console.log(e)
            return done(e)
        }
    }

    passport.use(new LocalStrategy( { usernameField : 'docName', passwordField : 'docPassword' }, authenticateUser ))
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id)) 
    })
    
}

module.exports = initialize;