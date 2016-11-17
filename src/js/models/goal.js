angular.module('foodApp')
  .factory('Goal', Goal);

Goal.$inject = ['$resource'];
function Goal($resource) {
  return new $resource('/goals/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
