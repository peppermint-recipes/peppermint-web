module.exports = {
  devServer: {
    proxy: 'http://127.0.0.1:1337',
  },
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    proxy: 'http://localhost:1337/',
  },
};
