import mongoose, { Schema, Document } from 'mongoose';

export interface IProperties extends Document {
    name: string;
    description: string;
    price: number;
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
    bedrooms: number;
    bathrooms: number;
    area: number;
    amenities: string[];
    possession:
        | 'Ready to move in'
        | 'Under construction'
        | 'Pre-launch'
        | 'Launching soon'
        | 'Possession offered'
        | 'Possession expected'
        | String
        | Date;
    isLoanAvailable: boolean;
    availability: 'Available' | 'Sold';
    thumbnail: string;
    mainPhoto: string;
    morePhotos: string[];
    developer: {
        name: string;
        contact: string;
    };
    broker: {
        name: string;
        contact: string;
    };
}

interface IPropertiesConfigurations extends Document {
    name: string;
    price: number;
}

const propertiesConfigurations: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'properties',
    },
});

const propertiesSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        coordinates: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
    },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true },
    amenities: { type: [String], required: false },
    possession: { type: Schema.Types.Mixed, required: true },
    isLoanAvailable: { type: Boolean, required: false },
    availability: {
        type: String,
        enum: ['Available', 'Sold'],
        required: false,
    },
    thumbnail: { type: String, required: true },
    mainPhoto: { type: String, required: true },
    morePhotos: { type: [String], required: false },
    developer: {
        name: { type: String, required: true },
        contact: { type: String, required: true },
    },
    broker: {
        name: { type: String, required: true },
        contact: { type: String, required: true },
    },
});

const Properties = mongoose.model<IProperties>('properties', propertiesSchema);
export default Properties;
