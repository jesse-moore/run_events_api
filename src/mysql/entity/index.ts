import { validate } from 'class-validator';
import { ModelValidationErrors } from '../../types';
import { Model } from './Model';

export const validateModel = async (
    model: Model
): Promise<ModelValidationErrors | null> => {
    const errors: ModelValidationErrors = {};
    const validations = await validate(model);
    if (!validations.length) return null;
    validations.forEach((error) => {
        errors[error.property] = { ...error.constraints };
    });
    return errors;
};
export { Model } from './Model';
export { User } from './User';
export { Event } from './Event';
export { Race } from './Race';
export { Route } from './Route';
