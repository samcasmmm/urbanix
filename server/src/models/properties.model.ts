import mongoose, { Schema, Document } from 'mongoose';

interface IProperties extends Document {
    title: string;
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
    thumbnail: string;
    mainPhoto: string;
    morePhotos: string[];
    developer: {
        name: string;
        contact: string;
    };
    broker: string;
}

const propertiesSchema: Schema = new Schema({
    title: { type: String, required: true },
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
    thumbnail: { type: String, required: true },
    mainPhoto: { type: String, required: true },
    morePhotos: { type: [String], required: false },
    developer: {
        name: { type: String, required: true },
        contact: { type: String, required: true },
    },
    broker: { type: String, required: true },
});

const Properties = mongoose.model<IProperties>('Property', propertiesSchema);
export default Properties;
