/* eslint-disable no-undef */
require('dotenv').config()
const mongoose = require('mongoose')
const req = require('supertest')
const app = require('../../src/app')

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
})

describe('Store API Test', () => {
  it('Returns 10 products from the database', async () => {
    const res = await req(app).get('/api/v1/products')
    expect(res.statusCode).toBe(200)
    expect(res.length).toBeGreaterThan(0)
  })
})

afterAll(async () => await mongoose.connection.close())
