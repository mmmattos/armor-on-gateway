import { ApolloServerPlugin, ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { ApolloArmor } from '@escape.tech/graphql-armor';
import { AppContext, FastifyRequest, FastifyBaseLogger } from './types';

const supergraphSdl = readFileSync('./supergraph.graphql').toString();

const armor = new ApolloArmor({
    //TODO - Add armor configs
});

const protection = armor.protect();

const gateway = new ApolloGateway({
  supergraphSdl,
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
  cache: 'bounded',
  ...protection, 
  validationRules: [ ...protection.validationRules ],
  plugins: [ ...protection.plugins ],
});

const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);
