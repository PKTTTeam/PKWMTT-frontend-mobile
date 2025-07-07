const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    /* optionally customize here */
    assetExts: defaultConfig.resolver.assetExts,
    sourceExts: defaultConfig.resolver.sourceExts,
  },
  transformer: {
    /* if you use SVGs or other custom transforms, set them here */
    babelTransformerPath: defaultConfig.transformer.babelTransformerPath,
  },
};

module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(defaultConfig, config),
);
