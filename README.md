# Dynamisk webbutveckling - Slutprojekt

## Beskrivning av projekt:
 I detta projekt ska vi skapa backend delen till en redan gjord hemsida. Vi valde att göra hemsidan Ducky.

## Utvecklat av:
* *Sabina Andersson projektledare* (https://github.com/sabinaander) 
* *Max Andersson* (https://github.com/frontMAX)
* *Jannie Bäckman Kuurne* (https://github.com/Jannie87)
* *Esther Reichmann* (https://github.com/ezzequ)
* *Github repo* (https://github.com/frontMAX/DuckyTeam)

## Kom igång:
1. Öppna terminalen, skriv `cd backend` och därefter `npm i` &  sedan `npm start`
2. Öppna ett nytt terminalfönster, skriv `cd client` och därefter `npm i` &  sedan `npm start`
3. Då skall både servern vara up and running samt frontend kan ses på http://localhost:3000/


För att logga in som admin (och se adminpanelen i header): 
email: admin@japp
lösenord: säkert

## Betygskriterier
### Godkänt:
[x] •Alla sidor skall vara responsiva. (G) 
    Detta har vi gjort med hjälp utav MUI och mediaquery

[x] •Arbetet ska implementeras med en React frontend och en Express backend. (G) 
    Vi har implementerat det genom terminalen. 

[x] •Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G) 
    Gjordes de första dagarna av projektet, vi la upp diagramen efter disskusion om hur vi ville att flödet skulle se ut och hur kominikationen mellan alla olika enpoints skulle kommunicera.

[x] •Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
    En rolig butik som säljer allt du vill, vi specialliserar oss inte på något utan säljer allt mellan himmel å jord.

[x] •All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
    Vi har sparat data från vårat projekt och delat upp dem i tre olika filer utefter user, product och delivery för att underlätta och organisera så att de blir lätt att hitta rätt data

[x] •Man ska kunna logga in som administratör i systemet (G)
    Detta har vi gjort genom att sätta en boolean på en admin roll. Om man är Admin sätts rollen till true. 
 
[x] •Inga Lösenord får sparas i klartext i databasen (G)
    Vi har använt Bcrypt för att kryptera lösenorden

[x] •En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
    Vi har en funktion i product.controller som vi sedan ann ropar i order.controller

[x] •Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
    Inloggad som admin så får man tillgång till uppdatering av produkt.

[x] •Administratörer ska kunna se en lista på alla gjorda beställningar (G)
    Inloggad som admin så får man tillgång till alla gjorda beställningar.

[x] •Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
    Kategorierna ligger på produkterna som sedan sorterar upp dom.

[x] •Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
    Kategorierna ligger på produkterna som sedan sorterar upp dom.

[x] •Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
    Detta har vi implementerat med hjälp utav contextProviders som gör statet kundkorg lättare att dela mellan olika komponenter och lagt till en localstorage funktion på kundkorgen

[x] •    En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
    Detta har vi implementerat med en Boolean, om man inte är inloggad vid checkout så kommer de upp att man skall skapa konto innan man fortsätter till att slutföra köpet

[x] •Besökare ska kunna välja ett av flera fraktalternativ (G)
    Frakt alternativen implementeras genom databasen.

[x] •Tillgängliga fraktalternativ ska vara hämtade från databasen (G)
    Vi har använt oss av axios för att få client och server att kommunicera, så genom get anrop från databasen så får vi våra frakt alternativ

[x] •Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
    Enskild implementering av validering på komponenter 

### Väl godkänt:

[x] • Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG)
    När man registreras så blir en användare per default isAdmin = false (även om användaren försöker bli admin.)
    Dock kan en användare uppdateras ifrån rest (put) med isAdmin = true, då blir en användare admin. Samtlig data sparas i databasen.

[] • En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG)
    EJ IMPLEMENTERAT

[] • Administratörer ska kunna markera beställningar som skickade (VG)
    EJ IMPLEMENTERAT

[] • När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
    EJ IMPLEMENTERAT

[x] • Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG)
    Via /admin/products/id kan en användare som är inloggad som admin redigera en produkt och välja en/flera kategorier denna tillhör. 

[x] • Administratörer ska kunna lägga till och ta bort produkter (VG)
    Via /admin/products samt /admin/products/id kan en användare som är inloggad som admin redigera en produkt, lägga till eller ta bort produkter.

[]  • Backendapplikationen måste ha en fungerande global felhantering (VG)
    EJ IMPLEMENTERAT