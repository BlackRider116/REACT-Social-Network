(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{506:function(e,t,a){e.exports=a.p+"static/media/avatarDefault.6c93098b.jpg"},533:function(e,t,a){e.exports={pagination:"Pagination_pagination__1v0lr",displayNone:"Pagination_displayNone__1kSMh",buttonsColor:"Pagination_buttonsColor__2z9e5",jump:"Pagination_jump__3blJt",pageNumber:"Pagination_pageNumber__2mzw-"}},534:function(e,t,a){e.exports={avatar:"Users_avatar__3Albd",user:"Users_user__3t3QN",user_followBtn:"Users_user_followBtn__2lej1",user_startMesBtn:"Users_user_startMesBtn__bw5wI"}},539:function(e,t,a){"use strict";a.r(t);var n=a(69),s=a(70),o=a(72),r=a(71),u=a(73),l=a(0),i=a.n(l),c=a(29),p=a(193),m=a(17),h=a(183),g=a(182),b=a(533),d=a.n(b),f=function(e){for(var t=e.totalCount,a=e.usersCount,n=e.numberPage,s=e.onNumberPage,o=e.portionSize,r=void 0===o?10:o,u=Math.ceil(t/a),c=[],p=1;p<=u;p++)c.push(p);var m=Math.ceil(u/r),h=Object(l.useState)(1),b=Object(g.a)(h,2),f=b[0],_=b[1],k=(f-1)*r+1,N=f*r;return i.a.createElement(i.a.Fragment,null,0!==t?i.a.createElement("div",{className:d.a.pagination},i.a.createElement("button",{className:f>1?d.a.jump:d.a.displayNone,onClick:function(){_(f-1)}},"JUMP"),i.a.createElement("button",{className:1!==n?d.a.jump:d.a.displayNone,onClick:function(){n>N?s(N):n<=k?(s(k-1),_(f-1)):s(n-1)}},"PREV"),c.filter((function(e){return e>=k&&e<=N})).map((function(e){return i.a.createElement("button",{className:n===e?d.a.pageNumber:d.a.buttonsColor,key:e,onClick:function(){s(e)}}," ".concat(e))})),i.a.createElement("button",{className:c.length!==n?d.a.jump:d.a.displayNone,onClick:function(){n<k?s(k):n>=N?(s(N+1),_(f+1)):s(n+1)}},"NEXT"),i.a.createElement("button",{className:m>f?d.a.jump:d.a.displayNone,onClick:function(){_(f+1)}},"JUMP")):null)},_=a(75),k=a(534),N=a.n(k),E=a(506),C=a.n(E),v=a(34),P=a(504),w=a(258),j=function(e){return i.a.createElement("div",null,e.users.map((function(t){return i.a.createElement(P.a,{key:t.id,className:N.a.user},i.a.createElement("div",null,i.a.createElement(v.b,{to:"/profile/".concat(t.id)},i.a.createElement("img",{alt:"avatarDefault",src:null!==t.photos.small?t.photos.small:C.a,className:N.a.avatar})),t.followed?i.a.createElement(w.a,{variant:"outline-danger",className:N.a.user_followBtn,onClick:function(){e.deleteFollowThunk(t.id)}},"\u041e\u0442\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f"):i.a.createElement(w.a,{variant:"outline-success",className:N.a.user_followBtn,onClick:function(){e.postFollowThunk(t.id)}},"\u041f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f")),i.a.createElement("div",null,i.a.createElement("h4",{style:{marginTop:"5px"}}," ",t.name),i.a.createElement("div",{style:{fontSize:"17px"}},"sdfgsdfgsdfg",t.status),i.a.createElement(v.b,{to:e.isAuth?"/dialogs/".concat(t.id):"/login"},i.a.createElement(w.a,{className:N.a.user_startMesBtn,variant:"outline-primary",onClick:function(){return e.isAuth&&e.startDialogThunk(t.id)}}," \u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 "))))})))},y=function(e){function t(){var e,a;Object(n.a)(this,t);for(var s=arguments.length,u=new Array(s),l=0;l<s;l++)u[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(r.a)(t)).call.apply(e,[this].concat(u)))).onNumberPage=function(e){a.props.getUsersThunk(a.props.usersCount,e)},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.props.getUsersThunk(this.props.usersCount,this.props.pageNumber)}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(f,{totalCount:this.props.totalCount,usersCount:this.props.usersCount,numberPage:this.props.numberPage,onNumberPage:this.onNumberPage}),this.props.isLoading?i.a.createElement(_.a,null):i.a.createElement(j,{users:this.props.users,postFollowThunk:this.props.postFollowThunk,deleteFollowThunk:this.props.deleteFollowThunk,startDialogThunk:this.props.startDialogThunk,isAuth:this.props.isAuth}))}}]),t}(i.a.Component);t.default=Object(m.d)(Object(c.b)((function(e){return{users:e.usersPage.users,usersCount:e.usersPage.usersCount,totalCount:e.usersPage.totalCount,numberPage:e.usersPage.numberPage,isLoading:e.usersPage.isLoading,isAuth:e.auth.isAuth}}),{postFollowThunk:p.d,deleteFollowThunk:p.b,getUsersThunk:p.c,startDialogThunk:h.g}))(y)}}]);
//# sourceMappingURL=4.ebc41997.chunk.js.map