'use strict';

const request = require('supertest'),
    endpoint = 'http://localhost:3000/',
    client = request(endpoint),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),

    expect = chai.expect;

chai.use(chaiAsPromised);

module.exports = (db) => {
    let token;

    const user = {
        "name": "test",
        "email": "test@test.com",
        "password": "test",
        "role": "student"
    };

    describe('GET /books', () => {


        beforeEach((done) => {
            db.models.User.remove({})
                .then(() => {
                    return db.models.Book.remove({});
                }).then(() => {
                    return client.post('users/create')
                        .type('json')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .send(user);
                })
                .then((res) => {
                    return client.post('users/signin')
                        .type('json')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .send(user);
                })
                .then((res) => {
                    token = res.body.data.token;
                    done();
                }).catch((err) => {
                    done(err);
                });
        });


        it('should get an empty list of books', (done) => {
            client.get('books')
                .type('json')
                .set('Accept', 'application/json')
                .query({
                    token: token
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(
                    (res) => {
                        expect(res.statusCode).to.eql(200);
                        expect(res.body.data.books).to.be.eql([]);
                    }
                )
                .end(done);
        });

    });
}