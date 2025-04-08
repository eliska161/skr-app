# Norsk Ordresporingssystem - Oppsettguide

Denne guiden vil hjelpe deg med å sette opp og bruke ordresporingssystemet. Dette er et rent frontend-system som bruker `localStorage` for å lagre data, noe som betyr at alt kjører i nettleseren uten behov for en server eller database.

## 1. Åpne prosjektet lokalt

For å åpne prosjektet lokalt, følg disse trinnene:

1. Last ned alle filene til en mappe på datamaskinen din
2. Åpne mappen i en tekstbehandler som VS Code (valgfritt)
3. Dobbeltklikk på `index.html` for å åpne nettsiden i nettleseren din
   
Alternativt kan du bruke en lokal server for å kjøre prosjektet. I VS Code kan du installere utvidelsen "Live Server" og deretter høyreklikke på `index.html` og velge "Open with Live Server".

## 2. Distribuere til GitHub Pages

For å distribuere nettsiden til GitHub Pages:

1. Opprett et nytt GitHub-repository
2. Last opp alle prosjektfilene til repository
3. Gå til repository-innstillingene
4. Scroll ned til "GitHub Pages"-delen
5. Velg "main" eller "master" branch som kilde
6. Klikk "Save"

Etter noen minutter vil nettsiden være tilgjengelig på `https://[ditt-brukernavn].github.io/[repository-navn]/`

## 3. Datalagring med localStorage

Dette systemet bruker nettleserens `localStorage` for å lagre ordreinformasjon. Her er viktige punkter å være klar over:

- Data lagres lokalt i brukerens nettleser
- Data vil være tilgjengelig selv etter at nettleseren lukkes
- Hvis brukeren sletter nettleserdata, vil alle ordrene forsvinne
- Forskjellige enheter/nettlesere har separate databaser
- Når du åpner admin-panelet første gang, opprettes noen eksempelordrer automatisk

## 4. Logge inn på admin-panelet

For å logge inn på admin-panelet:

1. Gå til `/admin/index.html` (klikk på "Admin" i bunnteksten på forsiden)
2. Logg inn med følgende standardlegitimasjon:
   - Brukernavn: `admin`
   - Passord: `admin123`

**Viktig:** I et produksjonsmiljø bør du endre disse legitimasjonene. Dette kan gjøres ved å redigere `admin/index.html`-filen og endre verdiene i JavaScript-delen.

## 5. Administrere bestillinger

Som administrator kan du:

### Legge til nye bestillinger:
1. Klikk på den grønne "Legg til ny ordre"-knappen
2. Fyll ut kundens informasjon og ordredetaljer
3. Velg status for bestillingen
4. Hvis status er "Ordre sendt", fyll ut sporingsinformasjon
5. Klikk "Lagre"

### Oppdatere ordrestatus:
1. Finn ordren du vil oppdatere
2. Klikk på "Oppdater status"-knappen
3. Velg ny status fra nedtrekksmenyen
4. Legg til kommentar og/eller forsendelsesdetaljer
5. Klikk "Oppdater status"

### Redigere bestillingsdetaljer:
1. Finn ordren du vil redigere
2. Klikk på "Rediger"-knappen
3. Endre kundenavn, e-post eller kvitteringsnummer
4. Klikk "Lagre endringer"

### Slette bestillinger:
1. Finn ordren du vil slette
2. Klikk på "Slett"-knappen
3. Bekreft sletting

## 6. Hvordan kunder kan spore bestillinger

Kunder kan spore sine bestillinger ved å:

1. Besøke hovedsiden (`index.html`)
2. Skrive inn e-postadressen de brukte ved bestilling
3. Klikke på "Spor"-knappen
4. Se bestillingsstatus og detaljer på statusskjermen

Hvis en kunde har flere bestillinger, vil systemet vise den nyeste bestillingen.

## 7. Tilbakestille data manuelt

Hvis du trenger å tilbakestille alle data:

1. Åpne nettleserens utviklerverktøy (F12 eller høyreklikk og velg "Inspiser")
2. Gå til "Application" eller "Lagring"-fanen
3. Velg "Local Storage" i sidepanelet
4. Finn din nettside-URL
5. Høyreklikk og velg "Clear" eller finn og slett "orderData"-oppføringen

## 8. Tilpasse systemet

Hvis du ønsker å endre tekster, ikoner eller faser:

### Endre statusfaser:
1. Rediger verdiene i `status.html` for kundevisningen
2. Oppdater verdiene i `admin/dashboard.html` for admin-visningen
3. Husk å oppdatere både norske statusnavn og statusverdier i JavaScript-koden

### Endre ikoner:
1. Systemet bruker Bootstrap Icons
2. Du kan finne alternativer på [Bootstrap Icons' offisielle nettside](https://icons.getbootstrap.com/)
3. Erstatt ikonklassene (f.eks. `bi-box-seam`) med dine foretrukne ikoner

### Endre farger og stiler:
1. Rediger `assets/css/style.css` for å tilpasse utseendet
2. Bootstrap-klasser kan også endres direkte i HTML-filene

Lykke til med ditt nye ordresporingssystem!