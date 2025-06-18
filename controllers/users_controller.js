module.exports.profile=function(req,res){
   return res.render ('user_profile',{
      title:"user profile"
   });
}
module.exports.signUp=function(req,res){
   return res.render('user_sign_up',{
      title:"sign up"
   })
}

module.exports.signIn=function(req,res){
   return res.render('user_sign_in',{
      title:"sign in"
   })
}

module.exports.create=function(req,res){
   //todo later
}

module.exports.createSession=function(req,res){
   //todo later
}