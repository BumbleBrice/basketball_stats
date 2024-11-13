import { body } from 'express-validator';

export const registerValidator = [
    body('firstname')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Le prénom doit contenir au moins 2 caractères'),
    
    body('lastname')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Le nom doit contenir au moins 2 caractères'),
    
    body('email')
        .trim()
        .isEmail()
        .withMessage('Veuillez entrer un email valide')
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 4 })
        .withMessage('Le mot de passe doit contenir au moins 4 caractères'),
    
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Les mots de passe ne correspondent pas');
            }
            return true;
        })
];

export const loginValidator = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Veuillez entrer un email valide')
        .normalizeEmail(),
    
    body('password')
        .notEmpty()
        .withMessage('Veuillez entrer votre mot de passe')
];

// Si vous préférez exporter un objet par défaut :
// export default { registerValidator, loginValidator }; 