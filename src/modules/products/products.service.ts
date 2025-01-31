import { PrismaClient } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './schemas';
import { ProductSelect } from './helpers';

export class ProductsService {
  private readonly prisma = new PrismaClient();

  create = async (createProductDto: CreateProductDto) => {
    return this.prisma.product.create({
      data: createProductDto,
      select: ProductSelect
    });
  };

  findAll = async () => {
    return this.prisma.product.findMany({
      select: ProductSelect
    });
  };

  findOne = async (id: number) => {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: ProductSelect
    });

    if (!product) throw new Error(`Product with id ${id} not found`);

    return product;
  };

  update = async (id: number, updateProductDto: UpdateProductDto) => {
    await this.findOne(id); // Ensure product exists

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      select: ProductSelect
    });
  };

  remove = async (id: number) => {
    const product = await this.findOne(id); // Ensure product exists

    if (product.deletedAt) throw new Error(`Product with id ${id} is already deleted`);

    return this.prisma.product.delete({
      where: { id },
      select: ProductSelect
    });
  };

  restore = async (id: number) => {
    const product = await this.findOne(id); // Ensure product exists

    if (!product.deletedAt) throw new Error(`Product with id ${id} is not deleted`);

    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: null },
      select: ProductSelect
    });
  };
}
