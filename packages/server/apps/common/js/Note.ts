import { Supertype, supertypeClass, property, Persistable } from 'amorphic';

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
    this.amorphic.commit({ transaction: txn });
  }

  public async delete() {
    let txn = this.amorphic.begin();
    this.persistorDelete({ transaction: txn });
    this.amorphic.commit({ transaction: txn });
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
