"use strict";function Router(e,o){e.state("foodsIndex",{url:"/foods",templateUrl:"/templates/foodsIndex.html",controller:"FoodsController as foods"}).state("goalsIndex",{url:"/goals",templateUrl:"/templates/goalsIndex.html",controller:"GoalsController as goals"}).state("login",{url:"/",templateUrl:"/templates/landing.html",controller:"LoginController as login"}).state("register",{url:"/",templateUrl:"/templates/landing.html",controller:"RegisterController as register"}).state("select",{url:"/select",templateUrl:"/templates/select.html"}).state("dietProfile",{url:"/dietProfile",templateUrl:"/templates/dietProfile.html"}).state("dietFriends",{url:"/dietFriends",templateUrl:"/templates/dietFriends.html",controller:"UsersIndexController as usersIndex"}),o.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1308530975838362"})}function RegisterController(e,o){function t(){console.log(r.user),e.signup(r.user).then(function(){o.go("foodsIndex")})}var r=this;r.user={},r.submit=t}function LoginController(e,o){function t(){console.log(n.credentials),e.login(n.credentials).then(function(){o.go("select")})}function r(t){e.authenticate(t).then(function(){o.go("select")})}var n=this;n.credentials={},n.submit=t,n.authenticate=r}function FoodsController(e,o){function t(){e.save(a.foodsNew,function(){o.reload(),console.log(a)})}function r(e){console.log(a.all);for(var t=0;t<a.all.length;t++)a.all[t]._id===e&&a.all[t].$remove(function(){o.reload()})}function n(e){for(var o=0;o<a.all.length;o++)a.all[o]._id===e&&(a.editFood=a.all[o])}function l(){a.editFood.$update(function(){o.reload()})}var a=this;a.edit=n,a.create=t,a.delete=r,a.editFood={},a.update=l,a.all=e.query(),a.foodsNew={}}function Food(e){return new e("/foods/:id",{id:"@_id"},{update:{method:"PUT"}})}function MainController(e,o,t){function r(){e.logout().then(function(){o.go("foodsIndex")})}function n(t,r){l.message=null,!e.isAuthenticated()&&a.includes(r.name)&&(t.preventDefault(),o.go("login"),l.message="You need to login to see that!")}var l=this;l.isLoggedIn=e.isAuthenticated,l.message=null;var a=[];t.$on("stateChangeStart",n),l.logout=r}function CountdownController(){function e(e){var o=Date.parse(e)-Date.parse(new Date),t=Math.floor(o/1e3%60),r=Math.floor(o/1e3/60%60),n=Math.floor(o/36e5%24),l=Math.floor(o/864e5);return{total:o,days:l,hours:n,minutes:r,seconds:t}}function o(o,t){function r(){var o=e(t);l.innerHTML=o.days,a.innerHTML=("0"+o.hours).slice(-2),i.innerHTML=("0"+o.minutes).slice(-2),s.innerHTML=("0"+o.seconds).slice(-2),o.total<=0&&clearInterval(u)}var n=document.getElementById(o),l=n.querySelector(".days"),a=n.querySelector(".hours"),i=n.querySelector(".minutes"),s=n.querySelector(".seconds");r();var u=setInterval(r,1e3)}var t=new Date(Date.parse(new Date)+1296e6);o("clockdiv",t)}function UsersIndexController(e,o){function t(e){f.currentUser.following.push(e),f.currentUser.$update(function(){console.log("user @'d")})}function r(e){var o=f.currentUser.following.indexOf(e._id);o!==-1&&(f.currentUser.following.splice(o,1),f.currentUser.$update(function(){console.log("I can't belive you've done this")}))}function n(e){return f.currentUser.following.filter(function(o){return o===e._id}).length}function l(e){return e._id===f.currentUser._id}function a(e){var o=document.getElementById("myChart");p&&p.destroy&&p.destroy(),p=new Chart(o,{type:"line",data:e})}function i(){g=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],h=[65,59,80,81,56,55,40],d(g,h)}function s(){g=["1","2","3","4","5","6","7"],h=[312,265,470,285,523,547,342],d(g,h)}function u(){g=["January","February","March","April","May","June","July","August","September","October","November","December"],h=[1865,1759,2180,2281,1856,1755,1940,2180,2281,1856,1755,1940],d(g,h)}function d(e,o){var t={labels:e,datasets:[{label:"My First dataset",fill:!0,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:o,spanGaps:!1}]};a(t)}function c(e){e.dietGoals=e.goal,e.dietGoalDates=e.targetDate,f.currentUser.$update(function(){console.log("Don't let your dreams be dreams")})}var f=this;e.get({id:o.getPayload()._id},function(o){f.currentUser=o,f.all=e.query()}),f.isSelf=l,f.isFollowing=n,f.follow=t,f.unfollow=r,f.filter={username:""},f.canShowCanvas=!0;var g=[],h=[],p=void 0;f.dailyChart=i,f.weeklyChart=s,f.monthlyChart=u,f.setGoals=c}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("foodApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("foodApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("foodApp").controller("FoodsController",FoodsController),FoodsController.$inject=["Food","$state","$auth"],angular.module("foodApp").factory("Food",Food),Food.$inject=["$resource"],angular.module("foodApp").controller("MainController",MainController).controller("CountdownController",CountdownController),MainController.$inject=["$auth","$state","$rootScope"],CountdownController.$inject=[],angular.module("foodApp").controller("UsersIndexController",UsersIndexController),UsersIndexController.$inject=["User","$auth"],angular.module("foodApp").factory("User",User),User.$inject=["$resource"];
//# sourceMappingURL=app.js.map
