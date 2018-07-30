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
    console.log('Note:', note.body);
    return res.send("OK");
  })
  // READ:
  .get('/', async (req: Request, res: Response) => {
    const notes: Note[] = await Note.all();
    notes.forEach(note => console.log('Note:', note.body));
    return res.send("OK");
  })
  .get('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const note: Note = await Note.find(id);
    console.log('Note:', note.body);
    return res.send("OK");
  })
  // UPDATE:
  .patch('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const reqBody: Note = req.body;

    let note: Note = await Note.find(id);
    note.body = reqBody.body;
    await note.save();

    console.log('Note:', note.body);
    return res.send("OK");
  })
  // DESTROY:
  .delete('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const note: Note = await Note.find(id);
    note.delete();
    console.log('Deleted note:', note.body);
    return res.send("OK");
  });

export default router;
