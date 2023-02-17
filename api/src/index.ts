/* eslint-disable indent */
import path from 'node:path';

import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://0.0.0.0:27017')
	.then(() => {
		const app = express();
		const port = 3001;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

		app.listen(port, () => {
			console.log(`Example app listening on http://localhost:${port}`);
		});

	})
	.catch(err => console.log('erro ao conectara ao mongodb:'+err));



