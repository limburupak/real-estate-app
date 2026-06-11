const { withProjectBuildGradle } = require('@expo/config-plugins');

module.exports = function withAndroidPickFirst(config) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      if (!config.modResults.contents.includes('pickFirst \'META-INF/versions/9/OSGI-INF/MANIFEST.MF\'')) {
        if (config.modResults.contents.includes('packagingOptions {')) {
          config.modResults.contents = config.modResults.contents.replace(
            'packagingOptions {',
            'packagingOptions {\n        pickFirst \'META-INF/versions/9/OSGI-INF/MANIFEST.MF\''
          );
        } else {
          config.modResults.contents = config.modResults.contents.replace(
            'androidResources {',
            'packagingOptions {\n        pickFirst \'META-INF/versions/9/OSGI-INF/MANIFEST.MF\'\n    }\n\n    androidResources {'
          );
        }
      }
    }
    return config;
  });
};