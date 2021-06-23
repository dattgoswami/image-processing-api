import express from 'express';
import path from 'path';
import fs from 'fs';
import convert from './../../utilities/convert_images';
import imageExists from '../../utilities/check_image_exists';

const images = express.Router();

let displayMessage =
  ' Please select an image from: \n' +
  '1. encenadaport \n' +
  '2. fjord \n' +
  '3. icelandwaterfall \n' +
  '4. palmtunnel \n' +
  '5. santamonica .\n' +
  ' You will have to pass the query parameters in url: filename(without its extension), width and height separated by an &.' +
  ' Example: http://localhost:3000/api/images?filename=fjord&width=200&height=200';

console.log(displayMessage);

let thumbPath = path.join(__dirname, '../../../thumb/');

images.get('/', async (req, res) => {
  let width = Number(req.query.width);
  let height = Number(req.query.height);
  let name: string = req.query.filename as unknown as string;
  if (Object.keys(req.query).length === 0) {
    //if the user does not provide any parameters
    res.send(displayMessage);
  } else if (imageExists(name, width, height, 'thumb')) {
    //if the image already exists in the thumb folder
    res.sendFile(thumbPath + name + '_' + width + '_' + height + '.jpg');
  } else if (imageExists(name, width, height, 'full_images')) {
    //if the image exists in the original full_images folder
    await convert(name, width, height);
    res.sendFile(thumbPath + name + '_' + width + '_' + height + '.jpg');
  } else {
    //the image that is being requested does not exist
    res.send(
      'The image that you have requested does not exist.' + displayMessage
    );
  }
});

export default images;
