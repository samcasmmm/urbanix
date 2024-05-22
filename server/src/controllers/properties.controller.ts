import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Properties, { IProperties } from 'models/properties.model';

import { findNullKey } from '../utils/helpers';

export const createProperty = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;

        const result = findNullKey(body);

        console.log(result);
        if (result) {
            res.json({
                status: res.statusCode,
                message: result.key + 'is missing',
                url: req.url,
                meta: null,
                data: null,
            });
        }

        res.json({
            status: res.statusCode,
            message: 'success',
            url: req.url,
            meta: null,
            data: body,
        });
    }
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
