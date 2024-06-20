"use strict";const e=require("../../common/vendor.js"),s=require("../../services/goods.js"),o=require("../../services/cart.js");if(require("../../utils/http.js"),require("../../stores/index.js"),require("../../stores/modules/member.js"),!Array){(e.resolveComponent("vk-data-goods-sku-popup")+e.resolveComponent("uni-popup"))()}Math||((()=>"../../components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.js")+r+u+a+(()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js"))();const u=()=>"./components/AddressPanel.js",a=()=>"./components/ServicePanel.js",r=()=>"./components/PageSkeleton.js",l={__name:"goods",props:{id:{type:String,default:""}},setup(u){const a=u,{safeAreaInsets:r}=e.index.getSystemInfoSync(),l=e.ref([]),t=e.ref(!1);e.onLoad((async()=>{await(async()=>{const e=await s.getGoodsByIdAPI(a.id);l.value=e.result,k.value={_id:e.result.id,name:e.result.name,goods_thumb:e.result.mainPictures[0],spec_list:e.result.specs.map((e=>({name:e.name,list:e.values}))),sku_list:e.result.skus.map((s=>({_id:s.id,goods_id:e.result.id,goods_name:e.result.name,image:s.picture,price:100*s.price,stock:s.inventory,sku_name_arr:s.specs.map((e=>e.valueName))})))}})(),t.value=!0}));const d=e.ref(0),n=e=>{d.value=e.detail.current},i=e.ref(),v=e.ref(),c=e=>{v.value=e,i.value.open()},p=e.ref(""),m=e.ref(""),g=e=>{p.value=l.value.userAddresses[e].fullLocation+" "+l.value.userAddresses[e].address,m.value=l.value.userAddresses[e].id},f=e.ref(!1),k=e.ref({}),b=e.ref(1),y=e=>{f.value=!0,b.value=e},A=e.ref(),_=e.computed((()=>{var e,s;return(null==(s=null==(e=A.value)?void 0:e.selectArr)?void 0:s.join(" ").trim())||"请选择商品规格"})),j=async s=>{await o.postMemberCartAPI({skuId:s._id,count:s.buy_num}),e.index.showToast({title:"添加成功"}),setTimeout((()=>{f.value=!1}),500)},P=s=>{console.log(m.value),console.log(s),e.index.navigateTo({url:`/pagesOrder/create/create?skuId=${s._id}&count=${s.buy_num}&addressId=${m.value}`})};return(s,o)=>{var u,a,m,I,w,x;return e.e({a:e.sr(A,"02d9cc46-0",{k:"skuPopupRef"}),b:e.o(P),c:e.o(j),d:e.o((e=>f.value=e)),e:e.p({localdata:k.value,mode:b.value,"add-cart-background-color":"#FFA868","buy-now-background-color":"#27BA9B","actived-style":{color:"#27BA9B",borderColor:"#27BA9B",backgroundColor:"#E9F8F5"},modelValue:f.value}),f:t.value},t.value?e.e({g:e.f(null==(u=l.value)?void 0:u.mainPictures,((s,o,u)=>({a:s,b:e.o((o=>{return u=s,void e.index.previewImage({current:u,urls:l.value.mainPictures});var u}),s),c:s}))),h:e.o(n),i:e.t(d.value+1),j:e.t(null==(m=null==(a=l.value)?void 0:a.mainPictures)?void 0:m.length),k:e.t(l.value.price),l:e.t(l.value.name),m:e.t(l.value.desc),n:e.t(e.unref(_)),o:e.o((e=>y(1))),p:p.value},p.value?{q:e.t(p.value)}:{},{r:e.o((e=>c("address"))),s:e.o((e=>c("service"))),t:e.f(null==(I=l.value.details)?void 0:I.properties,((s,o,u)=>({a:e.t(s.name),b:e.t(s.value),c:s.name}))),v:e.f(null==(w=l.value.details)?void 0:w.pictures,((e,s,o)=>({a:e,b:e}))),w:e.f(l.value.similarProducts,((s,o,u)=>({a:s.picture,b:e.t(s.name),c:e.t(s.price),d:s.id,e:`/pages/goods/goods?id=${s.id}`})))}):{},{x:e.o((e=>y(2))),y:e.o((e=>y(3))),z:(null==(x=e.unref(r))?void 0:x.bottom)+"px",A:"address"===v.value,B:e.o((e=>{var s;return null==(s=i.value)?void 0:s.close()})),C:e.o(g),D:e.p({address:l.value.userAddresses}),E:"service"===v.value,F:e.o((e=>{var s;return null==(s=i.value)?void 0:s.close()})),G:e.sr(i,"02d9cc46-2",{k:"popup"}),H:e.p({type:"bottom",backgroundColor:"#fff"})})}}};wx.createPage(l);
