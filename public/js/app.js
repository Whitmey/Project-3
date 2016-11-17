"use strict";function Router(e,o){e.state("foodsIndex",{url:"/foods",templateUrl:"/templates/foodsIndex.html",controller:"FoodsController as foods"}).state("goalsIndex",{url:"/goals",templateUrl:"/templates/goalsIndex.html",controller:"GoalsController as goals"}).state("login",{url:"/",templateUrl:"/templates/landing.html",controller:"LoginController as login"}).state("register",{url:"/",templateUrl:"/templates/landing.html",controller:"RegisterController as register"}).state("select",{url:"/select",templateUrl:"/templates/select.html"}).state("dietProfile",{url:"/dietProfile",templateUrl:"/templates/dietProfile.html"}).state("dietFriends",{url:"/dietFriends",templateUrl:"/templates/dietFriends.html",controller:"UsersIndexController as usersIndex"}),o.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1308530975838362"})}function RegisterController(e,o){function t(){console.log(l.user),e.signup(l.user).then(function(){o.go("foodsIndex")})}var l=this;l.user={},l.submit=t}function LoginController(e,o){function t(){console.log(r.credentials),e.login(r.credentials).then(function(){o.go("select")})}function l(t){e.authenticate(t).then(function(){o.go("select")})}var r=this;r.credentials={},r.submit=t,r.authenticate=l}function FoodsController(e,o){function t(){e.save(a.foodsNew,function(){o.reload()})}function l(e){console.log(a.all);for(var t=0;t<a.all.length;t++)a.all[t]._id===e&&a.all[t].$remove(function(){o.reload()})}function r(e){for(var o=0;o<a.all.length;o++)a.all[o]._id===e&&(a.editFood=a.all[o])}function n(){a.editFood.$update(function(){o.reload()})}var a=this;a.edit=r,a.create=t,a.delete=l,a.editFood={},a.update=n,a.all=e.query(),a.foodsNew={}}function Food(e){return new e("/foods/:id",{id:"@_id"},{update:{method:"PUT"}})}function GoalsController(e,o){function t(){e.save(a.goalsNew,function(){o.reload()})}function l(e){console.log(a.all);for(var t=0;t<a.all.length;t++)a.all[t]._id===e&&a.all[t].$remove(function(){o.reload()})}function r(e){for(var o=0;o<a.all.length;o++)a.all[o]._id===e&&(a.editGoal=a.all[o])}function n(){a.editGoal.$update(function(){o.reload()})}var a=this;a.edit=r,a.create=t,a.delete=l,a.editGoal={},a.update=n,a.all=e.query(),a.goalsNew={}}function Goal(e){return new e("/goals/:id",{id:"@_id"},{update:{method:"PUT"}})}function MainController(e,o,t){function l(){e.logout().then(function(){o.go("foodsIndex")})}function r(t,l){a.message=null,!e.isAuthenticated()&&i.includes(l.name)&&(t.preventDefault(),o.go("login"),a.message="You need to login to see that!")}function n(){var e=document.getElementById("myChart");new Chart(e,{type:"pie",data:{labels:["Fibre","Protein","Carbohydrate","Fats","Water"],datasets:[{label:"Foods",data:[12,30,200,20,40],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:[{ticks:{beginAtZero:!0}}]}})}var a=this;a.isLoggedIn=e.isAuthenticated,a.message=null;var i=[];t.$on("stateChangeStart",r),a.logout=l,a.createChart=n,a.createChart()}function UsersIndexController(e,o){function t(e){a.currentUser.following.push(e),a.currentUser.$update(function(){console.log("user @'d")})}function l(e){var o=a.currentUser.following.indexOf(e._id);o!==-1&&(a.currentUser.following.splice(o,1),a.currentUser.$update(function(){console.log("I can't belive you've done this")}))}function r(e){return a.currentUser.following.filter(function(o){return o===e._id}).length}function n(e){return e._id===a.currentUser._id}var a=this;e.get({id:o.getPayload()._id},function(o){a.currentUser=o,a.all=e.query()}),a.isSelf=n,a.isFollowing=r,a.follow=t,a.unfollow=l,a.filter={username:""}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("foodApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("foodApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("foodApp").controller("FoodsController",FoodsController),FoodsController.$inject=["Food","$state","$auth"],angular.module("foodApp").factory("Food",Food),Food.$inject=["$resource"],angular.module("foodApp").controller("GoalsController",GoalsController),GoalsController.$inject=["Goal","$state","$auth"],angular.module("foodApp").factory("Goal",Goal),Goal.$inject=["$resource"],angular.module("foodApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("foodApp").controller("UsersIndexController",UsersIndexController),UsersIndexController.$inject=["User","$auth"],angular.module("foodApp").factory("User",User),User.$inject=["$resource"];
//# sourceMappingURL=app.js.map
