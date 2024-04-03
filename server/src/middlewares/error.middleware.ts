import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(
        `Not found - ${req.method} ${req.originalUrl}`
    ) as Error & { status?: number };
    res.status(404).send({
        status: res.statusCode,
        message: 'API Route is Not Found',
        url: req.url,
        meta: '' || null,
        data: null,
        stack: null,
    });
    next(error);
};

const errorHandler = (
    err: Error & { status?: number },
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        status: statusCode,
        message: err.message,
        url: req.url,
        meta: '' || null,
        data: null,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler };
