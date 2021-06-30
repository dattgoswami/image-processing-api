import express from 'express';
import path from 'path';
import redis from 'redis';
import convert from './../../utilities/convert_images';
// import imageExists from '../../utilities/check_image_exists';
import imageExists from '../../utilities/check_image_exists';
const images = express.Router();

//redis
const redisPort: number = 6379;
const client = redis.createClient(redisPort);

let displayMessage =
  ` Please select an image from: \n` +
  '1. encenadaport \n' +
  '2. fjord \n' +
  '3. icelandwaterfall \n' +
  '4. palmtunnel \n' +
  '5. santamonica .\n' +
  ' You will have to pass the query parameters in url: filename(without its extension), width and height separated by an &.' +
  ' Example: http://localhost:3000/api/images?filename=fjord&width=200&height=200';

console.log(displayMessage);

let thumbPath = path.join(__dirname, '../../../thumb/');

images.get('/', async (req: express.Request, res: express.Response) => {
  let width = Number(req.query.width);
  let height = Number(req.query.height);
  let name: string = req.query.filename as unknown as string;
  let digits: RegExp = /[0-9]/;
  if (Object.keys(req.query).length === 0) {
    //if the user does not provide any parameters
    res.send(displayMessage);
  }
  if (
    digits.test(width.toString()) &&
    digits.test(height.toString()) &&
    width < 10000 &&
    height < 10000
  ) {
    let fileNameWPath = thumbPath + name + '_' + width + '_' + height + '.jpg';
    let fileName = name + '_' + width + '_' + height;
    if (check_redis(fileName)) {
      //if the image already exists in the thumb folder
      res.sendFile(get_filepath(fileName));
    } else if (imageExists(name, width, height, 'full_images')) {
      //if the image exists in the original full_images folder
      await convert(name, width, height);
      client.set(fileName, fileNameWPath);
      res.sendFile(fileNameWPath);
    } else {
      //the image that is being requested does not exist
      res.send(
        'The image that you have requested does not exist.' + displayMessage
      );
    }
  } else {
    res.send('please enter valid numbers in the width and height feild');
  }
});

function check_redis(fileName: string): boolean {
  client.get(fileName, (err, data) => {
    if (data !== null) {
      return true;
    } else if (err) {
      return false;
    }
  });
  return false;
}
function get_filepath(fileName: string): string {
  client.get(fileName, (err, data) => {
    if (data !== null) {
      return data;
    } else if (err) {
      return '';
    }
  });
  return '';
}

export default images;

// images.get('/', async (req: express.Request, res: express.Response) => {
//   let width = Number(req.query.width);
//   let height = Number(req.query.height);
//   let name: string = req.query.filename as unknown as string;
//   let digits: RegExp = /[0-9]/;
//   if (Object.keys(req.query).length === 0) {
//     //if the user does not provide any parameters
//     res.send(displayMessage);
//   }
//   if (
//     digits.test(width.toString()) &&
//     digits.test(height.toString()) &&
//     width < 10000 &&
//     height < 10000
//   ) {
//     if (imageExists(name, width, height, 'thumb')) {
//       //if the image already exists in the thumb folder
//       res.sendFile(thumbPath + name + '_' + width + '_' + height + '.jpg');
//     } else if (imageExists(name, width, height, 'full_images')) {
//       //if the image exists in the original full_images folder
//       await convert(name, width, height);
//       let fileNameWPath =
//         thumbPath + name + '_' + width + '_' + height + '.jpg';
//       res.sendFile(fileNameWPath);
//     } else {
//       //the image that is being requested does not exist
//       res.send(
//         'The image that you have requested does not exist.' + displayMessage
//       );
//     }
//   } else {
//     res.send('please enter valid numbers in the width and height feild');
//   }
// });
