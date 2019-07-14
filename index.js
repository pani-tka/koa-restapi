const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

const koaOptions = {
  origin: false,
  credentials: false
};
 
router
 .param('title', (str, ctx, next) => {
   ctx.title = str;
   return next();
 })
 //get all movies
 .get('/movies', (ctx, next) => {
  ctx.body = [
    {
      title: 'Casablanca',
      year: 1942,
      format: 'DVD',
      actors: 'Humphrey Bogart'
    },
    {
      title: 'Charade',
      year: 1953,
      format: 'DVD',
      actors: 'Audrey Hepburn'
    },
    {
      title: 'Cool Hand Luke',
      year: 1967,
      format: 'VHS',
      actors: 'Paul Newman'
    },
    {
      title: 'Blazing Saddles',
      year: 1974,
      format: 'VHS',
      actors: 'Mel Brooks'
    }

  ];
})
 //get a single movie by title of movie
 .get('/movies/:title', (ctx, next) => {
   ctx.body = {
    title: 'Blazing Saddles',
    year: 1974,
    format: 'VHS',
    actors: 'Mel Brooks'
  }
 })
 //get movie by name of actor
 .get('/movies/:actorname', (ctx, next) => {
   ctx.body = [
    {
      title: 'Cool Hand Luke',
      year: 1967,
      format: 'VHS',
      actors: 'Paul Newman'
    },
    {
      title: 'Blazing Saddles',
      year: 1974,
      format: 'VHS',
      actors: 'Mel Brooks'
    }
   ]
 })

app
 .use(cors(koaOptions))
 .use(router.routes())
 .use(router.allowedMethods());
 
 app.listen(8080);
