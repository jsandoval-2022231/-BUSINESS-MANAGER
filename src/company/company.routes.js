import { Router } from "express";
import { check } from "express-validator";

import { createCompany, getCompanies, updateCompany, getFilterByYears, getFilterByAZ, getFilterByZA, generateExcelReport, getFilterByCategory } from "./company.controller.js";

import { existsEmail, existsUserById } from "../helpers/db-validators.js";
import { validInputs } from "../middlewares/valid-inputs.js";
import { validateJWT} from "../middlewares/valid-jwt.js";
import { hasRole } from "../middlewares/valid-roles.js";

const router = Router();

router.get('/', [validateJWT, validInputs], getCompanies);
router.get('/years/:years', [validateJWT, validInputs], getFilterByYears);
router.get('/az', [validateJWT, validInputs],getFilterByAZ);
router.get('/za', [validateJWT, validInputs], getFilterByZA);
router.get('/category/:category', [validateJWT, validInputs], getFilterByCategory);
router.get('/excel', [validateJWT, validInputs], generateExcelReport);

router.post('/', 
    [ 
        validateJWT,
        hasRole("ADMIN_ROLE"),
        check("name", "Name required").not().isEmpty(),
        check("impactLevel", "Impact level required").not().isEmpty(),
        check("yearsOfExperience", "Years of experience required").not().isEmpty(),
        check("category", "Category required").not().isEmpty(),
        validInputs ], createCompany
        );

router.put(
    '/:id',
    [
        validateJWT,
        hasRole("ADMIN_ROLE"),
        check("id", "Id required").not().isEmpty(),
        check("id", "Id invalid").isMongoId(),
        validInputs
    ], updateCompany
);

export default router;