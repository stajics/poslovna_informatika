import {Drzava} from './drzava';

export class Mesto{
  constructor(
    public id: any,
    public naziv: string,
    public drzava: Drzava
  ){
    this.id = id;
    this.naziv = naziv;
    this.drzava = drzava;
  }
}
