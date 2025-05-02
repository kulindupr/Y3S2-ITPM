import mongoose from "mongoose";

const cvSchema = new mongoose.Schema({
    userId: { type: String },
    fullName: { type: String, required: true },
    profession: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
    summary: { type: String, required: true },
    education: [{
        degree: String,
        institution: String,
        year: String
    }],
    experience: [{
        title: String,
        company: String,
        years: String,
        description: String
    }],
    skills: [{
        skill: String,
        percentage: String
    }],
    projects: [{
        name: String,
        description: String,
        link: String
    }],
    certifications: [{
        name: String,
        issuer: String,
        year: String
    }],
    languages: [{
        language: String,
        level: String
    }],
    interests: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const CV = mongoose.model("CV", cvSchema);
export default CV; 