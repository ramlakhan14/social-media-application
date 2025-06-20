const express=require('express');
const router=express.Router();


const userControllers=require('../controllers/users_controller');

router.get('/profile', userControllers.profile);

router.get('/sign-up',userControllers.signUp);
router.get('/sign-in',userControllers.signIn);
router.post('/create',userControllers.create);
module.exports=router