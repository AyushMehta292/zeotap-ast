const express=require('express');
const router=express.Router();
const Delete=require('../controllers/delete');
router.post('/',Delete)

module.exports=router;