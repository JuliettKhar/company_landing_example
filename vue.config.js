module.exports = {
  productionSourceMap: false,
  css: {
    sourceMap: true,
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `
          @charset "utf-8";
          @import "~bulma/sass/utilities/initial-variables.sass";
          @import "~bulma/sass/utilities/functions.sass";
          @import "~bulma/sass/utilities/derived-variables.sass";
          @import "~bulma/sass/utilities/mixins.sass";
        `
      }
    }
  },
  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  }
}
