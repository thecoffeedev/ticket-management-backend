const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

const MongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5500;
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017'


app.post("/add-ticket", async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('ticket_service_db');
        req.body.role = 'agent';
        req.body.created_at = new Date();
        let result = await db.collection('tickets').insertOne(req.body);
        res.status(200).json({message: 'ticket has been added successfully'})
        client.close();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.get('/tickets', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('ticket_service_db');
        let result = await db.collection('tickets').find().toArray();
        res.status(200).json({message: 'tickets have been fetched successfully', result});
        client.close();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.put('/update-ticket/:id', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('ticket_service_db');
        let result = await db.collection('tickets').findOneAndUpdate({_id: objectId(req.params.id)}, {$set: req.body});
        res.status(200).json({message: 'ticket have been updated successfully'});
        client.close();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.post('/new-agent', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('ticket_service_db');
        let result = await db.collection('agents').insertOne(req.body);
        res.status(200).json({message: 'agent has been added successfully'});
        client.close();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.get('/agents', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('ticket_service_db');
        let result = await db.collection('agents').find().toArray();
        res.status(200).json({message: 'agents details has been fetched successfully', result})
        client.close();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.get('/agent-detail/:id', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('ticket_service_db');
        let result = await db.collection('agents').findOne({_id: objectId(req.params.id)});
        res.status(200).json({message: 'agent details has been fetched successfully', result});
        client.close();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.put('/update-agent/:id', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('ticket_service_db');
        let result = await db.collection('agents').findOneAndUpdate({_id: objectId(req.params.id)}, {$set: req.body});
        res.status(200).json({message: 'agent has been updated successfully'});
        client.close();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.post('/new-contact', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('ticket_service_db');
        let result = await db.collection('contacts').insertOne(req.body);
        res.status(200).json({});
        client.close();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.get('/contacts', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('ticket_service_db');
        let result = await db.collection('contacts').find().toArray();
        res.status(200).json({message: 'contacts have been fetched successfully', result});
        client.close();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.post('/update-contact/:id', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('ticket_service_db');
        let result = await db.collection('contacts').findOneAndUpdate({_id: objectId(req.params.id)}, {$set: req.body});
        res.status(200).json({message: 'contact has been updated successfully'});
        client.close();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.listen(port, () => console.log(port))