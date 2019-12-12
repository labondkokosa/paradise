import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
const { json } = require('body-parser');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka() // You can also use Express
	.use(
		json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({session: (req, res) => ({
			user: req.user,
			password: req.password
		})})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

export default app.handler; 