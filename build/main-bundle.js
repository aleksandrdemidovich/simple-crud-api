(()=>{"use strict";var e={729:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.deleteUser=t.updateUser=t.createUser=t.getUserById=t.getUsers=void 0;const s=r(421),n=r(828),i=r(223);t.getUsers=function(e,t){const r=(0,s.find)();t.statusCode=200,t.end(JSON.stringify(r))},t.getUserById=function(e,t){const r=e.url?.split("/")[3];if(!r||!(0,n.validate)(r))return t.statusCode=400,void t.end(JSON.stringify({error:"User ID is invalid (not uuid)"}));const i=(0,s.findOneById)(r);i?(t.statusCode=200,t.end(JSON.stringify(i))):(t.statusCode=404,t.end(JSON.stringify({error:"User not found"})))},t.createUser=function(e,t){let r,n="";e.on("data",(e=>{n+=e.toString()})),e.on("end",(()=>{try{const{username:e,age:d,hobbies:a}=JSON.parse(n);if((0,i.validateRequiredFields)(e,d,a))return t.statusCode=400,void t.end(JSON.stringify({error:"Missing required fields"}));if(r=(0,i.validateFieldsType)(e,d,a))return t.statusCode=400,void t.end(JSON.stringify({error:r}));const o=(0,s.createOne)(e,d,a);t.statusCode=201,t.end(JSON.stringify(o))}catch(e){t.statusCode=400,t.end(JSON.stringify({error:"Invalid request body"}))}}))},t.updateUser=function(e,t){let r;const d=e.url?.split("/")[3];if(!d||!(0,n.validate)(d))return t.statusCode=400,void t.end(JSON.stringify({error:"User ID is invalid (not uuid)"}));let a="";e.on("data",(e=>{a+=e.toString()})),e.on("end",(()=>{try{const{username:e,age:n,hobbies:o}=JSON.parse(a);if((0,i.validateRequiredFields)(e,n,o))return t.statusCode=400,void t.end(JSON.stringify({error:"Missing required fields"}));if(r=(0,i.validateFieldsType)(e,n,o))return t.statusCode=404,void t.end(JSON.stringify({error:r}));const u=(0,s.updateOne)(d,e,n,o);u?(t.statusCode=200,t.end(JSON.stringify(u))):(t.statusCode=404,t.end(JSON.stringify({error:"User not found"})))}catch(e){t.statusCode=400,t.end(JSON.stringify({error:"Invalid request body"}))}}))},t.deleteUser=function(e,t){const r=e.url?.split("/")[3];if(!r||!(0,n.validate)(r))return t.statusCode=400,void t.end(JSON.stringify({error:"User ID is invalid (not uuid)"}));(0,s.removeOne)(r)?(t.statusCode=204,t.end()):(t.statusCode=404,t.end(JSON.stringify({error:"User not found"})))}},421:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.removeOne=t.updateOne=t.createOne=t.findOneById=t.find=void 0;const n=r(828),i=s(r(1)),d=[];function a(e){return d.find((t=>t.id===e))}function o(e,t,r){const s={id:(0,n.v4)(),username:e,age:t,hobbies:r};return d.push(s),s}function u(e,t,r,s){const n=d.findIndex((t=>t.id===e));if(-1!==n){const i={id:e,username:t,age:r,hobbies:s};return d[n]=i,i}}function f(e){const t=d.findIndex((t=>t.id===e));return-1!==t&&(d.splice(t,1),!0)}t.find=function(){return d},t.findOneById=a,t.createOne=o,t.updateOne=u,t.removeOne=f,i.default.isPrimary&&(i.default.on("message",((e,t)=>{switch(t.type){case"find":e.send({type:"find",data:d});break;case"findOneById":const r=a(t.data);e.send({type:"findOneById",data:r});break;case"createOne":const s=o(t.data.username,t.data.age,t.data.hobbies);e.send({type:"createOne",data:s});break;case"updateOne":const n=u(t.data.id,t.data.username,t.data.age,t.data.hobbies);e.send({type:"updateOne",data:n});break;case"removeOne":const i=f(t.data);e.send({type:"removeOne",data:i})}})),i.default.on("exit",((e,t,r)=>{console.log(`Worker ${e.process.pid} died`),i.default.fork()})))},607:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(r(685)),i=s(r(142)),d=r(14);i.default.config();const a=n.default.createServer(((e,t)=>{t.setHeader("Content-Type","application/json"),(0,d.handleUsersRequest)(e,t)})),o=process.env.PORT||4e3;a.listen(o,(()=>{console.log(`Server is running on port ${o}`)})),t.default=a},14:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.handleUsersRequest=void 0;const s=r(729);t.handleUsersRequest=function(e,t){const{method:r,url:n}=e;"GET"===r&&"/api/users"===n?(0,s.getUsers)(e,t):"GET"===r&&n?.startsWith("/api/users/")?(0,s.getUserById)(e,t):"POST"===r&&"/api/users"===n?(0,s.createUser)(e,t):"PUT"===r&&n?.startsWith("/api/users/")?(0,s.updateUser)(e,t):"DELETE"===r&&n?.startsWith("/api/users/")?(0,s.deleteUser)(e,t):(t.statusCode=404,t.setHeader("Content-Type","application/json"),t.end(JSON.stringify({error:"Endpoint not found"})))}},223:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validateFieldsType=t.validateRequiredFields=void 0,t.validateRequiredFields=(e,t,r)=>{if(!e||!t||!r)return!0},t.validateFieldsType=(e,t,r)=>{const s={username:"string"!=typeof e?"Username must be a string":"",age:"number"!=typeof t?"Age must be a number":"",hobbies:Array.isArray(r)&&r.every((e=>"string"==typeof e))?"":"Hobbies must be an array of strings or empty"},n=Object.entries(s).filter((([,e])=>""!==e)).reduce(((e,[t,r])=>({...e,[t]:r})),{});return Object.keys(n).length?n:null}},142:e=>{e.exports=require("dotenv")},828:e=>{e.exports=require("uuid")},1:e=>{e.exports=require("cluster")},685:e=>{e.exports=require("http")}},t={};!function r(s){var n=t[s];if(void 0!==n)return n.exports;var i=t[s]={exports:{}};return e[s].call(i.exports,i,i.exports,r),i.exports}(607)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NUI3RFMsRUFBT0MsUUFBVUMsUUFBUSxTLFVDQXpCRixFQUFPQyxRQUFVQyxRQUFRLE8sUUNBekJGLEVBQU9DLFFBQVVDLFFBQVEsVSxVQ0F6QkYsRUFBT0MsUUFBVUMsUUFBUSxPLEdDQ3JCQyxFQUEyQixDQUFDLEdBR2hDLFNBQVNDLEVBQW9CQyxHQUU1QixJQUFJQyxFQUFlSCxFQUF5QkUsR0FDNUMsUUFBcUJFLElBQWpCRCxFQUNILE9BQU9BLEVBQWFMLFFBR3JCLElBQUlELEVBQVNHLEVBQXlCRSxHQUFZLENBR2pESixRQUFTLENBQUMsR0FPWCxPQUhBTyxFQUFvQkgsR0FBVUksS0FBS1QsRUFBT0MsUUFBU0QsRUFBUUEsRUFBT0MsUUFBU0csR0FHcEVKLEVBQU9DLE9BQ2YsQ0NuQjBCRyxDQUFvQixJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlLWNydWQtYXBpLy4vc3JjL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyLnRzIiwid2VicGFjazovL3NpbXBsZS1jcnVkLWFwaS8uL3NyYy9kYi9kYi50cyIsIndlYnBhY2s6Ly9zaW1wbGUtY3J1ZC1hcGkvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLWNydWQtYXBpLy4vc3JjL3JvdXRlcy9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLWNydWQtYXBpLy4vc3JjL3V0aWxzL3ZhbGlkYXRlRmllbGRzLnRzIiwid2VicGFjazovL3NpbXBsZS1jcnVkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL3NpbXBsZS1jcnVkLWFwaS9leHRlcm5hbCBjb21tb25qcyBcInV1aWRcIiIsIndlYnBhY2s6Ly9zaW1wbGUtY3J1ZC1hcGkvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImNsdXN0ZXJcIiIsIndlYnBhY2s6Ly9zaW1wbGUtY3J1ZC1hcGkvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9zaW1wbGUtY3J1ZC1hcGkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGxlLWNydWQtYXBpL3dlYnBhY2svc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmNvbWluZ01lc3NhZ2UsIFNlcnZlclJlc3BvbnNlIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgeyBmaW5kLCBmaW5kT25lQnlJZCwgY3JlYXRlT25lLCB1cGRhdGVPbmUsIHJlbW92ZU9uZSB9IGZyb20gJy4uL2RiL2RiJztcbmltcG9ydCB7IHZhbGlkYXRlIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQge1xuICB2YWxpZGF0ZUZpZWxkc1R5cGUsXG4gIHZhbGlkYXRlUmVxdWlyZWRGaWVsZHMsXG59IGZyb20gJy4uL3V0aWxzL3ZhbGlkYXRlRmllbGRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJzKF9yZXE6IEluY29taW5nTWVzc2FnZSwgcmVzOiBTZXJ2ZXJSZXNwb25zZSk6IHZvaWQge1xuICBjb25zdCBhbGxVc2VycyA9IGZpbmQoKTtcbiAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XG4gIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoYWxsVXNlcnMpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJCeUlkKHJlcTogSW5jb21pbmdNZXNzYWdlLCByZXM6IFNlcnZlclJlc3BvbnNlKTogdm9pZCB7XG4gIGNvbnN0IHVzZXJJZCA9IHJlcS51cmw/LnNwbGl0KCcvJylbM107XG4gIGlmICghdXNlcklkIHx8ICF2YWxpZGF0ZSh1c2VySWQpKSB7XG4gICAgcmVzLnN0YXR1c0NvZGUgPSA0MDA7XG4gICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnVXNlciBJRCBpcyBpbnZhbGlkIChub3QgdXVpZCknIH0pKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdXNlciA9IGZpbmRPbmVCeUlkKHVzZXJJZCk7XG4gIGlmICh1c2VyKSB7XG4gICAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XG4gICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1c0NvZGUgPSA0MDQ7XG4gICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnVXNlciBub3QgZm91bmQnIH0pKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXNlcihyZXE6IEluY29taW5nTWVzc2FnZSwgcmVzOiBTZXJ2ZXJSZXNwb25zZSk6IHZvaWQge1xuICBsZXQgYm9keSA9ICcnO1xuICBsZXQgZXJyb3JzO1xuICByZXEub24oJ2RhdGEnLCAoY2h1bmspID0+IHtcbiAgICBib2R5ICs9IGNodW5rLnRvU3RyaW5nKCk7XG4gIH0pO1xuICByZXEub24oJ2VuZCcsICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgYWdlLFxuICAgICAgICBob2JiaWVzLFxuICAgICAgfTogeyB1c2VybmFtZTogc3RyaW5nOyBhZ2U6IG51bWJlcjsgaG9iYmllczogc3RyaW5nW10gfCBbXSB9ID1cbiAgICAgICAgSlNPTi5wYXJzZShib2R5KTtcbiAgICAgIGlmICh2YWxpZGF0ZVJlcXVpcmVkRmllbGRzKHVzZXJuYW1lLCBhZ2UsIGhvYmJpZXMpKSB7XG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdNaXNzaW5nIHJlcXVpcmVkIGZpZWxkcycgfSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoKGVycm9ycyA9IHZhbGlkYXRlRmllbGRzVHlwZSh1c2VybmFtZSwgYWdlLCBob2JiaWVzKSkpIHtcbiAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDA7XG4gICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyb3JzIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3VXNlciA9IGNyZWF0ZU9uZSh1c2VybmFtZSwgYWdlLCBob2JiaWVzKTtcbiAgICAgIHJlcy5zdGF0dXNDb2RlID0gMjAxO1xuICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeShuZXdVc2VyKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnSW52YWxpZCByZXF1ZXN0IGJvZHknIH0pKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlVXNlcihyZXE6IEluY29taW5nTWVzc2FnZSwgcmVzOiBTZXJ2ZXJSZXNwb25zZSk6IHZvaWQge1xuICBsZXQgZXJyb3JzO1xuICBjb25zdCB1c2VySWQgPSByZXEudXJsPy5zcGxpdCgnLycpWzNdO1xuICBpZiAoIXVzZXJJZCB8fCAhdmFsaWRhdGUodXNlcklkKSkge1xuICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ1VzZXIgSUQgaXMgaW52YWxpZCAobm90IHV1aWQpJyB9KSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBib2R5ID0gJyc7XG4gIHJlcS5vbignZGF0YScsIChjaHVuaykgPT4ge1xuICAgIGJvZHkgKz0gY2h1bmsudG9TdHJpbmcoKTtcbiAgfSk7XG4gIHJlcS5vbignZW5kJywgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHVzZXJuYW1lLFxuICAgICAgICBhZ2UsXG4gICAgICAgIGhvYmJpZXMsXG4gICAgICB9OiB7IHVzZXJuYW1lOiBzdHJpbmc7IGFnZTogbnVtYmVyOyBob2JiaWVzOiBzdHJpbmdbXSB9ID1cbiAgICAgICAgSlNPTi5wYXJzZShib2R5KTtcbiAgICAgIGlmICh2YWxpZGF0ZVJlcXVpcmVkRmllbGRzKHVzZXJuYW1lLCBhZ2UsIGhvYmJpZXMpKSB7XG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdNaXNzaW5nIHJlcXVpcmVkIGZpZWxkcycgfSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoKGVycm9ycyA9IHZhbGlkYXRlRmllbGRzVHlwZSh1c2VybmFtZSwgYWdlLCBob2JiaWVzKSkpIHtcbiAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDQ7XG4gICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyb3JzIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgdXBkYXRlZFVzZXIgPSB1cGRhdGVPbmUodXNlcklkLCB1c2VybmFtZSwgYWdlLCBob2JiaWVzKTtcbiAgICAgIGlmICh1cGRhdGVkVXNlcikge1xuICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh1cGRhdGVkVXNlcikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDQ7XG4gICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ1VzZXIgbm90IGZvdW5kJyB9KSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnSW52YWxpZCByZXF1ZXN0IGJvZHknIH0pKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlVXNlcihyZXE6IEluY29taW5nTWVzc2FnZSwgcmVzOiBTZXJ2ZXJSZXNwb25zZSk6IHZvaWQge1xuICBjb25zdCB1c2VySWQgPSByZXEudXJsPy5zcGxpdCgnLycpWzNdO1xuICBpZiAoIXVzZXJJZCB8fCAhdmFsaWRhdGUodXNlcklkKSkge1xuICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ1VzZXIgSUQgaXMgaW52YWxpZCAobm90IHV1aWQpJyB9KSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGRlbGV0ZWQgPSByZW1vdmVPbmUodXNlcklkKTtcbiAgaWYgKGRlbGV0ZWQpIHtcbiAgICByZXMuc3RhdHVzQ29kZSA9IDIwNDtcbiAgICByZXMuZW5kKCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1c0NvZGUgPSA0MDQ7XG4gICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnVXNlciBub3QgZm91bmQnIH0pKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgdjQgfSBmcm9tICd1dWlkJztcbmltcG9ydCBjbHVzdGVyLCB7IFdvcmtlciB9IGZyb20gJ2NsdXN0ZXInO1xuXG5pbnRlcmZhY2UgRGJPcGVyYXRpb24ge1xuICB0eXBlOiAnZmluZCcgfCAnZmluZE9uZUJ5SWQnIHwgJ2NyZWF0ZU9uZScgfCAndXBkYXRlT25lJyB8ICdyZW1vdmVPbmUnO1xuICBkYXRhPzogYW55O1xufVxuXG5pbnRlcmZhY2UgVXNlciB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGFnZTogbnVtYmVyO1xuICBob2JiaWVzOiBzdHJpbmdbXSB8IFtdO1xufVxuXG5jb25zdCB1c2VyczogVXNlcltdID0gW107XG5cbmZ1bmN0aW9uIGZpbmQoKTogVXNlcltdIHtcbiAgcmV0dXJuIHVzZXJzO1xufVxuXG5mdW5jdGlvbiBmaW5kT25lQnlJZCh1c2VySWQ6IHN0cmluZyk6IFVzZXIgfCB1bmRlZmluZWQge1xuICByZXR1cm4gdXNlcnMuZmluZCgodXNlcikgPT4gdXNlci5pZCA9PT0gdXNlcklkKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT25lKHVzZXJuYW1lOiBzdHJpbmcsIGFnZTogbnVtYmVyLCBob2JiaWVzOiBzdHJpbmdbXSk6IFVzZXIge1xuICBjb25zdCBpZCA9IHY0KCk7XG4gIGNvbnN0IG5ld1VzZXIgPSB7IGlkLCB1c2VybmFtZSwgYWdlLCBob2JiaWVzIH07XG4gIHVzZXJzLnB1c2gobmV3VXNlcik7XG4gIHJldHVybiBuZXdVc2VyO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVPbmUoXG4gIHVzZXJJZDogc3RyaW5nLFxuICB1c2VybmFtZTogc3RyaW5nLFxuICBhZ2U6IG51bWJlcixcbiAgaG9iYmllczogc3RyaW5nW10sXG4pOiBVc2VyIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgdXNlckluZGV4ID0gdXNlcnMuZmluZEluZGV4KCh1c2VyKSA9PiB1c2VyLmlkID09PSB1c2VySWQpO1xuICBpZiAodXNlckluZGV4ICE9PSAtMSkge1xuICAgIGNvbnN0IHVwZGF0ZWRVc2VyOiBVc2VyID0geyBpZDogdXNlcklkLCB1c2VybmFtZSwgYWdlLCBob2JiaWVzIH07XG4gICAgdXNlcnNbdXNlckluZGV4XSA9IHVwZGF0ZWRVc2VyO1xuICAgIHJldHVybiB1cGRhdGVkVXNlcjtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiByZW1vdmVPbmUodXNlcklkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgdXNlckluZGV4ID0gdXNlcnMuZmluZEluZGV4KCh1c2VyKSA9PiB1c2VyLmlkID09PSB1c2VySWQpO1xuICBpZiAodXNlckluZGV4ICE9PSAtMSkge1xuICAgIHVzZXJzLnNwbGljZSh1c2VySW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuaWYgKGNsdXN0ZXIuaXNQcmltYXJ5KSB7XG4gIGNsdXN0ZXIub24oJ21lc3NhZ2UnLCAod29ya2VyOiBXb3JrZXIsIG1lc3NhZ2U6IERiT3BlcmF0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ZpbmQnOlxuICAgICAgICB3b3JrZXIuc2VuZCh7IHR5cGU6ICdmaW5kJywgZGF0YTogdXNlcnMgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmluZE9uZUJ5SWQnOlxuICAgICAgICBjb25zdCB1c2VyID0gZmluZE9uZUJ5SWQobWVzc2FnZS5kYXRhKTtcbiAgICAgICAgd29ya2VyLnNlbmQoeyB0eXBlOiAnZmluZE9uZUJ5SWQnLCBkYXRhOiB1c2VyIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NyZWF0ZU9uZSc6XG4gICAgICAgIGNvbnN0IG5ld1VzZXIgPSBjcmVhdGVPbmUoXG4gICAgICAgICAgbWVzc2FnZS5kYXRhLnVzZXJuYW1lLFxuICAgICAgICAgIG1lc3NhZ2UuZGF0YS5hZ2UsXG4gICAgICAgICAgbWVzc2FnZS5kYXRhLmhvYmJpZXMsXG4gICAgICAgICk7XG4gICAgICAgIHdvcmtlci5zZW5kKHsgdHlwZTogJ2NyZWF0ZU9uZScsIGRhdGE6IG5ld1VzZXIgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXBkYXRlT25lJzpcbiAgICAgICAgY29uc3QgdXBkYXRlZFVzZXIgPSB1cGRhdGVPbmUoXG4gICAgICAgICAgbWVzc2FnZS5kYXRhLmlkLFxuICAgICAgICAgIG1lc3NhZ2UuZGF0YS51c2VybmFtZSxcbiAgICAgICAgICBtZXNzYWdlLmRhdGEuYWdlLFxuICAgICAgICAgIG1lc3NhZ2UuZGF0YS5ob2JiaWVzLFxuICAgICAgICApO1xuICAgICAgICB3b3JrZXIuc2VuZCh7IHR5cGU6ICd1cGRhdGVPbmUnLCBkYXRhOiB1cGRhdGVkVXNlciB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZW1vdmVPbmUnOlxuICAgICAgICBjb25zdCBpc0RlbGV0ZWQgPSByZW1vdmVPbmUobWVzc2FnZS5kYXRhKTtcbiAgICAgICAgd29ya2VyLnNlbmQoeyB0eXBlOiAncmVtb3ZlT25lJywgZGF0YTogaXNEZWxldGVkIH0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xuXG4gIGNsdXN0ZXIub24oJ2V4aXQnLCAod29ya2VyOiBXb3JrZXIsIF9jb2RlOiBudW1iZXIsIF9zaWduYWw6IHN0cmluZykgPT4ge1xuICAgIGNvbnNvbGUubG9nKGBXb3JrZXIgJHt3b3JrZXIucHJvY2Vzcy5waWR9IGRpZWRgKTtcbiAgICBjbHVzdGVyLmZvcmsoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IGZpbmQsIGZpbmRPbmVCeUlkLCBjcmVhdGVPbmUsIHVwZGF0ZU9uZSwgcmVtb3ZlT25lIH07XG4iLCJpbXBvcnQgaHR0cCwgeyBJbmNvbWluZ01lc3NhZ2UsIFNlcnZlclJlc3BvbnNlIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgeyBoYW5kbGVVc2Vyc1JlcXVlc3QgfSBmcm9tICcuL3JvdXRlcy9yb3V0ZXInO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKFxuICAocmVxOiBJbmNvbWluZ01lc3NhZ2UsIHJlczogU2VydmVyUmVzcG9uc2UpID0+IHtcbiAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIGhhbmRsZVVzZXJzUmVxdWVzdChyZXEsIHJlcyk7XG4gIH0sXG4pO1xuXG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA0MDAwO1xuc2VydmVyLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBTZXJ2ZXIgaXMgcnVubmluZyBvbiBwb3J0ICR7cG9ydH1gKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzZXJ2ZXI7XG4iLCJpbXBvcnQgeyBJbmNvbWluZ01lc3NhZ2UsIFNlcnZlclJlc3BvbnNlIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQge1xuICBnZXRVc2VycyxcbiAgZ2V0VXNlckJ5SWQsXG4gIGNyZWF0ZVVzZXIsXG4gIHVwZGF0ZVVzZXIsXG4gIGRlbGV0ZVVzZXIsXG59IGZyb20gJy4uL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVVzZXJzUmVxdWVzdChcbiAgcmVxOiBJbmNvbWluZ01lc3NhZ2UsXG4gIHJlczogU2VydmVyUmVzcG9uc2UsXG4pOiB2b2lkIHtcbiAgY29uc3QgeyBtZXRob2QsIHVybCB9ID0gcmVxO1xuXG4gIGlmIChtZXRob2QgPT09ICdHRVQnICYmIHVybCA9PT0gJy9hcGkvdXNlcnMnKSB7XG4gICAgZ2V0VXNlcnMocmVxLCByZXMpO1xuICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ0dFVCcgJiYgdXJsPy5zdGFydHNXaXRoKCcvYXBpL3VzZXJzLycpKSB7XG4gICAgZ2V0VXNlckJ5SWQocmVxLCByZXMpO1xuICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnICYmIHVybCA9PT0gJy9hcGkvdXNlcnMnKSB7XG4gICAgY3JlYXRlVXNlcihyZXEsIHJlcyk7XG4gIH0gZWxzZSBpZiAobWV0aG9kID09PSAnUFVUJyAmJiB1cmw/LnN0YXJ0c1dpdGgoJy9hcGkvdXNlcnMvJykpIHtcbiAgICB1cGRhdGVVc2VyKHJlcSwgcmVzKTtcbiAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdERUxFVEUnICYmIHVybD8uc3RhcnRzV2l0aCgnL2FwaS91c2Vycy8nKSkge1xuICAgIGRlbGV0ZVVzZXIocmVxLCByZXMpO1xuICB9IGVsc2Uge1xuICAgIHJlcy5zdGF0dXNDb2RlID0gNDA0O1xuICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnRW5kcG9pbnQgbm90IGZvdW5kJyB9KSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCB2YWxpZGF0ZVJlcXVpcmVkRmllbGRzID0gKFxuICB1c2VybmFtZTogc3RyaW5nLFxuICBhZ2U6IG51bWJlcixcbiAgaG9iYmllczogc3RyaW5nW10gfCBbXSxcbikgPT4ge1xuICBpZiAoIXVzZXJuYW1lIHx8ICFhZ2UgfHwgIWhvYmJpZXMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRmllbGRzVHlwZSA9IChcbiAgdXNlcm5hbWU6IHN0cmluZyxcbiAgYWdlOiBudW1iZXIsXG4gIGhvYmJpZXM6IHN0cmluZ1tdIHwgW10sXG4pID0+IHtcbiAgY29uc3QgZXJyb3JzID0ge1xuICAgIHVzZXJuYW1lOiB0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnID8gJ1VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnIDogJycsXG4gICAgYWdlOiB0eXBlb2YgYWdlICE9PSAnbnVtYmVyJyA/ICdBZ2UgbXVzdCBiZSBhIG51bWJlcicgOiAnJyxcbiAgICBob2JiaWVzOlxuICAgICAgIUFycmF5LmlzQXJyYXkoaG9iYmllcykgfHwgIWhvYmJpZXMuZXZlcnkoKGVsKSA9PiB0eXBlb2YgZWwgPT09ICdzdHJpbmcnKVxuICAgICAgICA/ICdIb2JiaWVzIG11c3QgYmUgYW4gYXJyYXkgb2Ygc3RyaW5ncyBvciBlbXB0eSdcbiAgICAgICAgOiAnJyxcbiAgfTtcblxuICBjb25zdCBlcnJvckZpZWxkcyA9IE9iamVjdC5lbnRyaWVzKGVycm9ycylcbiAgICAuZmlsdGVyKChbLCBlcnJvcl0pID0+IGVycm9yICE9PSAnJylcbiAgICAucmVkdWNlKChvYmosIFtrZXksIGVycm9yXSkgPT4gKHsgLi4ub2JqLCBba2V5XTogZXJyb3IgfSksIHt9KTtcblxuICByZXR1cm4gT2JqZWN0LmtleXMoZXJyb3JGaWVsZHMpLmxlbmd0aCA/IGVycm9yRmllbGRzIDogbnVsbDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbHVzdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2MDcpO1xuIl0sIm5hbWVzIjpbIl9yZXEiLCJyZXMiLCJhbGxVc2VycyIsImZpbmQiLCJzdGF0dXNDb2RlIiwiZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcSIsInVzZXJJZCIsInVybCIsInNwbGl0IiwidmFsaWRhdGUiLCJlcnJvciIsInVzZXIiLCJmaW5kT25lQnlJZCIsImVycm9ycyIsImJvZHkiLCJvbiIsImNodW5rIiwidG9TdHJpbmciLCJ1c2VybmFtZSIsImFnZSIsImhvYmJpZXMiLCJwYXJzZSIsInZhbGlkYXRlUmVxdWlyZWRGaWVsZHMiLCJ2YWxpZGF0ZUZpZWxkc1R5cGUiLCJuZXdVc2VyIiwiY3JlYXRlT25lIiwidXBkYXRlZFVzZXIiLCJ1cGRhdGVPbmUiLCJyZW1vdmVPbmUiLCJ1c2VycyIsImlkIiwidjQiLCJwdXNoIiwidXNlckluZGV4IiwiZmluZEluZGV4Iiwic3BsaWNlIiwiaXNQcmltYXJ5Iiwid29ya2VyIiwibWVzc2FnZSIsInR5cGUiLCJzZW5kIiwiZGF0YSIsImlzRGVsZXRlZCIsIl9jb2RlIiwiX3NpZ25hbCIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwicGlkIiwiZm9yayIsImNvbmZpZyIsInNlcnZlciIsImNyZWF0ZVNlcnZlciIsInNldEhlYWRlciIsImhhbmRsZVVzZXJzUmVxdWVzdCIsInBvcnQiLCJlbnYiLCJQT1JUIiwibGlzdGVuIiwibWV0aG9kIiwiZ2V0VXNlcnMiLCJzdGFydHNXaXRoIiwiZ2V0VXNlckJ5SWQiLCJjcmVhdGVVc2VyIiwidXBkYXRlVXNlciIsImRlbGV0ZVVzZXIiLCJBcnJheSIsImlzQXJyYXkiLCJldmVyeSIsImVsIiwiZXJyb3JGaWVsZHMiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsdGVyIiwicmVkdWNlIiwib2JqIiwia2V5Iiwia2V5cyIsImxlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwidW5kZWZpbmVkIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsImNhbGwiXSwic291cmNlUm9vdCI6IiJ9