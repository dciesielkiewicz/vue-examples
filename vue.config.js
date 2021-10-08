module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Vuetify Examples";
      return args;
    });
  },
  transpileDependencies: ["vuetify"],
};
