import { Supertype, supertypeClass, property, Persistable } from 'amorphic';
import AmorphicSerializer from './AmorphicSerializer';

@supertypeClass
export default class Note extends Persistable(Supertype) {
  @property()
  title: string;

  @property()
  body: string;

  constructor(title: string, body: string) {
    super();
    this.title = title;
    this.body = body;
  }

  public async save() {
    let txn = this.amorphic.begin();
    this.setDirty(txn);
    await this.amorphic.commit({ transaction: txn });
    return this;
  }

  public async update(title: string, body: string) {
    this.title = title;
    this.body = body;
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
