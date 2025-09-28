const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const setSwiftExplicitModules = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const pbxprojPath = path.join(
        projectRoot,
        "ios",
        `${config.ios?.projectName ?? "YourApp"}.xcodeproj`,
        "project.pbxproj"
      );

      if (fs.existsSync(pbxprojPath)) {
        let contents = fs.readFileSync(pbxprojPath, "utf8");
        const regex = /SWIFT_ENABLE_EXPLICIT_MODULES = YES;/g;
        contents = contents.replace(
          regex,
          "SWIFT_ENABLE_EXPLICIT_MODULES = NO;"
        );
        if (!contents.includes("SWIFT_ENABLE_EXPLICIT_MODULES = NO;")) {
          // If not present, add it to all build configurations
          contents = contents.replace(
            /buildSettings = {([\s\S]*?)}/g,
            (match) =>
              match.includes("SWIFT_ENABLE_EXPLICIT_MODULES")
                ? match
                : match.replace(
                    /buildSettings = {([\s\S]*?)}/,
                    (m, p1) =>
                      `buildSettings = {${p1}\n\t\t\t\tSWIFT_ENABLE_EXPLICIT_MODULES = NO;`
                  )
          );
        }
        fs.writeFileSync(pbxprojPath, contents);
      }
      return config;
    },
  ]);
};

module.exports = setSwiftExplicitModules;
