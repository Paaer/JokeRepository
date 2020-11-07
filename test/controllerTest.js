require('should');
const controller = require("../controller/controller");

describe('controller test - promise', function() {
    it('getJokes() test', async () => {
        let jokes = await controller.getJokes(); 
        jokes.length.should.be.greaterThanOrEqual(1);
        jokes[0].setup.should.be.equal('Test fra per setup')
        jokes[0].punchline.should.be.equal('Tester Pers :D punchline')
        jokes[1].punchline.should.be.equal('punchline.value')
    });
});