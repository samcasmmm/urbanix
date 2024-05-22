import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';

export const createProperty = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
);
export const updateProperty = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
);
export const getProperty = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
);
export const getAllProperties = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
);
export const deleteProperty = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
);
