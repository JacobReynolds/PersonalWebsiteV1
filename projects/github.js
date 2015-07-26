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