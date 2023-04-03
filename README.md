# Store API
This API is built with Node.js, Express, MongoDB, and Mongoose to provide a simple store API that includes features such as pagination, search, sort, and numeric filters.

## Endpoints
### Get all static products
```
GET /api/static/products
```
This endpoint retrieves all products available in the store / database.

### Get all products
```
Get /api/products
```
This endpoint retrieves 10 products from the store / database by default, if limit is set then it returns the number set.

### Query Parameters
| Parameter | Type | Description |
  ---------   ----   -----------
| `page`    | number | The page number of products to return (default: 1) |
| `limit`   | number | The number of products per page (default: 10) |
| `sort`    | string | The field and order to sort the products. Use MongoDB's __sort method__ format. (example: `{price: 1}` to sort by price in ascending order, or `{rating: -1}` for descending order)
| `featured` | boolean | Returns only featured products |
| `company` | string | Returns only products by the company provided |
| `name` | string | Returns products that the name property includes the name provided |
| `fields` | string | Returns only products with the properties of the field provided. Multiple fields can be comma-separated. (example: `name, price, company`) |


### Response
The response would include an array of products, as well as the number or length of products returned.

```json
{
    "msg": "Products fetched successfully",
    "nbHits": 2,
    "products": [
        {
            "_id": "60d09ef85f01c41a387af27f",
            "name": "Product 1",
            "price": 200,
            "featured": true,
            "company": "Company A",
            "createdAt": "2023-04-03T14:20:40.589Z",
            "rating": 4.5
        },
         {
            "_id": "60d09ef85f01c41a387af280",
            "name": "Product 2",
            "price": 300,
            "featured": false,
            "company": "Company B",
            "createdAt": "2023-04-03T14:20:40.589Z",
            "rating": 3.8
         }
    ]
}
```

### Get a single product
```
GET /api/v1/products/:id
```
This endpoint retrieves a single product by ID from the database / store.

### Parameters
| Parameter | Type | Description |
  --------    ----   -----------
|  `id`     | string | The ID of the product. |

### Response
The response will include the product object

```json
{
   "msg": "Product fetched successfully",
   "product": [{
       "_id": "60d09ef85f01c41a387af27f",
       "name": "Product 1",
       "price": 200,
       "featured": true,
       "company": "Company A",
       "createdAt": "2023-04-03T14:20:40.589Z",
       "rating": 4.5
   }]
}
```

## Installation
1. Clone the repository:
   ```
   git clone https:github.com/omolara5861/store-api.git
   ```

2. Install the dependencies:
   ```
   cd store-api && npm install
   ```

3. Set up the environment variables:
   Create a `.env` file int he root directory and set the following variables:
   ```
   MONGODB_URI = <your_mongodb_uri>
   PORT = <port_number>
   ```

4. Dynamically add products to database:
   ```
   node populate.js
   ```

5. Start the server:
   ````
   npm start
   ````


## Contributing
If you find a bug or have a feature request, please open an issue on the GitHub repository.

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m "Add feature name"`
4. Push your changes to your forked repository: `git push origin feature-name`
5. Create a pull request on the original repository.

Please make sure your code is well commented.