import express from 'express';
import cors from 'cors'


export class Server {

  private app;
  private port;

  constructor() {

    this.app = express();
    this.port = 3000;
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(__dirname + '/public'));

    // CORS
    this.app.use(cors())

    // parseo del body
    this.app.use(express.json());

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