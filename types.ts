import { IncomingHttpHeaders } from 'http';
import { FastifyBaseLogger, FastifyRequest } from 'fastify';


export interface AppContext {
  token?: string;
  req: FastifyRequest;
  headers: IncomingHttpHeaders;
}

export interface DataSourceInterface {
    url: string;
    logger: FastifyBaseLogger;
  }

  export interface DataSourceContext {
    req: FastifyRequest;
    headers: IncomingHttpHeaders;
  }
