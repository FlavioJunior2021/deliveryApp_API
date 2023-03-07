/* eslint-disable indent */
import path from 'node:path';
import http from 'node:http';
import { Server } from 'socket.io';

import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

mongoose.set('strictQuery', true);

const app = express();
const server = http.createServer(app);
export const io = new Server(server);


mongoose.connect('mongodb://0.0.0.0:27017')
	.then(() => {
    io.emit('orders@new');

		const port = 3001;

    app.use((req, res, next)=>{
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

		server.listen(port, () => {
			console.log(`Example app listening on http://localhost:${port}`);
		});

	})
	.catch(err => console.log('erro ao conectara ao mongodb:'+err));



