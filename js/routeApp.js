/*jslint browser: true*/
/*jslint vars: true*/
/*global  $, angular*/

var app = angular.module('routeApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ngTouch']);
app.config(function ($routeProvider) {
    "use strict";
    $routeProvider
        .when('/', {
            templateUrl: '../html/main.html',
            controller: 'mainCtrl'
        })
        .when('/about', {
            templateUrl: '../html/about.html',
            controller: 'aboutCtrl'
        })
        .when('/projects', {
            templateUrl: '../html/projects.html',
            controller: 'projectsCtrl'
        })
        .otherwise('/', {
            templateUrl: '../html/main.html',
            controller: 'mainCtrl'
        });


});

app.filter('unsafe', function ($sce) {
    "use strict";
    return function (val) {
        return $sce.trustAsHtml(val);
    };

});