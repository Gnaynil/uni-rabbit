"use strict";const e=require("../common/vendor.js"),s=require("../services/home.js");require("../utils/http.js"),require("../stores/index.js"),require("../stores/modules/member.js");const t={__name:"XtxGuess",setup(t,{expose:o}){e.index.getSystemInfoSync();const r=e.ref([]),a={page:1,pageSize:10},u=e.ref(!1),n=async()=>{if(!0===u.value)return e.index.showToast({icon:"none",title:"没有更多数据了~"});const t=await s.getHomeGoodsGuessLikeAPI(a);r.value=r.value.concat(...t.result.items),a.page<t.result.pages?a.page++:u.value=!0};return e.onMounted((()=>n())),o({resetData:()=>{a.page=1,r.value=[],u.value=!1},getMore:n}),(s,t)=>({a:e.f(r.value,((s,t,o)=>({a:s.picture,b:e.t(s.name),c:e.t(s.price),d:s.id,e:`/pages/goods/goods?id=${s.id}`}))),b:e.t(u.value?"没有更多数据~":"正在加载...")})}};wx.createComponent(t);