(function () {
'use strict';
angular
    .module('jamesCookTask', [])
    .controller('taskController', ['$scope', '$http', function ($scope, $http) { 

    $scope.formData = {};


    $http.get('/api/todos')
        .success(function(data) {
            $scope.tasks = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    $scope.createTask = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; 
                $scope.tasks = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    $scope.deleteTask = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.tasks = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}]);
}());