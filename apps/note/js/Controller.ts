import { Supertype, supertypeClass, amorphicStatic } from 'amorphic';

import NotesService from './NotesService';

@supertypeClass({ toClient: false, toServer: false })
export class Controller extends Supertype {
  // Global properties
  async serverInit() {
    await amorphicStatic.syncAllTables();
    return new NotesService();
  }
}
