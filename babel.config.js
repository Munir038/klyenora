module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@theme': './src/theme',
          '@types': './src/types',
          '@store': './src/store',
          '@config': './src/config',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
