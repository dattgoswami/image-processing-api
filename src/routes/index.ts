import express from 'express';
import images from './api/images';

//routes object that will be applied to endpoint /api
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('endpoint available is images');
});

routes.use('/images', images);

export default routes;
