/*jslint browser: true*/
/*jslint vars: true*/
/*global  $, angular*/
var app = angular.module("routeApp");
app.controller("projectsCtrl", function ($scope) {
    "use strict";

    //Initializes the github api and loads projects.
    //loadRepositories can be found in github.js
    $scope.initialize = function () {
        if (!$scope.projectsLoaded) {
            $(function () {
                $("#projects").loadRepositories("jacobreynolds");
                $scope.projectsLoaded = true;
            });
        }
    };

    $scope.initialize();
});