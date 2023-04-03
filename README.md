# Store API
This API is built with Node.js, Express, MongoDB, and Mongoose to provide a simple store API that includes features such as pagination, search, sort, and numeric filters.

## Endpoints
### Get all static products
`GET /api/static/products`
This endpoint retrieves all products available in the store / database.

### Get all products
`Get /api/products`
This endpoint retrieves 10 products from the store / database by default, if limit is set then it returns the number set.

##### Query Parameters


#### Response
The response would include an array of products, as well as the number or length of products returned.



### Get a single product
`GET /api/v1/products/:id`
This endpoint retrieves a single product by ID from the database / store.

##### Parameters


Response
The response will include the product object


## Installation
1. Clone the repository:
   `git clone https:github.com/omolara5861/store-api.git`

2. Install the dependencies:
   `cd store-api && npm install`

3. Set up the environment variables:
   Create a `.env` file int he root directory and set the following variables:
   `MONGODB_URI = <your_mongodb_uri>
   PORT = <port_number>
   `

4. Dynamically add products to database:
   `node populate.js`

5. Start the server:
   `npm start`