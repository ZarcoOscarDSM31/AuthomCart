import monngoose from "mongoose";

const userSchema = new monngoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'El nombre de usuario es obligatorio'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'El correo electrónico es obligatorio'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
        },
    },
    {
        timestamps: true,
        collection: "users"
    }
);

export default monngoose.model("User", userSchema)