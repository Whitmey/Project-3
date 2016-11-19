"use strict";function Router(e,t){e.state("foodsIndex",{url:"/foods",templateUrl:"/templates/foodsIndex.html",controller:"FoodsController as foods"}).state("leaderboard",{url:"/leaderboard",templateUrl:"/templates/leaderboard.html",controller:"UsersIndexController as usersIndex"}).state("login",{url:"/",templateUrl:"/templates/landing.html",controller:"LoginController as login"}).state("register",{url:"/",templateUrl:"/templates/landing.html",controller:"RegisterController as register"}).state("select",{url:"/select",templateUrl:"/templates/select.html"}).state("dietProfile",{url:"/dietProfile",templateUrl:"/templates/dietProfile.html"}).state("dietFriends",{url:"/dietFriends",templateUrl:"/templates/dietFriends.html",controller:"UsersIndexController as usersIndex"}).state("finances",{url:"/finances",templateUrl:"/templates/finances.html",controller:"FinancesController as finances"}),t.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1308530975838362"})}function RegisterController(e,t){function o(){console.log(n.user),e.signup(n.user).then(function(){t.go("foodsIndex")})}var n=this;n.user={},n.submit=o}function LoginController(e,t){function o(){console.log(r.credentials),e.login(r.credentials).then(function(){t.go("select")})}function n(o){e.authenticate(o).then(function(){t.go("select")})}var r=this;r.credentials={},r.submit=o,r.authenticate=n}function Finance(e){return new e("/finances/:id",{id:"@_id"},{update:{method:"PUT"}})}function FinancesController(e,t){function o(){e.save(a.financesNew,function(){t.reload()})}function n(e){console.log(a.all);for(var o=0;o<a.all.length;o++)a.all[o]._id===e&&a.all[o].$remove(function(){t.reload()})}function r(e){for(var t=0;t<a.all.length;t++)a.all[t]._id===e&&(a.editFinance=a.all[t])}function l(){a.editFinance.$update(function(){t.reload()})}var a=this;a.edit=r,a.create=o,a.delete=n,a.editFinance={},a.update=l,a.all=e.query(),a.financesNew={}}function financeMainController(e,t,o){function n(){e.logout().then(function(){t.go("financesIndex")})}function r(o,n){a.message=null,!e.isAuthenticated()&&i.includes(n.name)&&(o.preventDefault(),t.go("login"),a.message="You need to login to see that!")}function l(){var e=document.getElementById("myChart1");new Chart(e,{type:"doughnut",data:{labels:["Entertanment","Food","Utilities","Rent","Car"],datasets:[{data:[12,30,200,20,40],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:[{ticks:{beginAtZero:!0}}]}})}var a=this;a.isLoggedIn=e.isAuthenticated,a.message=null;var i=[];o.$on("stateChangeStart",r),a.logout=n,a.createChart=l,a.createChart()}function Food(e){return new e("/foods/:id",{id:"@_id"},{update:{method:"PUT"}})}function FoodsController(e,t,o,n){function r(){e.save(s.foodsNew,function(){e.query(function(e){s.all=e,u.$update(),u.eaten.push(s.all[s.all.length-1]),console.log(u)}),document.getElementById("createFood").reset()})}function l(t){for(var o=0;o<s.all.length;o++){s.all[o]._id===t&&s.all[o].$remove(function(){s.all=e.query()});var n=u.eaten.indexOf(t);n!==-1&&u.eaten.splice(n,1)}u.$update(),console.log(u)}function a(e){u.$update(),console.log(u);for(var t=0;t<s.all.length;t++)s.all[t]._id===e&&(s.editFood=s.all[t])}function i(){s.editFood.$update(function(){s.all=e.query()})}var s=this;s.edit=a,s.create=r,s.delete=l,s.editFood={},s.update=i,s.foodsNew={};var u=t.get({id:o.getPayload()._id});e.query(function(e){s.all=e,u.$update()})}function MainController(e,t,o){function n(){e.logout().then(function(){t.go("foodsIndex")})}function r(o,n){l.message=null,!e.isAuthenticated()&&a.includes(n.name)&&(o.preventDefault(),t.go("login"),l.message="You need to login to see that!")}var l=this;l.isLoggedIn=e.isAuthenticated,l.message=null;var a=[];o.$on("stateChangeStart",r),l.logout=n}function CountdownController(){function e(e){var t=Date.parse(e)-Date.parse(new Date),o=Math.floor(t/1e3%60),n=Math.floor(t/1e3/60%60),r=Math.floor(t/36e5%24),l=Math.floor(t/864e5);return{total:t,days:l,hours:r,minutes:n,seconds:o}}function t(t,o){function n(){var t=e(o);l.innerHTML=t.days,a.innerHTML=("0"+t.hours).slice(-2),i.innerHTML=("0"+t.minutes).slice(-2),s.innerHTML=("0"+t.seconds).slice(-2),t.total<=0&&clearInterval(u)}var r=document.getElementById(t),l=r.querySelector(".days"),a=r.querySelector(".hours"),i=r.querySelector(".minutes"),s=r.querySelector(".seconds");n();var u=setInterval(n,1e3)}var o=new Date(Date.parse(new Date)+1296e6);t("clockdiv",o)}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UsersIndexController(e,t){function o(e){f.currentUser.following.push(e),f.currentUser.$update(function(){console.log("user @'d")})}function n(e){var t=f.currentUser.following.indexOf(e._id);t!==-1&&(f.currentUser.following.splice(t,1),f.currentUser.$update(function(){console.log("I can't belive you've done this")}))}function r(e){return f.currentUser.following.filter(function(t){return t===e._id}).length}function l(e){return e._id===f.currentUser._id}function a(e){var t=document.getElementById("myChart");p&&p.destroy&&p.destroy(),p=new Chart(t,{type:"line",data:e})}function i(){g=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],h=[65,59,80,81,56,55,40],d(g,h)}function s(){g=["1","2","3","4","5","6","7"],h=[312,265,470,285,523,547,342],d(g,h)}function u(){g=["January","February","March","April","May","June","July","August","September","October","November","December"],h=[1865,1759,2180,2281,1856,1755,1940,2180,2281,1856,1755,1940],d(g,h)}function d(e,t){var o={labels:e,datasets:[{label:"My First dataset",fill:!0,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:t,spanGaps:!1}]};a(o)}function c(e){e.dietGoals=e.goal,e.dietGoalDates=e.targetDate,f.currentUser.$update(function(){console.log("Don't let your dreams be dreams")})}var f=this;e.get({id:t.getPayload()._id},function(t){f.currentUser=t,f.all=e.query()}),f.isSelf=l,f.isFollowing=r,f.follow=o,f.unfollow=n,f.filter={username:""},f.canShowCanvas=!0;var g=[],h=[],p=void 0;f.dailyChart=i,f.weeklyChart=s,f.monthlyChart=u,f.setGoals=c}angular.module("foodApp",["ngResource","ui.router","satellizer","angularMoment"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("foodApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("foodApp").factory("Finance",Finance),Finance.$inject=["$resource"],angular.module("foodApp").controller("FinancesController",FinancesController),FinancesController.$inject=["Finance","$state","$auth"],angular.module("foodApp").controller("financeMainController",financeMainController),financeMainController.$inject=["$auth","$state","$rootScope"],angular.module("foodApp").factory("Food",Food),Food.$inject=["$resource"],angular.module("foodApp").controller("FoodsController",FoodsController),FoodsController.$inject=["Food","User","$auth","$state"],angular.module("foodApp").controller("MainController",MainController).controller("CountdownController",CountdownController),MainController.$inject=["$auth","$state","$rootScope"],CountdownController.$inject=[],angular.module("foodApp").factory("User",User),User.$inject=["$resource"],angular.module("foodApp").controller("UsersIndexController",UsersIndexController),UsersIndexController.$inject=["User","$auth"];
//# sourceMappingURL=app.js.map
