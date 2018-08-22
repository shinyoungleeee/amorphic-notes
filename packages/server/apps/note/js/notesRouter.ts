import * as express from 'express';
import { Request, Response } from 'express';

import Note from '../../common/js/Note';

const notesRouter = express.Router();

notesRouter
  // CREATE:
  .post('/', async (req: Request, res: Response) => {
    const { title, body } = req.body as Note;
    let note = new Note(title, body);
    note = await note.save();
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
  .put('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { title, body } = req.body as Note;
    let note: Note = await Note.find(id);
    note = await note.update(title, body);
    return res.json(note.serialize());
  })
  // DESTROY:
  .delete('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    let note: Note = await Note.find(id);
    note = await note.delete();
    return res.json(note.serialize());
  });

export default notesRouter;
