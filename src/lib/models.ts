import mongoose, { Schema } from "mongoose";

// USER SCHEMA
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    isAdmin: {
        type: String,
        required: true,
        default: "No"
    }
}, {timestamps: true});

// PHRASAL VERB SCHEMA
const phrasalVerbSchema = new Schema({
    phrasalVerb: {
        type: String,
        required: true,
    },
    example: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const PhrasalVerb = mongoose.models?.PhrasalVerb || mongoose.model("PhrasalVerb", phrasalVerbSchema);