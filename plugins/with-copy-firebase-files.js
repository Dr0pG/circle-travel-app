const { withDangerousMod } = require('@expo/config-plugins');

/**
 * Copies google-services.json and GoogleService-Info.plist to their native locations before pod install and gradle sync.
 */
const withCopyFirebaseFiles = (config) => {
  // iOS: Copy GoogleService-Info.plist
  config = withDangerousMod(config, [
    'ios',
    async (config) => {
      const fs = require('fs');
      const path = require('path');
      const src = path.join(config.modRequest.projectRoot, 'GoogleService-Info.plist');
      const dest = path.join(config.modRequest.projectRoot, 'ios', 'GoogleService-Info.plist');
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log('Copied GoogleService-Info.plist to ios/');
      }
      return config;
    },
  ]);

  // Android: Copy google-services.json
  config = withDangerousMod(config, [
    'android',
    async (config) => {
      const fs = require('fs');
      const path = require('path');
      const src = path.join(config.modRequest.projectRoot, 'google-services.json');
      const dest = path.join(config.modRequest.projectRoot, 'android', 'app', 'google-services.json');
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log('Copied google-services.json to android/app/');
      }
      return config;
    },
  ]);

  return config;
};

module.exports = withCopyFirebaseFiles;
