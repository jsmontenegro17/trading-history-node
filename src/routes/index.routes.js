import { Router } from "express";
import * as controller from "../controllers/index.controller.js";

const router = Router();

router.get('/', controller.index);

export default router;