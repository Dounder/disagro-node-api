import express from 'express';
import path from 'path';

interface Options {
	port: number;
	public_path: string;
}

export class Server {
	private readonly app = express();
	private readonly port: number;
	private readonly publicPath: string;

	constructor(options: Options) {
		this.port = options.port;
		this.publicPath = options.public_path;
	}

	async start() {
		//? Serve static files (images, CSS, JavaScript, etc.) from the 'public' directory
		this.app.use(express.static(this.publicPath));

		//* SPA (Single Page Application) routing configuration
		// this.app.get('*', (req, res) => {
		// 	const indexPath = path.join(__dirname, `../../../${this.publicPath}/index.html`);
		// 	res.sendFile(indexPath);
		// });

		//? Start the server
		this.app.listen(this.port, () => {
			console.log(`Server started on port:${this.port}`);
		});
	}
}
