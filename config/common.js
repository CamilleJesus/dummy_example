import supertest from 'supertest';
import test from '../config/test';
const request = supertest(test.baseUrl);

export default request;