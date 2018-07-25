import * as express from 'express';
import { Request, Response, NextFunction } from 'express';

import Note from '../../common/js/Note';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction): void => {
  console.log('Time: ', Date.now())
  console.log('Next Object: ', next);
  next()
})

router.post('/notes/create', async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    let msg = req.body.message;
    let note = new Note(msg);
    await note.save();
    return res.send('saved the note');
  }
  catch(error) {
    console.log({ req: req, err: error })
    return res.status(500).send({ error: error.message });
  }
});

export default router;
