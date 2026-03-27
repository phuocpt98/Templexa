const sharp = require('sharp');
sharp('D:/project/demo/template/products/shared/images/wedding/icons/gate-iron-floral-watercolor.webp')
  .metadata()
  .then(m => console.log('HasAlpha:', m.hasAlpha, 'Channels:', m.channels, 'Size:', m.width + 'x' + m.height));
