module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ["import", { libraryName: "@ant-design/react-native" }]
  ],
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
};
