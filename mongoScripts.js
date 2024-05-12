// Por buenas prácticas nombramos las tablas en inglés. 

/*
GLOSARIO: 

tournaments = torneos
games = juegos/partidos
teams = equipos
referees = arbitros
results = resultados

 */

// Creamos nuestra bd
use tenis

// creamos la coleccion de torneos
db.createCollection("tournaments")

// ejemplo de torneos
const documents = [
  { name: "French Open", city: "Paris", country: "France", surface: "Clay", category: "Grand Slam" },
  { name: "Wimbledon", city: "London", country: "United Kingdom", surface: "Grass", category: "Grand Slam" },
  { name: "US Open", city: "New York City", country: "United States", surface: "Hard Court", category: "Grand Slam" },
  { name: "Australian Open", city: "Melbourne", country: "Australia", surface: "Hard Court", category: "Grand Slam" },
  { name: "Davis Cup", city: "Various", country: "Various", surface: "Various", category: "International Team Event" },
];

// Insertamos los documentos
db.tournaments.insertMany(documents)

// verificamnos 
db.tournaments.find()

// creamos la coleccion de arbitros
db.createCollection("referees")

// ejemplos de arbitros
const documents = [
  { name: "Carlos", lastName: "Ramos", experience: 10 },
  { name: "Eva", lastName: "Asderaki-Moore", experience: 15 },
  { name: "Stefan", lastName: "Oderstedt", experience: 8 },
  { name: "Mariana", lastName: "de Almeida", experience: 12 },
  { name: "James", lastName: "Southworth", experience: 5 },
];

// Insertamos los documentos
db.referees.insertMany(documents)

// Verificamos
db.referees.find()

// creamos la coleccion de jugadores
db.createCollection("players")

// Ejemplos de jugadores
const documents = [
  { name: "Novak", lastName: "Djokovic", globalRank: 1, age: 35 },
  { name: "Rafael", lastName: "Nadal", globalRank: 3, age: 36 },
  { name: "Daniil", lastName: "Medvedev", globalRank: 2, age: 27 },
  { name: "Alexander", lastName: "Zverev", globalRank: 4, age: 25 },
  { name: "Stefanos", lastName: "Tsitsipas", globalRank: 5, age: 24 },
];

// Insertamos lo documentos
db.players.insertMany(documents)

// verificamos
db.players.find()


// este es un array de los jugadores creados con anterioridad (estos datos cambian si se prueba el código, pero por convención, los dejamos quemados)
const playerIds = [ ObjectId('663fe1b4cd73216c2999ea81'),
 ObjectId('663fe1b4cd73216c2999ea82'),
 ObjectId('663fe1b4cd73216c2999ea83'),
 ObjectId('663fe1b4cd73216c2999ea84'),
 ObjectId('663fe1b4cd73216c2999ea85')];

// creamos la colección de equipos 
db.createCollection("teams")

// Ejemplos de equipos con su referencias a jugadores
const documents = [
  { name: "Dream Team", sponsor: "Acme Sports", players: [playerIds[0],playerIds[1]] }, 
  { name: "Rising Stars", sponsor: "Global Tennis", players: [playerIds[2],playerIds[3]] }, 
  { name: "Powerhouse", sponsor: "Titan Equipment", players: [playerIds[4],playerIds[0]] }, 
  { name: "Aces & Volleys", sponsor: "Courtside Classics", players: [playerIds[2],playerIds[1]] },  
  { name: "Next Gen", sponsor: "Future Stars Academy", players: [playerIds[4]] }, 
];

// Insertamos los equipos con su dbref
db.teams.insertMany(documents.map(team => {
  return { ...team, players: team.players.map(id => new DBRef("players", id)) };
}))

// Verificamos
db.teams.find().pretty()



// este es un array de los torneos creados con anterioridad (estos datos cambian si se prueba el código, pero por convención, los dejamos quemados)
const tournamentIds = [ObjectId('663ff18ca88501a84399ea72'),
ObjectId('663ff18ca88501a84399ea73'),
ObjectId('663ff18ca88501a84399ea74'),
ObjectId('663ff18ca88501a84399ea75'),
ObjectId('663ff18ca88501a84399ea76')];

// este es un array de los equipos creados con anterioridad (estos datos cambian si se prueba el código, pero por convención, los dejamos quemados)
const teamIds = [ObjectId('663ff35ea88501a84399ea8b'),
ObjectId('663ff35ea88501a84399ea8c'),
ObjectId('663ff35ea88501a84399ea8d'),
ObjectId('663ff35ea88501a84399ea8e'),
ObjectId('663ff35ea88501a84399ea8f')];

// este es un array de los arbitros creados con anterioridad (estos datos cambian si se prueba el código, pero por convención, los dejamos quemados)
const refereeIds = [ObjectId('663ff1b5a88501a84399ea77'),
ObjectId('663ff1b5a88501a84399ea78'),
ObjectId('663ff1b5a88501a84399ea79'),
ObjectId('663ff1b5a88501a84399ea7a'),
ObjectId('663ff1b5a88501a84399ea7b')];

// Creamos la coleccion de partidos
db.createCollection("games")

// Ejemplos de partidos
const documents = [
  {
    tournament: new DBRef("tournaments", tournamentIds[0]),
    teamA: new DBRef("teams", teamIds[0]),
    teamB: new DBRef("teams", teamIds[1]),
    referee: new DBRef("referees", refereeIds[0]),
  },
  {
    tournament: new DBRef("tournaments", tournamentIds[1]),
    teamA: new DBRef("teams", teamIds[1]),
    teamB: new DBRef("teams", teamIds[2]),
    referee: new DBRef("referees", refereeIds[1]),
  },
  {
    tournament: new DBRef("tournaments", tournamentIds[2]),
    teamA: new DBRef("teams", teamIds[2]),
    teamB: new DBRef("teams", teamIds[3]),
    referee: new DBRef("referees", refereeIds[2]),
  },
  {
    tournament: new DBRef("tournaments", tournamentIds[3]),
    teamA: new DBRef("teams", teamIds[3]),
    teamB: new DBRef("teams", teamIds[4]),
    referee: new DBRef("referees", refereeIds[3]),
  },
  {
    tournament: new DBRef("tournaments", tournamentIds[4]),
    teamA: new DBRef("teams", teamIds[4]),
    teamB: new DBRef("teams", teamIds[0]),
    referee: new DBRef("referees", refereeIds[4]),
  },
];

// Insertamos los partidos
db.games.insertMany(documents)

// Verificamos
db.games.find().pretty()


// este es un array de los partidos creados con anterioridad (estos datos cambian si se prueba el código, pero por convención, los dejamos quemados)
const gameIds = [ ObjectId('663ff62ea88501a84399ea90'),
ObjectId('663ff62ea88501a84399ea91'),
ObjectId('663ff62ea88501a84399ea92'),
ObjectId('663ff62ea88501a84399ea93'),
ObjectId('663ff62ea88501a84399ea94')];

// este es un array de los equipos creados con anterioridad (estos datos cambian si se prueba el código, pero por convención, los dejamos quemados)
const teamIds = [ObjectId('663ff35ea88501a84399ea8b'),
ObjectId('663ff35ea88501a84399ea8c'),
ObjectId('663ff35ea88501a84399ea8d'),
ObjectId('663ff35ea88501a84399ea8e'),
ObjectId('663ff35ea88501a84399ea8f')];

// Creamos la colección de resultados
db.createCollection("results")

// Ejemplos de resultados
const documents = [
  {
    game: new DBRef("game", gameIds[0]),
    team: new DBRef("team", teamIds[0]),
    points: 85,
    setsWon: 3,
    setsLost: 0,
  },
  {
    game: new DBRef("game", gameIds[1]),
    team: new DBRef("team", teamIds[1]),
    points: 72,
    setsWon: 1,
    setsLost: 2,
  },
  {
    game: new DBRef("game", gameIds[2]),
    team: new DBRef("team", teamIds[2]),
    points: 13,
    setsWon: 0,
    setsLost: 2,
  },
  {
    game: new DBRef("game", gameIds[3]),
    team: new DBRef("team", teamIds[3]),
    points: 56,
    setsWon: 2,
    setsLost: 0,
  },
  {
    game: new DBRef("game", gameIds[4]),
    team: new DBRef("team", teamIds[4]),
    points: 43,
    setsWon: 3,
    setsLost: 2,
  },
];

//Insertamos los documentos
db.results.insertMany(documents)

// Verificamos
db.results.find().pretty()
