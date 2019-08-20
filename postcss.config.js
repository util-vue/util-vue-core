module.exports = {
  plugins: {
    autoprefixer: { browsers: "last 5 version" },
    "postcss-plugin-px2rem": {
      rootValue: 75,
      exclude: /(node_module)/,
      selectorBlackList: [],
      propBlackList: ["border", "background", "background-image"]
    }
  }
};
