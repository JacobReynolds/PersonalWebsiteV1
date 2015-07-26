/*jslint browser: true*/
/*jslint vars: true*/
/*global  $, angular*/

var app = angular.module('routeApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ngTouch']);
app.config(function ($routeProvider) {
    "use strict";
    $routeProvider
        .when('/', {
            templateUrl: '../main/main.html',
            controller: 'mainCtrl'
        })
        .when('/about', {
            templateUrl: '../about/about.html',
            controller: 'aboutCtrl'
        })
        .when('/projects', {
            templateUrl: '../projects/projects.html',
            controller: 'projectsCtrl'
        })
        .otherwise('/', {
            templateUrl: '../main/main.html',
            controller: 'mainCtrl'
        });


});

app.filter('unsafe', function ($sce) {
    "use strict";
    return function (val) {
        return $sce.trustAsHtml(val);
    };

});