module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: ['test/public/index.html']
      },

      sass: {
        files: ['test/public/assets/sass/**/*.{scss,sass}', 'test/public/assets/scss/_partials/**/*.{scss,sass}'],
        tasks: ['sass:dist']
      }
    },

    postcss: {
      options: {
        map: {
          inline: true
        },
        processors: [
          require('autoprefixer-core')({browsers: 'last 3 versions'}),
          require('css-mqpacker')()
        ]
      },
      dist: {
        src: 'test/public/assets/css/*.css',
        dest: 'test/public/assets/css/app.css'
      }
    },

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed',
        includePaths: [
          'node_modules/bootstrap-sass/assets/stylesheets',
          'node_modules/node-bourbon/assets/stylesheets'
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'test/public/assets/sass',
          src: ['**/*.scss'],
          dest: 'test/public/assets/css/',
          ext: '.css'
        }]
      }
    },

    scsslint: {
      options: {
        colorizeOutput: true,
        config: 'test/public/assets/sass/.scss-lint.yml'
      },
      dist: {
        src: 'test/public/assets/sass/*.scss'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('bootstrap-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-scss-lint');

  // Default task(s).
  grunt.registerTask('validate', ['scsslint:dist']);
  grunt.registerTask('production', ['postcss:dist']);
  grunt.registerTask('default', ['watch']);
};