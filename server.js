// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')


app.get('/', async function (request, response) {
   // Render index.liquid uit de Views map
  let newsParams = {
    'fields': 'title,image,slug'
  }

  const newsResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news?' + new URLSearchParams(newsParams))
  const newsResponseJSON = await newsResponse.json()
   // Geef hier eventueel data aan mee
   response.render('index.liquid', {
    nieuws: newsResponseJSON.data,
    huidigPad: request.path
   })
})
// Maak een GET route voor de index (meestal doe je dit in de root, als /)
// !!!! route naar NIEUWS PAGINA !!!!  
// Route 1: in-bloom filter
app.get('/nieuws/in-de-bloei', async function (request, response) {
  const plantParams = {
    'fields': 'id,name,latin,slug,omscription,in_bloom,not_in_bloom,zones',
    'filter[in_bloom][_nnull]': 'true'
  }

  const [newsResponse, plantResponse] = await Promise.all([ //Hiermee zorg je ervoor dat beide tegelijk worden opgehaald.
    fetch('https://fdnd-agency.directus.app/items/frankendael_news'),
    fetch('https://fdnd-agency.directus.app/items/frankendael_plants?' + new URLSearchParams(plantParams))
  ])
  
  const newsResponseJSON = await newsResponse.json()
  const plantResponseJSON = await plantResponse.json()

  response.render('nieuws.liquid', {
    // nieuws: tempDummyNews.data,
    planten: plantResponseJSON.data,
    huidigPad: request.path
  })
})

// Route 2: not-in-bloom filter
app.get('/nieuws/na-de-bloei', async function (request, response) {
  const plantParams = {
    'fields': 'id,name,latin,slug,omscription,in_bloom,not_in_bloom,zones',
    'filter[not_in_bloom][_nnull]': 'true'
  }

  const [newsResponse, plantResponse] = await Promise.all([ //Hiermee zorg je ervoor dat beide tegelijk worden opgehaald.
    fetch('https://fdnd-agency.directus.app/items/frankendael_news'),
    fetch('https://fdnd-agency.directus.app/items/frankendael_plants?' + new URLSearchParams(plantParams)) //Hier komt die + ... aanvast omdat je wilt filteren op die parameters.
  ])
  
  const newsResponseJSON = await newsResponse.json()
  const plantResponseJSON = await plantResponse.json()

  response.render('nieuws.liquid', {
    // nieuws: tempDummyNews.data,
    planten: plantResponseJSON.data,
    huidigPad: request.path
  })
})

// Route 3: alles (geen filter)
app.get('/nieuws', async function (request, response) {

  const search = request.query.search

  let newsParams = {
    'fields': 'title,image,slug'
  }

  const newsResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news?' + new URLSearchParams(newsParams))
  const newsResponseJSON = await newsResponse.json()

  response.render('nieuws.liquid', {
    // nieuws: tempDummyNews.data,
    nieuws: newsResponseJSON.data,
    huidigPad: request.path,
    zoeken: search
  })
})

// Route 4: detail pagina
app.get('/nieuws/:slug', async function (request, response) {
  let newsParams = {
    'filter[slug]': request.params.slug
  }
  const newsResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news?' + new URLSearchParams(newsParams))
  const newsResponseJSON = await newsResponse.json()
  const artikel = newsResponseJSON.data[0]

  let messageParams = {
    'filter[news]': artikel.id,
    'filter[name][_nnull]': 'true',

    'sort': '-date_created'
  }
  const messagesResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news_comments?' + new URLSearchParams(messageParams))
  const messagesResponseJSON = await messagesResponse.json()
  
  response.render('nieuwsDetail.liquid', 
    { artikel: artikel,
      huidigPad: request.path,
      berichten: messagesResponseJSON.data,
      error: request.query.mislukt,
      gelukt: request.query.gelukt
     })
})

app.post('/nieuws/:slug', async function (request, response){
  const fetchCommentResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news_comments', {

    method: 'POST',

    body: JSON.stringify({  
      news: request.body.newsID, //de data van de POST van de form opgevangen door express.
      comment: request.body.message,
      name: request.body.name
    }),

    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  if (fetchCommentResponse.ok){ //check of het 'ok' is of niet.
    response.redirect(303, '/nieuws/' + request.params.slug + '?gelukt#reacties')
  }
  else{
    response.redirect(303, '/nieuws/' + request.params.slug + '?mislukt#reacties')
  }
  
  response.redirect(303, '/nieuws/' + request.params.slug + '#reacties')
})


// delete comments functie
app.post('/nieuws/:slug/:id/delete', async function (request, response) {
    const deleteResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news_comments/' + request.params.id, {
        method: 'DELETE'
    })

    if (deleteResponse.ok) {
        response.redirect(303, '/nieuws/' + request.params.slug + '#reacties')
    } else {
        response.redirect(303, '/nieuws/' + request.params.slug + '?mislukt#reacties')
    }
})
 
// Route 3: alles (geen filter)
app.get('/veldverkenner', async function (request, response) {

  response.render('veldverkenner.liquid', {
    huidigPad: request.path,
  })
})
// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})

app.get('/collectie', async function (request, response) {

  response.render('collectie.liquid')
})

app.get('/collectie', async function (request, response) {

  const search = request.query.search

  let collParams = {
    'fields': 'title,image,slug'
  }

  const newsResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_plants?' + new URLSearchParams(collParams))
  const newsResponseJSON = await newsResponse.json()

  response.render('collectie.liquid', {
    zoeken: search
  })
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})


app.use((req, res, next) => {
  res.status(404).render('404.liquid')
})