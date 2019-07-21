const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID;

//
// Connect to DB
//
const url = 'mongodb://localhost:27017';

const dbName = 'moviesDB';
const collectionName = 'movies';
const client = new MongoClient(url);

let collection = null;

(async function() {
  await client.connect();
  col = client
  .db(dbName)
  .collection(collectionName);
  console.log("Connected correctly to server");
})();

const app = new Koa();
const router = new Router();

const koaOptions = {
  origin: false,
  credentials: false
};
 
router
 .get('/', (ctx, next) => {
    ctx.body = 'Hello, Dmitrii';
  })
  //get single movie by title
  .get('/movies/:title', async (ctx, next) => {
    const singleMovie = await col.findOne({"title": (ctx.params.title)});
    ctx.body = JSON.stringify(singleMovie, null, 2);
  })
  //det movie info
  .get('/movies/:id', async (ctx, next) => {
    const singleMovie = await col.findOne({"_id": ObjectID(ctx.params.id)});
    ctx.body = JSON.stringify(singleMovie, null, 2);
  })
  //get movies by actor
  .get('/movies/:actor', async (ctx,next) => {
    const moviesByActor = await col.find({"actors": (ctx.params.actor)});
    ctx.body = JSON.stringify(moviesByActor, null, 2);
  })
  //get movie list
  .get('/movies', async (ctx, next) => {
    const allMovies = await col.find({}).toArray();
    ctx.body = JSON.stringify(allMovies, null, 2);
  })
  .post('/movies', async (ctx, next) => {
    const newMovie = {
      title: "I'm new movie",
      year: 2010,
      format: 'VHS',
      actors: [
        'Kianu Rivz',
        'Scarlet Yohanson',
      ],
    };

    const insertResult = await col.insertOne(newMovie);
    ctx.body = JSON.stringify(insertResult.ops[0], null, 2);
  })

app
 .use(cors(koaOptions))
 .use(router.routes())
 .use(router.allowedMethods());
 
 app.listen(8080);