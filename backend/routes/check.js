const express=require('express');
const router=express.Router();
const Validate=require('../controllers/check');
router.post('/',Validate);
module.exports=router;