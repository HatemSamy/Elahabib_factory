import mongoose, { Schema } from 'mongoose';

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
}, {
    timestamps: true
});

const ReviewModel = mongoose.model('Review', reviewSchema);
export default ReviewModel;
