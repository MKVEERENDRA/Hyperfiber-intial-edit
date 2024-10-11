
const grpc = require('@grpc/grpc-js');
const { connect, hash, signers } = require('@hyperledger/fabric-gateway');
const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');
const { TextDecoder } = require('node:util');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const channelName = envOrDefault('CHANNEL_NAME', 'mychannel');
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'basic');
const mspId = envOrDefault('MSP_ID', 'Org1MSP');

const cryptoPath = envOrDefault(
    'CRYPTO_PATH',
    path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'test-network',
        'organizations',
        'peerOrganizations',
        'org1.example.com'
    )
);

const keyDirectoryPath = envOrDefault(
    'KEY_DIRECTORY_PATH',
    path.resolve(
        cryptoPath,
        'users',
        'User1@org1.example.com',
        'msp',
        'keystore'
    )
);

const certDirectoryPath = envOrDefault(
    'CERT_DIRECTORY_PATH',
    path.resolve(
        cryptoPath,
        'users',
        'User1@org1.example.com',
        'msp',
        'signcerts'
    )
);

const tlsCertPath = envOrDefault(
    'TLS_CERT_PATH',
    path.resolve(cryptoPath, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt')
);

const peerEndpoint = envOrDefault('PEER_ENDPOINT', 'localhost:7051');
const peerHostAlias = envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');

const utf8Decoder = new TextDecoder();
let gateway;
let contract;

async function initializeFabric() {
    const client = await newGrpcConnection();
    gateway = connect({
        client,
        identity: await newIdentity(),
        signer: await newSigner(),
        hash: hash.sha256,
        evaluateOptions: () => ({ deadline: Date.now() + 10000 }), 
        endorseOptions: () => ({ deadline: Date.now() + 20000 }), 
        submitOptions: () => ({ deadline: Date.now() + 10000 }), 
        commitStatusOptions: () => ({ deadline: Date.now() + 60000 }),
    });

    const network = gateway.getNetwork(channelName);
    contract = network.getContract(chaincodeName);
}


app.post('/ledger/init', async (req, res) => {
    try {
        await contract.submitTransaction('InitLedger');
        res.json({ message: 'Ledger has initialized successfully' });
    } catch (error) {
        console.error('Error initializing ledger:', error);
        res.status(500).json({ error: 'Failed to the initialize ledger you can refer veerendravamsi66@gmail.com', details: error.message });
    }
});

app.get('/assets', async (req, res) => {
    try {
        const resultBytes = await contract.evaluateTransaction('GetAllAssets');
        const result = JSON.parse(utf8Decoder.decode(resultBytes));
        res.json(result);
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ error: 'Failed to retrieve assets  you can refer veerendravamsi66@gmail.com', details: error.message });
    }
});

app.post('/asset', async (req, res) => {
    const { id, dealerId, msisdn, mpin, balance, status, transAmount, transType, remarks } = req.body;
    if (!id || !dealerId || !msisdn || !mpin || balance === undefined || !status) {
        return res.status(400).json({ error: 'Pls Fill the required fields' });
    }

    try {
        await contract.submitTransaction(
            'CreateAsset',
            id,
            dealerId,
            msisdn,
            mpin,
            balance,
            status,
            transAmount.toString(),
            transType,
            remarks
        );
        res.json({ message: `Asset ${id} created successfully` });
    } catch (error) {
        console.error('Error creating asset:', error);
        res.status(500).json({ error: 'Failed to create asset you can refer veerendravamsi66@gmail.com', details: error.message });
    }
});

app.put('/asset', async (req, res) => {
    const { id, dealerId, msisdn, mpin, balance, status, transAmount, transType, remarks } = req.body;
    if (!id || !dealerId || !msisdn || !mpin || balance === undefined || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await contract.submitTransaction(
            'UpdateAsset',
            id,
            dealerId,
            msisdn,
            mpin,
            balance.toString(),
            status,
            transAmount.toString(),
            transType,
            remarks
        );
        res.json({ message: `Asset ${id} updated successfully` });
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ error: 'Failed to update asset you can refer veerendravamsi66@gmail.com', details: error.message });
    }
});

app.post('/asset/transfer', async (req, res) => {
    const { id, newOwner } = req.body;
    try {
        const oldOwner = await contract.submitTransaction('TransferAsset', id, newOwner);
  res.json({ message: `Successfully transferred the asset ${id} from ${oldOwner} to ${newOwner}` });
    } catch (error) {
     console.error('Error transferring asset:', error);
        res.status(500).json({ error: 'Failed to transfer asset you can refer veerendravamsi66@gmail.com' });
    }
});

app.get('/asset/:id', async (req, res) => {
    const { id } = req.params;
    try {
   const resultBytes = await contract.evaluateTransaction('ReadAsset', id);
  const result = JSON.parse(utf8Decoder.decode(resultBytes));
        res.json(result);
    } catch (error) {
  console.error('Error reading asset:', error);
        res.status(500).json({ error: 'Failed to read asset you can refer veerendravamsi66@gmail.com', details: error.message });
    }
});

app.get('/asset/:id/history', async (req, res) => {
    const { id } = req.params;
    try {
    const resultBytes = await contract.evaluateTransaction('GetAssetTransactionHistory', id);
      const result = JSON.parse(utf8Decoder.decode(resultBytes));
        res.json(result);
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        res.status(500).json({ error: 'Failed to retrieve transaction history you can refer veerendravamsi66@gmail.com', details: error.message });
    }
});

async function newGrpcConnection() {
    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': peerHostAlias,
    });
}

async function newIdentity() {
    const certPath = await getFirstDirFileName(certDirectoryPath);
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
}

async function newSigner() {
    const keyPath = await getFirstDirFileName(keyDirectoryPath);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

async function getFirstDirFileName(dirPath) {
    const files = await fs.readdir(dirPath);
    const file = files[0];
    if (!file) {
      throw new Error(`No files in directory: ${dirPath}`);
    }
    return path.join(dirPath, file);
}

function envOrDefault(key, defaultValue) {
    return process.env[key] || defaultValue;
}

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    await initializeFabric();
});
