import { Supertype, supertypeClass, property, Persistable } from 'amorphic';

@supertypeClass
export default class Note extends Persistable(Supertype) {
  @property()
  body: string;

  constructor(body: string) {
    super();
    this.body = body;
  }

  async save() {
    let txn = this.amorphic.begin();
    this.setDirty(txn);
    await this.amorphic.commit({ transaction: txn });
  }
}
