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