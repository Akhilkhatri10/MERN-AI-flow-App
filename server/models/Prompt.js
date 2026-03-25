import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
    prompt: String,
    response: String
}, { timestamps: true });

export default mongoose.model('Prompt', promptSchema);