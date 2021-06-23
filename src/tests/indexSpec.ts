import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

//checking the response of endpoint with supertest
describe('test endpoint response', () => {
  it('gets the /api/images endpoint', async (done) => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
    done();
  });
});
