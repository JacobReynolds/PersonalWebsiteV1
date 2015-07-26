/*jslint browser: true*/
/*jslint vars: true*/
/*global  $, angular*/
angular.module('routeApp').controller("mainCtrl", function ($scope, $location, $http, $rootScope) {
    "use strict";

    //The text that is typed on the first opening of the webpage
    $scope.welcomeHtml = '<h1>Welcome</h1>' +
        '<p>I am a software developer from Minneapolis, Mn.</p>' +
        '<p>I enjoy making products that automate my daily life interactions with the internet.' +
        '<br>Simple programs that check my grades at school, and programs that help limit my interaction with my phone while in public.</p>' +
        '<p> My other passions include artificial intelligence, penetration testing, web/software development, and dark-themed text editors.</p>' +
        '<small>Please swipe to begin</small>';

    //Only want it to show 'swipe to begin' on load
    //Seemed easier than doing weird if statements in welcomeHtml
    $scope.welcomeBackHtml = '<h1>Welcome</h1>' +
        '<p>I am a software developer from Minneapolis, Mn.</p>' +
        '<p>I enjoy making products that automate my daily life interactions with the internet.' +
        '<br>Simple programs that check my grades at school, and programs that help limit my interaction with my phone while in public.</p>' +
        '<p> My other passions include artificial intelligence, penetration testing, web/software development, and dark-themed text editors.</p>';


    //Using rootScope here allows the function to only type on page load
    //So it will not type every time the route comes back to main
    //This types the welcome text on first load of the page
    $scope.typeWelcome = function (index) {
        var inputField = $('#main');
        if (!$rootScope.alreadyWritten && $location.path() === '/') {
            var val = $scope.welcomeHtml.substr(0, index + 1);
            inputField.html(val);
            if (index < $scope.welcomeHtml.length) {
                setTimeout(function () {
                    $scope.typeWelcome(index + 1);
                }, Math.random() * 50);
            } else {
                $rootScope.alreadyWritten = true;
            }
        }
    };

    //List of current routes that I am using
    //Is this available through angular somewhere?
    $scope.routeList = ['/', '/about', '/projects'];

    //Sets initial page animation
    if (!$scope.currentPage) {
        $scope.currentPage = 'leftPage';
    }

    //Sets the initial class
    $scope.currentClass = $location.$$url.split('/')[1] + 'Bg';

    //Goes through the routes and sets the correct page type for animations
    //And changes the routes
    $scope.setNextActive = function () {
        if (!$scope.current) {
            $scope.current = $location.path();
        }
        for (var i = 0; i < $scope.routeList.length; i += 1) {
            if ($scope.routeList[i] === $scope.current) {
                if (i === $scope.routeList.length - 1) {
                    $scope.current = $scope.routeList[0];
                    break;
                } else {
                    $scope.current = $scope.routeList[i + 1];
                    break;
                }
            }
        }
        $scope.currentClass = $scope.current.split('/')[1] + 'Bg';
        $scope.currentPage = 'leftPage';
        $location.path($scope.current);
    };

    //Goes through the routes and sets the correct page type for animations
    //And changes the routes
    $scope.setPrevActive = function () {
        if (!$scope.current) {
            $scope.current = $location.path();
        }
        for (var i = 0; i < $scope.routeList.length; i += 1) {
            if ($scope.routeList[i] === $scope.current) {
                if (i === 0) {
                    $scope.current = $scope.routeList[$scope.routeList.length - 1];
                    break;
                } else {
                    $scope.current = $scope.routeList[i - 1];
                    break;
                }
            }
        }
        $scope.currentClass = $scope.current.split('/')[1] + 'Bg';
        $scope.currentPage = 'rightPage';
        $location.path($scope.current);
    };

    //Gets random integer in the range, inclusive.
    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    //Gets random float in the range, inclusive.
    function getRandomDecimalArbitrary(min, max) {
        return +(Math.random() * (max - min) + min).toFixed(3);
    }

    //Sets the variable to stop star animations.
    $scope.starStop = function () {
        $scope.stopStars = true;
    };

    //Initializers
    $scope.starList = [];
    $scope.interval = 0;

    //Animation that starts the stars falling
    $scope.starFall = function () {
        //If there is a process currently running, return.
        if ($scope.interval) {
            return;
        }

        //Set the animation interval for adding stars
        $scope.interval = setInterval(function () {
            if ($scope.stopStars) {
                $scope.stopStars = false;
                clearInterval($scope.interval);
                $scope.interval = 0;
                return;
            }

            //Get the starting point for the stars
            var elem = document.createElement('img');
            var start = document.getElementById('pictureOverlay');
            var y = start.offsetHeight;
            var x = start.offsetLeft;

            //Give the stars attributes
            elem.src = 'images/snowflake.png';
            elem.height = getRandomDecimalArbitrary(20, 90);
            elem.width = elem.height;
            elem.style.left = x + 'px';
            elem.style.top = y - 30 + 'px';
            elem.style.position = 'absolute';
            elem.style.zIndex = getRandomArbitrary(-4, -1);
            elem.id = 'star';

            //Set random animation characteristics
            //Propulsion is vertical speed
            //Thrust is horizontal speed
            var propulsion = getRandomDecimalArbitrary(2, 3);
            var thrust = getRandomDecimalArbitrary(0.01, 0.02);
            //Generate random x direction
            thrust = getRandomArbitrary(0, 1) ? thrust : -thrust;
            var windDirection = getRandomArbitrary(0, 1);
            var backWindCounter = 100;
            var windCounter = propulsion;
            var body = document.body,
                html = document.documentElement;
            var height = Math.max(body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight);
            var width = $(window).width();

            $scope.starList.push({
                elem: elem,
                propulsion: propulsion,
                thrust: thrust,
                windDirection: windDirection,
                windCounter: windCounter,
                backWindCounter: backWindCounter,
                height: height,
                width: width
            });
            if ($scope.starList.length === 1) {
                $scope.animateStar();
            }
            // setTimeout($scope.stopStars = false, 1000);
            //$scope.stopStars = true;
        }, 500);
        $scope.stopStars = false;
    };

    function getTopHeight(top) {
        return Number(top.slice(0, top.length - 2));
    }

    $scope.clearInterval = function (interval) {
        clearInterval(interval);
    };

    //Pretty confusing animation sequence
    //May rewrite for clarity if I have the time.
    $scope.animateStar = function () {
        //Thrust is x-axis
        //Propulsion is y-axis
        var i;
        //Set interval to run proportionate to the size of the y-axis jumps 
        var interval = setInterval(function () {
            for (i = 0; i < $scope.starList.length; i += 1) {
                var star = $scope.starList[i];
                var top = getTopHeight(star.elem.style.top);
                var left = getTopHeight(star.elem.style.left);
                //Delete all stars outside bounds of the window
                if (top > star.height || top < -90 || left < -90 || left > star.width) {
                    star.elem.parentNode.removeChild(star.elem);
                    var index = $scope.starList.indexOf(star);
                    $scope.starList.splice(index, 1);
                    return;
                    //Start slowing down the star from the current direction it is going
                } else if (star.windCounter > 0) {
                    star.elem.style.top = top + star.propulsion / 4 + 'px';
                    star.elem.style.left = star.windDirection ? (left - star.windCounter * 2 + 'px') : (left + star.windCounter * 2 + 'px');
                    document.getElementById('mainPage').appendChild(star.elem);
                    star.windCounter -= Math.abs(star.thrust);
                    star.backWindCounter = (star.windCounter <= 0) ? 0 : star.propulsion + 1;
                    //Start speeding up star to the direction it will go.
                } else if (star.backWindCounter < star.propulsion) {
                    star.elem.style.top = top + star.propulsion / 4 + 'px';
                    star.elem.style.left = star.windDirection ? (left + star.backWindCounter * 2 + 'px') : (left - star.backWindCounter * 2 + 'px');
                    document.getElementById('mainPage').appendChild(star.elem);
                    star.backWindCounter += Math.abs(star.thrust);
                    //If the star is fully sped up, reset wind direction.
                } else if (star.backWindCounter >= star.propulsion) {
                    star.windCounter = getRandomDecimalArbitrary(2, 3);
                    star.windDirection = !star.windDirection;
                }
            }
            if (!$scope.starList.length) {
                clearInterval(interval);
            }

        }, 2);

    };

});