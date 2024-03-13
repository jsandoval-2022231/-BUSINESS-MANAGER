
import User from '../user/user.model.js';

export const existsEmail = async (email = '') => {
    const existsE = await User.findOne({ email });

    if (existsE) {
        throw new Error(`The email ${email} was registred`);
    }
}

export const existsUserById = async (id = '') => {
    const existsUser = await User.findById(id);

    if (!existsUser) {
        throw new Error(`ID: ${id} does not exists`);
    }
}

export const isOwner = async (id = '', user = {}) => {
    if (id !== user._id.toString()) {
        throw new Error(`You do not have permissions to update this user`);
    }
}

