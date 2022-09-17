const { defineConfig } = require("cypress");

const execa = require('execa')
const findBrowser = () => {
  // the path is hard-coded for simplicity
  const browserPath =
    '/usr/bin/brave-browser-stable'

  return execa(browserPath, ['--version']).then((result) => {
    // STDOUT will be like "Brave Browser 77.0.69.135"
    const [, version] = /Brave Browser (\d+\.\d+\.\d+\.\d+)/.exec(result.stdout)
    const majorVersion = parseInt(version.split('.')[0])

    return {
      name: 'Brave',
      channel: 'stable',
      family: 'chromium',
      displayName: 'Brave',
      version,
      path: browserPath,
      majorVersion,
    }
  })
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return findBrowser().then((browser) => {
        return {
          browsers: config.browsers.concat(browser),
        }
      })
    },
  },
});
