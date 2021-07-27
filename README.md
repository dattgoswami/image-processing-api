# Image Processing API

The task of this project was to read the images from the file system using the arguments from the query parameters. Once the file is located, the width and the height values are used to resize the image using sharp library. The image is then displayed in the given dimensions.

## Getting Started

The src folder has index.ts which creates the server and starts listening on port 3000. The routes folder has index.ts file which creates an express router and configures the images endpoint to use the module images from routes/api/images.ts. This file has a get method which parses the query parameters and processes the file if they are valid and the file exists. If there are not any parameters it indicates the user on how to use this api. The utilities folder has check_image_exists.ts which checks if the image that is being requested exists in the thumb folder first and then in the full_images folder and convert_images.ts file has a function convert() which does the conversion of the actual image to the required specification. It uses sharp library for doing this conversion.
All the tests are in the test folder in the file indexSpec.ts and utilities folder (has check_thumbSpec.ts, convert_imagesSpec.ts).
The original images are stored under the full_images folder and the processed(cached) images will be stored under the thumbs folder.
The spec folder contains the specifications related to jasmine.

## Instructions

Steps to run the project:
Once you have cloned the project from the github repo, navigate to the project directory.

```
npm install
npm run test
npm run start
//OR
node dist/index.js
```

To run the prettier and lint scripts use following commands:
npm run prettier
npm run lint

After running the npm run start or node dist/index.js you will be prompted that the server has started on port 3000.
Go to this url in the browser:
[http://localhost:3000/api/images?filename=fjord&width=200&height=200] - this link would open the existing thumbnail or create a new one and display it in your browser.
[http://localhost:3000/api/images?filename=test&width=200&height=200] - this link would not open anything and give you a message stating that this image does not exist.
[http://localhost:3000/api/] - this link would give you the endpoints that are available
[http://localhost:3000/api/images] - this link would give you a list of images that are available
