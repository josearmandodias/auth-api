import jwt from "jsonwebtoken";
import validatorMiddlewares from "../middlewares/validator.middlewares.js";
import User from "../models/user.models.js";
import hashingUtils from "../utils/hashing.utils.js";
import transporter from "../middlewares/email.middlewares.js";

export default {

    signUp: async (req, res) => {
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

    signIn: async (req, res) => {
        const { email, password } = req.body;

        try {
            const {error, value} = validatorMiddlewares.signinSchema.validate({email, password});
            if (error) {
                return res
                    .status(401)
                    .json({ success: false, message: error.details[0].message });   
            }

            const existingUser = await User.findOne({ email }).select('+password');

            if (!existingUser) {
                return res
                    .status(401)
                    .json({sucess: false, message: 'User does not exists'});
            }

            const result = await hashingUtils.compareHash(password, existingUser.password);

            if (!result) {
                return res
                    .status(401)
                    .json({sucess: false, message: 'Invalids credentials'});
            }

            const token = jwt.sign({ 
                userId: existingUser._id,
                email: existingUser.email,
                verified: existingUser.verified,
            }, 
            process.env.TOKEN_SECRET,
            {
                expiresIn: '8h',
            }
            );

            res.cookie('Authorization', 'Bearer' + token, 
            { 
                expires: new Date(Date.now() + 8 * 60 * 60), 
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
            }).json({
                success: true,
                token,
                message: 'Logged in successfully'
            });
        } catch (error) {
            console.log(error);
        }
    },

    signOut: async (req, res) => {
        res.clearCookie('Authorization')
        .status(200)
        .json({ success: true, message : 'Logged out succesfully' });
    },

    sendVerificationCode: async (req, res) => {
        const { email } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                if (!existingUser) {
                return res
                    .status(401)
                    .json({sucess: false, message: 'User does not exists'});
                }
            }
            if(existingUser.verified) {
                return res
                    .status(401)
                    .json({sucess: false, message: 'You are already verified'});
            }

            const code = Math.floor(Math.random() * 1000000).toString();
            let info = await transporter.sendMail({
                from: process.env.CODE_SENDING_EMAIL,
                to: existingUser.email,
                subject: 'Email verification',
                html: '<h1>' + code + '</h1>'
            })

            if(info.accepted[0] === existingUser.email) {
                const hashedCode = hashingUtils.hmacProcess(code, process.env.HMAC_VERIFICATION_CODE);
                existingUser.verificationCode = hashedCode;
                existingUser.verificationCodeDate = Date.now();
                existingUser.verified = 'true';
                await existingUser.save();
                return res.status(200).json({ success: true, message: 'Code sent' });
            }
            res.status (400).json({ success: false, message: 'Code sent failed' });
        } catch (error) {
            console.log(error)
        }
    }
};