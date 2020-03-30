"use strict";
exports.__esModule = true;
var path_1 = require("path");
var antd_theme_generator_1 = require("antd-theme-generator");
var webpack_plugin_antd_theme = {
    antDir: path_1["default"].join(__dirname, './node_modules/antd'),
    stylesDir: path_1["default"].join(__dirname, './src/themes'),
    varFile: path_1["default"].join(__dirname, './src/themes/skins/default.less'),
    mainLessFile: path_1["default"].join(__dirname, './src/global.less'),
    themeVariables: ['@primary-color']
};
antd_theme_generator_1.generateTheme(webpack_plugin_antd_theme)
    .then(function () {
    console.log('Theme generated successfully');
})["catch"](function (error) {
    console.log('Error', error);
});
