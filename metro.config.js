// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig, mergeConfig } = require("expo/metro-config");

const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("cjs");

// if (process.env.EXPO_PUBLIC_IS_STORYBOOK === "false") {
//   console.log("Using Storybook config");
// }

const nativeWind_config = withNativeWind(config, {
  input: "./app/global.css",
  inlineRem: 10,
});

module.exports = nativeWind_config;
