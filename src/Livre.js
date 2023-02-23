// une chose
export default class Livre {
  constructor(id, titre, qtestock, prix) {
    this._id = id;
    this._titre = titre;
    this._qtestock = Number(qtestock);
    this._prix = Number(prix);
    //this._id = Date.now() + Math.floor(Math.random() * 10); // génération d'un id unique
  }
  get titre() {
    return this._titre;
  }
  get id() {
    return this._id;
  }
  get qtestock() {
    return this._qtestock;
  }
  get prix() {
    return this._prix;
  }

  // modifier qtestock
  addQtestock() {
    this._qtestock += 1;
  }
  substractQtestock() {
    if (this._qtestock > 0) {
      this._qtestock -= 1;
    }
  }

  pourAfficher() {
    return `${this._titre} (${this._qtestock})`;
  }
}
