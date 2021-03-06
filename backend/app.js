const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const api = require('./routes/api');

// error handler
onerror(app);

// middlewares
app.use(
	bodyparser({
		enableTypes: ['json', 'form', 'text']
	})
);
app.use(json());
app.use(logger());

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(api.routes(), api.allowedMethods());

module.exports = app;
