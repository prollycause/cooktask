/* TODO: define controller for editData, fix boolean issue */

(function () {

'use strict';

angular
    .module('jamesCookTask', [])
    .controller("recipeController", ["$scope", "$http", function ($scope, $http ) {
        $scope.formData = {};
        $scope.editData = {};
            
        $scope.editShow = function() {
            $scope.edit = true;
            $('#creationForm').hide();
            $('body').focus();
            for (var i =0; i < $scope.recipes.length;i++) {
                if (this.$index === i) {
                    $scope.editData = $scope.recipes[i];
                }
            }
        };
        
        $scope.create = function() {
            // need to fix boolean issue so creationform works with ngif
            $scope.edit = false;
            $scope.shown = false;
            $('#creationForm').show();
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
            var sure = confirm('This will delete the recipe, Sure?');
            if (sure)
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