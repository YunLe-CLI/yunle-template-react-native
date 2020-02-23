module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "babel-plugin-inline-import",
      {
        "extensions": [".svg"]
      }
    ],
    ["transform-inline-environment-variables"],
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@": "./src",
        "@Global": "./src",
        "@Theme": "./src/theme",
      }
    }]
  ],
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
};
