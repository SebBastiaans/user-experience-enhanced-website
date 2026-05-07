
# Enhanced website
Ontwerp en maak een interactieve website die snel laadt en prettig te gebruiken is.

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/enhanced-website/blob/main/docs/INSTRUCTIONS.md)

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
In dit project maak ik een webapp voor Bloemenveld Frankendael. In de repository [server-side-rendering-server-side-website](https://github.com/SebBastiaans/server-side-rendering-server-side-website) was ik begonnen aan dit project. In de [the-web-is-for-everyone-interactive-functionality repository](https://github.com/SebBastiaans/the-web-is-for-everyone-interactive-functionality) draaide het voornamleijk over een formulier maken die naar de database post. Deze repository heb ik op dat formulier een loading en succes state toegevoegd. Ook is de code opgeschoond en op performonce gelet. 

[Link naar mijn website.](user-experience-enhanced-website-7wvf.onrender.com)

## Gebruik
### Loading en succes state formulier

https://github.com/user-attachments/assets/49b0ae09-5e50-479f-92f9-c6d60b8d20cf

In het filmpje is te zien hoe je een comment plaatst bij het nieuws artikel. Wat er nieuw is, is dat wanneer je nu op versturen klikt de button verandert naar een grijze kleur en een laadt animatie laat zien. Hierdoor weet de gebruiker dat het systeem het nog aan het verwerken is. Daarna zie je een vinkje verschijnen en weet je dat het bericht geplaatst is. Deze komt dan bovenaan de lijst te staan. Na 2 seconden verandert het vinkje weer naar de normale 'verstuur' button en kun je opnieuw een bericht sturen. 

### verwijder knop comments
<img width="415" height="58" alt="image" src="https://github.com/user-attachments/assets/453e2e37-e06d-4891-a493-ed0da3d6f60d" />

Een bericht heeft nu een verwijder knop rechtsonder staan, om je bericht weer te kunnen verwijderen uit de database.

### layout kaders op laptop
<img width="1470" height="839" alt="image" src="https://github.com/user-attachments/assets/c727d621-aff8-41ec-b3ff-62e17dae9129" />

Op grotere schermen dan telefoons, worden nu "telefoon" kaders toegevoegd aan het scherm om de layout hetzelfde als mobiel te houden.

### Frontend performance

https://github.com/user-attachments/assets/148b23a4-f7d6-4f11-89bd-673dbdeadd3b

Images worden nu als avif of webp bestand geladen. Dit zijn kleinere formaten bestanden waardoor de website het makkelijker kan laden en het sneller werkt. Vooral wanneer er lijsten met images moeten worden geladen, gaat dit enorm helpen. Hierbij is ook loading=lazy toegevoegd, waardoor de images pas worden geladen als je ernaartoe scrollt en het dus stuk voor stuk wordt geladen en niet alles in 1 keer.

## Kenmerken
### Loading en succes state formulier
Door dit stuk javaScript verandert de button steeds en wordt de pagina NIET ververst en blijf je op dezelfde pagina. 
https://github.com/SebBastiaans/user-experience-enhanced-website/blob/1f882e01eb4b6f010779d4124ab512b0d6600d00/views/partials/commentForm.liquid#L37-L95

Deze class met animatie wordt dan toegevoegd, en zorgt voor de loading state.
https://github.com/SebBastiaans/user-experience-enhanced-website/blob/a005eb36bd8f9f6987fe36cb337ae5b35075b7c5/public/styles/partials.css#L216-L270

### verwijder knop comments
In de HTML is een formulier met button aangemaakt, die dan doorgeeft aan de server.js dat het uit de database DELETE moet worden.
https://github.com/SebBastiaans/user-experience-enhanced-website/blob/a005eb36bd8f9f6987fe36cb337ae5b35075b7c5/views/partials/commentForm.liquid#L22-L24
https://github.com/SebBastiaans/user-experience-enhanced-website/blob/a005eb36bd8f9f6987fe36cb337ae5b35075b7c5/server.js#L161-L172

### layout kaders op laptop
Doormiddel van een aantal media queries, is er een nieuwe styling toegepast wanneer het scherm breder dan 500px is. Dit omdat bijna alle telefoons wel smaller zijn dan dit.
https://github.com/SebBastiaans/user-experience-enhanced-website/blob/a005eb36bd8f9f6987fe36cb337ae5b35075b7c5/public/styles/styles.css#L5-L12
https://github.com/SebBastiaans/user-experience-enhanced-website/blob/a005eb36bd8f9f6987fe36cb337ae5b35075b7c5/public/styles/styles.css#L308-L312

### Frontend performance
Je ziet dat de source elementen ervoor zorgen dat de bestanden in avif en anders webP worden omgezet. Deze vervangen in principe de src in het img element. Gebeurt dit niet dat valt hij terug op het originele src in de img. Ook zie dat loading=lazy is toegevoegd op het img element.
https://github.com/SebBastiaans/user-experience-enhanced-website/blob/1f882e01eb4b6f010779d4124ab512b0d6600d00/views/nieuws.liquid#L27-L31

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
