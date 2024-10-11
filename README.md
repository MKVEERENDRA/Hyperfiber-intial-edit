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
  
#### Example Request
http
POST https://humble-space-cod-7vrjg46gjvj2p6wg-3000.app.github.dev/ledger/init

Example Response
{
    "message": "Ledger initialized successfully"
}

2. Get All Assets
GET /assets

Description: Retrieves all assets from the ledger.
Response:
200 OK: Returns a list of assets.
500 Internal Server Error: Error details.
Example Request

GET https://humble-space-cod-7vrjg46gjvj2p6wg-3000.app.github.dev/assets
Example Response
[
    {
        "ID": "asset1",
        "DEALERID": "dealer1",
        "MSISDN": "1234567890",
        "MPIN": "1234",
        "BALANCE": 300,
        "STATUS": "active",
        "TRANSAMOUNT": 0,
        "TRANSTYPE": "",
        "REMARKS": ""
    },
    {
        "ID": "asset2",
        "DEALERID": "dealer2",
        "MSISDN": "0987654321",
        "MPIN": "5678",
        "BALANCE": 400,
        "STATUS": "active",
        "TRANSAMOUNT": 0,
        "TRANSTYPE": "",
        "REMARKS": ""
    }
]
3. Create Asset
POST /asset

Description: Creates a new asset.
Request Body
 
  
{
    "id": "asset3",           // Required: Asset ID
    "dealerId": "dealer3",   // Required: Dealer ID
    "msisdn": "1122334455",   // Required: MSISDN
    "mpin": "91011",         // Required: MPIN
    "balance": 500,          // Required: Balance
    "status": "active",      // Required: Status (active/inactive)
    "transAmount": 0,        // Required: Transaction Amount
    "transType": "",         // Required: Transaction Type
    "remarks": ""            // Optional: Remarks
}
Response:
200 OK: Asset created successfully.
400 Bad Request: Missing required fields.
500 Internal Server Error: Error details.
Example Request
http
  
POST https://humble-space-cod-7vrjg46gjvj2p6wg-3000.app.github.dev/asset
Content-Type: application/ 

{
    "id": "asset3",
    "dealerId": "dealer3",
    "msisdn": "1122334455",
    "mpin": "91011",
    "balance": 500,
    "status": "active",
    "transAmount": 0,
    "transType": "",
    "remarks": ""
}
Example Response
 
  
{
    "message": "Asset asset3 created successfully"
}
4. Update Asset
PUT /asset

Description: Updates an existing asset.
Request Body
(Same structure as Create Asset)

Example Request
http
  
PUT https://humble-space-cod-7vrjg46gjvj2p6wg-3000.app.github.dev/asset
Content-Type: application/ 

{
    "id": "asset1",
    "dealerId": "dealer1",
    "msisdn": "1234567890",
    "mpin": "1234",
    "balance": 350,
    "status": "active",
    "transAmount": 50,
    "transType": "credit",
    "remarks": "Updated balance"
}
Example Response
 
  
{
    "message": "Asset asset1 updated successfully"
}
5. Transfer Asset
POST /asset/transfer

Description: Transfers an asset to a new owner.
Request Body
 
  
{
    "id": "asset2",           // Required: Asset ID
    "newOwner": "dealer3"     // Required: New Owner ID
}
Response:
200 OK: Asset transferred successfully.
500 Internal Server Error: Error details.
Example Request
http
  
POST https://humble-space-cod-7vrjg46gjvj2p6wg-3000.app.github.dev/asset/transfer
Content-Type: application/ 

{
    "id": "asset2",
    "newOwner": "dealer3"
}
Example Response
 
  
{
    "message": "Successfully transferred asset asset2 from dealer2 to dealer3"
}
6. Read Asset
GET /asset/:id

Description: Reads the details of a specific asset by ID.
Example Request
http
  
GET https://humble-space-cod-7vrjg46gjvj2p6wg-3000.app.github.dev/asset/asset1
Example Response
 
  
{
    "ID": "asset1",
    "DEALERID": "dealer1",
    "MSISDN": "1234567890",
    "MPIN": "1234",
    "BALANCE": 300,
    "STATUS": "active",
    "TRANSAMOUNT": 0,
    "TRANSTYPE": "",
    "REMARKS": ""
}
7. Get Asset Transaction History
GET /asset/:id/history

Description: Retrieves the transaction history for a specific asset.
Example Request
http
  
GET https://humble-space-cod-7vrjg46gjvj2p6wg-3000.app.github.dev/asset/asset1/history
Example Response
 
  
[
    {
        "transactionId": "tx1",
        "assetId": "asset1",
        "timestamp": "2024-10-11T12:00:00Z",
        "transType": "credit",
        "transAmount": 50,
        "remarks": "Initial deposit"
    },
    {
        "transactionId": "tx2",
        "assetId": "asset1",
        "timestamp": "2024-10-12T15:00:00Z",
        "transType": "debit",
        "transAmount": 30,
        "remarks": "Withdrawal"
    }
]
Testing with Postman
You can use Postman to test these APIs. Here are the steps:

Install Postman: Download and install Postman from postman.com.

Set Up the Request:

Open Postman and create a new request.
Set the request type (GET, POST, PUT) based on the API you want to test.
Enter the full API URL (e.g., https://humble-space-cod-7vrjg46gjvj2p6wg-3000.app.github.dev/assets).
For POST and PUT requests, select the Body tab and set it to raw and  . Paste the required   body.
Send the Request: Click the Send button and observe the response in Postman.

Conclusion
This application provides a simple way to interact with a Hyperledger Fabric network through REST APIs. Feel free to test the endpoints and explore the functionality!

For any issues or feature requests, please create an issue in this repository.

Instructions to Add the Updated README to Your GitHub Repository
Create or Update the README File:

Open your terminal or command prompt.
Navigate to your project directory.
Open README.md in a text editor.
Copy the content provided above and paste it into the file.
Commit and Push:

Save the file and close the editor.
Commit the changes:
  
git add README.md
git commit -m "Update README file with sample API requests and responses"
Push to your GitHub repository:

  
git push origin main
This updated README provides clear examples for each API endpoint, making it easier for users to understand how to use the API effectively. Let me know if you need any more changes or additions!

vbnet
  

Feel free to copy this entire block into your README file. Let me know if you need further adjustments!
