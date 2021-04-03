module.exports = {
  devServer: {
    proxy: 'http://192.168.0.23:7331',
  },
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    proxy: 'http://localhost:1337/',
  },
};
