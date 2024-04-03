import { Response } from 'express';

class HttpException extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ) {
        super(message);
        Object.setPrototypeOf(this, HttpException.prototype);
    }

    serialize() {
        return { statusCode: this.statusCode, message: this.message };
    }
}

const httpException = (statusCode: number, message: string) => {
    throw new HttpException(statusCode, message);
};

const HTTP = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
};

const HttpMessages = {
    [HTTP.BAD_REQUEST]: 'Bad Request',
    [HTTP.UNAUTHORIZED]: 'Unauthorized',
    [HTTP.FORBIDDEN]: 'Forbidden',
    [HTTP.NOT_FOUND]: 'Not Found',
    [HTTP.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
    [HTTP.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    [HTTP.BAD_GATEWAY]: 'Bad Gateway',
    [HTTP.SERVICE_UNAVAILABLE]: 'Service Unavailable',
};

function throwError(res: Response, statusCode: number, message: string): void {
    res.status(statusCode).json({
        status: res.statusCode,
        message: message,
        meta: null,
        data: null,
    });
}

export { HttpException, httpException, HTTP, throwError };
