import { connectDB } from './database/db';
import express from 'express';
import cors from 'cors'
import { envs } from './config/envs';
import router from './routes/index.routes';


export class Server {

  private app;
  private port;

  constructor() {

    this.app = express();
    this.port = 3000;

    connectDB({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    }).then(() => console.log('====== Database Connected ======'))
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(__dirname + '/public'));

    // CORS
    this.app.use(cors())

    // parseo del body
    this.app.use(express.json());

    // API routes
    this.app.use( router )

  }

  execute() {

    // Inicializar Middlewares
    this.middlewares();

    // Inicializar Server
    this.app.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }

}