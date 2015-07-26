module.exports = function(grunt) {
    grunt.initConfig({
      concat: {
        javascript: {
          files: {
	    'js/minified.js': ['home/routeApp.js', 'home/*.*.js', 'about/*.*.js', 'main/*.*.js', 'projects/*.*.js', 'projects/*.js'],
	    //Declaring explicit file names because angular.min.js has to be loaded before all other angular files
	    'js/libraries.js': ['js/imports/jquery-2.1.4.min.js', 'js/imports/angular.min.js', 'js/imports/angular.min.js', 'js/imports/angular-animate.js', 'js/imports/angular-route.min.js', 'js/imports/angular-sanitize.min.js', 'js/imports/angular-touch.min.js'],
	    'style/minified.css': ['*/*.css']

	  }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-concat'); // load the given tasks
    grunt.registerTask('default', ['concat']); // Default grunt tasks maps to grunt
  };
