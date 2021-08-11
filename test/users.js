import request from '../config/common';
import { expect } from 'chai';
require('dotenv').config();


const TOKEN = process.env.USER_TOKEN;
const faker = require('faker');

describe('Users', () => {
    let id;
    let data;

    before(() => {
        data = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            gender: 'female',
            status: 'active'
        }
    });
    
    describe('POST', () => {
        it('/users', async () => {
            await request.post('users').set('Authorization', TOKEN).send(data).then((res) => {
                expect(res.status).to.equal(201);
                id = res.body.data.id;
                expect(id).to.be.a('number').above(0);
                expect(res.body.data).to.deep.include(data);
            });
        });
    });

    describe('GET', () => {
        it('/users', async () => {
            await request.get('users').then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.all.keys('meta', 'data').to.be.an('object').that.is.not.empty;
                expect(res.body.data).to.be.an('array').that.is.not.empty;
                res.body.data.forEach(data => {
                    expect(data).to.have.all.keys('id', 'name', 'email', 'gender', 'status').to.be.an('object').that.is.not.empty;
                    expect(data.id).to.be.a('number').above(0);
                    expect(data.name).to.be.a('string').that.is.not.empty;
                    expect(data.email).to.be.a('string').that.is.not.empty;
                    expect(data.gender).to.be.a('string').that.is.not.empty;
                    expect(data.status).to.be.a('string').that.is.not.empty;
                });
            });
        });

        it('/users/:id', async () => {
            await request.get(`users/${id}`).then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data.id).to.equal(id);
                expect(res.body.data).to.deep.include(data);
            });
        });
    });

    describe('PUT', () => {
        it('/users/:id', async () => {
            data = {
                name: faker.name.firstName(),
                email: faker.internet.email(),
                gender: 'male',
                status: 'inactive'
            }
    
            await request.put(`users/${id}`).set('Authorization', TOKEN).send(data).then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data.id).to.equal(id);
                expect(res.body.data).to.deep.include(data);
            });
        });
    });
    

    describe('DELETE', () => {
        it('/users/:id', async () => {
            await request.delete(`users/${id}`).set('Authorization', TOKEN).then((res) => {
                expect(res.status).to.equal(204);
                expect(res.body.data).to.not.exist;
            });
        });
    });
});