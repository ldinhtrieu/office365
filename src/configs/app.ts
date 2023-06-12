import express, { Express, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import config from 'configs/config';
import cookieParse from 'cookie-parser';
import { WEBSOCKET_HEADER, WEBSOCKET_NAME_SPACE } from 'common/constants/express.constants';
import cors from 'cors';
import helmet from 'helmet';

export default class App {
  private async initialConnection(): Promise<void> {
    //TODO
  }

  private init(): Express {
    const server = express();
    server.use(json({ limit: '50md' }));
    server.use(cookieParse());
    server.use(urlencoded({ extended: true }));

    //All CORS for domain
    const corsOptions = {
      origin: config.cors,
      allowedHeaders: [
        'Origin',
        'X-*',
        'contentType',
        'Content-Type',
        'Accept',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Cache-Control',
        'Expires',
        'Pragma',
        'Referrer',
        'Referrer-Policy',
        WEBSOCKET_HEADER,
        WEBSOCKET_NAME_SPACE,
      ],
      credentials: true,
      optionsSuccessStatus: 200,
      methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS,PUT',
    };
    server.use(cors(corsOptions));
    server.use(helmet());
    server.use(function (req: Request, res: Response, next: NextFunction) {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      next();
    });
    return server;
  }
  public async start(): Promise<boolean> {
    try {
      await this.initialConnection();
    } catch (error) {
      console.log(error);
      return false;
    }

    const { hostname, port, env } = config;
    const express = this.init();
    const server = express.listen(port, async function () {
      console.log(`⚡️[server]: Server is running at http://${hostname}:${port} - ${env}(NODE_ENV: ${process.env.NODE_ENV})`);
    });

    process.on('SIGTERM', () => {
      server.close((error: any): void => {
        if (error) {
          console.log(error);
        }
        console.log('Server terminated');
      });
    });
    return true;
  }
}
