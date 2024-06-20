"use strict";const t=require("../utils/http.js");exports.getGoodsByIdAPI=s=>t.httpInstance({method:"GET",url:"/goods",data:{id:s}});
