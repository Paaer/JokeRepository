require('should');
const controller = require("../controller/controller");

describe('controller test - promise', function() {
    it('getJokes() test', async () => {
        let jokes = await controller.getJokes(); 
        jokes.length.should.be.greaterThanOrEqual(1);
        jokes[0].setup.should.be.equal('Hvad kalder man to lamaer på en scooter')
        jokes[0].punchline.should.be.equal('Balamaer')
        jokes[1].punchline.should.be.equal('Mågebilepay')
    });
});