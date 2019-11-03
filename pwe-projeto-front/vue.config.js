
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer:{
    proxy: 'http://localhost:8081',
    public: '192.168.1.35:8081',
    watchOptions: {
      poll: true
    }
  }
}