const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: { type: String },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ['admin', 'staff', 'user'],
            default: 'user'
        },
        permissions: {
            type: [String],
        default: []
        },
        status: {
            type: String,
            default: 'active'
        },

        phone: { type: Number },

        address: { type: String },

        avatar: { type: String },

        city: { type: String },
        status: {
    type: String,
    default: 'active'
}
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User