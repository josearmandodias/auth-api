import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required:[true, 'A title is required'],
        trim: true,
    },
    description:{
        type: String,
        required: [true, 'A description is required'],
        trim:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('Post', postSchema);