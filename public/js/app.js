"use strict";function Router(e,o){e.state("foodsIndex",{url:"/foods",templateUrl:"/templates/foodsIndex.html",controller:"FoodsController as foods"}).state("leaderboard",{url:"/leaderboard",templateUrl:"/templates/leaderboard.html",controller:"UsersIndexController as usersIndex"}).state("login",{url:"/",templateUrl:"/templates/landing.html",controller:"LoginController as login"}).state("register",{url:"/",templateUrl:"/templates/landing.html",controller:"RegisterController as register"}).state("select",{url:"/select",templateUrl:"/templates/select.html"}).state("dietProfile",{url:"/dietProfile",templateUrl:"/templates/dietProfile.html"}).state("dietFriends",{url:"/dietFriends",templateUrl:"/templates/dietFriends.html",controller:"UsersIndexController as usersIndex"}).state("finances",{url:"/finances",templateUrl:"/templates/finances.html",controller:"FinancesController as finances"}),o.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1308530975838362"})}function RegisterController(e,o){function t(){console.log(r.user),e.signup(r.user).then(function(){o.go("foodsIndex")})}var r=this;r.user={},r.submit=t}function LoginController(e,o){function t(){console.log(n.credentials),e.login(n.credentials).then(function(){o.go("select")})}function r(t){e.authenticate(t).then(function(){o.go("select")})}var n=this;n.credentials={},n.submit=t,n.authenticate=r}function Finance(e){return new e("/finances/:id",{id:"@_id"},{update:{method:"PUT"}})}function FinancesController(e,o){function t(){e.save(l.financesNew,function(){o.reload()})}function r(e){console.log(l.all);for(var t=0;t<l.all.length;t++)l.all[t]._id===e&&l.all[t].$remove(function(){o.reload()})}function n(e){for(var o=0;o<l.all.length;o++)l.all[o]._id===e&&(l.editFinance=l.all[o])}function a(){l.editFinance.$update(function(){o.reload()})}var l=this;l.edit=n,l.create=t,l.delete=r,l.editFinance={},l.update=a,l.all=e.query(),l.financesNew={}}function financeMainController(e,o,t){function r(){e.logout().then(function(){o.go("financesIndex")})}function n(t,r){l.message=null,!e.isAuthenticated()&&i.includes(r.name)&&(t.preventDefault(),o.go("login"),l.message="You need to login to see that!")}function a(){var e=document.getElementById("myChart1");new Chart(e,{type:"doughnut",data:{labels:["Entertanment","Food","Utilities","Rent","Car"],datasets:[{data:[12,30,200,20,40],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:[{ticks:{beginAtZero:!0}}]}})}var l=this;l.isLoggedIn=e.isAuthenticated,l.message=null;var i=[];t.$on("stateChangeStart",n),l.logout=r,l.createChart=a,l.createChart()}function Food(e){return new e("/foods/:id",{id:"@_id"},{update:{method:"PUT"}})}function FoodsController(e,o,t,r,n){function a(){e.save(d.foodsNew,function(){e.query(function(e){d.all=e,u.$update(),u.eaten.push(d.all[d.all.length-1]),console.log(u)}),document.getElementById("createFood").reset()})}function l(o){for(var t=0;t<d.all.length;t++){d.all[t]._id===o&&d.all[t].$remove(function(){d.all=e.query()});var r=u.eaten.indexOf(o);r!==-1&&u.eaten.splice(r,1)}u.$update(),console.log(u)}function i(e){u.$update(),console.log(u);for(var o=0;o<d.all.length;o++)d.all[o]._id===e&&(d.editFood=d.all[o])}function s(){d.editFood.$update(function(){d.all=e.query()})}var d=this;d.edit=i,d.create=a,d.delete=l,d.editFood={},d.update=s,d.foodsNew={},d.foodsNew.date=n().format("DD/MM/YYYY");var u=o.get({id:t.getPayload()._id});e.query(function(e){d.all=e,u.$update()})}function MainController(e,o,t,r,n,a){function l(){g.caloryCounter=0,g.allMyFoods=[];for(var e=0;e<g.allFood.length;e++)thisUser.eaten.indexOf(g.allFood[e]._id)!==-1&&g.allMyFoods.push(g.allFood[e])}function i(){l();for(var o=0;o<g.allMyFoods.length;o++)g.allMyFoods[o].date==g.today?g.caloryCounter+=g.allMyFoods[o].calories:g.allMyFoods[o].date==e().subtract(1,"days").format("DD/MM/YYYY")&&(g.yesterdayCounter+=g.allMyFoods[o].calories);console.log(g.allMyFoods)}function s(){r.logout().then(function(){n.go("login")})}function d(e,o){g.message=null,!r.isAuthenticated()&&h.includes(o.name)&&(e.preventDefault(),n.go("login"),g.message="You need to login to see that!")}function u(){p=[];for(var o=1;o<7;o++)p.push({date:e().subtract(o,"days").format("DD/MM/YYYY"),calories:0});c(),console.log(p)}function c(){for(var e=0;e<p.length;e++)for(var o=0;o<g.allMyFoods.length;o++)g.allMyFoods[o].date===p[e].date&&(p[e].calories+=g.allMyFoods[o].calories)}function f(){i(),u();var e=document.getElementById("myChart");new Chart(e,{type:"bar",data:{labels:[p[5].date,p[4].date,p[3].date,p[2].date,p[1].date,p[0].date,"Today"],datasets:[{label:"# of Votes",data:[p[5].calories,p[4].calories,p[3].calories,p[2].calories,p[1].calories,p[0].calories,g.caloryCounter],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)","rgba(150, 205, 100, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)","rgba(150, 205, 100, 1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})}var g=this;if(g.isLoggedIn=r.isAuthenticated,g.message=null,g.todaysCals=i,g.allFood=o.query(),g.yesterdayCounter=0,g.caloryCounter=0,g.allMyFoods=[],g.today=e().format("DD/MM/YYYY"),g.currentUser=r.getPayload(),g.currentUser){t.get({id:r.getPayload()._id})}var h=[];a.$on("stateChangeStart",d),g.logout=s;var p=[];g.createChart=f}function CountdownController(){function e(e){var o=Date.parse(e)-Date.parse(new Date),t=Math.floor(o/1e3%60),r=Math.floor(o/1e3/60%60),n=Math.floor(o/36e5%24),a=Math.floor(o/864e5);return{total:o,days:a,hours:n,minutes:r,seconds:t}}function o(o,t){function r(){var o=e(t);a.innerHTML=o.days,l.innerHTML=("0"+o.hours).slice(-2),i.innerHTML=("0"+o.minutes).slice(-2),s.innerHTML=("0"+o.seconds).slice(-2),o.total<=0&&clearInterval(d)}var n=document.getElementById(o),a=n.querySelector(".days"),l=n.querySelector(".hours"),i=n.querySelector(".minutes"),s=n.querySelector(".seconds");r();var d=setInterval(r,1e3)}var t=new Date(Date.parse(new Date)+1296e6);o("clockdiv",t)}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UsersIndexController(e,o){function t(e){f.currentUser.following.push(e),f.currentUser.$update(function(){console.log("user @'d")})}function r(e){var o=f.currentUser.following.indexOf(e._id);o!==-1&&(f.currentUser.following.splice(o,1),f.currentUser.$update(function(){console.log("I can't belive you've done this")}))}function n(e){return f.currentUser.following.filter(function(o){return o===e._id}).length}function a(e){return e._id===f.currentUser._id}function l(e){var o=document.getElementById("myChart");p&&p.destroy&&p.destroy(),p=new Chart(o,{type:"line",data:e})}function i(){g=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],h=[65,59,80,81,56,55,40],u(g,h)}function s(){g=["1","2","3","4","5","6","7"],h=[312,265,470,285,523,547,342],u(g,h)}function d(){g=["January","February","March","April","May","June","July","August","September","October","November","December"],h=[1865,1759,2180,2281,1856,1755,1940,2180,2281,1856,1755,1940],u(g,h)}function u(e,o){var t={labels:e,datasets:[{label:"My First dataset",fill:!0,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:o,spanGaps:!1}]};l(t)}function c(e){e.dietGoals=e.goal,e.dietGoalDates=e.targetDate,f.currentUser.$update(function(){console.log("Don't let your dreams be dreams")})}var f=this;e.get({id:o.getPayload()._id},function(o){f.currentUser=o,f.all=e.query()}),f.isSelf=a,f.isFollowing=n,f.follow=t,f.unfollow=r,f.filter={username:""},f.canShowCanvas=!0;var g=[],h=[],p=void 0;f.dailyChart=i,f.weeklyChart=s,f.monthlyChart=d,f.setGoals=c}angular.module("foodApp",["ngResource","ui.router","satellizer","angularMoment"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("foodApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("foodApp").factory("Finance",Finance),Finance.$inject=["$resource"],angular.module("foodApp").controller("FinancesController",FinancesController),FinancesController.$inject=["Finance","$state","$auth"],angular.module("foodApp").controller("financeMainController",financeMainController),financeMainController.$inject=["$auth","$state","$rootScope"],angular.module("foodApp").factory("Food",Food),Food.$inject=["$resource"],angular.module("foodApp").controller("FoodsController",FoodsController),FoodsController.$inject=["Food","User","$auth","$state","moment"],angular.module("foodApp").controller("MainController",MainController).controller("CountdownController",CountdownController),MainController.$inject=["moment","Food","User","$auth","$state","$rootScope"],CountdownController.$inject=[],angular.module("foodApp").factory("User",User),User.$inject=["$resource"],angular.module("foodApp").controller("UsersIndexController",UsersIndexController),UsersIndexController.$inject=["User","$auth"];
//# sourceMappingURL=app.js.map
