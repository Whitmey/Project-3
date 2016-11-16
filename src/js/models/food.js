angular.module('foodApp')
  .factory('Food', Food);

Food.$inject = ['$resource'];
function Food($resource) {
  return new $resource('/foods/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
