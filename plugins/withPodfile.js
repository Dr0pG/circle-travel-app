// expo config plugin to add info to Podfile
const { withDangerousMod } = require('@expo/config-plugins');

const withModularHeaders = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const fs = require('fs');
      const path = require('path');
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
      if (fs.existsSync(podfilePath)) {
        let podfile = fs.readFileSync(podfilePath, 'utf8');

        // Remove all existing use_frameworks! :linkage => :static and $RNFirebaseAsStaticFramework = true lines
        podfile = podfile.replace(/use_frameworks! :linkage => :static\s*\n?/g, '');
        podfile = podfile.replace(/\$RNFirebaseAsStaticFramework = true\s*\n?/g, '');

        // Insert the two lines after the exact ENV line as in the Podfile
        const exactEnvLine = 'use_frameworks! :linkage => ENV[\'USE_FRAMEWORKS\'].to_sym if ENV[\'USE_FRAMEWORKS\']';
        const lines = podfile.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim() === exactEnvLine) {
            lines.splice(i + 1, 0, 'use_frameworks! :linkage => :static', '$RNFirebaseAsStaticFramework = true');
            break;
          }
        }
        podfile = lines.join('\n');

        fs.writeFileSync(podfilePath, podfile);
      }
      return config;
    },
  ]);
};

module.exports = withModularHeaders;
