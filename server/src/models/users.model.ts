import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    name: string;
    email: string;
    role: 'customer' | 'developer' | 'broker' | 'admin';
    password: string;
    createdAt: Date;
    updatedAt: Date;
    matchPassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['customer', 'developer', 'broker', 'admin'],
            default: 'customer',
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});

userSchema.methods.matchPassword = async function (
    password: string
): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        return false;
    }
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
