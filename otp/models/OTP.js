const {Schema} = require("mongoose");

const otpSchema = new Schema({
    otp: Number,
    expiration_time: Date,
    verified: {
        type: Boolean,
        default: false,
    }
}, {versionKey: false, timestamps: true});

module.exports = { otpSchema };