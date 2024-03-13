export const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Wants si verify a role without verify a token'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `User is not auth, has a role ${req.user.role}, the roles auth are: ${roles}`
            });
        }

        next();
    };
};
