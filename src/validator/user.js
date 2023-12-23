import { body } from 'express-validator';
import User from '../models/user.js';
import { isEmpty } from 'rxjs';

const validateCreate = [

    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .custom(async (value) => {
            if(isEmpty(value)) return;
            const user = await User.findOne({ username: value });
            if (user) {
                return Promise.reject('Username is already in use');
            }
        }),

    body('email')
        .isEmail()
        .withMessage('Invalid email format').custom(async (value) => {
            if(isEmpty(value)) return;
            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject('Username is already in use');
            }
        }),

    body('password').isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    body('roles')
        .isArray().withMessage('Roles must be an array')
        .custom((value) => value.length > 0).withMessage('Roles cannot be empty')
        .custom((value) => value.every(Number.isInteger)).withMessage('All roles must be numeric'),

];

const validateUpdate = [

    body('username')
        .notEmpty()
        .withMessage('Username is required'),

    body('email')
        .isEmail()
        .withMessage('Invalid email format'),

    body('password').isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    body('roles')
        .isArray().withMessage('Roles must be an array')
        .custom((value) => value.length > 0).withMessage('Roles cannot be empty')
        .custom((value) => value.every(Number.isInteger)).withMessage('All roles must be numeric'),

];

export {validateCreate, validateUpdate};