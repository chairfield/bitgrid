module.exports = function(grunt) {

    // Configuration goes here
    grunt.initConfig({
        browserify: {
            js: {
                // A single entry point for our app
                src: 'client/src/client.js',
                // Compile to a single bundled javascript file
                dest: 'public/javascripts/bundle.js',
            },
        },
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-browserify');
    
    // Define tasks here
    grunt.registerTask('default', ['browserify']);
};
