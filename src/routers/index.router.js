import express from "express";
import authControllers from "../controllers/auth.controllers.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.json("Allez l'OM");
});

//Sign up to an account
router.post('/auth/signup',authControllers.signUp);
//Sign in to an account
router.post('/auth/signin',authControllers.signIn);
//Sign out from an account 
router.post('/auth/signout',authControllers.signOut);

//Get verification code send at email
router.patch('/auth/send-verification',authControllers.sendVerificationsCode);

export default router;