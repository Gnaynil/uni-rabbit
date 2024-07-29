"use strict";const e=require("../../common/vendor.js"),s=require("../../services/home.js"),t=require("../../composables/index.js");if(require("../../utils/http.js"),require("../../stores/index.js"),require("../../stores/modules/member.js"),!Array){(e.resolveComponent("XtxSwiper")+e.resolveComponent("XtxGuess"))()}Math||(a+n+(()=>"../../components/XtxSwiper.js")+o+r+(()=>"../../components/XtxGuess.js"))();const a=()=>"./components/CustomNavBar.js",o=()=>"./components/CategoryPanel.js",r=()=>"./components/HotPanel.js",n=()=>"./components/PageSkeleton.js",u={__name:"index",setup(a){e.useCssVars((s=>({"5efda3e5":88+e.unref(o).statusBarHeight+"px"})));const o=e.index.getSystemInfoSync(),r=e.ref([]),n=async()=>{const e=await s.getHomeBannerAPI();r.value=e.result},u=e.ref([]),l=async()=>{const e=await s.getHomeCategoryAPI();u.value=e.result},c=e.ref([]),i=async()=>{const e=await s.getHomeHotItemAPI();c.value=e.result},m=e.ref(!1);e.onLoad((async()=>{m.value=!0,await Promise.all([n(),l(),i()]),m.value=!1}));const{guessRef:v,onScrolltolower:p}=t.useGuessList(),f=e.ref(!1),g=async()=>{var e,s;f.value=!0,null==(e=v.value)||e.resetData(),await Promise.all([n(),l(),i(),null==(s=v.value)?void 0:s.getMore()]),f.value=!1};return(s,t)=>e.e({a:e.s(s.__cssVars()),b:m.value},m.value?{}:{c:e.p({data:r.value}),d:e.p({categoryList:u.value}),e:e.p({hotList:c.value}),f:e.sr(v,"01f9263e-5",{k:"guessRef"})},{g:e.o(g),h:f.value,i:e.o(((...s)=>e.unref(p)&&e.unref(p)(...s))),j:e.s(s.__cssVars())})}};wx.createPage(u);