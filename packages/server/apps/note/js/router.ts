import * as express from 'express';
import { Request, Response } from 'express';

import Note from '../../common/js/Note';

const router = express.Router();

router.post('/notes/create', async (req: Request, res: Response) => {
  try {
    const reqBody: Note = req.body;
    console.log(reqBody);
    const note = new Note(reqBody.body);
    await note.save();
    return res.json({ body: 'saved the note' });
  } catch(error) {
    return res.status(500).send({ error: error.message });
  }
});

export default router;
