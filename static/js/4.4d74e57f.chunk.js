(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{290:function(e,t,a){e.exports={profileInfoItem:"Profile_profileInfoItem__2IUMz",profileInfoAvatar:"Profile_profileInfoAvatar__2ZoPx",profileInfoContact:"Profile_profileInfoContact__2sCXr",profilePostItem:"Profile_profilePostItem__3fX0W",profilePostLikes:"Profile_profilePostLikes__XhHl3",myPostsContent:"Profile_myPostsContent__2bkM_",myPostsInput:"Profile_myPostsInput__3lxoZ"}},291:function(e,t,a){"use strict";function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var a=[],n=!0,r=!1,o=void 0;try{for(var l,s=e[Symbol.iterator]();!(n=(l=s.next()).done)&&(a.push(l.value),!t||a.length!==t);n=!0);}catch(i){r=!0,o=i}finally{try{n||null==s.return||s.return()}finally{if(r)throw o}}return a}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}a.d(t,"a",(function(){return n}))},293:function(e,t,a){"use strict";a.d(t,"a",(function(){return m}));var n=a(36),r=a(37),o=a(39),l=a(38),s=a(40),i=a(0),u=a.n(i),c=a(30),p=a(15),f=function(e){return{isAuth:e.auth.isAuth}},m=function(e){var t=function(t){function a(){return Object(n.a)(this,a),Object(o.a)(this,Object(l.a)(a).apply(this,arguments))}return Object(s.a)(a,t),Object(r.a)(a,[{key:"render",value:function(){return this.props.isAuth?u.a.createElement(e,this.props):u.a.createElement(c.a,{to:"/login"})}}]),a}(u.a.Component);return Object(p.b)(f)(t)}},294:function(e,t,a){e.exports=a.p+"static/media/avatarDefault.6c93098b.jpg"},297:function(e,t,a){"use strict";a.r(t);var n=a(36),r=a(37),o=a(39),l=a(38),s=a(40),i=a(0),u=a.n(i),c=a(15),p=a(30),f=a(9),m=a(291),b=a(96),d=a(294),h=a.n(d),E=a(290),v=a.n(E),O=function(e){var t=Object(i.useState)(!1),a=Object(m.a)(t,2),n=a[0],r=a[1],o=Object(i.useState)(e.status),l=Object(m.a)(o,2),s=l[0],c=l[1],p=e.match.params.userId;Object(i.useEffect)((function(){c(e.status)}),[e.status]);return u.a.createElement("div",{className:v.a.profileInfoItem},!n&&u.a.createElement("div",null,u.a.createElement("b",null,"Status: "),u.a.createElement("span",{onClick:function(){void 0===p&&r(!0)}},e.status||"<<<Not indicated>>>")),n&&u.a.createElement("div",null,u.a.createElement("b",null,"Status: "),u.a.createElement("input",{onChange:function(e){c(e.currentTarget.value)},onBlur:function(){setTimeout((function(){r(!1)}),500)},autoFocus:!0,value:s}),u.a.createElement("button",{onClick:function(){r(!1),e.updateUserStatus(s)}},"OK")))},P=a(44),j=a.n(P),g=a(130),I=a(55),y=a(54),k=function(e){var t=e.profile,a=e.onEditMode,n=e.isOwner;return u.a.createElement("div",null,!n&&u.a.createElement("button",{onClick:a},"Edit"),u.a.createElement("div",null,u.a.createElement("b",null,"Full Name: "),t.fullName),u.a.createElement("div",null,u.a.createElement("b",null,"About me: "),t.aboutMe),u.a.createElement("div",null,u.a.createElement("b",null,"Looking for a job: "),t.lookingForAJob?"Yes":"No"),u.a.createElement("div",null,u.a.createElement("b",null,"My professional skills: "),t.lookingForAJobDescription),u.a.createElement("div",null,u.a.createElement("b",null,"Contacts: "),Object.keys(t.contacts).map((function(e){return u.a.createElement("div",{key:e,className:v.a.profileInfoContact},u.a.createElement("b",null,e,": "),t.contacts[e])}))))},S=Object(g.a)({form:"profileUserInfo"})((function(e){var t=e.profile,a=e.error,n=Object(b.a)(e,["profile","error"]);return u.a.createElement("form",{onSubmit:n.handleSubmit},!n.isOwner&&u.a.createElement("button",null,"Save"),u.a.createElement("div",null,a&&u.a.createElement("div",{className:j.a.errorText},a)),u.a.createElement("div",null,u.a.createElement("b",null,"Full Name: "),Object(I.a)(y.b,"fullName","input",null,null,t.fullName)),u.a.createElement("div",null,u.a.createElement("b",null,"About me: "),Object(I.a)(y.b,"aboutMe",null)),u.a.createElement("div",null,u.a.createElement("b",null,"Looking for a job: "),Object(I.a)(y.b,"lookingForAJob","input",null,"checkbox")),u.a.createElement("div",null,u.a.createElement("b",null,"My professional skills: "),Object(I.a)(y.b,"lookingForAJobDescription",null,null,null)),u.a.createElement("div",null,u.a.createElement("b",null,"Contacts: "),Object.keys(t.contacts).map((function(e){return u.a.createElement("div",{key:e,className:v.a.profileInfoContact},u.a.createElement("b",null,e,": "),Object(I.a)([],"contacts."+e,"input",null,null))}))))})),U=function(e){var t=e.profileUpdate,a=Object(b.a)(e,["profileUpdate"]),n=Object(i.useState)(!1),r=Object(m.a)(n,2),o=r[0],l=r[1];Object(i.useEffect)((function(){!0===t&&l(!1)}),[t]);return u.a.createElement("div",null,u.a.createElement("div",{className:v.a.profileInfoItem},u.a.createElement("img",{className:v.a.profileInfoAvatar,src:null!==a.profile.photos.large?a.profile.photos.large:h.a,alt:"AvaPhoto"}),!a.isOwner&&u.a.createElement("input",{type:"file",onChange:function(e){e.target.files.length&&a.savePhoto(e.target.files[0])}})),u.a.createElement(O,Object.assign({},a,{status:a.status,updateUserStatus:a.updateUserStatus})),o?u.a.createElement(S,Object.assign({},a,{onSubmit:function(e){e!==a.profile?a.saveProfile(e):!1!==t&&l(!1)},initialValues:a.profile})):u.a.createElement(k,{onEditMode:function(){l(!0)},profile:a.profile,isOwner:a.isOwner}))},_=a(97),A=function(e){return u.a.createElement("div",{className:v.a.profilePostItem},u.a.createElement("img",{alt:"Post",src:e.posts.src}),e.posts.postText,u.a.createElement("div",{className:v.a.profilePostLikes},e.posts.likes,u.a.createElement("button",null,"Likes")))},N=a(89),w=Object(g.a)({form:"myNewPost"})((function(e){return u.a.createElement("form",{onSubmit:e.handleSubmit},u.a.createElement("div",{className:v.a.myPostsInput},u.a.createElement(N.a,{name:"newPost",component:"textarea"}),u.a.createElement("button",null,"Add Post")))})),C=Object(p.g)((function(e){var t=e.posts.map((function(e){return u.a.createElement(A,{posts:e,key:e.id})})),a=e.match.params.userId;return u.a.createElement(u.a.Fragment,null,!a&&u.a.createElement("div",null,u.a.createElement(w,{onSubmit:function(t){e.addNewPost(t)}}),u.a.createElement("div",{className:v.a.myPostsContent},t)))})),x=Object(c.b)((function(e){return{posts:e.profilePage.posts}}),{addNewPost:_.a})(C),M=a(42),F=function(e){return e.profile?u.a.createElement("div",null,u.a.createElement(U,Object.assign({},e,{isOwner:e.isOwner,savePhoto:e.savePhoto,saveProfile:e.saveProfile,status:e.status,updateUserStatus:e.updateUserStatus,profileUpdateSuccess:e.profileUpdateSuccess})),u.a.createElement(x,null)):u.a.createElement(M.a,null)},T=a(293),J=function(e){function t(){return Object(n.a)(this,t),Object(o.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(r.a)(t,[{key:"userProfileId",value:function(){var e=this.props.match.params.userId;!e&&this.props.isAuth&&(e=this.props.authUserId),e||this.props.isAuth||this.props.history.push("/login"),this.props.getProfileThunk(e),this.props.getUserStatus(e)}},{key:"componentDidMount",value:function(){this.userProfileId()}},{key:"componentDidUpdate",value:function(e){this.props.match.params.userId!==e.match.params.userId&&this.userProfileId()}},{key:"render",value:function(){return u.a.createElement(F,Object.assign({},this.props,{isOwner:this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateUserStatus:this.props.updateUserStatus,savePhoto:this.props.savePhoto,saveProfile:this.props.saveProfile,profileUpdateSuccess:this.props.profileUpdateSuccess}))}}]),t}(u.a.Component);t.default=Object(f.d)(Object(c.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,profileUpdate:e.profilePage.profileUpdate,authUserId:e.auth.userId,isAuth:e.auth.isAuth}}),{getProfileThunk:_.c,getUserStatus:_.d,updateUserStatus:_.h,savePhoto:_.f,saveProfile:_.g,profileUpdateSuccess:_.e}),p.g,T.a)(J)}}]);
//# sourceMappingURL=4.4d74e57f.chunk.js.map