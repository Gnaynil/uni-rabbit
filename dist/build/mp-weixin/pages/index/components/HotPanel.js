"use strict";const t=require("../../../common/vendor.js"),e={__name:"HotPanel",props:{hotList:{type:Array,default:()=>[]}},setup:e=>(o,s)=>({a:t.f(e.hotList,((e,o,s)=>({a:t.t(e.title),b:t.t(e.alt),c:e.pictures[0],d:e.pictures[1],e:`/pages/hot/hot?type=${e.type}`,f:e.id})))})};wx.createComponent(e);
