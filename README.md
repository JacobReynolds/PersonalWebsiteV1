# JakeReynolds.co
This is my personal website.  From learning javascript to this first release in ~2 months.<br>
Please email reyno511@umn.edu with any questions, comments, or concerns.<br><br>
This website can be viewed <a href='http://jacobreynolds.github.io/PersonalWebsiteV1'>here</a>.

# Design Decisions
<h3>Task runners</h3>
After looking at the page load time I decided to use grunt to concat all javascript files, and libraries.<br>
Now on page load only two files are loaded.  Although bigger, since http allows parallel requests, hopefully it isn't as much of an issue.
<h3>Classes and ID's</h3>
In the HTML I use a mix of classes and id's.  I tried to use id's for individual elements with more than 2 style attributes.<br>
Classes were used for elements that would be used more than once.
<h3>DOM Manipulation</h3>
JQuery is a very powerful resource, but was only used sparingly in this project since AngularJS has many options built-in for DOM manipulation.

