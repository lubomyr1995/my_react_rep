import Joi from "joi";


const usernameRegex = /^[a-zA-Z]\w{2,19}$/;
const usernameMessages = {
    'string.pattern.base': 'First letter, then letters, digits or "_" min 2 max 20 characters'
};

const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])[^\s]{8,20}$/;
const passwordMessages = {
    'string.pattern.base': 'min 1 digit, min 1 uppercase, min 1 lowercase, min 1 special character, 8-20 characters'
};


export const registerValidator = Joi.object({
    username: Joi.string().pattern(usernameRegex).required().messages(usernameMessages),
    password: Joi.string().pattern(passwordRegex).required().messages(passwordMessages),
    confirm_password: Joi.any().equal(Joi.ref('password')).required().messages({'any.only': 'passwords does not match'})
});