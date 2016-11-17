"use strict";function Router(e,o){e.state("foodsIndex",{url:"/foods",templateUrl:"/templates/foodsIndex.html",controller:"FoodsIndexController as foodsIndex"}).state("login",{url:"/",templateUrl:"/templates/landing.html",controller:"LoginController as login"}).state("register",{url:"/",templateUrl:"/templates/landing.html",controller:"RegisterController as register"}).state("select",{url:"/select",templateUrl:"/templates/select.html"}).state("dietProfile",{url:"/dietProfile",templateUrl:"/templates/dietProfile.html"}).state("dietFriends",{url:"/dietFriends",templateUrl:"/templates/dietFriends.html",controller:"UsersIndexController as usersIndex"}),o.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1308530975838362"})}function RegisterController(e,o){function t(){console.log(r.user),e.signup(r.user).then(function(){o.go("foodsIndex")})}var r=this;r.user={},r.submit=t}function LoginController(e,o){function t(){console.log(n.credentials),e.login(n.credentials).then(function(){o.go("select")})}function r(t){e.authenticate(t).then(function(){o.go("select")})}var n=this;n.credentials={},n.submit=t,n.authenticate=r}function FoodsIndexController(e){var o=this;o.all=e.query()}function FoodsNewController(e,o){function t(){e.save(r.food,function(){o.go("foodsIndex")})}var r=this;r.food={},r.create=t}function FoodsShowController(e,o,t){function r(){n.food.$remove(function(){o.go("foodsIndex")})}var n=this;n.food=e.get(o.params),n.delete=r,n.isLoggedIn=t.isAuthenticated}function FoodsEditController(e,o){function t(){r.food.$update(function(){o.go("foodsShow",o.params)})}var r=this;r.food=e.get(o.params),this.update=t}function Food(e){return new e("/foods/:id",{id:"@_id"},{update:{method:"PUT"}})}function MainController(e,o,t){function r(){e.logout().then(function(){o.go("foodsIndex")})}function n(t,r){i.message=null,!e.isAuthenticated()&&s.includes(r.name)&&(t.preventDefault(),o.go("login"),i.message="You need to login to see that!")}function l(){var e=document.getElementById("myChart");new Chart(e,{type:"pie",data:{labels:["Fibre","Protein","Carbohydrate","Fats","Water"],datasets:[{label:"Foods",data:[12,30,200,20,40],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:[{ticks:{beginAtZero:!0}}]}})}var i=this;i.isLoggedIn=e.isAuthenticated,i.message=null;var s=[];t.$on("stateChangeStart",n),i.logout=r,i.createChart=l,i.createChart()}function UsersIndexController(e,o){function t(e){i.currentUser.following.push(e),i.currentUser.$update(function(){console.log("user @'d")})}function r(e){var o=i.currentUser.following.indexOf(e._id);o!==-1&&(i.currentUser.following.splice(o,1),i.currentUser.$update(function(){console.log("I can't belive you've done this")}))}function n(e){return i.currentUser.following.filter(function(o){return o===e._id}).length}function l(e){return e._id===i.currentUser._id}var i=this;e.get({id:o.getPayload()._id},function(o){i.currentUser=o,i.all=e.query()}),i.isSelf=l,i.isFollowing=n,i.follow=t,i.unfollow=r,i.filter={username:""}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("foodApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("foodApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("foodApp").controller("FoodsIndexController",FoodsIndexController),FoodsIndexController.$inject=["Food"],FoodsNewController.$inject=["Food","$state"],FoodsShowController.$inject=["Food","$state","$auth"],FoodsEditController.$inject=["Food","$state"],angular.module("foodApp").factory("Food",Food),Food.$inject=["$resource"],angular.module("foodApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("foodApp").controller("UsersIndexController",UsersIndexController),UsersIndexController.$inject=["User","$auth"],angular.module("foodApp").factory("User",User),User.$inject=["$resource"];
//# sourceMappingURL=app.js.map
