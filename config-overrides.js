const { useBabelRc, override } = require("customize-cra")

const path = require("path")

const overrides = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      store: path.resolve(__dirname, "src/app/store.ts"),
      features: path.resolve(__dirname, "src/features"),
      hooks: path.resolve(__dirname, "src/hooks"),
      pages: path.resolve(__dirname, "src/pages"),
      types: path.resolve(__dirname, "src/types"),
      utils: path.resolve(__dirname, "src/utils/index.ts"),
    },
  }
  return config
}

module.exports = override(overrides, useBabelRc())
