import { Request, Express, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import apiRouter from 'routes/apis';

const init = (server: Express) => {
  server.use('/api', apiRouter);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  server.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
    });
  });
};

export default init;
