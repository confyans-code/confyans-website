import mongoose from 'mongoose';

export interface IVisit extends mongoose.Document {
    path: string;
    userAgent: string;
    createdAt: Date;
}

const VisitSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Visit || mongoose.model<IVisit>('Visit', VisitSchema);
