const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const Filter = require('postgraphile-plugin-connection-filter');
const { default: PgPubSub } = require('@graphile/pg-pubsub');
const { postgraphile, makePluginHook } = require('postgraphile');
import { createExpressMiddleware } from '@trpc/server/adapters/express';
dotenv.config();

const app = express();

app.use(cors());

const subsPluginHook = makePluginHook([PgPubSub]);
console.log('envvvvvvvvvv', process.env['CONNECTION_STRING']);

const res = postgraphile(
  process.env['CONNECTION_STRING'],
  process.env['SCHEMA'],
  {
    pluginHook: subsPluginHook,
    appendPlugins: [Filter],
    graphileBuildOptions: {
      connectionFilterRelations: true,
    },
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    subscriptions: true,
    simpleSubscriptions: true,
    websocketMiddlewares: [],
  }
);
app.use(res);
app.use(res);

app.listen(process.env['PORT'], () => {
  console.log(`Server started on port: ${process.env['PORT']}`);
});
