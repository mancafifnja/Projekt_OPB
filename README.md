# Projekt_OPB

Za projekt sva izbrala vspostavitev baze z živalmi, ki so na prodaj. Podatke za bazo sva našla na spletni platformi Bolha.com.
Ideja za aplikacijo vključuje dodajanje novih uporabnikov in oglasov.

# Zgradba baze

Baza združuje 5 tabel.

1. Živali = v tej tabeli so predstavljeni oglasi vseh živali
  - id = šifra oglasa
  - oglas = naslov oglasa
  - pasma
  - kategorija = ID kategorije
  - spol
  - cena
  - starost
  - število_nog
  - opis = ali oglas vsebuje opis?
  - slika = ali oglas vsebuje sliko?
  - datum = datum objave oglasa
  - prodajalec = uporabnik
  - kraj = kraj prodaje ni nujno enak kraju uporabnika
  - nadkategorija

2. Uporabniki = v tej tabeli so predstavljeni podatki o uporabnikih
  - ime = uporabniško ime
  - telefon = telefonska številka
  - datum = datum pridružitve
  - kraj
  - regija

3. Kraj
  - kraj
  - posta = poštna številka
  - regija
  - država

4. Kategorija
  - id
  - ime
  - nadkategorija
  - opis

5. Nadkategorija
  - ime
  - opis
