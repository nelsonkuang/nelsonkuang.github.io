(()=>{"use strict";var e,r,t={4600:(e,r,t)=>{var o=t(4690);const n=(e,r)=>{try{return{shape:new Function(`${r}\nreturn main;`)()(e),errorMessage:null}}catch(e){return{shape:null,errorMessage:e.message}}},a=(e,r)=>{const t=[],o=new e.TopExp_Explorer_1;for(o.Init(r,e.TopAbs_ShapeEnum.TopAbs_FACE,e.TopAbs_ShapeEnum.TopAbs_SHAPE);o.More();o.Next()){const r=o.Current(),n=e.TopoDS.Face_1(r);let a;try{a=new e.BRepMesh_IncrementalMesh_2(n,.1,!1,.5,!1)}catch(e){console.error("face visualizi<ng failed");continue}const s=new e.TopLoc_Location_1,i=e.BRep_Tool.Triangulation(n,s,0);if(i.IsNull())continue;const l=new e.Poly_Connect_2(i),c=i.get(),p=new Float32Array(3*c.NbNodes());for(let e=1;e<=c.NbNodes();e++){const r=s.Transformation(),t=c.Node(e),o=t.Transformed(r);p[3*(e-1)]=o.X(),p[3*(e-1)+1]=o.Y(),p[3*(e-1)+2]=o.Z(),t.delete(),r.delete(),o.delete()}const d=new e.TColgp_Array1OfDir_2(1,c.NbNodes());e.StdPrs_ToolTriangulatedShape.Normal(n,l,d);const u=new Float32Array(3*d.Length());for(let e=d.Lower();e<=d.Upper();e++){const r=s.Transformation(),t=d.Value(e),o=t.Transformed(r);u[3*(e-1)]=o.X(),u[3*(e-1)+1]=o.Y(),u[3*(e-1)+2]=o.Z(),r.delete(),t.delete(),o.delete()}d.delete();const g=n.Orientation_1(),f=i.get().Triangles();let h,m=3*f.Length();h=m>65535?new Uint32Array(m):new Uint16Array(m);for(let r=1;r<=i.get().NbTriangles();r++){const t=f.Value(r);let o=t.Value(1),n=t.Value(2),a=t.Value(3);if(g!==e.TopAbs_Orientation.TopAbs_FORWARD){let e=o;o=n,n=e}h[3*(r-1)]=o-1,h[3*(r-1)+1]=n-1,h[3*(r-1)+2]=a-1,t.delete()}f.delete(),t.push({vertices:p,normals:u,indices:h}),l.delete(),s.delete(),i.delete(),a.delete(),n.delete(),r.delete()}return o.delete(),t};let s,i,l=0;const c=function(e){const{data:r}=e;switch(r.action){case"init shape":{const{code:e,name:t}=r.payload,o=n(s,e);if(o.errorMessage)return void i.postMessage({id:++l,action:"init geometries error",payload:{name:t,errorMessage:o.errorMessage}});if(!o.shape)return;const c=a(s,o.shape);return void i.postMessage({id:++l,action:"init geometries",payload:{name:t,geometries:c}})}case"update shape":{const{code:e,name:t}=r.payload,o=n(s,e);if(o.errorMessage)return void i.postMessage({id:++l,action:"update geometries error",payload:{name:t,errorMessage:o.errorMessage}});if(!o.shape)return;const c=a(s,o.shape);return void i.postMessage({id:++l,action:"update geometries",payload:{name:t,geometries:c}})}}};self.onmessage=function(e){i=e.ports[0],(0,o.A)().then((e=>{s=e,i.postMessage({id:++l,action:"init done"}),i.onmessage=c}))}}},o={};function n(e){var r=o[e];if(void 0!==r)return r.exports;var a=o[e]={exports:{}};return t[e](a,a.exports,n),a.exports}n.m=t,n.x=()=>{var e=n.O(void 0,[4690],(()=>n(4600)));return n.O(e)},e=[],n.O=(r,t,o,a)=>{if(!t){var s=1/0;for(p=0;p<e.length;p++){for(var[t,o,a]=e[p],i=!0,l=0;l<t.length;l++)(!1&a||s>=a)&&Object.keys(n.O).every((e=>n.O[e](t[l])))?t.splice(l--,1):(i=!1,a<s&&(s=a));if(i){e.splice(p--,1);var c=o();void 0!==c&&(r=c)}}return r}a=a||0;for(var p=e.length;p>0&&e[p-1][2]>a;p--)e[p]=e[p-1];e[p]=[t,o,a]},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((r,t)=>(n.f[t](e,r),r)),[])),n.u=e=>e+".bundle.js",n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var r=n.g.document;if(!e&&r&&(r.currentScript&&"SCRIPT"===r.currentScript.tagName.toUpperCase()&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");if(t.length)for(var o=t.length-1;o>-1&&(!e||!/^http(s?):/.test(e));)e=t[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e={4600:1};n.f.i=(r,t)=>{e[r]||importScripts(n.p+n.u(r))};var r=self.webpackChunkopencascade_js_examples=self.webpackChunkopencascade_js_examples||[],t=r.push.bind(r);r.push=r=>{var[o,a,s]=r;for(var i in a)n.o(a,i)&&(n.m[i]=a[i]);for(s&&s(n);o.length;)e[o.pop()]=1;t(r)}})(),r=n.x,n.x=()=>n.e(4690).then(r),n.x()})();