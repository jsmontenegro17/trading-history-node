import { Router } from "express";
import * as controller from "../controllers/main.controller.js";
import { authJwt } from "../middlewares/index.js";

const router = Router();

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], controller.index);
router.get('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.show);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], controller.store);
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.update);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.destroy);

export default router;