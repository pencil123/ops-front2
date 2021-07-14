const { override, addWebpackAlias, addLessLoader } = require("customize-cra");
const path = require("path");

module.exports = override(
  // 路径别名
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
  }),
  // 修改Less 中的变量
  addLessLoader({
    javascriptEnabled: true,
     strictMath: false,
    noIeCompat: true,
    modifyVars: {
      "@layout-header-background": "#0d325e", // for example, you use Ant Design to change theme color.
      "@component-background": "#0d325e",
      "@background-color-light":"#0d2749",
      "@primary-1":"#005fb3",
    },
    cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
    cssModules: {
      localIdentName: "[path][name]__[local]--[hash:base64:5]", // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    },
  })
);
