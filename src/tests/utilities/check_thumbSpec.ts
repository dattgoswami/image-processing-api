import path from 'path';
import imageExists from '../../utilities/check_image_exists';

let fullimagesPath = path.join(__dirname, '../../../full_images/');
let thumbPath = path.join(__dirname, '../../../thumb/');

describe('check if image exist', () => {
  it('expects imageExists function to return false when the image does not exist in the full_images folder', async () => {
    expect(
      imageExists(fullimagesPath + 'abc.jpg', 200, 200, 'full_images')
    ).toEqual(false);
  });
  it('expects imageExists function to return false when the image does not exist in the thumb folder', async () => {
    expect(imageExists(thumbPath + 'fjord.jpg', 200, 200, 'thumb')).toEqual(
      false
    );
  });
});
