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

afterAll(async () => await mongoose.connection.close())
