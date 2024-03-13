import jwt from 'jsonwebtoken';

export const genJWT = (uid = ' ') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '1h' 
            },
            (err, token) => {
                err ? (console.log(err), reject('Error trying to gen jwt')) : resolve(token);
            }
        );
    });
}
