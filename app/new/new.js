'use strict';

angular.module('econf.new', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new', {
    templateUrl: 'new/new.html',
    controller: 'NewCtrl'
  });
}])

.controller('NewCtrl', [
        '$rootScope', '$scope', 'Backend',
function($rootScope,   $scope,   Backend) {
  $rootScope.previewMode = false;
  Backend.listConfs()
    .then(function(res) {
      $scope.confs = res.confs;
    })
}])

