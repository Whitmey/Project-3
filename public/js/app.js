"use strict";function Router(e,t){e.state("foodsIndex",{url:"/foods",templateUrl:"/templates/foodsIndex.html",controller:"FoodsController as foods"}).state("leaderboard",{url:"/leaderboard",templateUrl:"/templates/leaderboard.html",controller:"UsersIndexController as usersIndex"}).state("landing",{url:"/",templateUrl:"/templates/landing.html"}).state("select",{url:"/select",templateUrl:"/templates/select.html"}).state("dietProfile",{url:"/dietProfile",templateUrl:"/templates/dietProfile.html"}).state("dietFriends",{url:"/dietFriends",templateUrl:"/templates/dietFriends.html",controller:"UsersIndexController as usersIndex"}).state("finances",{url:"/finances",templateUrl:"/templates/finances.html",controller:"FinancesController as finances"}).state("picturesBefore",{url:"/pictures/before",templateUrl:"/templates/picturesBefore.html",controller:"PicturesBeforeController as picturesBefore"}).state("picturesAfter",{url:"/pictures/after",templateUrl:"/templates/picturesAfter.html",controller:"PicturesAfterController as picturesAfter"}),t.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1308530975838362"})}function RegisterController(e,t){function o(){console.log(r.user),e.signup(r.user).then(function(){t.go("landing")})}var r=this;r.user={},r.submit=o}function LoginController(e,t){function o(){e.login(n.credentials).then(function(){t.go("select")})}function r(o){e.authenticate(o).then(function(){t.go("select")})}var n=this;n.credentials={},n.submit=o,n.authenticate=r}function dragDrop(){var e=new FileReader;return{restrict:"E",replace:!0,templateUrl:"templates/dragDrop.html",scope:{base64:"=",src:"="},link:function(t,o){t.base64=null,t.active=!1,t.$watchGroup(["base64","src"],function(){t.image=t.base64||t.src,console.log(t)}),e.onload=function(){t.base64=e.result,t.$apply()},o.on("dragenter",function(){t.active=!0,t.$apply()}).on("dragover",function(e){e.preventDefault()}).on("dragleave",function(){t.active=!1,t.$apply()}).on("drop",function(t){t.preventDefault();var o=(t.target.files||t.dataTransfer.files)[0];e.readAsDataURL(o)})}}}function FinancesController(e,t){function o(){e.save(l.financesNew,function(){var e=l.financesNew.amountSpent;budget-=e,console.log(budget),budget=document.getElementById("budgetText").innerHTML,console.log(budget),t.reload()})}function r(e){console.log(l.all);for(var o=0;o<l.all.length;o++)l.all[o]._id===e&&l.all[o].$remove(function(){t.reload()})}function n(e){for(var t=0;t<l.all.length;t++)l.all[t]._id===e&&(l.editFinance=l.all[t])}function a(){l.editFinance.$update(function(){t.reload()})}var l=this;l.edit=n,l.create=o,l.delete=r,l.editFinance={},l.update=a,l.all=e.query(),l.financesNew={}}function financeMainController(e,t,o,r){function n(){for(var e=0;e<s.all.length;e++)"entertainment"===s.all[e].category.toLowerCase()?i[0]+=parseInt(s.all[e].amountSpent):"food"===s.all[e].category.toLowerCase()?i[1]+=parseInt(s.all[e].amountSpent):"utilities"===s.all[e].category.toLowerCase()?i[2]+=parseInt(s.all[e].amountSpent):"rent"===s.all[e].category.toLowerCase()?i[3]+=parseInt(s.all[e].amountSpent):"other"===s.all[e].category.toLowerCase()&&(i[4]+=parseInt(s.all[e].amountSpent));console.log(i),l()}function a(o,r){s.message=null,!e.isAuthenticated()&&u.includes(r.name)&&(o.preventDefault(),t.go("login"),s.message="You need to login to see that!")}function l(){var e=document.getElementById("myChart1");new Chart(e,{type:"radar",data:{labels:["Entertainment","Food","Utilities","Rent","Other"],datasets:[{data:i,backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)"],borderWidth:1}]},options:{scales:[{ticks:{beginAtZero:!0}}]}})}var s=this;s.isLoggedIn=e.isAuthenticated,s.message=null,s.setDatapoints=n;var i=[0,0,0,0,0];r.query(function(e){s.all=e,n()});var u=[];o.$on("stateChangeStart",a)}function Finance(e){return new e("/finances/:id",{id:"@_id"},{update:{method:"PUT"}})}function FoodsController(e,t,o,r,n,a){function l(){d.searchResults=[],a.search(d.searchTerm).then(function(e){e.data.list&&(d.searchResults=e.data.list.item)})}function s(e){d.infoResults=[],a.itemInfo(e).then(function(e){d.foodsNew.kcal=e.data.nutrients.filter(function(e){return"kcal"===e.unit})[0].value,d.foodsNew.name=e.data.name,i()})}function i(){console.log(d.foodsNew),e.save(d.foodsNew,function(){e.query(function(e){d.all=e,c.$update(),c.eaten.push(d.all[d.all.length-1]),console.log(c)})})}function u(){d.editFood.$update(function(){d.all=e.query()})}var d=this;d.searchTerm="",d.searchResults=[],d.ndbno="",d.infoResults=[],d.search=l,d.addFood=s,d.create=i,d.update=u,d.foodsNew={},d.foodsNew.date=n().format("DD/MM/YYYY");var c=t.get({id:o.getPayload()._id});e.query(function(e){d.all=e,c.$update()})}function Food(e){return new e("/foods/:id",{id:"@_id"},{update:{method:"PUT"}})}function MainController(e,t,o,r,n,a,l){function s(){var e=r.getPayload();e&&o.get({id:r.getPayload()._id},function(e){v.thisUser=e,U()})}function i(){v.caloryCounter=0;for(var e=0;e<v.thisUser.eaten.length;e++)v.thisUser.eaten[e].date===v.today&&(v.caloryCounter+=v.thisUser.eaten[e].kcal)}function u(e,t){v.message=null,v.burgerOpen=!1,r.isAuthenticated()||"landing"===t.name||(e.preventDefault(),n.go("landing"),v.message="You need to login to see that!")}function d(){$=[];for(var t=1;t<28;t++)$.push({date:e().subtract(t,"days").format("DD/MM/YYYY"),calories:0});c()}function c(){for(var e=0;e<$.length;e++)for(var t=0;t<v.thisUser.eaten.length;t++)v.thisUser.eaten[t].date===$[e].date&&($[e].calories+=v.thisUser.eaten[t].kcal)}function f(e){var t=document.getElementById("myChart");F&&F.destroy&&F.destroy(),F=new b(t,{type:"line",data:e})}function g(){i(),d(),G=[" ","Today"," "],w=[v.caloryCounter,v.caloryCounter,v.caloryCounter],m(G,w)}function h(){i(),d(),G=[],w=[];for(var e=0;e<6;e++)console.log($[1]),G.push($[e].date),w.push($[e].calories);G.reverse(),w.reverse(),G.push("Today"),w.push(v.caloryCounter),m(G,w)}function p(){i(),d(),G=[],w=[];for(var e=0;e<$.length;e++)G.push($[e].date),w.push($[e].calories);G.reverse(),w.reverse(),G.push("Today"),w.push(v.caloryCounter),m(G,w)}function m(e,t){console.log(t);var o={labels:e,datasets:[{label:"My First dataset",fill:!0,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:t,spanGaps:!1}]};f(o)}function y(){v.thisUser.dailyGoal.push(v.dailyGoal),console.log(v.thisUser.dailyGoal),v.thisUser.$update(function(){console.log("goal added to user"),v.goalMessage="Goal set!"})}function U(){if(i(),d(),void 0===v.thisUser.completedGoals&&(v.thisUser.completedGoals=0),v.thisUser.dailyGoal[0]&&v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1].date!==v.today)switch(v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1].target){case"exceed":$.reverse()[$.length-1].calories>v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1].amount?(v.thisUser.completedGoals[v.thisUser.completedGoals.length-1].date!==v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1].date&&v.thisUser.completedGoals.push(v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1]),v.goalMessage="You completed your last daily goal!"):v.goalMessage="You didn't quite meet yesterday's goal, better luck today!";break;case"meet":$.reverse()[$.length-1].calories===v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1].amount?(v.thisUser.completedGoals[v.thisUser.completedGoals.length-1].date!==v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1].date&&v.thisUser.completedGoals.push(v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1]),v.goalMessage="You completed your last daily goal!"):v.goalMessage="You didn't quite meet yesterday's goal, better luck today!";break;case"under":$.reverse()[$.length-1].calories<v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1].amount?(v.thisUser.completedGoals[v.thisUser.completedGoals.length-1].date!==v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1].date&&v.thisUser.completedGoals.push(v.thisUser.dailyGoal[v.thisUser.dailyGoal.length-1]),v.goalMessage="You completed your last daily goal!"):v.goalMessage="You didn't quite meet yesterday's goal, better luck today!"}}function C(){console.log(v.thisUser.dailyGoal),n.reload()}var v=this,b=l.Chart;v.isLoggedIn=r.isAuthenticated,v.message=null,v.todaysCals=i,v.allFood=t.query(),v.caloryCounter=0,v.allMyFoods=[],v.today=e().format("DD/MM/YYYY"),v.thisUser=null,s();var $=[];a.$on("$stateChangeStart",u),v.createChart=f,v.canShowCanvas=!0;var G=[],w=[],F=null;v.dailyChart=g,v.weeklyChart=h,v.monthlyChart=p,v.dailyGoal={},v.dailyGoal.date=e().format("DD/MM/YYYY"),v.setDailyGoal=y,v.goalMessage="",v.clearGoal=C,v.checkDailyGoal=U}function CountdownController(){function e(e){var t=Date.parse(e)-Date.parse(new Date),o=Math.floor(t/1e3%60),r=Math.floor(t/1e3/60%60),n=Math.floor(t/36e5%24),a=Math.floor(t/864e5);return{total:t,days:a,hours:n,minutes:r,seconds:o}}function t(t,o){function r(){var t=e(o);a.innerHTML=t.days,l.innerHTML=("0"+t.hours).slice(-2),s.innerHTML=("0"+t.minutes).slice(-2),i.innerHTML=("0"+t.seconds).slice(-2),t.total<=0&&clearInterval(u)}var n=document.getElementById(t),a=n.querySelector(".days"),l=n.querySelector(".hours"),s=n.querySelector(".minutes"),i=n.querySelector(".seconds");r();var u=setInterval(r,1e3)}var o=new Date(Date.parse(new Date)+1296e6);t("clockdiv",o)}function PicturesBeforeController(e,t,o){function r(){console.log("picture: ",n),e.update({id:n.user._id,image:"before"},n.user,function(){o.go("dietProfile")})}var n=this;e.get({id:t.getPayload()._id},function(e){console.log(e),n.user=e}),n.save=r}function PicturesAfterController(e,t,o){function r(){e.update({id:n.user._id,image:"after"},n.user,function(){o.go("dietProfile")})}var n=this;e.get({id:t.getPayload()._id},function(e){n.user=e}),n.save=r}function Usda(e){return{search:function(t){return e({method:"GET",url:"/usdas?q="+t})},itemInfo:function(t){return e({method:"GET",url:"/usdasi?ndbno="+t})}}}function UsersIndexController(e,t){function o(e){l.currentUser.following.push(e),l.currentUser.$update(function(){console.log("user @'d")})}function r(e){var t=l.currentUser.following.indexOf(e._id);t!==-1&&(l.currentUser.following.splice(t,1),l.currentUser.$update(function(){console.log("I can't belive you've done this")}))}function n(e){return l.currentUser.following.filter(function(t){return t===e._id}).length}function a(e){return e._id===l.currentUser._id}var l=this;l.thisUser,e.get({id:t.getPayload()._id},function(t){l.currentUser=t,l.all=e.query()}),l.isSelf=a,l.isFollowing=n,l.follow=o,l.unfollow=r,l.filter={username:""}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("foodApp",["ngResource","ui.router","satellizer","angularMoment"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("foodApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("foodApp").directive("dragDrop",dragDrop),angular.module("foodApp").controller("FinancesController",FinancesController).controller("financeMainController",financeMainController),FinancesController.$inject=["Finance","$state","$auth"];var budget=500;financeMainController.$inject=["$auth","$state","$rootScope","Finance"],angular.module("foodApp").factory("Finance",Finance),Finance.$inject=["$resource"],angular.module("foodApp").controller("FoodsController",FoodsController),FoodsController.$inject=["Food","User","$auth","$state","moment","Usda"],angular.module("foodApp").factory("Food",Food),Food.$inject=["$resource"],angular.module("foodApp").controller("MainController",MainController).controller("CountdownController",CountdownController),MainController.$inject=["moment","Food","User","$auth","$state","$rootScope","$window"],CountdownController.$inject=[],angular.module("foodApp").controller("PicturesBeforeController",PicturesBeforeController).controller("PicturesAfterController",PicturesAfterController),PicturesBeforeController.$inject=["User","$auth","$state"],PicturesAfterController.$inject=["User","$auth","$state"],angular.module("foodApp").factory("Usda",Usda),Usda.$inject=["$http"],angular.module("foodApp").controller("UsersIndexController",UsersIndexController),UsersIndexController.$inject=["User","$auth"],angular.module("foodApp").factory("User",User),User.$inject=["$resource"];
//# sourceMappingURL=app.js.map
