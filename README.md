# Projekt_OPB

Za projekt sva izbrala vspostavitev baze z živalmi, ki so na prodaj. Podatke za bazo sva našla na spletni platformi Bolha.com.
Ideja za aplikacijo vključuje dodajanje novih uporabnikov in oglasov.

# Zgradba podatkovne baze

Baza združuje 5 tabel.

1. Živali = v tej tabeli so predstavljeni oglasi vseh živali

- ID živali = šifra oglasa
- oglas = naslov oglasa
- pasma
- kategorija = ID kategorije
- spol
- cena
- starost
- število_nog = številka med 0 in 10
- opis
- slika = link do slike
- datum = datum objave oglasa
- prodajalec = ID uporabnika
- kraj = ID kraj (kraj prodaje ni nujno enak kraju prodajalca)

2. Uporabniki = v tej tabeli so predstavljeni podatki o uporabnikih

- ID uporabnika
- ime = uporabniško ime
- telefon
- datum = datum pridružitve
- kraj = ID kraj

3. Kraj

- ID kraj
- kraj
- posta = poštna številka
- država

4. Kategorija

- ID kategorija
- ime
- nadkategorija = ID kategorija
- opis

5. Nadkategorija

- ID kategorija
- ime
- opis

# Shema podatkovne baze

![Shema podatkovne baze](/Zgradba_baze/Shema.png)
