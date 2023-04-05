# Store API

[![LICENSE](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

This API is built with Node.js, Express, MongoDB, and Mongoose to provide a simple store API that includes features such as pagination, search, sort, and numeric filters.

## Documentation
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/18030526-a717aa2b-7353-4bbc-8809-eac21760e737?action=collection%2Ffork&collection-url=entityId%3D18030526-a717aa2b-7353-4bbc-8809-eac21760e737%26entityType%3Dcollection%26workspaceId%3Dbb9ada3e-bb74-4fbc-86ad-0d4067495471)
> API Documentation in postman \
> NOTE: For test fork this postman collection

<br />

## Endpoints

### Get all static products
```
GET /api/static/products
```
This endpoint retrieves all products available in the store / database.

<br />

### Get all products
```
Get /api/products
```
This endpoint retrieves 10 products from the store / database by default, if limit is set then it returns the number set.

### Query Parameters
| Parameter    | Type    | Description                                                                                                                                                                            |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`page\`     | number  | The page number of products to return (default: 1)                                                                                                                                     |
| \`limit\`    | number  | The number of products per page (default: 10)                                                                                                                                          |
| \` sort \`     | string  | The field and order to sort the products. Use MongoDB's **sort method** format. (example: \`{price: 1}\` to sort by price in ascending order, or \`{rating: -1}\` for descending order) |
| \`featured\` | boolean | Returns only featured products                                                                                                                                                         |
| \`company\`  | string  | Returns only products by the company provided                                                                                                                                          |
| \`name\`     | string  | Returns products that the name property includes the name provided                                                                                                                     |
| \`fields\`   | string  | Returns only products with the properties of the field provided. Multiple fields can be comma-separated. (example: `name, price, company`)                                             |

### Response
The response would include an array of products, as well as the number or length of products returned.

```json
{
    "msg": "Products fetched successfully",
    "nbHits": 2,
    "products": [
        {
            "featured": false,
            "rating": 4.5,
            "createdAt": "2023-03-14T09:00:49.460Z",
            "_id": "641037cbcd55415fc04a29ea",
            "name": "leather sofa",
            "price": "99",
            "company": "caressa",
            "__v": 0
        },
        {
            "featured": true,
            "rating": 4.5,
            "createdAt": "2023-03-14T09:00:49.460Z",
            "_id": "641037cbcd55415fc04a29e9",
            "name": "high-back bench",
            "price": "39",
            "company": "ikea",
            "__v": 0
        }
    ]
}
```
<br />

### Get a single product
```
GET /api/v1/products/:id
```
This endpoint retrieves a single product by ID from the database / store.

### Parameters
| Parameter | Type   | Description            |
|-----------|--------|------------------------|
| `id`      | string | The ID of the product. |

### Response
The response will include the product object

```json
{
    "msg": "Product fetched successfully",
    "product": {
        "featured": false,
        "rating": 4.6,
        "createdAt": "2023-03-14T09:00:49.460Z",
        "_id": "641037cbcd55415fc04a29e5",
        "name": "bar stool",
        "price": "40",
        "company": "liddy",
        "__v": 0
    }
}
```

<br />

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


<br />

## Contributing
If you find a bug or have a feature request, please open an issue on the GitHub repository.

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m "Add feature name"`
4. Push your changes to your forked repository: `git push origin feature-name`
5. Create a pull request on the original repository.

Please make sure your code is well commented.

<br />

## License
This software is licensed under the
[MIT license](https://opensource.org/licenses/MIT).
Please see the [LICENSE file](LICENSE.md) for more information.

> You can do whatever you want as long as you include the original copyright and
> license notice in any copy of the software/source.


*Copyright (c) 2023 Laradev. All right reserved.*