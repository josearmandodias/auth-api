import Joi from "joi";

export default {
    
    signupSchema: Joi.object({
        email: Joi.string()
            .min(6)
            .max(60)
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] }}),
        password: Joi.string()
            .required()
            .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"))
    }),

    signinSchema: Joi.object({
        email: Joi.string()
            .min(6)
            .max(60)
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] }}),
        password: Joi.string()
            .required()
            .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"))
    }),

    acceptCodeSchema: Joi.object({
        email: Joi.string()
            .min(6)
            .max(60)
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] }}),
        code: Joi.number()
        .required()
    })

};