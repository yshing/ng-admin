/*global module*/

module.exports = function (grunt) {
    'use strict';

    // Define the configuration for all the tasks
    grunt.initConfig({
        connect: {
            dev: {
                options: {
                    port: 8000,
                    base: 'examples/blog/',
                    keepalive: false,
                    livereload: false
                }
            },
            test: {
                options: {
                    port: 8001,
                    base: 'examples/blog/',
                    keepalive: false,
                    livereload: false
                }
            }
        },
        karma: {
            unit: {
                configFile: 'src/javascripts/test/karma.conf.js',
                singleRun: process.env.KARMA_SINGLE_RUN !== 'false'
            }
        },
        protractor: {
            e2e: {
                configFile: 'src/javascripts/test/protractor.conf.js',
                keepAlive: true,
                debug: true
            }
        },
        exec: {
            webpack: './node_modules/webpack/bin/webpack.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', ['karma', 'test:e2e']);
    grunt.registerTask('test:e2e', ['exec:webpack', 'connect:test', 'protractor']);

    grunt.registerTask('test:local', ['karma', 'test:local:e2e']);
    grunt.registerTask('test:local:e2e', ['exec:webpack', 'connect:test', 'protractor']);
};
