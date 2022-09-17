const { useBabelRc, override } = require("customize-cra")

const path = require("path")

const overrides = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      assets: path.resolve(__dirname, "src/assets"),
      components:path.resolve(__dirname, "src/components"),
      store: path.resolve(__dirname, "src/app/store.ts"),
      features: path.resolve(__dirname, "src/features"),
      hooks: path.resolve(__dirname, "src/hooks"),
      pages: path.resolve(__dirname, "src/pages"),
      types: path.resolve(__dirname, "src/types"),
      utils: path.resolve(__dirname, "src/utils/index.ts"),
      theme: path.resolve(__dirname, "src/theme.ts"),
    },
  }
  return config
}

module.exports = override(overrides, useBabelRc())
