"use strict";function Router(e,o){e.state("foodsIndex",{url:"/foods",templateUrl:"/templates/foodsIndex.html",controller:"FoodsController as foods"}).state("leaderboard",{url:"/leaderboard",templateUrl:"/templates/leaderboard.html",controller:"UsersIndexController as usersIndex"}).state("login",{url:"/",templateUrl:"/templates/landing.html",controller:"LoginController as login"}).state("register",{url:"/",templateUrl:"/templates/landing.html",controller:"RegisterController as register"}).state("select",{url:"/select",templateUrl:"/templates/select.html"}).state("dietProfile",{url:"/dietProfile",templateUrl:"/templates/dietProfile.html"}).state("dietFriends",{url:"/dietFriends",templateUrl:"/templates/dietFriends.html",controller:"UsersIndexController as usersIndex"}).state("finances",{url:"/finances",templateUrl:"/templates/finances.html",controller:"FinancesController as finances"}),o.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1308530975838362"})}function RegisterController(e,o){function t(){console.log(n.user),e.signup(n.user).then(function(){o.go("foodsIndex")})}var n=this;n.user={},n.submit=t}function LoginController(e,o){function t(){console.log(r.credentials),e.login(r.credentials).then(function(){o.go("select")})}function n(t){e.authenticate(t).then(function(){o.go("select")})}var r=this;r.credentials={},r.submit=t,r.authenticate=n}function FinancesController(e,o){function t(){e.save(a.financesNew,function(){o.reload()})}function n(e){console.log(a.all);for(var t=0;t<a.all.length;t++)a.all[t]._id===e&&a.all[t].$remove(function(){o.reload()})}function r(e){for(var o=0;o<a.all.length;o++)a.all[o]._id===e&&(a.editFinance=a.all[o])}function l(){a.editFinance.$update(function(){o.reload()})}var a=this;a.edit=r,a.create=t,a.delete=n,a.editFinance={},a.update=l,a.all=e.query(),a.financesNew={}}function Finance(e){return new e("/finances/:id",{id:"@_id"},{update:{method:"PUT"}})}function financeMainController(e,o,t){function n(){e.logout().then(function(){o.go("financesIndex")})}function r(t,n){a.message=null,!e.isAuthenticated()&&i.includes(n.name)&&(t.preventDefault(),o.go("login"),a.message="You need to login to see that!")}function l(){var e=document.getElementById("myChart1");new Chart(e,{type:"doughnut",data:{labels:["Entertanment","Food","Utilities","Rent","Car"],datasets:[{data:[12,30,200,20,40],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:[{ticks:{beginAtZero:!0}}]}})}var a=this;a.isLoggedIn=e.isAuthenticated,a.message=null;var i=[];t.$on("stateChangeStart",r),a.logout=n,a.createChart=l,a.createChart()}function FoodsController(e,o,t,n,r){function l(){e.save(d.foodsNew,function(){e.query(function(e){d.all=e,u.$update(),u.eaten.push(d.all[d.all.length-1]),console.log(u)}),document.getElementById("createFood").reset()})}function a(o){for(var t=0;t<d.all.length;t++){d.all[t]._id===o&&d.all[t].$remove(function(){d.all=e.query()});var n=u.eaten.indexOf(o);n!==-1&&u.eaten.splice(n,1)}u.$update(),console.log(u)}function i(e){u.$update(),console.log(u);for(var o=0;o<d.all.length;o++)d.all[o]._id===e&&(d.editFood=d.all[o])}function s(){d.editFood.$update(function(){d.all=e.query()})}var d=this;d.edit=i,d.create=l,d.delete=a,d.editFood={},d.update=s,d.foodsNew={},d.foodsNew.date=r().format("DD/MM/YYYY");var u=o.get({id:t.getPayload()._id});e.query(function(e){d.all=e,u.$update()})}function Food(e){return new e("/foods/:id",{id:"@_id"},{update:{method:"PUT"}})}function MainController(e,o,t,n,r,l){function a(){C.caloryCounter=0,C.allMyFoods=[];for(var e=0;e<C.allFood.length;e++)y.eaten.indexOf(C.allFood[e]._id)!==-1&&C.allMyFoods.push(C.allFood[e])}function i(){a();for(var o=0;o<C.allMyFoods.length;o++)C.allMyFoods[o].date==C.today?C.caloryCounter+=C.allMyFoods[o].calories:C.allMyFoods[o].date==e().subtract(1,"days").format("DD/MM/YYYY")&&(C.yesterdayCounter+=C.allMyFoods[o].calories);console.log(C.allMyFoods)}function s(){n.logout().then(function(){r.go("foodsIndex")})}function d(e,o){C.message=null,!n.isAuthenticated()&&F.includes(o.name)&&(e.preventDefault(),r.go("login"),C.message="You need to login to see that!")}function u(){v=[];for(var o=1;o<7;o++)v.push({date:e().subtract(o,"days").format("DD/MM/YYYY"),calories:0});c(),console.log(v)}function c(){for(var e=0;e<v.length;e++)for(var o=0;o<C.allMyFoods.length;o++)C.allMyFoods[o].date===v[e].date&&(v[e].calories+=C.allMyFoods[o].calories)}function f(e){var o=document.getElementById("myChart");M&&M.destroy&&M.destroy(),M=new Chart(o,{type:"line",data:e})}function g(){i(),u(),$=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],b=[65,59,80,81,56,55,40],m($,b)}function h(){i(),u(),$=[v[5].date,v[4].date,v[3].date,v[2].date,v[1].date,v[0].date,"Today"],b=[v[5].calories,v[4].calories,v[3].calories,v[2].calories,v[1].calories,v[0].calories,C.caloryCounter],m($,b)}function p(){i(),u(),$=[],b=[],m($,b)}function m(e,o){var t={labels:e,datasets:[{label:"My First dataset",fill:!0,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:o,spanGaps:!1}]};f(t)}var C=this;C.isLoggedIn=n.isAuthenticated,C.message=null,C.todaysCals=i,C.allFood=o.query(),C.yesterdayCounter=0,C.caloryCounter=0,C.allMyFoods=[],C.today=e().format("DD/MM/YYYY");var y=t.get({id:n.getPayload()._id}),F=[];l.$on("stateChangeStart",d),C.logout=s;var v=[];C.createChart=f,C.canShowCanvas=!0;var $=[],b=[],M=null;C.dailyChart=g,C.weeklyChart=h,C.monthlyChart=p}function CountdownController(){function e(e){var o=Date.parse(e)-Date.parse(new Date),t=Math.floor(o/1e3%60),n=Math.floor(o/1e3/60%60),r=Math.floor(o/36e5%24),l=Math.floor(o/864e5);return{total:o,days:l,hours:r,minutes:n,seconds:t}}function o(o,t){function n(){var o=e(t);l.innerHTML=o.days,a.innerHTML=("0"+o.hours).slice(-2),i.innerHTML=("0"+o.minutes).slice(-2),s.innerHTML=("0"+o.seconds).slice(-2),o.total<=0&&clearInterval(d)}var r=document.getElementById(o),l=r.querySelector(".days"),a=r.querySelector(".hours"),i=r.querySelector(".minutes"),s=r.querySelector(".seconds");n();var d=setInterval(n,1e3)}var t=new Date(Date.parse(new Date)+1296e6);o("clockdiv",t)}function UsersIndexController(e,o){function t(e){i.currentUser.following.push(e),i.currentUser.$update(function(){console.log("user @'d")})}function n(e){var o=i.currentUser.following.indexOf(e._id);o!==-1&&(i.currentUser.following.splice(o,1),i.currentUser.$update(function(){console.log("I can't belive you've done this")}))}function r(e){return i.currentUser.following.filter(function(o){return o===e._id}).length}function l(e){return e._id===i.currentUser._id}function a(e){e.dietGoals=e.goal,e.dietGoalDates=e.targetDate,i.currentUser.$update(function(){console.log("Don't let your dreams be dreams")})}var i=this;e.get({id:o.getPayload()._id},function(o){i.currentUser=o,i.all=e.query()}),i.isSelf=l,i.isFollowing=r,i.follow=t,i.unfollow=n,i.filter={username:""},i.setGoals=a}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("foodApp",["ngResource","ui.router","satellizer","angularMoment"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("foodApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("foodApp").controller("FinancesController",FinancesController),FinancesController.$inject=["Finance","$state","$auth"],angular.module("foodApp").factory("Finance",Finance),Finance.$inject=["$resource"],angular.module("foodApp").controller("financeMainController",financeMainController),financeMainController.$inject=["$auth","$state","$rootScope"],angular.module("foodApp").controller("FoodsController",FoodsController),FoodsController.$inject=["Food","User","$auth","$state","moment"],angular.module("foodApp").factory("Food",Food),Food.$inject=["$resource"],angular.module("foodApp").controller("MainController",MainController).controller("CountdownController",CountdownController),MainController.$inject=["moment","Food","User","$auth","$state","$rootScope"],CountdownController.$inject=[],angular.module("foodApp").controller("UsersIndexController",UsersIndexController),UsersIndexController.$inject=["User","$auth"],angular.module("foodApp").factory("User",User),User.$inject=["$resource"];
//# sourceMappingURL=app.js.map
