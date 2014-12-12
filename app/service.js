'use strict';

angular.module('econf.service', [])

.factory('Backend', [
        '$q', '$http',
function($q,   $http) {
  return {
    listConfs: function() {
      var d = $q.defer();
      $http.get('/spec/list')
        .success(function(res, status) {
          d.resolve(res);
        })
        .error(function(res, status) {
          d.reject(res);
        });
      return d.promise;
    },
    getSpec: function(name) {
      var d = $q.defer();
      $http.get('/spec/conf/' + name)
        .success(function(res, status) {
          d.resolve(res);
        })
        .error(function(res, status) {
          d.reject(res);
        });
      return d.promise;
    },
    ast2conf: function(ast) {
      var d = $q.defer();
      $http.post('/spec/stringify', {ast: ast})
        .success(function(res, status) {
          d.resolve(res);
        })
        .error(function(res, status) {
          d.reject(res);
        });
      return d.promise;
    }
  }
}])
