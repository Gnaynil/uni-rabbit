"use strict";const e=require("../../../../../common/vendor.js"),t={name:"uniSwipeAction",data:()=>({}),created(){this.children=[]},methods:{resize(){},closeAll(){this.children.forEach((e=>{e.is_show="none"}))},closeOther(e){this.openItem&&this.openItem!==e&&(this.openItem.is_show="none"),this.openItem=e}}};const n=e._export_sfc(t,[["render",function(e,t,n,o,s,i){return{}}]]);wx.createComponent(n);
