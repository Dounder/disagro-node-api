import { Request, Response } from 'express';

import { ProductsService } from './products.service';

export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  create = async (req: Request, res: Response) => {
    const product = await this.productService.create(req.body);

    res.json(product);
  };

  findAll = async (req: Request, res: Response) => {
    const products = await this.productService.findAll();

    res.json(products);
  };

  findOne = async (req: Request, res: Response) => {
    const product = await this.productService.findOne(Number(req.params.id));

    res.json(product);
  };

  update = async (req: Request, res: Response) => {
    const product = await this.productService.update(Number(req.params.id), req.body);

    res.json(product);
  };

  remove = async (req: Request, res: Response) => {
    const product = await this.productService.remove(Number(req.params.id));

    res.json(product);
  };

  restore = async (req: Request, res: Response) => {
    const product = await this.productService.restore(Number(req.params.id));

    res.json(product);
  };
}
