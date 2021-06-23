import sharp from 'sharp';
import path from 'path';

let fullimagesPath = path.join(__dirname, '../../full_images/');

async function convert(
  name: string,
  width: number,
  height: number
): Promise<string> {
  let fullPath = fullimagesPath + name + '.jpg';
  try {
    await sharp(fullPath)
      .resize(width, height)
      .toFile('./thumb/' + name + '_' + width + '_' + height + '.jpg');
    return 'success';
  } catch (error) {
    return 'error';
  }
}

export default convert;
