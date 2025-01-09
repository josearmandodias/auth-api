import validatorMiddlewares from "../middlewares/validator.middlewares.js";
import User from "../models/user.models.js";
import hashingUtils from "../utils/hashing.utils.js";

export default {

    signup: async (req, res) => {
        const {email, password} = req.body;

        try {
            const {error, value} = validatorMiddlewares.signupSchema.validate({email, password});
            
            if (error) {
                return res.status(401).json({success: false, message: error.details[0].message});
            }
            
            const existingUser = await User.findOne({email});

            if (existingUser) {
                return res.status(401).json({sucess: false, message: 'User already exists'});
            }

            const hashedPassword = await hashingUtils.doHash(password, 12);

            const newUser = new User({
                email, 
                password: hashedPassword
            });

            const result = await newUser.save();
            result.password = undefined;

            res.status(201).json({
                success: true, 
                message: 'Account succesfully created',
                result
            });
        } catch (error) {
            console.log(error);
        }
    },

    signin: async (req, res) => {
        
    }
};