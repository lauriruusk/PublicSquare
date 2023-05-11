# Rakenne

Yleistä rakennetta

## Frontend

- Etusivulla mainos(?) jos ei kirjautuneena, muuten uusimmat julkaisut
- headerissa kirjautuminen, ilmoitus yksityisviesteistä, haku jne.
- footerissa sivun tiedot(kehittäjä, yhteystiedot tms)
- 

### Header

- mikäli ei kirjautuneena, näkyvissä kirjautumisvaihtoehdot: Kirjaudu, luo profiili.
- Kirjautuneena näkyy linkki omana profiiliin, haku, ilmoitukset jne.
- uloskirjautuminen (valikon alla? oma painike?)

### LoginForm

- nappula kirjautumiseen, avaa popup-ikkunan
- nappula profiilin luontiin, myös avaa popup-ikkunan

### LoggedInForm

- näkyy kirjautuneelle
- mahdollisuus hakuun, linkki profiilinäkymään

### PopupForm

- pääkomponentti kirjautumiselle ja profiilin luonnille. sisältö vaihtuu sen mukaan kumpaa ollaan tekemässä.

### SignIn

- kirjautumiskomponentti
- kysyy sähköpostiosoitteen ja salasanan, lopuksi lähettää backendille. vastaanottaa tokenin, jonka saatuaan kirjaa käyttäjän sisään.

### SignUp

- profiilin luontikomponentti
- kysyy sähköpostiosoitteen, salasanan (ilmoittaa kuinka vahva ko. salasana on) ja syntymäajan.
- vapaaehtoisesti voi myös ilmoittaa puhelinnumeron, siviilisäädyn, koulutuksen, jne. Tiedot ovat oletusarvoisesti yksityisiä, myöhemmin profiiliasetuksissa mahdollisuus muuttaa julkiseksi

### Body

- päänäkymä. näyttää uusimmat julkaisut.
- ensisijaisesti kavereiden julkaisut, sitten ryhmien. mahdollisyys myös vaihtaa tärkeysjärjestystä, suodatus yms.
- 

### PublicSquare

- alusta, jolle julkaisut tuodaan, bodyn alla

### Post

- oma "laatikko" jossa näkyy julkaisija ja sisältö
- aluksi ihan tekstipohjainen, mahdollisesti jatkossa tutkia kuinka sisällyttää ääntä ja kuvaa

### Yksityisviesti

- erillinen osio. joko oma sivu tai vetovalikko

### Profiili

- Tässä käyttäjä pääsee näkemään omat tietonsa ja muuttamaan niitä tarvittaessa.
- profiilikuva
- kavereiden hallinta (erillinen jaottelu ns. "oikeisiin kavereihin" ja muihin?)

### Footer

- Pyritään pitämään yksinkertaisena
- tekijän yhteystiedot jne.

## Backend

- käsittelee viestit, käyttäjät jne
- tietokantana MongoDB(?)
- hakutoiminto
- poisto
- muokkaus
- ylläpidon luoma filtteri 

### Endpoints

#### GET

- ei erityistä hakuehtoa, hakee kaiken sisällön

#### GET(/:user)

- hakee tietyn käyttäjän julkaisut

#### GET(/:keyword)

- hakee kaiken sisällön, josta löytyy annettu hakusana. bodyssa mahdolliset rajaukset

#### POST(/:user/:password)

- kirjautumiseen

#### POST(/publish/:user)

- Julkaisu. postin yhteydessä myös ajankohta. parametrinä käyttäjä, bodyssa julkaisu

#### PUT(/:user/:contentid)

- muokkaa julkaisua. parametreinä käyttäjä ja julkaisun id

#### PUT(/:user)

- muokkaa käyttäjän tietoja

#### DELETE(/:user/:contentid)

- poistaa julkaisun