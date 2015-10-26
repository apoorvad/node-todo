function filterController($scope, $http) {
  console.log("Hello from controllers");
  var refresh = function() {
    $http.get('/filters').success(function(response) {
      console.log("I got the data");
      console.log(response);
      $scope.filters = response;
      $scope.filter = "";
    });

  };
  refresh();

  $scope.addFilter = function() {
    console.log($scope.filter);
    $http.post('/filters', $scope.filter);
    refresh();
  };
  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/filters' + id).success(function(response) {
      refresh();
    });
  };
  $scope.edit = function(id) {
    console.log(id);
    $http.get('/filters/' + id).success(function(response) {
      $scope.filter = response;
      console.log(response);
      refresh();
    });
  }
}
