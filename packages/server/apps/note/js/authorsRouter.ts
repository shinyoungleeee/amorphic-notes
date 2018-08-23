import * as express from 'express';
import { Request, Response } from 'express';

import Author from '../../common/js/Author';

const authorsRouter = express.Router();

authorsRouter
  // CREATE:
  .post('/', async (req: Request, res: Response) => {
    const { name } = req.body as Author;
    let author = new Author(name);
    author = await author.save();
    return res.json(author.serialize());
  })
  // READ:
  .get('/', async (req: Request, res: Response) => {
    const authors: Author[] = await Author.all();
    const serializedAuthors: object[] = authors.map(author => author.serialize());
    return res.json(serializedAuthors);
  })
  .get('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const author: Author = await Author.find(id);
    return res.json(author.serialize());
  })
  // UPDATE:
  .put('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { name } = req.body as Author;
    let author: Author = await Author.find(id);
    author = await author.update(name);
    return res.json(author.serialize());
  })
  // DESTROY:
  .delete('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    let author: Author = await Author.find(id);
    author = await author.delete();
    return res.json(author.serialize());
  });

export default authorsRouter;
