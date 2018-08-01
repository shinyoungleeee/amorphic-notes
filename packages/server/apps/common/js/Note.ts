import { Supertype, supertypeClass, property, Persistable } from 'amorphic';
import AmorphicSerializer from './AmorphicSerializer';

@supertypeClass
export default class Note extends Persistable(Supertype) {
  @property()
  body: string;

  constructor(body: string) {
    super();
    this.body = body;
  }

  public async save() {
    let txn = this.amorphic.begin();
    this.setDirty(txn);
    console.log(this.amorphic.commit({ transaction: txn }))
  }

  public async delete() {
    let txn = this.amorphic.begin();
    this.persistorDelete({ transaction: txn });
    this.amorphic.commit({ transaction: txn });
  }

  public serialize() {
    return JSON.parse(AmorphicSerializer.amorphicSerialize(this));
  }

  static async all() {
    try { return this.persistorFetchByQuery() }
    catch(e) { console.log(e) };
  }

  static async find(id: string) {
    try { return this.persistorFetchById(id) }
    catch(e) { console.log(e) };
  }
}
