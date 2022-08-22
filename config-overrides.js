const { useBabelRc, override } = require("customize-cra")

const path = require("path")

const overrides = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,

      hooks: path.resolve(__dirname, "src/hooks"),
      types: path.resolve(__dirname, "src/types"),
    },
  }
  return config
}

module.exports = override(overrides, useBabelRc())
