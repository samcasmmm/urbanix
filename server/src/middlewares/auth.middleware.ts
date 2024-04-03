import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User, { IUser } from '../models/users.model';

interface AuthRequest extends Request {
    user?: IUser;
}

interface TokenPayload extends JwtPayload {
    userId: string;
}

const verifyToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    let token: string | undefined;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const secretKey = process.env.SECRET_KEY!;
            const decoded = jwt.verify(token, secretKey) as TokenPayload;
            const user: IUser | null = await User.findById(
                decoded.userId
            ).select('-password');
            if (user) {
                req.user = user;
                // console.log(req.user);
                return next();
            } else {
                res.status(404).send({
                    status: res.statusCode,
                    message: 'User not found',
                    meta: null,
                    data: null,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(401).send({
                status: res.statusCode,
                message: 'Not Authorized, Token Failed',
                meta: null,
                data: null,
            });
        }
    }

    if (!token) {
        res.status(401).send({
            status: res.statusCode,
            message: 'Not Authorized, No Token',
            meta: null,
            data: null,
        });
    }
};

const protect = expressAsyncHandler(verifyToken);

const isAdmin = expressAsyncHandler(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        let token: string | undefined;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
            try {
                const secretKey = process.env.SECRET_KEY!;
                const decoded = jwt.verify(token, secretKey) as TokenPayload;
                const user: IUser | null = await User.findById(
                    decoded.userId
                ).select('-password');
                if (user) {
                    req.user = user;
                    console.log(req.user);
                    if (req.user.role === 'admin') {
                        return next();
                    } else {
                        res.status(401);
                        next({ message: 'Not Authorized' });
                    }
                } else {
                    res.status(404).send({
                        status: res.statusCode,
                        message: 'Not Authorized, No Access',
                        meta: null,
                        data: null,
                    });
                }
            } catch (error) {
                console.error(error);
                res.status(401).send({
                    status: res.statusCode,
                    message: 'Not Authorized, Token Failed',
                    meta: null,
                    data: null,
                });
            }
        }

        if (!token) {
            res.status(401).send({
                status: res.statusCode,
                message: 'Not Authorized, No Token',
                meta: null,
                data: null,
            });
        }
    }
);

export { protect, isAdmin };
