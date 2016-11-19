angular.module('foodApp')
  .factory('Finance', Finance);

Finance.$inject = ['$resource'];
function Finance($resource) {
  return new $resource('/finances/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
