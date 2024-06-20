"use strict";const t=require("../utils/http.js");exports.postLoginWxMinSimpleAPI=e=>t.httpInstance({method:"POST",url:"/login/wxMin/simple",data:{phoneNumber:e}});
