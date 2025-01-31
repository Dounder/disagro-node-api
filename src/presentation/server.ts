import express, { Router, Request, Response, NextFunction } from 'express';

interface Options {
  port: number;
  public_path: string;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.publicPath = options.public_path;
    this.routes = options.routes;
  }

  async start() {
    //? Middlewares
    this.app.use(express.json()); // application/json
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //? Serve static files (images, CSS, JavaScript, etc.) from the 'public' directory
    this.app.use(express.static(this.publicPath));

    //* SPA (Single Page Application) routing configuration
    // this.app.get('*', (req, res) => {
    // 	const indexPath = path.join(__dirname, `../../../${this.publicPath}/index.html`);
    // 	res.sendFile(indexPath);
    // });

    //? API routes
    this.app.use('/api', this.routes);

    // Error-handling middleware
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error({ stack: err.stack, message: err.message });
      res.status(500).json({ error: err.message || 'Internal server error' });
    });

    //? Start the server
    this.app.listen(this.port, () => {
      console.log(`Server started on port:${this.port}`);
    });
  }
}
