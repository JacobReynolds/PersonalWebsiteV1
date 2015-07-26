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
/*jslint browser: true*/
/*jslint vars: true*/
/*global  $, angular*/
angular.module('routeApp').controller("aboutCtrl", function ($scope, $sce) {
    "use strict";

    //Used to set the class type of selected life tabs
    $scope.tabList = ["hobbiesTab", "codingTab"];
    $scope.setActive = function (id) {
        if (!id) {
            document.getElementById('homeTab').className = "selectedTab";
            return;
        }
        var i;
        for (i = 0; i < $scope.tabList.length; i += 1) {
            if ($scope.tabList[i] === id) {
                document.getElementById($scope.tabList[i]).className = "selectedLifeTab";
            } else {
                document.getElementById($scope.tabList[i]).className = "lifeTab";
            }
        }
        return;
    };

    //Generates a random witty bug excuse on load
    var date = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    $scope.bugList = [
        "Solar Flares",
        "Leap Millisecond",
        "It's a feature",
        "Ran out of coffee",
        "The person responsible doesn't work here anymore",
        "Server error: Coffee not delivered",
        "Talk to management",
        "It's a " + weekday[date.getDay()],
        "XML is not a useful scripting language",
        "Agar.io break time",
        "Website only supported on IE 1.0(1995), and the Ask toolbar"
    ];

    $scope.bugExcuse = $scope.bugList[Math.floor(Math.random() * $scope.bugList.length)];


    //List of hobbies
    //May look into having these as templates
    $scope.hobby = function (hobby) {
        switch (hobby) {
        case 1:
            return {
                name: "Motorcycles",
                description: "<p>I became interested in motorcycles once I turned 15, and I gained a pretty fun hobby.  I currently own a 2006 Kawasaki Z1000 and love it.  I am always looking for new bikes to ride, and to test out.</p>"
            };
        case 2:
            return {
                name: "Rubik's Cubes",
                description: "<p>Once I decided to study Computer Science and began coding I started to love puzzles, and algorithms.  Rubik's cubes drew me in with their simplistic look, but the Forty-three quintillion, two hundred fifty-two quadrillion, three trillion, two hundred seventy-four billion, four hundred eighty-nine million, eight hundred fifty-six thousand possible combinations fascinated me.  I enjoy solving a range of twisty puzzles from 2x2-7x7 and from 4-sided to 12-sided.</p>"
            };
        case 3:
            return {
                name: "Coding",
                description: "<p>Ever since I was a kid I wanted to invent things, but I had no knowledge of how to build things with wood and metal.  Computers bridged that gap for me.  Everything I need to build what I want is at my fingertips, and I am able to express myself through that."
            };
        case 4:
            return {
                name: "Scuba Diving",
                description: "<p>I began diving in 10th grade.  We were taking a band trip to Hawaii and our band director offered the chance for us to get certified.  There are many amazing things about scuba diving, but the alienness of it all is what I loved.  Because of that I was able to work as a scuba diver for two summers in college, and greatly expanded my abilities as a diver. </p>"
            };
        case 5:
            return {
                name: "Aquariums",
                description: "<p>Contact my boss, he made me put this in here.</p>"
            };
        }
    };

    //Since they aren't stored as a list
    $scope.hobbiesLength = 5;

    //Sets the current hobby view
    $scope.setTab = function (next, tab) {
        if (next) {
            if (tab === $scope.hobbiesLength) {
                return 1;
            } else {
                return tab + 1;
            }
        } else {
            if (tab === 1) {
                return $scope.hobbiesLength;
            }
            return tab - 1;
        }
    };

    //Languages/Frameworks/etc.. I currently work in
    $scope.languages = ["AngularJS", "C", "C#", "HTML/CSS", "Java", "Javascript", "Linux", "Matlab", "Python", "Scheme", "X86 Machine Code"];


    //Easter egg for those of you checking the source.
    //You will have to uncomment a couple lines in the html to see this.
    $scope.$watch('hodorInput', function () {
        $scope.output = "";
        if (!$scope.hodorInput) {
            return;
        }
        var regex = /(\w+[,.!?]*\s+)|(\w+[,.!?']*\w+\s+)|(\w+[,.!?])/g;
        var input = $scope.hodorInput;
        var myArray;
        while ((myArray = regex.exec(input)) !== null) {
            var word = myArray[0];
            if (word.charAt(0) === word.charAt(0).toUpperCase() && word.indexOf('.') > 0) {
                $scope.output += "Hodor.<br>";
            } else if (word.charAt(0) === word.charAt(0).toUpperCase() && word.indexOf('!') > 0) {
                $scope.output += "Hodor!<br>";
            } else if (word.charAt(0) === word.charAt(0).toUpperCase() && word.indexOf('?') > 0) {
                $scope.output += "Hodor?<br>";
            } else if (word.charAt(0) === word.charAt(0).toUpperCase() && word.indexOf(',') > 0) {
                $scope.output += "Hodor,";
            } else if (word.charAt(0) === word.charAt(0).toUpperCase() && word.indexOf(' ') > 0) {
                $scope.output += "Hodor";
            } else if (word.indexOf('.') > 0) {
                $scope.output += "hodor.<br>";
            } else if (word.indexOf('?') > 0) {
                $scope.output += "hodor?<br>";
            } else if (word.indexOf(',') > 0) {
                $scope.output += "hodor,";
            } else if (word.indexOf('!') > 0) {
                $scope.output += "hodor!<br>";
            } else if (word.indexOf(' ') > 0) {
                $scope.output += "hodor";
            }
            for (var i = 0; i < (word.match(/ /g) || []).length; i += 1) {
                $scope.output += "&nbsp;";
            }
        }
    });

});
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
        }, 1000);
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
$(function () { /*global  $, jQuery*/
    /*jslint vars: true*/
    jQuery.githubUser = function (username, callback) {
        "use strict";
        jQuery.getJSON('https://api.github.com/users/' + username + '/repos?callback=?', callback);
    };

    function sortByName(repos) {
        "use strict";
        repos.sort(function (a, b) {
            return a.name - b.name;
        });
    }

    //Currently getting an XMLHTTPRequest error, ignoring it for now since it does not hinder performance.
    jQuery.fn.loadRepositories = function (username) {
        "use strict";
        this.html("<span>Querying GitHub for " + username + "'s repositories...<br>It is possible the daily max API limit has been reached.<br>Please visit my Github using the link above.</span>");

        var target = this;
        $.githubUser(username, function (data) {
            var repos = data.data; // JSON Parsing
            sortByName(repos);

            var list = $('<dl/>');
            target.empty().append(list);
            $(repos).each(function () {
                if (this.name !== (username.toLowerCase() + '.github.com')) {
                    list.append('<dt><a href="' + (this.homepage ? this.homepage : this.html_url) + '" target="_blank">' + this.name + '</a> <em>' + (this.language ? ('(' + this.language + ')') : '') + '</em></dt>');
                    list.append('<dd>' + this.description + '</dd>');
                }
            });
        });

    };
})