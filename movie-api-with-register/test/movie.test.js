const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
chai.use(chaiHttp);

let token;
// testlerimizi ne testi oldugunu acikliyoruz.
describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'myilmaz2', password: '12345'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET Movies', () => {
        it('it should GET all the movies', (done) => {
           chai.request(server)
               .get('/api/movies')
               .set('x-access-token', token)
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  done();
               });
        });

    });
});