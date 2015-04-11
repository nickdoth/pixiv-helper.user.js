module.exports = function(grunt) {
  var SRC_PATH = './src';
  var LIB_PATH = './lib';

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'build/pixiv-helper.js': ['index.js'],
        },
        options: {
          transform: ['reactify', 'envify']
        }
      }
    },
    concat: {
      options: {
        separator: '\n\n',
      },
      dist: {
        src: ['userscript-header.js', 'build/pixiv-helper.js'],
        dest: 'build/pixiv-helper.user.js',
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');


  grunt.registerTask('build', ['browserify', 'concat']);
}