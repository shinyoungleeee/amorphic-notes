import * as express from 'express';
import { Request, Response } from 'express';

import Note from '../../common/js/Note';

const router = express.Router();

router
  // CREATE:
  .post('/', async (req: Request, res: Response) => {
    const reqBody: Note = req.body;
    const note = new Note(reqBody.body);
    note.save();
    // TODO: Returns local version of note, not persisted note. Way to do this
    // without persistor query?
    return res.json(note.serialize());
  })
  // READ:
  .get('/', async (req: Request, res: Response) => {
    const notes: Note[] = await Note.all();
    const serializedNotes: object[] = notes.map(note => note.serialize());
    return res.json(serializedNotes);
  })
  .get('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const note: Note = await Note.find(id);
    return res.json(note.serialize());
  })
  // UPDATE:
  .patch('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const reqBody: Note = req.body;

    let note: Note = await Note.find(id);
    note.body = reqBody.body;
    await note.save();

    return res.json(note.serialize());
  })
  // DESTROY:
  .delete('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const note: Note = await Note.find(id);
    note.delete();
    return res.json(note.serialize());
  });

export default router;
