module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@": "./src"
      }
    }]
  ],
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
};
