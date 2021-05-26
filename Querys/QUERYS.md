# QUERYS

## 1. Dodajanje novega uporabnika
Uporabnik mora pri ustvarjanju računa izbrati uporabniško ime, ki še ni zasedeno, kraj in geslo. Po želji lahko navede tudi telefonsko številko.

```
"INSERT INTO uporabniki (id_uporabnik, uporabniško_ime, telefon, kraj, geslo) 
VALUES (
    (SELECT max(id_uporabnik) FROM uporabniki)+1, 
    '" + reg.body.uporabnisko_ime + "', 
    '" + reg.body.telefon + "',
    (SELECT id_kraj FROM kraj WHERE kraj='" + reg.body.kraj + "'"), 
    '" + red.body.geslo + "')"
```

#### Primer:
```
INSERT INTO uporabniki (id_uporabnik, uporabniško_ime, kraj, geslo) 
VALUES (
    (SELECT max(id_uporabnik) FROM uporabniki)+1, 
    'test', 
    (SELECT id_kraj FROM kraj WHERE kraj='Brežice'), 
    'test')
```

## 2. Preverjanje prijave
Pri preverjanju prijave se gleda ali je število vrstic s tako kombinacijo uporabniškega imena in gesla enako 1.

```
"SELECT count(*) FROM uporabniki 
WHERE uporabniško_ime = '" + reg.body.uporabnisko_ime + "' AND geslo = '" + reg.body.geslo + "'"
```

#### Primer:
```
SELECT count(*) FROM uporabniki WHERE uporabniško_ime = 'test' AND geslo = 'test'
```

## 3. Dodajanje nove živali/oglasa
Pri dodajanju novega oglasa/živali je potrebno podati:
- naslov oglasa
- kategorijo (iz nabora kategorij)
- ceno
- število nog (številka med 1 in 10)
- uporabniško ime prodajalca
- kraj

Po želji se lahko navede tudi pasmo, spol in starost živali, ter se dodata opis in slika, ki je podana kot link. 

```
"INSERT INTO 
živali (id_živali, oglas, kategorija, cena, število_nog, prodajalec, kraj, pasma, spol, starost, opis, slika) 
VALUES
((SELECT max(id_živali) FROM živali)+1, 
'" + reg.body.oglas + "', 
(SELECT id_kategorija FROM kategorija WHERE ime='" + reg.body.kategorija + "'),
'" + reg.body.cena "',
" + reg.body.st_nog + ",
(SELECT id_uporabnik FROM uporabniki WHERE uporabniško_ime='" + reg.body.uporabnisko_ime + "'),
(SELECT id_kraj FROM kraj WHERE kraj='" + reg.body.kraj + "'),
'" + reg.body.pasma + "',
'" + reg.body.spol + "',
'" + reg.body.starost + "',
'" + reg.body.opis + "',
'" + reg.body.slika + "')"
```

#### Primer:
```
INSERT INTO živali
(id_živali, oglas, kategorija, cena, število_nog, prodajalec, kraj) 
VALUES
((SELECT max(id_živali) FROM živali)+1, 
'test', 
(SELECT id_kategorija FROM kategorija WHERE ime='mačka'),
'10€',
4,
(SELECT id_uporabnik FROM uporabniki WHERE uporabniško_ime='test'),
(SELECT id_kraj FROM kraj WHERE kraj='Brežice'))
```

## 4. Odstanitev živali/oglasa po nakupu
Za odstranitev oglasa moramo poznati le id_živali.

```
"DELETE FROM živali WHERE id_živali = " + reg.body.id_zivali
```

#### Primer:
```
DELETE FROM živali WHERE id_živali = 6716539
```

## 5. Seznam nadkategorij in kategorij
Seznam nadkategorij:
```
"SELECT ime FROM nadkategorija"
```

Seznam kategorij iz izbrane nadkategorije:
```
"SELECT ime FROM kategorija 
WHERE nadkategorija = (SELECT id_nadkategorija FROM nadkategorija WHERE ime = '" + reg.body.kategorija + "')"
```

#### Primer:
```
SELECT ime FROM kategorija 
WHERE nadkategorija = (SELECT id_nadkategorija FROM nadkategorija WHERE ime = 'Perutnina')
```

## 6. Živali iz izbrane kategorije
```
"SELECT * FROM živali
WHERE kategorija = (SELECT id_kategorija FROM kategorija WHERE ime = '" + reg.body.kategorija + "')"
```
#### Primer:
```
SELECT * FROM živali
WHERE kategorija = (SELECT id_kategorija FROM kategorija WHERE ime = 'mačka')
```

## 7. Živali iz izbrane nadkategorije
```
"SELECT * FROM živali
WHERE kategorija IN (
    SELECT id_kategorija FROM kategorija 
    WHERE nadkategorija = (SELECT id_nadkategorija FROM nadkategorija WHERE ime='" + reg.body.nadkategorija + "'))"
```

#### Primer:
```
SELECT * FROM živali
WHERE kategorija IN (
    SELECT id_kategorija FROM kategorija 
    WHERE nadkategorija = (SELECT id_nadkategorija FROM nadkategorija WHERE ime = 'Osli'))
```

## 8. Živali iz izbranega kraja
```
"SELECT * FROM živali
WHERE kraj = (SELECT id_kraj FROM kraj WHERE kraj = '" + reg.body.kraj + "')"
```

#### Primer:
```
SELECT * FROM živali
WHERE kraj = (SELECT id_kraj FROM kraj WHERE kraj = 'Brežice')
```