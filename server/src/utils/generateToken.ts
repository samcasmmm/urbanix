import { Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

type tokenProps = {
    res: Response;
    userId: string | number;
};

const generateToken = (res: Response, userId: string | number) => {
    const secretKey = process.env.SECRET_KEY!;

    const token = jwt.sign({ userId }, secretKey, {
        expiresIn: '2d',
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return token;
};

export default generateToken;
