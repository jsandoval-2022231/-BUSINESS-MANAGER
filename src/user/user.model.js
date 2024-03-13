import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Pasword is required"],
    },
    role: { 
      type: String,
      default: "ADMIN_ROLE",
    },
    status: {
      type: Boolean,
      default: true,
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};


export default mongoose.model('User', UserSchema);