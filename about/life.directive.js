/*jslint browser: true*/
/*jslint vars: true*/
/*global  $, angular*/
angular.module('routeApp').directive('lifeDirective', function () {
    "use strict";
    return {
        restrict: 'E',
        controller: 'aboutCtrl',
        templateUrl: 'about/lifeDirective.html'
    };

});