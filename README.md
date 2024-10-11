
##### If you'd like to test all the API endpoints using Postman, here are examples for each API request you can use with the provided base URL. Follow the steps below to make the API calls.

Base URL for Testing APIs:
## https://ominous-guacamole-vx47j9rj9w6hw9vv-3000.app.github.dev
Test the API

##### Initialize Ledger
Method: POST
Endpoint: /ledger/init
URL: https://ominous-guacamole-vx47j9rj9w6hw9vv-3000.app.github.dev/ledger/init
Example Request:
No request body is needed.
Example Response:
json
Copy code
{
  "message": "Ledger initialized successfully"
}
##### 2. Get All Assets
Method: GET
Endpoint: /assets
URL: https://ominous-guacamole-vx47j9rj9w6hw9vv-3000.app.github.dev/assets
Example Request:
No request body is needed.
Example Response:

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
##### 3. Create a New Asset
Method: POST
Endpoint: /asset
URL: https://ominous-guacamole-vx47j9rj9w6hw9vv-3000.app.github.dev/asset
Content-Type: application/json
Example Request:

{
  "id": "asset4",
  "dealerId": "dealer4",
  "msisdn": "4455667788",
  "mpin": "1415",
  "balance": 600,
  "status": "active",
  "transAmount": 0,
  "transType": "",
  "remarks": "New dealer account"
}
Example Response:

{
  "message": "Asset asset4 created successfully"
}
##### 4. Update an Asset
Method: PUT
Endpoint: /asset
URL: https://ominous-guacamole-vx47j9rj9w6hw9vv-3000.app.github.dev/asset
Content-Type: application/json
Example Request:

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
Example Response:

{
  "message": "Asset asset1 updated successfully"
}
##### 5. Transfer an Asset
Method: POST
Endpoint: /asset/transfer
URL: https://ominous-guacamole-vx47j9rj9w6hw9vv-3000.app.github.dev/asset/transfer
Content-Type: application/json
Example Request:

{
  "id": "asset2",
  "newOwner": "dealer3"
}
Example Response:

{
  "message": "Successfully transferred asset asset2 from dealer2 to dealer3"
}
##### 6. Read an Asset
Method: GET
Endpoint: /asset/:id
URL: https://ominous-guacamole-vx47j9rj9w6hw9vv-3000.app.github.dev/asset/asset1
Example Response:

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
##### 7. Get Asset Transaction History
Method: GET
Endpoint: /asset/:id/history
URL: https://ominous-guacamole-vx47j9rj9w6hw9vv-3000.app.github.dev/asset/asset1/history
Example Response:

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
###### If you want to work on your Own Then Pls Follow this steps below 
 #### Steps to Install and Setup the Network
#### Navigate to Your Project Directory:



cd Hyperfiber-intial-edit
Install Hyperledger Fabric:



curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.5.0
#### Go to the Fabric Test Network Directory:



cd fabric-samples/test-network
Stop Any Existing Network:

bash

./network.sh down
#### Start the Network with CA Enabled and Create a Channel:


sudo ./network.sh up createChannel -ca -c mychannel
#### Deploy the Chaincode:


./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript
#### Set Environment Variables for the Peer:



export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

#### Invoke the Chaincode:



peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'
Running the Node.js Application
#### Go to the Node.js Application Directory:



cd asset-transfer-basic/application-gateway-javascript
#### Install Required Dependencies:


npm i
#### Start the Node.js Server:



npm start
#### The server should start at http://localhost:3000.

Accessing and Testing the APIs
Once the server is running locally, you can access the API endpoints using the following examples:

#### 1. Initialize Ledger
POST /ledger/init
#### Example:


POST http://localhost:3000/ledger/init
Response:


{
  "message": "Ledger initialized successfully"
}
#### 2. Get All Assets
GET /assets
#### Example:


GET http://localhost:3000/assets
#### Response: A list of assets in the ledger.
#### 3. Create Asset (Example for Dealer 3)
POST /asset
#### Example:


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
Response:

{
  "message": "Asset asset3 created successfully"
}
#### 4. Update Asset
PUT /asset
#### Example:


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
Response:


{
  "message": "Asset asset1 updated successfully"
}
#### 5. Transfer Asset
POST /asset/transfer
#### Example:


{
  "id": "asset2",
  "newOwner": "dealer3"
}
Response:


{
  "message": "Successfully transferred asset asset2 from dealer2 to dealer3"
}
#### 6. Read Asset
GET /asset/:id
#### Example:


GET http://localhost:3000/asset/asset1
#### 7. Get Asset Transaction History
GET /asset/:id/history

#### Example:

GET http://localhost:3000/asset/asset1/history
This guide will help you set up and run your Hyperledger Fabric network, deploy the asset transfer chaincode, and use a Node.js application to interact with the blockchain via RESTful APIs.
