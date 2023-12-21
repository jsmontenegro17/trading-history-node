import { Router } from "express";
import { index, show, store, update, destroy } from "../controller/main.controller.js";

const router = Router();

router.get('/main', index);
router.get('/main/:id', show);
router.post('/main', store);
router.put('/main', update);
router.delete('/main/:id', destroy);

export default router;