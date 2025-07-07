// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// Needed for zustand "Uncaught SyntaxError: import.meta may only appear in a module"
// See: https://github.com/pmndrs/zustand/discussions/1967
config.resolver.unstable_conditionNames = ['browser', 'require', 'react-native']

// Add path alias support
config.resolver.alias = {
  '~': path.resolve(__dirname, '.'),
}

module.exports = config
