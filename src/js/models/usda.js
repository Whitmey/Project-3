angular.module('foodApp')
  .factory('Usda', Usda);

Usda.$inject = ['$http'];
function Usda($http) {
  return {
    search: (searchTerm) => {
      return $http({
        method: 'GET',
        url: `/usdas?q=${searchTerm}`
      });
    },
    itemInfo: (ndbno) => {
      return $http({
        method: 'GET',
        url: `/usdasi?ndbno=${ndbno}`
      });
    }
  };
}
