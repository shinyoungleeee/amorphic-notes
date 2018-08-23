import { Supertype, supertypeClass, property, Persistable } from 'amorphic';

import AmorphicSerializer from './AmorphicSerializer';
import Note from './Note';

@supertypeClass
export default class Author extends Persistable(Supertype) {
  @property()
  name: string;

  @property({ type: Array, applicationOmit: true, getType: () => Note })
  notes: Array<Note> = [];

  constructor(name: string) {
    super();
    this.name = name;
  }

  public async save() {
    let txn = this.amorphic.begin();
    this.setDirty(txn);
    await this.amorphic.commit({ transaction: txn });
    return this;
  }

  public async update(name: string) {
    this.name = name;
    return await this.save();
  }

  public async delete() {
    let txn = this.amorphic.begin();
    this.persistorDelete({ transaction: txn });
    await this.amorphic.commit({ transaction: txn });
    return this;
  }

  public serialize() {
    return JSON.parse(AmorphicSerializer.amorphicSerialize(this));
  }

  static async all() {
    try { return this.persistorFetchByQuery({}) }
    catch(e) { console.log(e) };
  }

  static async find(id: string) {
    try { return this.persistorFetchById(id) }
    catch(e) { console.log(e) };
  }
}
