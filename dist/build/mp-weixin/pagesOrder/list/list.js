"use strict";const e=require("../../common/vendor.js");Math||t();const t=()=>"./components/OrderList.js",r={__name:"list",props:{type:String},setup(t){const r=t;e.index.getSystemInfoSync();const a=e.ref([{orderState:0,title:"全部"},{orderState:1,title:"待付款"},{orderState:2,title:"待发货"},{orderState:3,title:"待收货"},{orderState:4,title:"待评价"}]),o=e.ref(a.value.findIndex((e=>e.orderState===Number(r.type))));return(t,r)=>({a:e.f(a.value,((t,r,a)=>({a:e.t(t.title),b:e.o((()=>o.value=r),t.orderState),c:t.orderState}))),b:20*o.value+"%",c:e.f(a.value,((t,r,a)=>({a:"2b20f486-0-"+a,b:e.p({orderState:t.orderState}),c:t.title}))),d:o.value,e:e.o((e=>o.value=e.detail.current))})}};wx.createPage(r);
