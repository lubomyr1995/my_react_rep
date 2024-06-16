import Joi from "joi";

const brandRegex = /^[a-zA-Zа-яА-яёЁіІїЇєЄҐґ]{1,20}$/;
const brandMessages = {
    'string.pattern.base': 'Brand must be a string of 1 to 20 characters consisting of letters.'
};

const currentYear = new Date().getFullYear();

export const carValidator = Joi.object({
    brand: Joi.string().pattern(brandRegex).required().messages(brandMessages),
    price: Joi.number().integer().min(0).max(1000000).required().label('Price'),
    year: Joi.number().integer().min(1990).max(currentYear).required().label('Year'),
});