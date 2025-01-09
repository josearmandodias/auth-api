import express from "express";
import authControllers from "../controllers/auth.controllers.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.json("Allez l'OM");
});

router.post('/auth/signup',authControllers.signup);
router.post('/auth/signin',authControllers.signin);

export default router;