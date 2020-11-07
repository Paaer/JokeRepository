require('should');
const request = require('supertest');
const controller = require('../controller/controller');
const app = require('../app.js');
const { response } = require('../app.js');

describe('integration test - promise', function () {

    it("get('/') test", function (){
        return request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/);
    });

    it("get('/jokes') test", async () => {
        let respones = await request(app)
            .get('/jokes')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.length.should.be.greaterThanOrEqual(1);
        response.body[1].setup.should.be.equal('Hvad er mågernes ynglings betalings måde?')
        response.body[1].punchline.should.be.equal('Mågebilepay')
    })

    it("post('/jokes') test", async () => {
        let response = await request(app)
            .post('/jokes')
            .send({
                'punchline': 'Hvad kalder man to lamaer på en scooter', 
                'setup': 'Balamaer'
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);
        response = await controller.getJokes(); 
        response.length.should.be.greaterThanOrEqual(1); 
        response[0].setup.should.be.equal('Hvad kalder man to lamaer på en scooter')
        response[0].punchline.should.be.equal('Balamaer');
        
    })
});