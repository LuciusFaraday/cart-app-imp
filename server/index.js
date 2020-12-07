const { MongoClient, ObjectId, ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const { CartsController } = require('./controllers/carts');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb";
const client = new MongoClient(url);

function cartActions(db) {
	const cartsCollection = db.collection('cart');

	app.get('/api/carts', (req, res) => {
		cartsCollection.find({}).toArray((err, carts) => {
			if (err)
				return console.error(err);
			res.json(carts);
		});
	});

	app.get('/api/carts/:id', (req, res) => {
		const id = new ObjectId(req.params.id);
		cartsCollection.findOne({ _id: id }, (err, cart) => {
			if (err)
				return console.error(err);
			res.json(cart);
		});
	});

	app.post('/api/carts', (req, res) => {
		cartsCollection.insertOne(req.body, (err, result) => {
			if (err)
				return console.error(err);
			var _cart;
			cartsCollection.findOne({ _id: result.insertedId }, (err, cart) => {
				if (err)
					return console.error(err);
				_cart = cart;
				res.json(_cart);
			});
		});
	});

	app.put('/api/carts', (req, res) => {
		var newCart = req.body;
		const id = new ObjectId(req.body._id);
		delete newCart._id;
		cartsCollection.replaceOne({ _id: id }, newCart, (err, result) => {
			res.sendStatus(200);
		});
	});

	app.delete('/api/carts/:id', (req, res) => {
		const id = new ObjectId(req.params.id);
		cartsCollection.deleteOne({ _id: id }, (err, result) => {
			if (result.deletedCount == 1)
			{
				res.sendStatus(200);
			} else {
				res.sendStatus(500);
			}
		});
	})
};

function cartTypeActions(db) {
	const cartTypeCollection = db.collection('cartType');

	app.get('api/cartTypes', (req, res) => {
		cartTypeCollection.find({}).toArray((err, result) => {
			if (err)
				return console.error(err);
			res.json(result);
		});
	})

	app.get('api/cartTypes/:id', (req, res) => {
		const id = new ObjectId(req.params.id);
		cartTypeCollection.findOne({ _id: id }, (err, result) => {
			if (err)
				return console.error(err);
			res.json(result);
		});
	});

	app.post('api/cartTypes', (req, res) => {
		const count = await cartTypeCollection.countDocuments({}, (err, result) => {
			if (err)
				return console.error(err);
			if (result >= 10)
				res.json({ errorCode: 1 });
		});
			res.status(500);
		
		// cartTypeCollection.insertOne()
	});
}

async function run() {
	try {
		await client.connect();

		const database = client.db('cartDb');
		cartActions(database);
		cartTypeActions(database);

		app.listen(3000, () => {
			console.log('Server is running on port 3000.');
		});
	} finally {
		return;
	}
}

run().catch(console.dir);
client.close();