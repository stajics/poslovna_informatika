CREATE TABLE `myDatabase`.`drzava` (
  `sifra_drzave` VARCHAR(45) NOT NULL COMMENT '',
  `naziv_drzave` VARCHAR(45) NOT NULL COMMENT '',
  PRIMARY KEY (`sifra_drzave`)  COMMENT '');

  CREATE TABLE `myDatabase`.`naseljeno_mesto` (
    `sifra_mesta` VARCHAR(45) NOT NULL COMMENT '',
    `naziv` VARCHAR(45) NOT NULL COMMENT '',
    `PTToznaka` INT NOT NULL COMMENT '',
    `drzava` VARCHAR(45) NOT NULL COMMENT '',
    PRIMARY KEY (`sifra_mesta`)  COMMENT '',
    INDEX `drzava_idx` (`drzava` ASC)  COMMENT '',
    CONSTRAINT `drzava`
      FOREIGN KEY (`drzava`)
      REFERENCES `myDatabase`.`drzava` (`sifra_drzave`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);

      CREATE TABLE `myDatabase`.`banka` (
        `ID_banke` VARCHAR(45) NOT NULL COMMENT '		',
        `sifra_banke` VARCHAR(45) NOT NULL COMMENT '',
        `PIB` VARCHAR(45) NOT NULL COMMENT '',
        `naziv` VARCHAR(45) NOT NULL COMMENT '',
        `adresa` VARCHAR(45) NOT NULL COMMENT '',
        `email` VARCHAR(45) NOT NULL COMMENT '',
        `web` VARCHAR(45) NULL COMMENT '',
        `telefon` VARCHAR(45) NOT NULL COMMENT '',
        `fax` VARCHAR(45) NULL COMMENT '',
        `banka` TINYINT NOT NULL COMMENT '',
        PRIMARY KEY (`ID_banke`)  COMMENT '');

        CREATE TABLE `myDatabase`.`valute` (
          `ID_valute` INT NOT NULL COMMENT '',
          `zvanicna_sifra` VARCHAR(45) NOT NULL COMMENT '',
          `naziv` VARCHAR(45) NOT NULL COMMENT '',
          `domicilna` VARCHAR(45) NOT NULL COMMENT '',
          `drzava` VARCHAR(45) NOT NULL COMMENT '',
          PRIMARY KEY (`ID_valute`)  COMMENT '',
          INDEX `fk_valute_drzava_idx` (`drzava` ASC)  COMMENT '',
          CONSTRAINT `fk_valute_drzava`
            FOREIGN KEY (`drzava`)
            REFERENCES `myDatabase`.`drzava` (`sifra_drzave`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION);

            ALTER TABLE `myDatabase`.`valute`
            CHANGE COLUMN `domicilna` `domicilna` TINYINT NOT NULL COMMENT '' ;
            ALTER TABLE `myDatabase`.`valute`
            CHANGE COLUMN `ID_valute` `ID_valute` VARCHAR(45) NOT NULL COMMENT '' ;

            CREATE TABLE `myDatabase`.`kursna_lista` (
              `ID_kursne_liste` VARCHAR(45) NOT NULL COMMENT '',
              `datum` DATETIME NOT NULL COMMENT '',
              `broj_kursne_liste` INT NOT NULL COMMENT '',
              `primenjuje_se_od` DATETIME NOT NULL COMMENT '',
              `banka` VARCHAR(45) NOT NULL COMMENT '',
              PRIMARY KEY (`ID_kursne_liste`)  COMMENT '',
              INDEX `fk_kursna_lista_banka_idx` (`banka` ASC)  COMMENT '',
              CONSTRAINT `fk_kursna_lista_banka`
                FOREIGN KEY (`banka`)
                REFERENCES `myDatabase`.`banka` (`ID_banke`)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION);

                ALTER TABLE `myDatabase`.`kursna_lista`
                CHANGE COLUMN `datum` `datum` DATE NOT NULL COMMENT '' ,
                CHANGE COLUMN `primenjuje_se_od` `primenjuje_se_od` DATE NOT NULL COMMENT '' ;

                CREATE TABLE `myDatabase`.`kurs_u_valuti` (
  `redni_broj` INT NOT NULL COMMENT '',
  `kupovni` DECIMAL(9,4) NOT NULL COMMENT '',
  `srednji` DECIMAL(9,4) NOT NULL COMMENT '',
  `prodajni` DECIMAL(9,4) NOT NULL COMMENT '',
  `kursna_lista` VARCHAR(45) NOT NULL COMMENT '',
  PRIMARY KEY (`redni_broj`)  COMMENT '',
  INDEX `fk_kurs_u_valuti_kursna_lista_idx` (`kursna_lista` ASC)  COMMENT '',
  CONSTRAINT `fk_kurs_u_valuti_kursna_lista`
    FOREIGN KEY (`kursna_lista`)
    REFERENCES `myDatabase`.`kursna_lista` (`ID_kursne_liste`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    ALTER TABLE `myDatabase`.`kurs_u_valuti`
    ADD COLUMN `osnovna_valuta` VARCHAR(45) NOT NULL COMMENT '' AFTER `kursna_lista`,
    ADD COLUMN `prema_valuti` VARCHAR(45) NOT NULL COMMENT '' AFTER `osnovna_valuta`,
    ADD INDEX `fk_kurs_u_valuti_valute_osnovna_valuta_idx` (`osnovna_valuta` ASC)  COMMENT '',
    ADD INDEX `fk_kurs_u_valuti_valute_prema_valuti_idx` (`prema_valuti` ASC)  COMMENT '';
    ALTER TABLE `myDatabase`.`kurs_u_valuti`
    ADD CONSTRAINT `fk_kurs_u_valuti_valute_osnovna_valuta`
      FOREIGN KEY (`osnovna_valuta`)
      REFERENCES `myDatabase`.`valute` (`ID_valute`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    ADD CONSTRAINT `fk_kurs_u_valuti_valute_prema_valuti`
      FOREIGN KEY (`prema_valuti`)
      REFERENCES `myDatabase`.`valute` (`ID_valute`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION;

      CREATE TABLE `myDatabase`.`klijent` (
  `ID_klijenta` INT NOT NULL COMMENT '',
  `ime` VARCHAR(45) NOT NULL COMMENT '',
  `prezime` VARCHAR(45) NOT NULL COMMENT '',
  `pravno_lice` TINYINT NOT NULL COMMENT '',
  PRIMARY KEY (`ID_klijenta`)  COMMENT '');

  CREATE TABLE `myDatabase`.`racuni_pravnih_lica` (
    `ID_racuna` INT NOT NULL COMMENT '',
    `broj_racuna` VARCHAR(45) NOT NULL COMMENT '',
    `datum_otvaranja` DATE NOT NULL COMMENT '',
    `vazeci` TINYINT NULL COMMENT '',
    `banka` VARCHAR(45) NOT NULL COMMENT '',
    `klijent` INT(11) NOT NULL COMMENT '',
    `valute` VARCHAR(45) NOT NULL COMMENT '',
    PRIMARY KEY (`ID_racuna`)  COMMENT '',
    INDEX `fk_racuni_pravnih_lica_banka_idx` (`banka` ASC)  COMMENT '',
    INDEX `fk_racuni_pravnih_lica_klijent_idx` (`klijent` ASC)  COMMENT '',
    INDEX `fk_racuni_pravnih_lica_valute_idx` (`valute` ASC)  COMMENT '',
    CONSTRAINT `fk_racuni_pravnih_lica_banka`
      FOREIGN KEY (`banka`)
      REFERENCES `myDatabase`.`banka` (`ID_banke`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `fk_racuni_pravnih_lica_klijent`
      FOREIGN KEY (`klijent`)
      REFERENCES `myDatabase`.`klijent` (`ID_klijenta`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `fk_racuni_pravnih_lica_valute`
      FOREIGN KEY (`valute`)
      REFERENCES `myDatabase`.`valute` (`ID_valute`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);


      CREATE TABLE `myDatabase`.`ukidanje` (
        `ID_ukidanja` INT NOT NULL COMMENT '',
        `datum_ukidanja` DATE NOT NULL COMMENT '',
        `sredstva_se_prenose_na_racun` VARCHAR(45) NOT NULL COMMENT '',
        `racuni_pravnih_lica` INT(11) NOT NULL COMMENT '',
        PRIMARY KEY (`ID_ukidanja`)  COMMENT '',
        INDEX `fk_ukidanje_rpl_idx` (`racuni_pravnih_lica` ASC)  COMMENT '',
        CONSTRAINT `fk_ukidanje_rpl`
          FOREIGN KEY (`racuni_pravnih_lica`)
          REFERENCES `myDatabase`.`racuni_pravnih_lica` (`ID_racuna`)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION);

          CREATE TABLE `myDatabase`.`dnevno_stanje_racuna` (
            `broj_izvoda` INT NOT NULL COMMENT '',
            `datum_prometa` DATE NOT NULL COMMENT '',
            `predhodno_stanje` DECIMAL(15,2) NOT NULL COMMENT '',
            `promet_u_korist` DECIMAL(15,2) NOT NULL COMMENT '',
            `promet_na_teret` DECIMAL(15,2) NOT NULL COMMENT '',
            `novo_stanje` DECIMAL(15,2) NOT NULL COMMENT '',
            `racuni_pravnih_lica` INT(11) NOT NULL COMMENT '',
            PRIMARY KEY (`broj_izvoda`)  COMMENT '',
            INDEX `fk_dnevno_stanje_racuna_rpl_idx` (`racuni_pravnih_lica` ASC)  COMMENT '',
            CONSTRAINT `fk_dnevno_stanje_racuna_rpl`
              FOREIGN KEY (`racuni_pravnih_lica`)
              REFERENCES `myDatabase`.`racuni_pravnih_lica` (`ID_racuna`)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION);

              CREATE TABLE `myDatabase`.`vrste_placanja` (
                `oznaka_vrste` VARCHAR(45) NOT NULL COMMENT '',
                `naziv_vrste_placanja` VARCHAR(45) NOT NULL COMMENT '',
                PRIMARY KEY (`oznaka_vrste`)  COMMENT '');


                CREATE TABLE `myDatabase`.`analitika_izvoda` (
                  `broj_stavke` INT NOT NULL COMMENT '',
                  `duznik_nalogodavac` VARCHAR(45) NOT NULL COMMENT '',
                  `svrha_placanja` VARCHAR(45) NOT NULL COMMENT '',
                  `poverilac_primalac` VARCHAR(45) NOT NULL COMMENT '',
                  `datum_prijema` DATE NOT NULL COMMENT '',
                  `datum_valute` DATE NOT NULL COMMENT '',
                  `racun_duznika` VARCHAR(45) NOT NULL COMMENT '',
                  `model_zaduzenja` INT(2) NOT NULL COMMENT '',
                  `poziv_na_broj_zaduzenja` VARCHAR(45) NOT NULL COMMENT '',
                  `racun_poverioca` VARCHAR(45) NOT NULL COMMENT '',
                  `model_odobrenja` INT(2) NOT NULL COMMENT '',
                  `poziv_na_broj_odobrenja` VARCHAR(45) NOT NULL COMMENT '',
                  `hitno` TINYINT NULL COMMENT '',
                  `iznos` DECIMAL(15,2) NOT NULL COMMENT '',
                  `tip_greske` INT(1) NOT NULL COMMENT '',
                  `status` VARCHAR(45) NOT NULL COMMENT '',
                  `valute` VARCHAR(45) NOT NULL COMMENT '',
                  `vrste_placanja` VARCHAR(45) NULL COMMENT '',
                  `naseljeno_mesto` VARCHAR(45) NULL COMMENT '',
                  `dnevno_stanje_racuna` INT(11) NOT NULL COMMENT '',
                  PRIMARY KEY (`broj_stavke`)  COMMENT '');


                  ALTER TABLE `myDatabase`.`analitika_izvoda`
                  ADD INDEX `fk_analitika_izvoda_vp_idx` (`vrste_placanja` ASC)  COMMENT '',
                  ADD INDEX `fk_analitika_izvoda_v_idx` (`valute` ASC)  COMMENT '',
                  ADD INDEX `fk_analitika_izvoda_nm_idx` (`naseljeno_mesto` ASC)  COMMENT '';
                  ALTER TABLE `myDatabase`.`analitika_izvoda`
                  ADD CONSTRAINT `fk_analitika_izvoda_vp`
                    FOREIGN KEY (`vrste_placanja`)
                    REFERENCES `myDatabase`.`vrste_placanja` (`oznaka_vrste`)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                  ADD CONSTRAINT `fk_analitika_izvoda_v`
                    FOREIGN KEY (`valute`)
                    REFERENCES `myDatabase`.`valute` (`ID_valute`)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                  ADD CONSTRAINT `fk_analitika_izvoda_nm`
                    FOREIGN KEY (`naseljeno_mesto`)
                    REFERENCES `myDatabase`.`naseljeno_mesto` (`sifra_mesta`)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION;

                    ALTER TABLE `myDatabase`.`analitika_izvoda`
ADD INDEX `fk_analitika_izvoda_dsr_idx` (`dnevno_stanje_racuna` ASC)  COMMENT '';
ALTER TABLE `myDatabase`.`analitika_izvoda`
ADD CONSTRAINT `fk_analitika_izvoda_dsr`
  FOREIGN KEY (`dnevno_stanje_racuna`)
  REFERENCES `myDatabase`.`dnevno_stanje_racuna` (`broj_izvoda`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

  ALTER TABLE `myDatabase`.`analitika_izvoda`
  DROP FOREIGN KEY `fk_analitika_izvoda_vp`,
  DROP FOREIGN KEY `fk_analitika_izvoda_nm`;

  ALTER TABLE `myDatabase`.`analitika_izvoda`
  DROP FOREIGN KEY `fk_analitika_izvoda_v`;
  ALTER TABLE `myDatabase`.`analitika_izvoda`
  DROP INDEX `fk_analitika_izvoda_v_idx` ;


  USE `myDatabase`;
  DROP procedure IF EXISTS `isRacunVazeci`;

  DELIMITER $$
  USE `myDatabase`$$
  CREATE PROCEDURE `isRacunVazeci` (IN id INT(11))
  BEGIN
  	SELECT vazeci FROM racuni_pravnih_lica WHERE ID_racuna=id;
  END
  $$

  DELIMITER ;


  CREATE TABLE `myDatabase`.`rtgs` (
    `ID_poruke` INT NOT NULL COMMENT '',
    `primalac` VARCHAR(45) NULL COMMENT '',
    `duznik` VARCHAR(45) NULL COMMENT '',
    `svrha` VARCHAR(45) NULL COMMENT '',
    `racun_primaoca` VARCHAR(45) NULL COMMENT '',
    `racun_duznika` VARCHAR(45) NULL COMMENT '',
    `iznos` VARCHAR(45) NULL COMMENT '',
    PRIMARY KEY (`ID_poruke`)  COMMENT '');


    CREATE TABLE `myDatabase`.`mt102` (
      `ID_naloga` INT NOT NULL COMMENT '',
      `banka_duznika` VARCHAR(45) NOT NULL COMMENT '',
      `banka_poverioca` VARCHAR(45) NOT NULL COMMENT '',
      `racun_duznika` VARCHAR(45) NOT NULL COMMENT '',
      `racun_poverioca` VARCHAR(45) NOT NULL COMMENT '',
      `iznos` VARCHAR(45) NOT NULL COMMENT '',
      PRIMARY KEY (`ID_naloga`)  COMMENT '');
