import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;
//we want our endpoint api to use routes as middleware
app.use('/api', routes);
//this part creates the server
app.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});

export default app;
