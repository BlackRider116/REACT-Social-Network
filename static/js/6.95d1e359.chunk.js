(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[6],{598:function(e,a,t){e.exports=t.p+"static/media/avatarDefault.6c93098b.jpg"},619:function(e,a,t){e.exports={avatar:"Users_avatar__3Albd",user:"Users_user__3t3QN",user_followBtn:"Users_user_followBtn__2lej1",user_startMesBtn:"Users_user_startMesBtn__bw5wI"}},623:function(e,a,t){"use strict";t.r(a);var s=t(79),n=t(80),r=t(81),o=t(82),u=t(83),l=t(0),i=t.n(l),c=t(24),m=t(219),p=t(19),g=t(120),h=t(194),b=t(85),f=t(619),d=t.n(f),k=t(598),w=t.n(k),N=t(33),v=t(595),P=t(298),_=function(e){return i.a.createElement("div",null,e.users.map((function(a){return i.a.createElement(v.a,{key:a.id,className:d.a.user},i.a.createElement("div",null,i.a.createElement(N.b,{to:"/profile/".concat(a.id)},i.a.createElement("img",{alt:"avatarDefault",src:null!==a.photos.small?a.photos.small:w.a,className:d.a.avatar})),a.followed?i.a.createElement(P.a,{variant:"outline-danger",className:d.a.user_followBtn,onClick:function(){e.followUnFollowThunk(a.id,a.followed)}},"\u041e\u0442\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f"):i.a.createElement(P.a,{variant:"outline-success",className:d.a.user_followBtn,onClick:function(){e.followUnFollowThunk(a.id,a.followed)}},"\u041f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f")),i.a.createElement("div",null,i.a.createElement("h4",{style:{marginTop:"5px"}}," ",a.name),i.a.createElement("div",{style:{fontSize:"17px"}},"sdfgsdfgsdfg",a.status),i.a.createElement(N.b,{to:e.isAuth?"/dialogs/".concat(a.id):"/login"},i.a.createElement(P.a,{className:d.a.user_startMesBtn,variant:"outline-primary",onClick:function(){return e.isAuth&&e.startDialogThunk(a.id)}}," \u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 "))))})))},E=function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,u=new Array(n),l=0;l<n;l++)u[l]=arguments[l];return(t=Object(r.a)(this,(e=Object(o.a)(a)).call.apply(e,[this].concat(u)))).onNumberPage=function(e,a){t.props.getUsersThunk(e,a)},t.onPagesNumbers=function(e){t.props.pagesNumbersThunk(e)},t}return Object(u.a)(a,e),Object(n.a)(a,[{key:"componentDidMount",value:function(){this.props.getUsersThunk(1,1)}},{key:"render",value:function(){var e=this.props,a={numberPage:e.numberPage,pagesNumbers:e.pagesNumbers,portionPagesNumbers:e.portionPagesNumbers,onNumberPage:this.onNumberPage,onPagesNumbers:this.onPagesNumbers};return i.a.createElement("div",null,i.a.createElement(h.a,a),this.props.isLoading?i.a.createElement(b.a,null):i.a.createElement(_,{users:this.props.users,followUnFollowThunk:this.props.followUnFollowThunk,startDialogThunk:this.props.startDialogThunk,isAuth:this.props.isAuth}),i.a.createElement(h.a,a))}}]),a}(i.a.Component);a.default=Object(p.d)(Object(c.b)((function(e){return{users:e.usersPage.users,numberPage:e.usersPage.numberPage,isLoading:e.usersPage.isLoading,pagesNumbers:e.usersPage.pagesNumbers,portionPagesNumbers:e.usersPage.portionPagesNumbers,isAuth:e.auth.isAuth}}),{followUnFollowThunk:m.b,getUsersThunk:m.c,startDialogThunk:g.h,pagesNumbersThunk:m.d}))(E)}}]);
//# sourceMappingURL=6.95d1e359.chunk.js.map