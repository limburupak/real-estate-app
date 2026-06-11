cat > plugins/withAndroidPickFirst.js << 'EOF'
const { withBuildGradle } = require('@expo/config-plugins');

module.exports = function withAndroidPickFirst(config) {
  return withBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      // Add the pickFirst line at the end of the android block
      const pickFirstLine = '        pickFirst \'META-INF/versions/9/OSGI-INF/MANIFEST.MF\'';
      
      // Check if already added
      if (!config.modResults.contents.includes(pickFirstLine)) {
        // Find the android block and add pickFirst inside packagingOptions
        const androidBlockMatch = config.modResults.contents.match(/android\s*\{([^]*?)\n\s*\}/);
        
        if (androidBlockMatch) {
          const androidBlock = androidBlockMatch[0];
          
          // Check if packagingOptions exists
          if (androidBlock.includes('packagingOptions {')) {
            // Add pickFirst inside existing packagingOptions
            const newAndroidBlock = androidBlock.replace(
              /(packagingOptions\s*\{[^]*?)(\n\s*\})/,
              `$1\n${pickFirstLine}$2`
            );
            config.modResults.contents = config.modResults.contents.replace(androidBlock, newAndroidBlock);
          } else {
            // Add packagingOptions block before the closing brace of android
            const newAndroidBlock = androidBlock.replace(
              /(\n\s*\})$/,
              `\n    packagingOptions {\n${pickFirstLine}\n    }\n$1`
            );
            config.modResults.contents = config.modResults.contents.replace(androidBlock, newAndroidBlock);
          }
        }
      }
    }
    return config;
  });
};
EOF