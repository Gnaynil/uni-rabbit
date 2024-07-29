"use strict";const e=require("../utils/http.js");exports.deleteMemberOrderAPI=(r={ids:ids})=>e.httpInstance({method:"DELETE",url:"/member/order",data:r}),exports.getMemberOrderAPI=r=>e.httpInstance({method:"GET",url:"/member/order",data:r}),exports.getMemberOrderByIdAPI=r=>e.httpInstance({method:"GET",url:`/member/order/${r}`}),exports.getMemberOrderCancelByIdAPI=(r,t={cancelReason:cancelReason})=>e.httpInstance({method:"PUT",url:`/member/order/${r}/cancel`,data:t}),exports.getMemberOrderLogisticsByIdAPI=r=>e.httpInstance({method:"GET",url:`/member/order/${r}/logistics`}),exports.getMemberOrderPreAPI=()=>e.httpInstance({method:"GET",url:"/member/order/pre"}),exports.getMemberOrderPreAgainAPI=r=>e.httpInstance({method:"GET",url:`/member/order/repurchase/${r}`}),exports.getMemberOrderPreNowAPI=r=>e.httpInstance({method:"GET",url:"/member/order/pre/now",data:r}),exports.getPayWxPayMiniPayAPI=r=>e.httpInstance({method:"GET",url:"/pay/wxPay/miniPay",data:r}),exports.postMemberOrderAPI=r=>e.httpInstance({method:"POST",url:"/member/order",data:r}),exports.putMemberOrderReceiptByIdAPI=r=>e.httpInstance({method:"PUT",url:`/member/order/${r}/receipt`});