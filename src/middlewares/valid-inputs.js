import { validationResult } from 'express-validator';

export const validInputs = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    
    next();
};
