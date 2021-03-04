module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://ttapi.research.itcast.cn/',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
