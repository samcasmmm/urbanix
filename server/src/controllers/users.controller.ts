import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User, { IUser } from '../models/users.model';
import generateToken from '../utils/generateToken';
import { HTTP, throwError } from '../helpers/httpsException';

/**
 * Check the health of the user route.
 * @route GET /api/user/health
 * @group User - Operations about user
 * @returns {object} 200 - An object indicating the health status of the user route
 * @returns {Error} 500 - Internal server error
 */
const health = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.json({
            status: res.statusCode,
            message: 'User Route health is good',
            url: req.url,
            meta: null,
            data: null,
        });
    }
);

/**
 * Authenticate a user and generate a JWT token.
 * @route POST /api/users/signIn
 * @group User - Operations about user
 * @param {string} email.body.required - User's email
 * @param {string} password.body.required - User's password
 * @returns {object} 200 - An object containing user information and JWT token
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 500 - Internal server error
 */

const signIn = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                status: res.statusCode,
                message: 'Login Successfully',
                url: req.url,
                meta: null,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(res, user._id),
                },
            });
        } else {
            // res.status(400);
            // throw new Error('Invalid Email or Password');
            throwError(res, HTTP.BAD_REQUEST, 'Invalid Email or Password');
        }
    }
);

/**
 * Register a user and generate a JWT token.
 * @route POST /api/user/signUp
 * @group User - Operations about user
 * @param {string} name.body.required - User's name
 * @param {string} email.body.required - User's email
 * @param {string} role.body.required - User's role
 * @param {string} password.body.required - User's password
 * @returns {object} 200 - An object containing user information and JWT token
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 500 - Internal server error
 */

const signUp = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, role, password } = req.body;

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            res.status(403);
            throw new Error('User Already Exists');
        }
        if (password.length > 6) {
            res.status(403);
            throw new Error('Invalid Email or Password');
        }

        const user = await User.create({ name, email, role, password });

        if (user) {
            res.json({
                status: res.statusCode,
                message: 'User Created.',
                url: req.url,
                meta: '',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(res, user._id),
                },
            });
        } else {
            res.status(400);
            throw new Error('Invalid User Data');
        }
    }
);

/**
 * Get user details by JWT.
 * @route GET /api/user/profile
 * @group User - Operations about user
 * @param {string} jwt.required - JWT token obtained during user authentication
 * @returns {object} 200 - An object containing user information
 * @returns {Error} 401 - Unauthorized. Invalid or expired JWT token.
 * @returns {Error} 404 - User not found. User associated with the provided JWT token does not exist.
 * @returns {Error} 500 - Internal server error. An unexpected error occurred on the server.
 */

interface UpdateReq extends Request {
    user?: IUser;
}

const profile = expressAsyncHandler(
    async (req: UpdateReq, res: Response, next: NextFunction) => {
        const user = await User.findById(req.user?.id);
        if (user) {
            res.json({
                status: res.statusCode,
                message: 'Fetch Profile Successfully',
                url: req.url,
                meta: '',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                },
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }
);

/**
 * Update user profile.
 * @route PUT /api/user/update-profile
 * @group User - Operations about user
 * @param {string} jwt.required - JWT token obtained during user authentication
 * @param {object} body.required - Request body containing updated user profile details
 * @param {string} [body.name] - Updated user name
 * @param {string} [body.email] - Updated user email
 * @param {string} [body.role] - Updated user role (only accessible to admin)
 * @param {string} [body.password] - Updated user password
 * @returns {object} 200 - An object containing updated user information and a new JWT token
 * @returns {Error} 401 - Unauthorized. Invalid or expired JWT token.
 * @returns {Error} 404 - User not found. User associated with the provided JWT token does not exist.
 * @returns {Error} 500 - Internal server error. An unexpected error occurred on the server.
 */

const updateProfile = expressAsyncHandler(
    async (req: UpdateReq, res: Response, next: NextFunction) => {
        const { name, email, role, password } = req.body;
        const user = await User.findById(req.user?.id);
        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            if (req.body.role) {
                user.role = role;
            }
            if (req.body.password) {
                user.password = password;
            }
            const updatedUser = await user.save();
            res.json({
                status: res.statusCode,
                message: 'Profile Update Successfully',
                url: req.url,
                meta: '',
                data: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    token: generateToken(res, updatedUser._id),
                },
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }
);

/**
 * Get user profile by ID.
 * @route GET /api/user/{id}
 * @group User - Operations about user
 * @param {string} id.path.required - User ID
 * @returns {object} 200 - An object containing user information
 * @returns {Error} 404 - User not found. The user with the specified ID does not exist.
 * @returns {Error} 500 - Internal server error. An unexpected error occurred on the server.
 */

const userById = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user) {
            res.json({
                status: res.statusCode,
                message: 'Fetch Profile Successfully',
                url: req.url,
                meta: null,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                },
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }
);

/**
 * Search for users by name, email, or role.
 * @route GET /api/users/search
 * @group Users - Operations related to users
 * @param {string} [name.query] - The name to search for.
 * @param {string} [email.query] - The email to search for.
 * @param {string} [role.query] - The role to search for.
 * @returns {object} 200 - An array of user profiles matching the search criteria.
 * @returns {object} 400 - Bad request if neither name, email, nor role is provided.
 * @returns {object} 404 - Not found if no users match the search criteria.
 * @returns {Error} 500 - Internal server error.
 */

const searchUserByQuery = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { name, email, role } = req.query;

        if (!name && !email && !role) {
            res.status(400).json({
                status: res.statusCode,
                message: 'Please provide a name, email, or role for the search',
                url: req.url,
                meta: null,
                data: null,
            });
        }

        try {
            let query: any = {};

            if (name) {
                const nameRegex = new RegExp(name.toString(), 'i');
                query.name = { $regex: nameRegex };
            }
            if (email) {
                query.email = email;
            }
            if (role) {
                query.role = role;
            }

            const users = await User.find(query);

            if (users.length > 0) {
                const responseData = users.map((user) => ({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                }));
                res.json({
                    status: res.statusCode,
                    message: 'Fetch Profiles Successfully',
                    url: req.url,
                    meta: null,
                    data: responseData,
                });
            } else {
                res.status(404).json({
                    status: res.statusCode,
                    message: 'No users found',
                    url: req.url,
                    meta: null,
                    data: null,
                });
            }
        } catch (error) {
            console.error('Error searching for users:', error);
            res.status(500).json({
                status: res.statusCode,
                message: 'Internal server error',
                url: req.url,
                meta: null,
                data: null,
            });
        }
    }
);

enum UserRole {
    All = 'all',
    Customer = 'customer',
    Developer = 'developer',
    Broker = 'broker',
    Admin = 'admin',
}

interface QueryParams {
    role?: UserRole;
    page?: number;
    size?: number;
}

/**
 * Fetch all users based on the specified role.
 * @route GET /api/users
 * @group Users - Operations related to users
 * @param {string} [role.query] - The role of the users to fetch. Possible values are 'all', 'freemium', 'premium', 'platinum', or 'editor'.
 * @param {number} [page.query=1] - The page number for pagination. Default is 1.
 * @param {number} [size.query=10] - The number of users to fetch per page. Default is 10.
 * @returns {object} 200 - An object containing information about the fetched users.
 * @returns {object} 400 - Bad request if an invalid role or page number is provided.
 * @returns {object} 500 - Internal server error if an error occurs while fetching users.
 */

const getAllUsers = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { role, page = 1, size = 10 }: QueryParams = req.query;
        try {
            let query = {};
            if (role === 'all') {
            } else if (
                role === 'customer' ||
                role === 'developer' ||
                role === 'broker'
            ) {
                query = { role };
            } else {
                res.status(400).json({
                    status: res.statusCode,
                    message: 'Invalid role',
                    url: req.url,
                    meta: null,
                    data: null,
                });
            }
            const usersCount = await User.countDocuments(query);
            const totalPages = Math.ceil(usersCount / size);

            if (page > totalPages) {
                res.status(400).json({
                    status: res.statusCode,
                    message: 'Invalid page number',
                    url: req.url,
                    meta: null,
                    data: null,
                });
            }

            const users = await User.find(query)
                .select('-password')
                .skip((page - 1) * size)
                .limit(Number(size));
            console.log(users);

            res.status(200).json({
                status: 'success',
                message: 'Users fetched successfully',
                url: req.url,
                meta: null,
                data: {
                    total: usersCount,
                    perPage: size,
                    page: Number(page),
                    totalPages: totalPages,
                    users: users,
                },
            });
        } catch (error) {
            res.status(500).json({
                status: res.statusCode,
                message: 'An error occurred while fetching users',
                url: req.url,
                meta: null,
                data: null,
            });
        }
    }
);

export {
    health,
    signIn,
    signUp,
    profile,
    updateProfile,
    userById,
    searchUserByQuery,
    getAllUsers,
};
