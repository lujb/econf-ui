'use strict';

// Declare app level module which depends on views, and components
angular.module('econf', [
  'ngRoute',
  'ui.bootstrap',
  'ui.ace',
  'econf.service',
  'econf.new',
  'econf.edit'
])

.run([    '$rootScope', '$interval', 'Backend',
  function($rootScope,   $interval,   Backend) {
    //
  }
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/new'});
}]);
