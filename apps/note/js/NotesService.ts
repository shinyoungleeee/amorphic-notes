import * as restify from 'restify';

import Note from '../../common/js/Note';

export default class NotesService {
  server: restify.Server;

  constructor() {
    this.server = restify.createServer({ name: 'NotesService' });

    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser());
    this.setupRoutes();
    this.start();
  }

  async start() {
    let port = 3015;
    console.log('Starting server...');

    return new Promise((resolve, reject) => {
      this.server.listen(port, () => {
        console.log(`Listening at port ${this.server.url}`);
        resolve();
      });
      this.server.on('error', e => {
        console.log('NotesService Failed');
        reject(e);
      });
    });
  }

  protected setupRoutes() {
    this.server.post('/notes/create', async (req, res) => {
      try {
        console.log(req.body);
        let msg = req.body.message;
        let note = new Note(msg);
        await note.save();
        return res.send(200, 'saved the note');
      }
      catch(error) {
        console.log({ req: req, err: error })
        return res.send(500, error.message);
      }
    });
  }
}
