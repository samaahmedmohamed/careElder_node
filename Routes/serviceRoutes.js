const express = require("express");
const router = express.Router();
const {createService,updateService}=require('../Controller/serviceController')
router.post('/',createService);
router.patch('/:id',updateService);
module.exports=router;