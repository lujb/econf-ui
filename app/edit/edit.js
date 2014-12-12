'use strict';

angular.module('econf.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/edit/:name', {
    templateUrl: 'edit/edit.html',
    controller: 'EditCtrl'
  });
}])

.controller('EditCtrl', [
        '$rootScope', '$routeParams', '$scope', '$sce', '$modal', 'Backend',
function($rootScope,   $routeParams,   $scope,   $sce,   $modal,   Backend) {
  $scope.index = -1;
  $rootScope.conf = $routeParams.name;

  $scope.trust = function(html) {
    return $sce.trustAsHtml(html);
  };
  $scope.remover = function(s) {
    return function(i) {
      s.value.splice(i, 1);
    }
  };
  $scope.select = function (s, size) {
    $scope.parent = s;
    s.value = s.value || [];
    var len = s.value.length;
    if (s.type && s.type[0] === 'simple-list') {

      if (s.eletype[0] === 'string') {
        s.value[len] = '';
      }

      if (s.eletype[0] === 'tuple') {
        s.value[len] = {type:s.eletype, val:[], title:s.title, removable:true, isCollapsed:true};
        angular.copy(s.eleval, s.value[len].val);
      }
      console.log('value:', s.value);
    } else {
      var selectBox = $modal.open({
        templateUrl: 'alternatives.html',
        controller: 'SelectCtrl',
        size: size,
        resolve: {
          items: function () {
            return s.val;
          }
        }
      });

      selectBox.result.then(function (selectedItem) {
        selectedItem.removable = true;
        selectedItem.isCollapsed = true;
        $scope.selected = selectedItem;
        s.value[len] = {};
        angular.copy(selectedItem, s.value[len]);
        console.log('selected: ', selectedItem);
      }, function () {
      });
    }
  };

  $scope.preview = function() {
    Backend.ast2conf($rootScope.schema)
      .then(function(res) {
        if (res.out) {
          $rootScope.confContent = res.out;
        }
      });
  }

  Backend.getSpec($routeParams.name)
    .then(function(res) {
      res.spec.forEach(function(s) {
        s.outter = true;
      });
      $rootScope.schema = res.spec;
    });
}])

.controller('SelectCtrl', function ($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
