// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig, mergeConfig } = require("expo/metro-config");
const path = require("path");
const { withNativeWind } = require("nativewind/metro");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

if (process.env.EXPO_PUBLIC_IS_STORYBOOK === "false") {
  console.log("Using Storybook config");
}

const storybook_config = withStorybook(config, {
  // Set to false to remove storybook specific options
  // you can also use a env variable to set this
  enabled: true,
  // Path to your storybook config
  configPath: path.resolve(__dirname, "./.storybook"),

  // Optional websockets configuration
  // Starts a websocket server on the specified port and host on metro start
  // websockets: {
  //   port: 7007,
  //   host: 'localhost',
  // },
});
const nativeWind_config = withNativeWind(storybook_config, {
  input: "./app/global.css",
});

module.exports = nativeWind_config;
