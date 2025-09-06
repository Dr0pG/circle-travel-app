// expo config plugin to add use_modular_headers! to Podfile
const { withDangerousMod } = require('@expo/config-plugins');

/**
 * Adds `use_modular_headers!` to the top of the Podfile.
 */
const withModularHeaders = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const fs = require('fs');
      const path = require('path');
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
      if (fs.existsSync(podfilePath)) {
        let podfile = fs.readFileSync(podfilePath, 'utf8');
        if (!podfile.includes('use_modular_headers!')) {
          podfile = podfile.replace(/(platform :ios.*\n)/, `$1use_modular_headers!\n`);
          fs.writeFileSync(podfilePath, podfile);
        }
      }
      return config;
    },
  ]);
};

module.exports = withModularHeaders;
