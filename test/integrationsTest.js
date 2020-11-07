require('should');
const request = require('supertest');
const controller = require('../controller/controller');
const app = require('../app.js');
const { response } = require('../app.js');

describe('integration test - promise', function ()  {

    it("get('/') test", function (){
        return request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/);
    });

    it("get('/api/jokes') test", async () => {
        let response = await request(app)
            .get('/api/jokes')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.length.should.be.greaterThanOrEqual(1);
        response.body[1].setup.should.be.equal('setup.value')
        response.body[1].punchline.should.be.equal('punchline.value')
    })

    it("post('/jokes') test", async () => {
        let response = await request(app)
            .post('/api/jokes')
            .send({
                'punchline': 'Hvad kalder man to lamaer på en scooter', 
                'setup': 'Balamaer'
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(201);
        response = await controller.getJokes(); 
        response.length.should.be.greaterThanOrEqual(1); 
        response[0].setup.should.be.equal('Test fra per setup')
        response[0].punchline.should.be.equal('Tester Pers :D punchline');
        
    })
});
