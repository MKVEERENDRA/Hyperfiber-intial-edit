# Hyperledger Fabric API

This repository contains a Node.js application that interfaces with a Hyperledger Fabric network. It provides a set of RESTful APIs for managing assets on the blockchain.

## Base URL

The base URL for the deployed application is:
https://humble-space-cod-7vrjg46gjvj2p6wg-3000.app.github.dev/

## API Endpoints

### 1. Initialize Ledger

**POST** `/ledger/init`

- **Description**: Initializes the ledger.
- **Response**:
  - `200 OK`: Ledger initialized successfully.
  - `500 Internal Server Error`: Error details.

### 2. Get All Assets

**GET** `/assets`

- **Description**: Retrieves all assets from the ledger.
- **Response**:
  - `200 OK`: Returns a list of assets.
  - `500 Internal Server Error`: Error details.

### 3. Create Asset

**POST** `/asset`

- **Description**: Creates a new asset.
- **Request Body**:
    ```json
    {
        "id": "string",           // Required: Asset ID
        "dealerId": "string",     // Required: Dealer ID
        "msisdn": "string",       // Required: MSISDN
        "mpin": "string",         // Required: MPIN
        "balance": number,        // Required: Balance
        "status": "string",       // Required: Status (active/inactive)
        "transAmount": number,    // Required: Transaction Amount
        "transType": "string",    // Required: Transaction Type
        "remarks": "string"       // Optional: Remarks
    }
    ```
- **Response**:
  - `200 OK`: Asset created successfully.
  - `400 Bad Request`: Missing required fields.
  - `500 Internal Server Error`: Error details.

### 4. Update Asset

**PUT** `/asset`

- **Description**: Updates an existing asset.
- **Request Body**: Same as `Create Asset`.
- **Response**:
  - `200 OK`: Asset updated successfully.
  - `400 Bad Request`: Missing required fields.
  - `500 Internal Server Error`: Error details.

### 5. Transfer Asset

**POST** `/asset/transfer`

- **Description**: Transfers an asset to a new owner.
- **Request Body**:
    ```json
    {
        "id": "string",           // Required: Asset ID
        "newOwner": "string"      // Required: New Owner ID
    }
    ```
- **Response**:
  - `200 OK`: Asset transferred successfully.
  - `500 Internal Server Error`: Error details.

### 6. Read Asset

**GET** `/asset/:id`

- **Description**: Reads the details of a specific asset by ID.
- **Response**:
  - `200 OK`: Returns asset details.
  - `500 Internal Server Error`: Error details.

### 7. Get Asset Transaction History

**GET** `/asset/:id/history`

- **Description**: Retrieves the transaction history for a specific asset.
- **Response**:
  - `200 OK`: Returns the transaction history.
  - `500 Internal Server Error`: Error details.

## Testing with Postman

You can use [Postman](https://www.postman.com/) to test these APIs. Here are the steps:

1. **Install Postman**: Download and install Postman from [postman.com](https://www.postman.com/downloads/).

2. **Set Up the Request**:
   - Open Postman and create a new request.
   - Set the request type (GET, POST, PUT) based on the API you want to test.
   - Enter the full API URL (e.g., `https://humble-space-cod-7vrjg46gjvj2p6wg-3000.app.github.dev/assets`).
   - For POST and PUT requests, select the `Body` tab and set it to `raw` and `JSON`. Paste the required JSON body.

3. **Send the Request**: Click the `Send` button and observe the response in Postman.

## Conclusion

This application provides a simple way to interact with a Hyperledger Fabric network through REST APIs. Feel free to test the endpoints and explore the functionality!

For any issues or feature requests, please create an issue in this repository.
