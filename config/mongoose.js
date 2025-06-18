const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/social_media_application_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongodb"));

db.once('open',function(){
  console.log('connected to Database :: MongoDB');
});

module.exports= db;