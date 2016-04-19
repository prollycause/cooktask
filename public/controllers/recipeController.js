(function () {

'use strict';

angular
    .module('jamesCookTask', [])
    .controller("recipeController", ["$scope", "$http", function ($scope, $http ) {
        $scope.formData = {};
        $scope.editData = {};
            // sloppy and lazy
        $scope.editShow = function() {
            $scope.edit = true;
            $('#nameAuthor').hide();
        };
            // sloppy and lazy
        $scope.create = function() {
            $scope.edit = false;
            $scope.shown = false;
            $('#nameAuthor').show();
        };

        $http.get('/api/recipe')
            .success(function(data) {
                $scope.recipes = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });

        $scope.createRecipe = function() {
            $http.post('/api/recipe', $scope.formData)
                .success(function(data) {
                    $scope.formData = {};
                    $scope.recipes = data;        
                })
                .error(function(data) {
                    console.log('Error: ' + data);
            });
        };

        $scope.deleteRecipe = function(id) {
            $scope.sure = confirm('this will delete this recipe');
            if ($scope.sure)
            $http.delete('/api/recipe/' + id)
                .success(function(data) {
                    $scope.recipes = data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.updateRecipe = function(id) {
                $http.put('/api/recipe/' + id, $scope.editData)
                    .success(function(data) {
                        $scope.editData = {};
                        $scope.recipes = data;
                        console.log('success! here is data: ' + data);
                        location.reload();
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
        });};
        
}])
    .directive('myform', function () {
        return {
            restrict: 'E',
            templateUrl: 'myform.html'
        };
    })
    .directive('myoutput', function() {
        return {
            restrict: 'E',
            templateUrl: 'myoutput.html'
        };
    })
    .directive('updateit', function() {
        return {
            restrict: 'E',
            templateUrl: 'updateit.html'
        };
    });

}());