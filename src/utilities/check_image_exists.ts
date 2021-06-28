import fs from 'fs';
import path from 'path';

function imageExists(
  name: string,
  width: number,
  height: number,
  folder: string
): boolean {
  //here we use the parameter folder to create the path which will be used to  fetch the image
  let folderPath = '../../' + folder + '/';
  let filePath = path.join(__dirname, folderPath);
  let fileName = '';
  //as the filename styles differ in the case of resized images and original images
  if (folder === 'thumb') {
    fileName = name + '_' + width + '_' + height + '.jpg';
  } else if (folder === 'full_images') {
    fileName = name + '.jpg';
    let imagePath = path.join(__dirname, '../../full_images/');
  }
  // returns true if the file exists
  if (fs.existsSync(filePath + fileName)) {
    return true;
  }
  // fs.access(filePath + fileName, (err) => {
  //   if (err) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // });
  return false;
}

export default imageExists;
