/* eslint-disable no-undef */
require('dotenv').config()
const mongoose = require('mongoose')
const req = require('supertest')
const app = require('../../src/app')

beforeAll(async () => mongoose.connect(process.env.MONGODB_URI))

describe('Store API Test', () => {
  it('Returns 10 products from the database', async () => {
    const res = await req(app).get('/')
    expect(res.statusCode).toBe(200)
  })
})

afterAll(async () => mongoose.disconnect(process.env.MONGODB_URI))
