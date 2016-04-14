exports.config =
  files:
    javascripts:
      joinTo: 
        'js/app.js': /^app/
        #'js/vendor.js': /^(bower_components|vendor)[\\/]/
    stylesheets:
      joinTo: 'css/app.css'
  modules:
    wrapper: false
    definition: false
  plugins:
    sass:
      options:
        includePaths: [
          'bower_components/bem-constructor/dist'
          'bower_components/susy/sass'
          'bower_components/modular-scale/stylesheets'
          'bower_components/compass-mixins/lib'
          'bower_components/compass-breakpoint/stylesheets'
        ]
    jaded:
      staticPatterns: /^app(\/|\\)static(\/|\\)(.+)\.jade$/
    postcss:
      processors: [
        require('autoprefixer')
      ]
    babel:
      ignore: [
        /^(bower_components|vendor)/
      ]