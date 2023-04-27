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
  it('Sucessfully returns all products in the database', async () => {
    const res = await req(app).get('/api/v1/products/static')
    expect(res.statusCode).toBe(200)
    expect(res.body.data.length).toBeGreaterThan(10)
    expect(res.body.data.length).toEqual(23)
    expect(res.body.msg).toBe('Products Fetched Successfully')
  })

  it('Successfully returns 10 products from the database', async () => {
    const res = await req(app).get('/api/v1/products')
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe('Products Fetched Successfully')
    expect(res.body.data.length).toBeGreaterThan(0)
    expect(res.body.data.length).toBe(10)
  })

  it('Successfully returns the product with the requested ID', async () => {
    const ID = '64369c4582d3643be4872682'
    const res = await req(app).get(`/api/v1/products/${ID}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe('Product fetched successfully')
    expect(res.body.data.length).not.toBe(0)
    expect(res.body.data.length).toBe(1)
    expect(res.body.data).toHaveProperty('name')
    expect(res.body.data).toHaveProperty('rating')
    expect(res.body.data).toHaveProperty('price')
    expect(res.body.data).toHaveProperty('createdAt')
  })

  it('Throws an error when no product match the provided ID', async () => {
    const ID = '64369c4592d3643be4872682'
    const res = await req(app).get(`/api/v1/products/${ID}`)
    expect(res.statusCode).toBe(404)
    expect(res.body).not.toHaveProperty('data')
    expect(res.body.msg).toBe(`No product with the provided id '${ID}'`)
  })
})

afterAll(async () => await mongoose.connection.close())
