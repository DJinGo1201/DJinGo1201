'use strict'

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    open: false,
                    port: 8080,
                    hostname: '*',
                    livereload: 35729,
                    base: {
                        path: './',
                        options: {
                            index: 'reader.html'
                        }
                    }
                }
            }
        },

        watch: {
            server: {
                options: {
                    livereload: '<%= connect.server.options.livereload %>' //监听前面声明的端口  35729
                },
                files: [ //下面文件的改变就会实时刷新网页
                    'js/reader.js',
                    './reader.html',
                    'css/reader_style.css'
                ]
            }
        }
    });
    grunt.registerTask('serve', [
        'connect:server',
        'watch'
    ]);
}
