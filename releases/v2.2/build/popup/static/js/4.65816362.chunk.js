(this.webpackJsonppopup=this.webpackJsonppopup||[]).push([[4],{210:function(e,a,t){e.exports=t.p+"static/media/cookie.aa073a0f.svg"},274:function(e,a,t){"use strict";t.r(a);var n=t(226),o=t(8),r=t.n(o),l=t(16),c=t(4),i=t.n(c),s=t(19),m=t(106),u=t(109),d=t(39),p=t(256),f=t(259),E=t(260),h=t(210),k=t.n(h),b=function(e){var a=e.newCookie;return i.a.createElement(p.a,{container:!0,direction:"column",justify:"flex-start",alignItems:"center"},i.a.createElement("div",{className:"img-wrapper"},i.a.createElement("img",{src:k.a,className:"no-cookies-img",alt:"No Cookies"})),i.a.createElement("div",{className:"no-cookies-typo"},i.a.createElement(f.a,{variant:"h5",color:"textSecondary"},"No Cookies")),i.a.createElement(E.a,{size:"small",onClick:a},"ADD"))},g=t(262),v=t(98),C=t(261),y=t(279),x=Object(C.a)((function(e){return Object(y.a)({heading:{fontSize:e.typography.pxToRem(13),color:"white",marginBottom:"8px"}})})),O=Object(C.a)((function(e){return Object(y.a)({root:{transition:"null"},heading:{fontSize:e.typography.pxToRem(15),marginRight:"25px"},secondaryHeading:{marginTop:2,fontSize:e.typography.pxToRem(13),color:e.palette.text.secondary},secondaryHeadingSize:{fontSize:e.typography.pxToRem(11),color:e.palette.text.secondary,marginTop:2,marginLeft:5,position:"absolute"},icon:{verticalAlign:"bottom",height:20,width:20},details:{alignItems:"center",backgroundColor:"rgba(43, 47, 50, 0.55)"},column:{flexBasis:"40%"},helper:{borderLeft:"2px solid ".concat(e.palette.divider),padding:e.spacing(1,2)},link:{color:e.palette.primary.main,textDecoration:"none","&:hover":{textDecoration:"underline"}}})})),j=(Object(C.a)((function(e){return Object(y.a)({showMore:{cursor:"pointer",marginTop:"10px",marginBottom:"-5px",fontSize:e.typography.pxToRem(14)}})})),Object(C.a)((function(e){return Object(y.a)({cookiesSize:{fontSize:e.typography.pxToRem(16)},cookiesSecondaryColor:{color:e.palette.text.secondary,fontSize:e.typography.pxToRem(14)}})}))),S=Object(C.a)((function(e){return Object(y.a)({iconButton:{height:25,marginTop:16,marginLeft:10},itemMenu:{fontSize:e.typography.pxToRem(14),minHeight:40},menuTitle:{fontSize:e.typography.pxToRem(12),margin:"0 0 0 10px"}})})),w=Object(C.a)((function(e){return Object(y.a)({root:{flexGrow:1},cookiesSize:{fontSize:e.typography.pxToRem(16)},cookiesSecondaryColor:{color:e.palette.text.secondary,fontSize:e.typography.pxToRem(14)}})})),N=(Object(C.a)((function(e){return Object(y.a)({formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}})})),function(e,a,t,n){return i.a.createElement("span",null,e," ",i.a.createElement("span",{className:n},1===e?a:t))}),z=function(e){var a=e.cookies,t=e.clearAllCookies,n=e.newCookie,o=j({}),r=Object(d.g)(Object(v.a)(a.map((function(e){return e.size})))).split(" "),l=Object(v.a)(a.map((function(e){return e.cookies.length}))),c=a.length;return i.a.createElement(g.a,{className:"overview panel-padding"},i.a.createElement(p.a,{container:!0,direction:"row",justify:"space-between",alignItems:"center"},i.a.createElement("div",null,i.a.createElement(p.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"center",spacing:1},i.a.createElement(p.a,{item:!0},i.a.createElement(f.a,{className:o.cookiesSize},N(c,"domain","domains",o.cookiesSecondaryColor))),"~",i.a.createElement(p.a,{item:!0},i.a.createElement(f.a,{className:o.cookiesSize},N(l,"cookie","cookies",o.cookiesSecondaryColor))),"~",i.a.createElement(p.a,{item:!0},i.a.createElement(f.a,{className:o.cookiesSize},N(r[0],"",r[1],o.cookiesSecondaryColor))))),i.a.createElement("div",null,i.a.createElement(E.a,{size:"small",onClick:n},"ADD"),i.a.createElement(E.a,{size:"small",onClick:t},"Clear All"))))},T=t(46),B=t(13),D=t(18),I=t(225),R=t(223),A=["no_restriction","lax","strict","unspecified"],V=R.c().shape({domain:R.d().required().default("").notOneOf(["newtab"]),name:R.d().required(),value:R.d(),hostOnly:R.a().default(!1),path:R.d().default("/"),secure:R.a().default(!1),sameSite:R.d().oneOf(A).default(A[0]),session:R.a().default(!1),expirationDate:R.b(),expirationDateString:R.d(),storeId:R.d(),firstPartyDomain:R.d(),httpOnly:R.a().default(!1)}),W=t(280),M=t(266),H=t(277),q=t(265),P=t(283),L=t(276),F=t(284),K=function(e){var a=e.cookie,t=e.url,n=e.clearCookie,o=Object(c.useRef)(null),m=Object(c.useState)(!1),u=Object(D.a)(m,2),f=u[0],h=u[1],k=Object(c.useState)(!1),b=Object(D.a)(k,2),v=b[0],C=b[1];Object(c.useEffect)((function(){!function(){var e=o.current;e&&e.focus()}()}),[]);var y=function(){var e=Object(l.a)(r.a.mark((function e(t,o){var l,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o.setSubmitting(!1),e.next=3,Object(d.a)();case 3:l=e.sent,c=Object(d.b)(t,l.url),console.log("FINAL COOKIE",c),a&&a.name===c.name?s.browser.cookies.remove({url:l.url,name:a.name,storeId:a.storeId}).then((function(){s.browser.cookies.set(c).then((function(e){console.log("FIN",e),n()}))})):s.browser.cookies.set(c).then((function(e){console.log("FIN",e),n()}));case 7:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),x=function(e){return function(a){h((function(e){return!e})),e(a)}};return i.a.createElement("div",null,i.a.createElement(I.a,{initialValues:a||Object(B.a)({},V.default(),{domain:Object(d.f)(t),expirationDateString:Object(d.e)()}),onSubmit:y,validationSchema:V},(function(e){var t,n=e.values,r=e.touched,l=e.errors,c=e.isSubmitting,s=e.handleChange,m=e.handleBlur,u=e.handleSubmit;return i.a.createElement("form",{onSubmit:u},i.a.createElement("div",{className:"cookie-form"},i.a.createElement(W.a,{ref:o,id:"domain",disabled:v,onChange:s,onBlur:m,label:"Domain",defaultValue:n.domain,margin:"dense",variant:"outlined",fullWidth:!0,error:Boolean(l.domain&&r.domain),helperText:l.domain&&r.domain&&i.a.createElement("span",null,"Required field")}),i.a.createElement(W.a,{id:"name",onChange:s,onBlur:m,label:"Key",defaultValue:n.name,margin:"dense",variant:"outlined",fullWidth:!0,error:Boolean(l.name&&r.name),helperText:l.name&&r.name&&i.a.createElement("span",null,"Required field")}),i.a.createElement(W.a,{id:"value",onChange:s,onBlur:m,label:"Value",defaultValue:n.value,margin:"dense",variant:"outlined",fullWidth:!0,error:Boolean(l.value&&r.value),helperText:l.value&&r.value&&i.a.createElement("span",null,"Required field")}),i.a.createElement(W.a,{id:"path",onChange:s,onBlur:m,label:"Path",defaultValue:n.path,margin:"dense",variant:"outlined",fullWidth:!0,error:Boolean(l.path&&r.path),helperText:l.path&&r.path&&i.a.createElement("span",null,"Required field")}),i.a.createElement(p.a,{container:!0,direction:"row",justify:"space-between",alignItems:"flex-start"},i.a.createElement(M.a,{control:i.a.createElement(H.a,{id:"secure",checked:n.secure,onChange:s,onBlur:m,value:n.secure,color:"primary"}),label:i.a.createElement("span",{className:"checkbox-color"},"Secure")}),i.a.createElement(M.a,{control:i.a.createElement(H.a,{id:"httpOnly",checked:n.httpOnly,onChange:s,onBlur:m,value:n.httpOnly,color:"primary"}),label:i.a.createElement("span",{className:"checkbox-color"},"HttpOnly")}),i.a.createElement(M.a,{control:i.a.createElement(H.a,{id:"hostOnly",checked:n.hostOnly,onChange:(t=s,function(e){C((function(e){return!e})),t(e)}),onBlur:m,value:n.hostOnly,color:"primary"}),label:i.a.createElement("span",{className:"checkbox-color"},"HostOnly")}),i.a.createElement(M.a,{control:i.a.createElement(H.a,{id:"session",checked:n.session,onChange:x(s),onBlur:m,value:n.session,color:"primary"}),label:i.a.createElement("span",{className:"checkbox-color"},"Session")})),!f&&i.a.createElement(W.a,{fullWidth:!0,id:"expirationDateString",label:"Expiration Date",type:"datetime-local",onChange:s,onBlur:m,value:n.expirationDateString,InputLabelProps:{shrink:!0}}),i.a.createElement(q.a,{margin:"dense",className:"full-width"},i.a.createElement(P.a,{id:"sameSite-label"},"SameSite"),i.a.createElement(L.a,{labelId:"sameSite-label",id:"sameSite",value:n.sameSite,onChange:s,onBlur:m},A.map((function(e,a){return i.a.createElement(F.a,{key:a,value:e},e)}))))),i.a.createElement(g.a,{className:"panel-padding"},i.a.createElement(p.a,{container:!0,direction:"row",justify:"flex-end",alignItems:"center"},i.a.createElement(E.a,{type:"submit",size:"small",disabled:c},a?"SAVE":"ADD"))))})))},J=i.a.memo((function(e){var a=e.cookie,t=e.clearCookie,n=w({});return i.a.createElement(p.a,{container:!0,direction:"row",justify:"space-between",alignItems:"center"},i.a.createElement("div",null,i.a.createElement(p.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"center",spacing:1},a?i.a.createElement(p.a,{item:!0},i.a.createElement(f.a,{className:n.cookiesSize},'Cookie ( "',a.name,'" )'," ",i.a.createElement("span",{className:n.cookiesSecondaryColor}," ",'- Domain ( "',a.domain,'" )'))):i.a.createElement(p.a,{item:!0},i.a.createElement(f.a,{className:n.cookiesSecondaryColor},"New Cookie")))),i.a.createElement("div",null,i.a.createElement(E.a,{size:"small",onClick:t},"Cancel")))})),G=function(){var e=Object(c.useContext)(T.a),a=e.state,t=e.setState;return a.cookie||a.newCookie?i.a.createElement("div",null,i.a.createElement(g.a,{className:"panel-padding"},i.a.createElement(J,{cookie:a.cookie,clearCookie:t.clearCookie})),i.a.createElement(K,{cookie:a.cookie,url:a.currentTab.url,clearCookie:t.clearCookie})):null},_=t(278),Q=t(270),U=t(269),X=t(271),Y=t(222),Z=t.n(Y),$=t(268),ee=t(218),ae=t.n(ee),te=t(267),ne=t(224),oe=t(220),re=t.n(oe),le=function(e){var a=e.cookie,t=e.deleteCookie,n=Object(c.useContext)(T.a).setState,o=S({}),r=Object(c.useState)(null),l=Object(D.a)(r,2),s=l[0],m=l[1],d=Object(c.useCallback)((function(){m(null)}),[]),f=Object(c.useCallback)((function(e){ae()(e),d()}),[d]),E=Object(c.useCallback)((function(){n.editCookie(a),d()}),[a,d,n]),h=Boolean(a.value);return i.a.createElement("div",{className:"cookie-list-item"},i.a.createElement(p.a,{container:!0,spacing:1},i.a.createElement(p.a,{item:!0,xs:h?4:11},i.a.createElement(W.a,{label:"Key",defaultValue:a.name,helperText:a.expirationMessage&&i.a.createElement("span",null,i.a.createElement("span",{className:"opacity-50"},"Age: "),i.a.createElement("span",{className:"".concat(a.session&&"badge cookie-item-session")},a.expirationMessage)),margin:"dense",variant:"outlined",fullWidth:!0,InputProps:{readOnly:!0}})),h&&i.a.createElement(p.a,{item:!0,xs:7},i.a.createElement(p.a,{container:!0,direction:"column",justify:"flex-start",alignItems:"flex-end",spacing:0},i.a.createElement(W.a,{label:a.value?"Value":"No value",defaultValue:a.value,margin:"dense",variant:"outlined",fullWidth:!0,InputProps:{readOnly:!0},helperText:i.a.createElement("span",null,i.a.createElement("span",{className:"opacity-50"},"Size: "),i.a.createElement("span",null,a.formatedSize))}),!Object(u.a)(a.badges)&&i.a.createElement(p.a,{container:!0,direction:"row",justify:"flex-end",alignItems:"flex-start",className:"badge-wrapper"},a.badges.map((function(e){return i.a.createElement("div",{key:e.badgeName,className:"badge ".concat(e.warning&&"badge-warning")},e.badgeName)}))))),i.a.createElement(te.a,{"aria-label":"Edit Cookie","aria-controls":a.name,"aria-haspopup":"true",component:"span",size:"small",className:o.iconButton,onClick:function(e){m(e.currentTarget)}},i.a.createElement(re.a,null)),i.a.createElement(ne.a,{id:a.name,anchorEl:s,open:Boolean(s),onClose:d},i.a.createElement(F.a,{className:o.itemMenu,onClick:E},"Edit"),i.a.createElement($.a,null),i.a.createElement(F.a,{className:o.itemMenu,onClick:function(){return f(a.name)}},'Copy "name"'),a.value&&i.a.createElement(F.a,{className:o.itemMenu,onClick:function(){return f(a.value)}},'Copy "value"'),i.a.createElement($.a,null),i.a.createElement(F.a,{className:o.itemMenu,onClick:function(){t(a),m(null)}},"Delete"))))},ce=t(273),ie=function(){return i.a.createElement("div",{className:"divider"})},se=function(e){var a=e.cookie.cookies,t=e.deleteCookie,n=Object(c.useState)(""),o=Object(D.a)(n,2),r=o[0],l=o[1],s=Object(u.a)(r)?a:a.filter((function(e){return Object(ce.a)(e.name).includes(r)})),m=s.map((function(e){return i.a.createElement(le,{key:e.name,cookie:e,deleteCookie:t})}));return i.a.createElement(p.a,{container:!0,spacing:0},i.a.createElement("div",{className:"search-bar"},i.a.createElement(p.a,{item:!0},i.a.createElement(W.a,{label:"Search",margin:"dense",fullWidth:!0,onChange:function(e){return l(Object(ce.a)(e.target.value))}}),i.a.createElement("div",{className:"search-res"},0===s.length?i.a.createElement("span",null,"No Cookies"):i.a.createElement("span",null,i.a.createElement("span",null,s.length),i.a.createElement("span",{className:"opacity-50"}," ",1===s.length?"cookie":"cookies"))))),!Object(u.a)(m)&&i.a.createElement(ie,null),m)},me=function(e){var a=e.domains,t=e.deleteCookie,n=e.clearAllDomainCookies,o=O({});return i.a.createElement(i.a.Fragment,null,a.map((function(e){var a=e.cookies.length;return i.a.createElement(_.a,{key:e.domain,TransitionProps:{unmountOnExit:!0}},i.a.createElement(U.a,{expandIcon:i.a.createElement(Z.a,null)},i.a.createElement("div",{className:o.column},i.a.createElement(f.a,{className:o.heading},e.domain)),0!==a&&i.a.createElement("div",{className:o.column},i.a.createElement(f.a,{className:o.secondaryHeading},"".concat(a,1===a?" cookie":" cookies")," ",i.a.createElement("span",{className:o.secondaryHeadingSize},"( ",e.formatedSize," )")))),i.a.createElement(Q.a,{className:o.details},i.a.createElement(se,{cookie:e,deleteCookie:t})),i.a.createElement($.a,null),i.a.createElement(X.a,null,i.a.createElement(E.a,{size:"small",onClick:function(){return n(e)}},"Clear All")))})))};a.default=function(){var e,a,t=x({}),o=Object(c.useContext)(T.a),p=o.state,f=o.setState,E=Object(c.useCallback)(function(){var e=Object(l.a)(r.a.mark((function e(a){var t,n,o,l,c,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=!0,n=!1,o=void 0,e.prev=3,l=a.cookies[Symbol.iterator]();case 5:if(t=(c=l.next()).done){e.next=12;break}return i=c.value,e.next=9,s.browser.cookies.remove({url:"https://"+i.domain+i.path,name:i.name});case 9:t=!0,e.next=5;break;case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(3),n=!0,o=e.t0;case 18:e.prev=18,e.prev=19,t||null==l.return||l.return();case 21:if(e.prev=21,!n){e.next=24;break}throw o;case 24:return e.finish(21);case 25:return e.finish(18);case 26:case"end":return e.stop()}}),e,null,[[3,14,18,26],[19,,21,25]])})));return function(a){return e.apply(this,arguments)}}(),[]),h=Object(c.useCallback)(Object(l.a)(r.a.mark((function e(){var a,t,o,l,c,i,m;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.c)();case 2:e.t0=function(e){return e.cookies},e.t1=function(e,a){return[].concat(Object(n.a)(e),Object(n.a)(a))},e.t2=[],a=e.sent.map(e.t0).reduce(e.t1,e.t2),t=!0,o=!1,l=void 0,e.prev=9,c=a[Symbol.iterator]();case 11:if(t=(i=c.next()).done){e.next=18;break}return m=i.value,e.next=15,s.browser.cookies.remove({url:"https://"+m.domain+m.path,name:m.name});case 15:t=!0,e.next=11;break;case 18:e.next=24;break;case 20:e.prev=20,e.t3=e.catch(9),o=!0,l=e.t3;case 24:e.prev=24,e.prev=25,t||null==c.return||c.return();case 27:if(e.prev=27,!o){e.next=30;break}throw l;case 30:return e.finish(27);case 31:return e.finish(24);case 32:case"end":return e.stop()}}),e,null,[[9,20,24,32],[25,,27,31]])}))),[]),k=Object(c.useCallback)(function(){var e=Object(l.a)(r.a.mark((function e(a){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.browser.cookies.remove({url:"https://"+a.domain+a.path,name:a.name});case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),[]);if(p.loading)return null;var g=Object(d.d)(null===(e=p.currentTab)||void 0===e?void 0:e.url),v=Object(m.a)((function(e){return e.domain===g||e.domain===".".concat(g)||e.domain==="www.".concat(g)||e.domain===".www.".concat(g)?"current":"others"}),p.domainCookies),C=g&&p.domainCookies.length>1&&((null===v||void 0===v?void 0:v.others)||[]).length>=1;return i.a.createElement("div",null,p.cookie||p.newCookie?i.a.createElement(G,null):Object(u.a)(p.domainCookies)&&!p.loading?i.a.createElement(b,{newCookie:f.newCookie}):i.a.createElement("div",null,i.a.createElement(z,{cookies:p.domainCookies,clearAllCookies:h,newCookie:f.newCookie}),C?i.a.createElement("div",null,i.a.createElement("div",{className:t.heading},"Current"," ",2===(null===(a=g||"")||void 0===a?void 0:a.split(".").length)?"domain":"sub-domain"),i.a.createElement(me,{domains:(null===v||void 0===v?void 0:v.current)||[],deleteCookie:k,clearAllDomainCookies:E}),((null===v||void 0===v?void 0:v.others)||[]).length>=1&&i.a.createElement("div",null,i.a.createElement(ie,null),i.a.createElement("div",{className:t.heading},"Others ( ",v.others.length," )"),i.a.createElement(me,{domains:v.others,deleteCookie:k,clearAllDomainCookies:E}))):i.a.createElement(me,{domains:p.domainCookies,deleteCookie:k,clearAllDomainCookies:E})))}}}]);
//# sourceMappingURL=4.65816362.chunk.js.map