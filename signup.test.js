
const request = require('supertest');
const app = require('./app');


it('POST /users/signup', async () => {
 const res = await request(app).post('/users/signup').send({
   email: 'lacapsule@gmail.com',
   username: 'lacapsule',
   password: 'lacapsule123',
   passwordverif: 'lacapsule123',
 });

 expect(res.statusCode).toBe(200);
 expect(res.body.result).toBe(true);
});