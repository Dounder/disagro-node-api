import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateSchema = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request body against the schema
    await schema.parseAsync(req.body);

    // If validation succeeds, proceed to the next middleware or route handler
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // If validation fails, return a 400 response with the validation errors
      res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
    } else {
      // If it's an unexpected error, pass it to the error-handling middleware
      next(error);
    }
  }
};
