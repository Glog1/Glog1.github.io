(function(t){function e(e){for(var n,i,a=e[0],c=e[1],u=e[2],p=0,y=[];p<a.length;p++)i=a[p],o[i]&&y.push(o[i][0]),o[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);l&&l(e);while(y.length)y.shift()();return s.push.apply(s,u||[]),r()}function r(){for(var t,e=0;e<s.length;e++){for(var r=s[e],n=!0,a=1;a<r.length;a++){var c=r[a];0!==o[c]&&(n=!1)}n&&(s.splice(e--,1),t=i(i.s=r[0]))}return t}var n={},o={app:0},s=[];function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=n,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var l=c;s.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"034f":function(t,e,r){"use strict";var n=r("64a9"),o=r.n(n);o.a},"56d7":function(t,e,r){"use strict";r.r(e);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"main-app",attrs:{id:"app"}},[r("v-layout",{attrs:{row:""}},[r("v-flex",[r("app-drawer")],1),r("v-flex",{attrs:{xs12:""}},[r("app-proxy-list")],1)],1)],1)},s=[],i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-navigation-drawer",{attrs:{permanent:""}},[r("v-select",{attrs:{items:t.isCountryList,label:"Country"},on:{change:t.isCountry},model:{value:t.countrySelect,callback:function(e){t.countrySelect=e},expression:"countrySelect"}}),r("v-checkbox",{attrs:{label:"0 - 'Transparent'"},on:{change:t.isTypeTransp}}),r("v-checkbox",{attrs:{label:"1 - 'Anonymous'"},on:{change:t.isTypeAnon}}),r("v-checkbox",{attrs:{label:"2 - 'Elite'"},on:{change:t.isTypeElite}}),r("v-divider"),r("v-checkbox",{attrs:{label:"alive"},on:{change:t.isAlive}})],1)},a=[],c={data:function(){return{countrySelect:""}},methods:{isAlive:function(){return this.$store.getters.alive?this.$store.dispatch("setAlive",!1):this.$store.dispatch("setAlive",!0)},isCountry:function(){return"all"===this.countrySelect?this.$store.dispatch("setCountry",""):this.$store.dispatch("setCountry",this.countrySelect)},isTypeTransp:function(){return this.$store.getters.typeTransp?this.$store.dispatch("setTypeTransp",!1):this.$store.dispatch("setTypeTransp",!0)},isTypeAnon:function(){return this.$store.getters.typeAnon?this.$store.dispatch("setTypeAnon",!1):this.$store.dispatch("setTypeAnon",!0)},isTypeElite:function(){return this.$store.getters.typeElite?this.$store.dispatch("setTypeElite",!1):this.$store.dispatch("setTypeElite",!0)}},computed:{isCountryList:function(){return this.$store.getters.countryList}}},u=c,l=r("2877"),p=Object(l["a"])(u,i,a,!1,null,null,null),y=p.exports,f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.proxy,"rows-per-page-items":[20]},scopedSlots:t._u([{key:"items",fn:function(e){return[r("td",[t._v(t._s(e.item.id))]),r("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.country))]),r("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.proxy_type))]),r("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.alive))]),r("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.host))]),r("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.port))]),r("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.protocol))]),r("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.modified))]),r("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.last_check_time))])]}}])})],1)},v=[],d={data:function(){return{headers:[{text:"id",align:"left",sortable:!1,value:"name"},{text:"Country",value:"country",sortable:!1},{text:"Proxy type",value:"proxy_type",sortable:!1},{text:"Alive",value:"alive",sortable:!1},{text:"Host",value:"host",sortable:!1},{text:"Port",value:"port",sortable:!1},{text:"Protocol",value:"protocol",sortable:!1},{text:"Modified",value:"modified"},{text:"Last check time",value:"last_check_time"}]}},computed:{proxy:function(){return this.$store.getters.proxy}}},h=d,m=Object(l["a"])(h,f,v,!1,null,null,null),x=m.exports,g={name:"app",components:{AppDrawer:y,AppProxyList:x}},b=g,_=(r("034f"),Object(l["a"])(b,o,s,!1,null,null,null)),T=_.exports,A=r("2f62"),C=(r("ac6a"),r("96cf"),r("3b8d")),E=r("bc3a"),w=r.n(E),$={state:{proxy:[],alive:!1,typeTransp:!1,typeAnon:!1,typeElite:!1,countryActive:"",countryList:["all"]},mutations:{loadProxy:function(t,e){t.proxy=e},setAlive:function(t,e){t.alive=e},setCountry:function(t,e){t.countryActive=e},setCountryList:function(t,e){t.countryActive=e},setTypeTransp:function(t,e){t.typeTransp=e},setTypeAnon:function(t,e){t.typeAnon=e},setTypeElite:function(t,e){t.typeElite=e}},actions:{fetchProxy:function(){var t=Object(C["a"])(regeneratorRuntime.mark(function t(e){var r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.commit,r("clearError"),r("setLoading",!0),t.next=5,w.a.get("https://cors-anywhere.herokuapp.com/".concat("https://proxyfordevelopers.com/api/proxies/?format=json")).then(function(t){var e=t.data;r("loadProxy",e)}).catch(function(t){r("setError",t.message),r("setLoading",!1)}).finally(function(){return r("setLoading",!1)});case 5:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),setAlive:function(t,e){var r=t.commit;r("setAlive",e)},setCountry:function(t,e){var r=t.commit;r("setCountry",e)},setCountryList:function(t,e){var r=t.commit;r("setCountryList",e)},setTypeTransp:function(t,e){var r=t.commit;r("setTypeTransp",e)},setTypeAnon:function(t,e){var r=t.commit;r("setTypeAnon",e)},setTypeElite:function(t,e){var r=t.commit;r("setTypeElite",e)}},getters:{proxy:function(t){return t.proxy.filter(function(e){var r=[!0];return t.countryActive&&r.push(t.countryActive.toLowerCase()===e.country.toLowerCase()),!0===t.alive&&r.push(!0===e.alive),!0===t.typeTransp&&r.push("0"==e["proxy_type"]),!0===t.typeAnon&&r.push("1"==e["proxy_type"]),!0===t.typeElite&&r.push("2"==e["proxy_type"]),r.every(function(t){return t})})},alive:function(t){return t.alive},country:function(t){return t.countryActive},countryList:function(t){return t.proxy.forEach(function(e){t.countryList.push(e.country)}),t.countryList},typeTransp:function(t){return t.typeTransp},typeAnon:function(t){return t.typeAnon},typeElite:function(t){return t.typeElite}}},L={state:{loading:!1,error:null},mutations:{setLoading:function(t,e){t.loading=e},setError:function(t,e){t.error=e},clearError:function(t){t.error=null}},actions:{setLoading:function(t,e){var r=t.commit;r("setLoading",e)},setError:function(t,e){var r=t.commit;r("setError",e)},clearError:function(t){var e=t.commit;e("clearError")}},getters:{loading:function(t){return t.loading},error:function(t){return t.error}}};n["default"].use(A["a"]);var k=new A["a"].Store({modules:{proxy:$,common:L}}),P=r("ce5b"),j=r.n(P);r("bf40");n["default"].use(j.a),n["default"].config.productionTip=!1,new n["default"]({store:k,render:function(t){return t(T)},created:function(){this.$store.dispatch("fetchProxy")}}).$mount("#app")},"64a9":function(t,e,r){}});
//# sourceMappingURL=app.83a16e28.js.map