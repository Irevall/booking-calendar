const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = require('./webpack.prod.config')

config.plugins.push(new BundleAnalyzerPlugin())

module.exports = config
