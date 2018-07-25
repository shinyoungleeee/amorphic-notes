import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Express } from 'express';

import router from './router';

export default class NotesService {
  server: Express;

  constructor() {
    this.server = express();

    let port = 3015;
    console.log('Starting server...');

    this.server
      .use(bodyParser.json())
      .use('/api/v1', router)
      .listen(port, () => console.log(`Listening on port ${port}`));
  }
}
