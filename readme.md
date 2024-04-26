# Birthday Email

## Installation Instructions

- Step 1: Download the code or clone this repository.

- Step 2: Rename the `.env.examples` file with `.env`.

- Step 3: Copy the credentials that are provided by the email and replace them or you can use your own credentials.

- Step 4: Run:
``` 
npm install
```

- Step 5: Run:
``` 
npm run dev
```

## Customer API References

### Base_Url: `https://birthday-mailer.vercel.app/`

### `Get Customers` <span style="color:Green;">(GET)</span>
```
{{Base_Url}}/v1/customers/

This is a GET request and it is used to "get" data from an endpoint. There is no request body for a GET request.
```
```json
Response:

{
    "status": 200,
    "statusType": "success",
    "message": "Customers fetched successfully",
    "meta": {
        "total": 3
    },
    "data": [
        {
            "_id": "6627f0a36c4adbafec36d63c",
            "name": "Md. Nagib Mahfuz Suho",
            "email": "nmsubho@gmail.com",
            "birthdate": "1996-04-26T00:00:00.000Z",
            "id": "6627f0a36c4adbafec36d63c"
        },
        {
            "_id": "6627f154d75d8550221a44db",
            "name": "Salman Islam",
            "email": "salman@email.com",
            "birthdate": "1998-03-21T00:00:00.000Z",
            "id": "6627f154d75d8550221a44db"
        },
        {
            "_id": "6627f16ed75d8550221a44dc",
            "name": "Joy Shah",
            "email": "joy@email.com",
            "birthdate": "2001-08-12T00:00:00.000Z",
            "id": "6627f16ed75d8550221a44dc"
        }
    ]
}

```

### `Get Customer By ID` <span style="color:Green;">(GET)</span>
```
{{Base_Url}}/v1/customers/6627f0a36c4adbafec36d63c

This is a GET request and it is used to "get" a single data from an endpoint. There is no request body for a GET request.
```
```json
Response:

{
    "status": 200,
    "statusType": "success",
    "message": "Customer fetched successfully",
    "meta": null,
    "data": {
        "_id": "6627f0a36c4adbafec36d63c",
        "name": "Md. Nagib Mahfuz Suho",
        "email": "nmsubho@gmail.com",
        "birthdate": "1996-04-26T00:00:00.000Z",
        "id": "6627f0a36c4adbafec36d63c"
    }
}

```

### `Add Customer` <span style="color:#FFDD33;">(POST)</span>
```
{{Base_Url}}/v1/customers

This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response.
```
```json
Body:

{
    "name": "Nagib Mahfuz",
    "email": "subho@email.com",
    "birthdate": "2000-04-27"
}

```

### `Update Customer` <span style="color:#5DADE2;">(PUT)</span>
```
{{Base_Url}}/v1/customers/6627f0a36c4adbafec36d63c

This is a PUT request and it is used to overwrite an existing piece of data. For instance, after you create an entity with a POST request, you may want to modify that later. You can do that using a PUT request.
```
```json
Body:

{
    "name": "Nagib Mahfuz",
    "email": "subho@email.com",
    "birthdate": "2000-04-27"
}

```

### `Delete Customer` <span style="color:red;">(DELETE)</span>
```
{{Base_Url}}/v1/customers/6627f0a36c4adbafec36d63c

This is a DELETE request, and it is used to delete data that was previously created via a POST request.
```
```json
Body:

{
    "name": "Nagib Mahfuz",
    "email": "subho@email.com",
    "birthdate": "2000-04-27"
}

```