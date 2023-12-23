import { Router } from "express";
import * as controller from "../controllers/auth.controller.js";
import {validateCreate} from "../validator/user.js";


const router = Router();

router.post('/signup', validateCreate, controller.signUp);
router.post('/signin', controller.signIn);

export default router;