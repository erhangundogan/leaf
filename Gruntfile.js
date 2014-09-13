module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    // clean directories
    clean: {
      initialize: ['dist'],
      temporary: [
        'dist/js',
        'dist/public/components',
        'dist/app.production.js',
        'dist/lib.js'
      ]
    },

    // concat bower libraries
    bower_concat: {
      libraries: {
        dest: 'dist/lib.js',
        exclude: [
          'fontawesome'
        ],
        mainFiles: {
          'html5-boilerplate': 'js/main.js'
        },
        dependencies: {
          'angular': 'jquery',
          'html5-boilerplate': 'jquery',
          'angular-route': 'angular',
          'angular-mocks': 'angular'
        }
      }
    },

    // copy files to dist folder
    copy: {
      application: {
        flatten: true,
        expand: true,
        filter: 'isFile',
        src: ['public/src/*.js', '!public/src/*.test.js'],
        dest: 'dist/js/'
      },
      templates: {
        expand: true,
        src: ['public/templates/**/*.html'],
        dest: 'dist/'
      },
      libraries: {
        src: [
          'public/components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
          'public/components/es5-shim/es5-shim.min.js'
        ],
        filter: 'isFile',
        flatten: true,
        expand: true,
        dest: 'dist/public/js/'
      },
      resource: {
        src: [
          'public/components/fontawesome/css/font-awesome.min.css',
          'public/fonts/**/*',
          'public/img/**/*'],
        dest: 'dist/'
      },
      misc: {
        expand: true,
        cwd: 'public/components/fontawesome/fonts',
        src: '*',
        dest: 'dist/public/fonts/'
      }
    },

    // process index.html for production
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['public/index.html']
        }
      }
    },

    // concat application js files
    concat: {
      application: {
        options: {
          separator: ';'
        },
        src: ['dist/js/app.js', 'dist/js/controllers.js', 'dist/js/directives.js', 'dist/js/filters.js', 'dist/js/services.js'],
        dest: 'dist/app.production.js'
      }
    },

    // minify vendor and application js files
    uglify: {
      min: {
        options: {
          mangle: false,
          report: 'gzip'
        },
        files: {
          'dist/app.min.js': 'dist/app.production.js',
          'dist/lib.min.js': 'dist/lib.js'
        }
      }
    },

    // minify css files
    cssmin: {
      libraries: {
        options: {
          report: 'gzip',
          keepSpecialComments: '0'
        },
        files: {
          'dist/public/css/app.min.css': [
            'public/components/html5-boilerplate/css/main.css',
            'public/components/html5-boilerplate/css/normalize.css',
            'public/components/fontawesome/css/font-awesome.css',
            'public/css/app.css'
          ]
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('default', [
    'clean:initialize',
    'bower_concat',
    'copy',
    'processhtml',
    'concat',
    'uglify',
    'cssmin',
    'clean:temporary'
  ]);

};