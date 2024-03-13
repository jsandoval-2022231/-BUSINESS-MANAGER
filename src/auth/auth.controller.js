import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js'
import { genJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "Error, Email does not exists in the db",
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "User does not exists in the db",
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Password incorrect",
            });
        }

        const token = await genJWT(user.id);

        user.accessToken = token;
        await user.save();

        res.status(200).json({
            msg: 'Login successfully!',
            user,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Error trying to loggin",
        });
    }
}