// Importar node packages
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

// SERVER ROUTES
import { database } from './config/context/database.js';
import { routes } from './routes/index.js';

// SEED DATA

//--REST SERVER--//
const server = express();

// client can be postman | react website | react localhost link | etc
const clientURL = '*';

// CORS options
const corsOptions = {
	origin: clientURL,
};
server.use(cors(corsOptions));

// output dados de pedido HTTP - logger
server.use(morgan('short'));

// parse dados dos pedidos no content-type - application/json
server.use(express.json());

// http://localhost:4242/api ......
server.use('/api', routes);

//Fazer ligação à Base de Dados
// npm install --save mysql2
try {
	database.sync({ force: false, alter: true });
} catch (error) {
	console.info(error);
}

// correr server no url host:port definido em .env
server.listen(process.env.SERVER_PORT, () => {
	console.log('Server up and running at :%s', process.env.SERVER_PORT);
});
