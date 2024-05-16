import Joi from "joi";
import {IPost} from "../models/IPost.ts";

export const postValidator: Joi.ObjectSchema<IPost> = Joi.object({
    userId: Joi.number().min(1).max(10).required().messages(
        {
            'number.required': 'userId cannot be empty',
            'number.min': 'userId cannot be empty lt1',
            'number.max': 'userId cannot be empty gt 10'
        }),
    title: Joi.string().required().messages({'string.empty': 'title name cannot be empty'}),
    body: Joi.string().required().messages({'string.empty': 'body name cannot be empty'})
});