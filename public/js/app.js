"use strict";function Food(o){return new o("/foods/:id",{id:"@_id"},{update:{method:"PUT"}})}console.log("JS loaded"),angular.module("foodApp").factory("Food",Food),Food.$inject=["$resource"];
//# sourceMappingURL=app.js.map
