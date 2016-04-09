export const _ids = {
  drzava: 'sifra_drzave',
  naseljeno_mesto: 'sifra_mesta',
  banka: 'ID_banke',
  valute: 'ID_valute',
  kursna_lista: 'ID_kursne_liste',
  kurs_u_valuti: 'redni_broj',
  klijent: 'ID_klijenta',
  racuni_pravnih_lica: 'ID_racuna',
  ukidanje: 'ID_ukidanja',
  dnevno_stanje_racuna: 'broj_izvoda',
  vrste_placanja: 'oznaka_vrste',
  analitika_izvoda: 'broj_stavke'
};
export const _children = {
  drzava : ['naseljeno_mesto', 'valute'],
  naseljeno_mesto: ['analitika_izvoda'],
  banka: ['kursna_lista', 'racuni_pravnih_lica'],
  valute: ['osnovna_valuta', 'prema_valuti', 'racuni_pravnih_lica', 'analitika_izvoda'],
  kursna_lista: ['kurs_u_valuti'],
  kurs_u_valuti: [],
  klijent: ['racuni_pravnih_lica'],
  racuni_pravnih_lica: ['ukidanje', 'dnevno_stanje_racuna'],
  ukidanje: [],
  dnevno_stanje_racuna: ['analitika_izvoda'],
  vrste_placanja: ['analitika_izvoda'],
  analitika_izvoda: []
};
