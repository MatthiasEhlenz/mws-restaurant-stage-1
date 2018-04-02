/**
 * @Date:   2018-04-02T00:59:35+02:00
 * @Last modified time: 2018-04-02T14:14:45+02:00
 */



module.exports = function(grunt) {
      grunt.initConfig({
        responsive_images: {
          dev: {
            options: {
              engine: 'gm',
              sizes: [{
                width: 270,
                suffix: '',
                quality: 30
              },
              {
                width: 540,
                suffix: '',
                quality: 50
              },
              {
                width: 800,
                suffix: '',
                quality: 100
              }]
            },
            files: [{
              expand: true,
              src: ['*.{gif,jpg,png}'],
              cwd: 'img/',
              dest: 'img-res/'
            }]
          }
        },

        clean: {
          dev: {
            src: ['img-res'],
          },
        },

        mkdir: {
          dev: {
            options: {
              create: ['img-res']
            },
          },
        },
      });
      grunt.loadNpmTasks('grunt-responsive-images');
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-mkdir');
      grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images']);
    };
