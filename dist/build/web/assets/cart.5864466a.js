import{K as t,L as e,o as i,c as s,w as n,a,s as l,q as r,J as u,b as h,e as o,I as p}from"./index-af18ee11.js";import{_ as m}from"./_plugin-vue_export-helper.1b428a4d.js";import{h as d}from"./http.84d8a07a.js";const c=m({name:"vk-data-input-number-box",emits:["update:modelValue","input","change","blur","plus","minus"],props:{value:{type:Number,default:1},modelValue:{type:Number,default:1},bgColor:{type:String,default:"#FFFFFF"},min:{type:Number,default:0},max:{type:Number,default:99999},step:{type:Number,default:1},stepFirst:{type:Number,default:0},stepStrictly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:[Number,String],default:26},color:{type:String,default:"#323233"},inputWidth:{type:[Number,String],default:80},inputHeight:{type:[Number,String],default:50},index:{type:[Number,String],default:""},disabledInput:{type:Boolean,default:!1},cursorSpacing:{type:[Number,String],default:100},longPress:{type:Boolean,default:!0},pressTime:{type:[Number,String],default:250},positiveInteger:{type:Boolean,default:!0}},watch:{valueCom(t,e){this.changeFromInner||(this.inputVal=t,this.$nextTick((function(){this.changeFromInner=!1})))},inputVal(t,e){if(""==t)return;let i=0;i=this.isNumber(t)&&t>=this.min&&t<=this.max?t:e,this.positiveInteger&&(t<0||-1!==String(t).indexOf("."))&&(i=e,this.$nextTick((()=>{this.inputVal=e}))),this.handleChange(i,"change")},min(t){void 0!==t&&""!=t&&this.valueCom<t&&(this.$emit("input",t),this.$emit("update:modelValue",t))},max(t){void 0!==t&&""!=t&&this.valueCom>t&&(this.$emit("input",t),this.$emit("update:modelValue",t))}},data:()=>({inputVal:1,timer:null,changeFromInner:!1,innerChangeTimer:null,showInput:!1}),created(){this.inputVal=Number(this.valueCom)},computed:{valueCom(){return this.modelValue},getCursorSpacing(){return Number(t(this.cursorSpacing))}},methods:{emptyClick(){},btnTouchStart(t){this[t](),this.longPress&&(clearInterval(this.timer),this.timer=null,this.timer=setInterval((()=>{this[t]()}),this.pressTime))},clearTimer(){this.$nextTick((()=>{clearInterval(this.timer),this.timer=null}))},minus(){this.computeVal("minus")},plus(){this.computeVal("plus")},calcPlus(t,e){let i,s,n;try{s=t.toString().split(".")[1].length}catch(a){s=0}try{n=e.toString().split(".")[1].length}catch(a){n=0}return i=Math.pow(10,Math.max(s,n)),((t*i+e*i)/i).toFixed(s>=n?s:n)},calcMinus(t,e){let i,s,n;try{s=t.toString().split(".")[1].length}catch(a){s=0}try{n=e.toString().split(".")[1].length}catch(a){n=0}return i=Math.pow(10,Math.max(s,n)),((t*i-e*i)/i).toFixed(s>=n?s:n)},computeVal(t){if(e(),this.disabled)return;let i=0;if("minus"===t?i=this.stepFirst>0&&this.inputVal==this.stepFirst?this.min:this.calcMinus(this.inputVal,this.step):"plus"===t&&(i=this.stepFirst>0&&this.inputVal<this.stepFirst?this.stepFirst:this.calcPlus(this.inputVal,this.step)),this.stepStrictly){let t=i%this.step;t>0&&(i-=t)}i>this.max?i=this.max:i<this.min&&(i=this.min),this.inputVal=i,this.handleChange(i,t)},onBlur(t){let e=0,i=t.detail.value;if(/(^\d+$)/.test(i)&&0!=i[0]||(e=this.min),e=+i,this.stepFirst>0&&this.inputVal<this.stepFirst&&this.inputVal>0&&(e=this.stepFirst),this.stepStrictly){let t=e%this.step;t>0&&(e-=t)}e>this.max?e=this.max:e<this.min&&(e=this.min),this.$nextTick((()=>{this.inputVal=e})),this.handleChange(e,"blur")},handleChange(t,e){this.disabled||(this.innerChangeTimer&&(clearTimeout(this.innerChangeTimer),this.innerChangeTimer=null),this.changeFromInner=!0,this.innerChangeTimer=setTimeout((()=>{this.changeFromInner=!1}),150),this.$emit("input",Number(t)),this.$emit("update:modelValue",Number(t)),this.$emit(e,{value:Number(t),index:this.index}))},isNumber:t=>/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)}},[["render",function(t,e,m,d,c,g){const b=o,f=p;return i(),s(b,{class:"vk-data-input-number-box"},{default:n((()=>[a(b,{class:l(["u-icon-minus",{"u-icon-disabled":m.disabled||c.inputVal<=m.min}]),style:r({background:m.bgColor,height:m.inputHeight+"rpx",color:m.color,fontSize:m.size+"rpx",minHeight:"1.4em"}),onClick:g.emptyClick,onTouchstart:e[0]||(e[0]=u((t=>g.btnTouchStart("minus")),["prevent"])),onTouchend:u(g.clearTimer,["stop","prevent"])},{default:n((()=>[a(b,{style:r("font-size:"+(Number(m.size)+10)+"rpx"),class:"num-btn"},{default:n((()=>[h("－")])),_:1},8,["style"])])),_:1},8,["class","style","onClick","onTouchend"]),a(f,{modelValue:c.inputVal,"onUpdate:modelValue":e[1]||(e[1]=t=>c.inputVal=t),disabled:m.disabledInput||m.disabled,"cursor-spacing":g.getCursorSpacing,class:l([{"u-input-disabled":m.disabled},"u-number-input"]),type:"number",style:r({color:m.color,fontSize:m.size+"rpx",background:m.bgColor,height:m.inputHeight+"rpx",width:m.inputWidth+"rpx"}),onBlur:g.onBlur,onClick:e[2]||(e[2]=t=>c.showInput=!0)},null,8,["modelValue","disabled","cursor-spacing","class","style","onBlur"]),a(b,{class:l(["u-icon-plus",{"u-icon-disabled":m.disabled||c.inputVal>=m.max}]),style:r({background:m.bgColor,height:m.inputHeight+"rpx",color:m.color,fontSize:m.size+"rpx",minHeight:"1.4em"}),onClick:g.emptyClick,onTouchstart:e[3]||(e[3]=u((t=>g.btnTouchStart("plus")),["prevent"])),onTouchend:u(g.clearTimer,["stop","prevent"])},{default:n((()=>[a(b,{style:r("font-size:"+(Number(m.size)+10)+"rpx"),class:"num-btn"},{default:n((()=>[h("＋")])),_:1},8,["style"])])),_:1},8,["class","style","onClick","onTouchend"])])),_:1})}],["__scopeId","data-v-f042112c"]]),g=t=>d({method:"POST",url:"/member/cart",data:t}),b=()=>d({method:"GET",url:"/member/cart"}),f=t=>d({method:"DELETE",url:"/member/cart",data:t}),y=(t,e)=>d({method:"PUT",url:`/member/cart/${t}`,data:e}),x=t=>d({method:"PUT",url:"/member/cart/selected",data:t});export{c as _,x as a,g as b,f as d,b as g,y as p};
