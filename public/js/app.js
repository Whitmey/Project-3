"use strict";function Router(e,o){e.state("foodsIndex",{url:"/foods",templateUrl:"/templates/foodsIndex.html",controller:"FoodsController as foods"}).state("leaderboard",{url:"/leaderboard",templateUrl:"/templates/leaderboard.html",controller:"UsersIndexController as usersIndex"}).state("landing",{url:"/",templateUrl:"/templates/landing.html"}).state("select",{url:"/select",templateUrl:"/templates/select.html"}).state("dietProfile",{url:"/dietProfile",templateUrl:"/templates/dietProfile.html"}).state("dietFriends",{url:"/dietFriends",templateUrl:"/templates/dietFriends.html",controller:"UsersIndexController as usersIndex"}).state("finances",{url:"/finances",templateUrl:"/templates/finances.html",controller:"FinancesController as finances"}).state("picturesBefore",{url:"/pictures/before",templateUrl:"/templates/picturesBefore.html",controller:"PicturesBeforeController as picturesBefore"}).state("picturesAfter",{url:"/pictures/after",templateUrl:"/templates/picturesAfter.html",controller:"PicturesAfterController as picturesAfter"}),o.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1308530975838362"})}function RegisterController(e,o){function t(){console.log(r.user),e.signup(r.user).then(function(){o.go("landing")})}var r=this;r.user={},r.submit=t}function LoginController(e,o){function t(){e.login(l.credentials).then(function(){o.go("select")})}function r(t){e.authenticate(t).then(function(){o.go("select")})}var l=this;l.credentials={},l.submit=t,l.authenticate=r}function dragDrop(){var e=new FileReader;return{restrict:"E",replace:!0,templateUrl:"templates/dragDrop.html",scope:{base64:"=",src:"="},link:function(o,t){o.base64=null,o.active=!1,o.$watchGroup(["base64","src"],function(){o.image=o.base64||o.src,console.log(o)}),e.onload=function(){o.base64=e.result,o.$apply()},t.on("dragenter",function(){o.active=!0,o.$apply()}).on("dragover",function(e){e.preventDefault()}).on("dragleave",function(){o.active=!1,o.$apply()}).on("drop",function(o){o.preventDefault();var t=(o.target.files||o.dataTransfer.files)[0];e.readAsDataURL(t)})}}}function FinancesController(e,o){function t(){e.save(a.financesNew,function(){var e=a.financesNew.amountSpent;budget-=e,console.log(budget),budget=document.getElementById("budgetText").innerHTML,console.log(budget),o.reload()})}function r(e){console.log(a.all);for(var t=0;t<a.all.length;t++)a.all[t]._id===e&&a.all[t].$remove(function(){o.reload()})}function l(e){for(var o=0;o<a.all.length;o++)a.all[o]._id===e&&(a.editFinance=a.all[o])}function n(){a.editFinance.$update(function(){o.reload()})}var a=this;a.edit=l,a.create=t,a.delete=r,a.editFinance={},a.update=n,a.all=e.query(),a.financesNew={}}function Finance(e){return new e("/finances/:id",{id:"@_id"},{update:{method:"PUT"}})}function financeMainController(e,o,t){function r(){e.logout().then(function(){o.go("financesIndex")})}function l(t,r){a.message=null,!e.isAuthenticated()&&s.includes(r.name)&&(t.preventDefault(),o.go("login"),a.message="You need to login to see that!")}function n(){var e=document.getElementById("myChart1");new Chart(e,{type:"doughnut",data:{labels:["Entertanment","Food","Utilities","Rent","Car"],datasets:[{data:[12,30,200,20,40],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)"],borderWidth:1}]},options:{scales:[{ticks:{beginAtZero:!0}}]}})}var a=this;a.isLoggedIn=e.isAuthenticated,a.message=null;var s=[];t.$on("stateChangeStart",l),a.logout=r,a.createChart=n,a.createChart()}function FoodsController(e,o,t,r,l,n){function a(){u.searchResults=[],n.search(u.searchTerm).then(function(e){e.data.list&&(u.searchResults=e.data.list.item)})}function s(e){u.infoResults=[],n.itemInfo(e).then(function(e){u.foodsNew.kcal=e.data.nutrients.filter(function(e){return"kcal"===e.unit})[0].value,u.foodsNew.name=e.data.name,i()})}function i(){console.log(u.foodsNew),e.save(u.foodsNew,function(){e.query(function(e){u.all=e,c.$update(),c.eaten.push(u.all[u.all.length-1]),console.log(c)})})}function d(){u.editFood.$update(function(){u.all=e.query()})}var u=this;u.searchTerm="",u.searchResults=[],u.ndbno="",u.infoResults=[],u.search=a,u.addFood=s,u.create=i,u.update=d,u.foodsNew={},u.foodsNew.date=l().format("DD/MM/YYYY");var c=o.get({id:t.getPayload()._id});e.query(function(e){u.all=e,c.$update()})}function Food(e){return new e("/foods/:id",{id:"@_id"},{update:{method:"PUT"}})}function MainController(e,o,t,r,l,n,a){function s(){var e=r.getPayload();e&&(G=t.get({id:r.getPayload()._id}))}function i(){b.caloryCounter=0,b.allMyFoods=[];for(var e=0;e<b.allFood.length;e++)G.eaten.indexOf(b.allFood[e]._id)!==-1&&b.allMyFoods.push(b.allFood[e])}function d(){i();for(var e=0;e<b.allMyFoods.length;e++)b.allMyFoods[e].date===b.today&&(b.caloryCounter+=b.allMyFoods[e].calories);console.log(b.allMyFoods)}function u(){r.logout().then(function(){l.go("landing")})}function c(e,o){b.message=null,b.burgerOpen=!1,r.isAuthenticated()||"landing"===o.name||(e.preventDefault(),l.go("landing"),b.message="You need to login to see that!")}function f(){M=[];for(var o=1;o<28;o++)M.push({date:e().subtract(o,"days").format("DD/MM/YYYY"),calories:0});g(),console.log(M)}function g(){for(var e=0;e<M.length;e++)for(var o=0;o<b.allMyFoods.length;o++)b.allMyFoods[o].date===M[e].date&&(M[e].calories+=b.allMyFoods[o].calories)}function h(e){var o=document.getElementById("myChart");P&&P.destroy&&P.destroy(),P=new F(o,{type:"line",data:e})}function p(){d(),f(),w=[" ","Today"," "],A=[b.caloryCounter,b.caloryCounter,b.caloryCounter],U(w,A)}function m(){d(),f(),w=[],A=[];for(var e=0;e<6;e++)w.push(M[e].date),A.push(M[e].calories);w.reverse(),A.reverse(),w.push("Today"),A.push(b.caloryCounter),U(w,A)}function y(){d(),f(),w=[],A=[];for(var e=0;e<M.length;e++)w.push(M[e].date),A.push(M[e].calories);w.reverse(),A.reverse(),w.push("Today"),A.push(b.caloryCounter),U(w,A)}function U(e,o){var t={labels:e,datasets:[{label:"My First dataset",fill:!0,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:o,spanGaps:!1}]};h(t)}function C(){b.thisUser.dailyGoal.push(b.dailyGoal),console.log(b.thisUser.dailyGoal),b.thisUser.$update(function(){console.log("goal added to user")})}function v(){d(),f(),t.get({id:r.getPayload()._id},function(e){if(b.thisUser=e,void 0===b.thisUser.completedGoals&&(b.thisUser.completedGoals=0),b.thisUser.dailyGoal[0]&&b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1].date!=b.today)switch(b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1].target){case"exceed":M.reverse()[M.length-1].calories>b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1].amount?(b.thisUser.completedGoals[b.thisUser.completedGoals.length-1].date!==b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1].date&&b.thisUser.completedGoals.push(b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1]),b.goalMessage="You completed your last daily goal!"):b.goalMessage="You failed to meet yesterdays daily goal!";break;case"meet":M.reverse()[M.length-1].calories===b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1].amount?(b.thisUser.completedGoals[b.thisUser.completedGoals.length-1].date!==b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1].date&&b.thisUser.completedGoals.push(b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1]),b.goalMessage="You completed your last daily goal!"):b.goalMessage="You failed to meet yesterdays daily goal!";break;case"under":M.reverse()[M.length-1].calories<b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1].amount?(b.thisUser.completedGoals[b.thisUser.completedGoals.length-1].date!==b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1].date&&b.thisUser.completedGoals.push(b.thisUser.dailyGoal[b.thisUser.dailyGoal.length-1]),b.goalMessage="You completed your last daily goal!"):b.goalMessage="You failed to meet yesterdays daily goal!"}})}function $(){console.log(G.dailyGoal),l.reload()}var b=this,F=a.Chart;b.isLoggedIn=r.isAuthenticated,b.message=null,b.todaysCals=d,b.allFood=o.query(),b.caloryCounter=0,b.allMyFoods=[],b.today=e().format("DD/MM/YYYY");var G=null;s(),n.$on("$stateChangeStart",c),b.logout=u;var M=[];b.createChart=h,b.canShowCanvas=!0;var w=[],A=[],P=null;b.dailyChart=p,b.weeklyChart=m,b.monthlyChart=y,b.dailyGoal={},b.dailyGoal.date=e().format("DD/MM/YYYY"),b.setDailyGoal=C,b.goalMessage="",b.clearGoal=$,v(),b.checkDailyGoal=v}function CountdownController(){function e(e){var o=Date.parse(e)-Date.parse(new Date),t=Math.floor(o/1e3%60),r=Math.floor(o/1e3/60%60),l=Math.floor(o/36e5%24),n=Math.floor(o/864e5);return{total:o,days:n,hours:l,minutes:r,seconds:t}}function o(o,t){function r(){var o=e(t);n.innerHTML=o.days,a.innerHTML=("0"+o.hours).slice(-2),s.innerHTML=("0"+o.minutes).slice(-2),i.innerHTML=("0"+o.seconds).slice(-2),o.total<=0&&clearInterval(d)}var l=document.getElementById(o),n=l.querySelector(".days"),a=l.querySelector(".hours"),s=l.querySelector(".minutes"),i=l.querySelector(".seconds");r();var d=setInterval(r,1e3)}var t=new Date(Date.parse(new Date)+1296e6);o("clockdiv",t)}function PicturesBeforeController(e,o,t){function r(){console.log("picture: ",l),e.update({id:l.user._id,image:"before"},l.user,function(){t.go("dietProfile")})}var l=this;e.get({id:o.getPayload()._id},function(e){console.log(e),l.user=e}),l.save=r}function PicturesAfterController(e,o,t){function r(){e.update({id:l.user._id,image:"after"},l.user,function(){t.go("dietProfile")})}var l=this;e.get({id:o.getPayload()._id},function(e){l.user=e}),l.save=r}function Usda(e){return{search:function(o){return e({method:"GET",url:"/usdas?q="+o})},itemInfo:function(o){return e({method:"GET",url:"/usdasi?ndbno="+o})}}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UsersIndexController(e,o){function t(e){a.currentUser.following.push(e),a.currentUser.$update(function(){console.log("user @'d")})}function r(e){var o=a.currentUser.following.indexOf(e._id);o!==-1&&(a.currentUser.following.splice(o,1),a.currentUser.$update(function(){console.log("I can't belive you've done this")}))}function l(e){return a.currentUser.following.filter(function(o){return o===e._id}).length}function n(e){return e._id===a.currentUser._id}var a=this;a.thisUser,e.get({id:o.getPayload()._id},function(o){a.currentUser=o,a.all=e.query()}),a.isSelf=n,a.isFollowing=l,a.follow=t,a.unfollow=r,a.filter={username:""}}angular.module("foodApp",["ngResource","ui.router","satellizer","angularMoment"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("foodApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("foodApp").directive("dragDrop",dragDrop),angular.module("foodApp").controller("FinancesController",FinancesController),FinancesController.$inject=["Finance","$state","$auth"];var budget=500;angular.module("foodApp").factory("Finance",Finance),Finance.$inject=["$resource"],angular.module("foodApp").controller("financeMainController",financeMainController),financeMainController.$inject=["$auth","$state","$rootScope"],angular.module("foodApp").controller("FoodsController",FoodsController),FoodsController.$inject=["Food","User","$auth","$state","moment","Usda"],angular.module("foodApp").factory("Food",Food),Food.$inject=["$resource"],angular.module("foodApp").controller("MainController",MainController).controller("CountdownController",CountdownController),MainController.$inject=["moment","Food","User","$auth","$state","$rootScope","$window"],CountdownController.$inject=[],angular.module("foodApp").controller("PicturesBeforeController",PicturesBeforeController).controller("PicturesAfterController",PicturesAfterController),PicturesBeforeController.$inject=["User","$auth","$state"],PicturesAfterController.$inject=["User","$auth","$state"],angular.module("foodApp").factory("Usda",Usda),Usda.$inject=["$http"],angular.module("foodApp").factory("User",User),User.$inject=["$resource"],angular.module("foodApp").controller("UsersIndexController",UsersIndexController),UsersIndexController.$inject=["User","$auth"];
//# sourceMappingURL=app.js.map
