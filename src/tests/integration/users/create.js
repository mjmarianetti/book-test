'use strict';


const request = require('supertest'),
    endpoint = 'http://localhost:3000/',
    client = request(endpoint),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

module.exports = (db) => {

    describe('POST /users/create', () => {

        before((done) => {
            db.models.User.remove({})
                .then(() => {
                    return db.models.Book.remove({});
                })
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                })
        });

        const user = {
            "name": "test",
            "email": "test@test.com",
            "password": "test",
            "role": "student"
        };

        it('should register a new user', (done) => {

            client.post('users/create')
                .type('json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send(user)
                .expect(200)
                .then((res) => {
                    expect(res.statusCode).to.eql(200);
                    expect(res.body.data).to.have.property('user');
                    expect(res.body.data.user.email).to.be.eql(user.email);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
}