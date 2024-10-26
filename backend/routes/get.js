const express=require('express');
const router=express.Router();
const GetRules=require('../controllers/getRule');
router.get('/',GetRules);
module.exports=router;