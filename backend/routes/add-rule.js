const express=require('express');
const router=express.Router();

const AddRule=require('../controllers/create');

router.post('/',AddRule);

module.exports=router;