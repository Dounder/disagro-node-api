import { Request, Response } from 'express';
import { UsersService } from './users.service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.usersService.createUser(req.body);

      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAllUsers = async (_req: Request, res: Response) => {
    const users = await this.usersService.findAll();

    res.json(users);
  };

  getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = Number(id);

    if (!id) res.status(400).json({ error: 'User ID is required' });
    if (isNaN(parsedId)) res.status(400).json({ error: 'User ID must be a number' });

    const user = await this.usersService.findOne(parsedId);

    if (!user) res.status(404).json({ error: 'User not found' });

    res.json(user);
  };

  updateUser = async (req: Request, res: Response) => {
    const user = await this.usersService.updateUser(Number(req.params.id), req.body);

    res.json(user);
  };

  removeUser = async (req: Request, res: Response) => {
    const user = await this.usersService.removeUser(Number(req.params.id));

    res.json(user);
  };

  restoreUser = async (req: Request, res: Response) => {
    const user = await this.usersService.restoreUser(Number(req.params.id));

    res.json(user);
  };
}
