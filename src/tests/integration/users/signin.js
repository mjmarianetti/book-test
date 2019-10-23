'use strict';

const request = require('supertest'),
    endpoint = 'http://localhost:3000/',
    client = request(endpoint),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),

    expect = chai.expect;

chai.use(chaiAsPromised);

module.exports = (db) => {
    describe('POST /users/signin', () => {

        const user = {
            "name": "test",
            "email": "test@test.com",
            "password": "test",
            "role": "student"
        };

        before((done) => {
            db.models.User.remove({})
                .then(() => {
                    return db.models.Book.remove({});
                }).then(() => {
                    return db.models.User.create(user);
                })
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                })
        });

        it('should return a new jwt token', (done) => {

            client.post('users/signin')
                .type('json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send(user)
                .expect(200)
                .then((res) => {
                    expect(res.statusCode).to.eql(200);
                    expect(res.body.status).to.be.eql('success');
                    expect(res.body.data.token).to.be.not.undefined;
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
}