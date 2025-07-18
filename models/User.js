import {model, Schema} from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{type: String, ref: "Role"}],
})


export const User = model("User", userSchema);
