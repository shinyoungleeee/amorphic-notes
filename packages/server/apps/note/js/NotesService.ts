import * as express from 'express';
import { Express } from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import router from './router';

export default class NotesService {
  server: Express;

  constructor() {
    this.server = express();

    let port = 8080;
    console.log('Starting server...');

    this.server
      .use(morgan('combined'))
      .use(bodyParser.json())
      .use('/api/v1', router)
      .listen(port, () => console.log(`Listening on port ${port}`));
  }
}
