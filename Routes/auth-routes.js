import express from "express"
const router = express.Router();
import createUser, { addsecrets, checkUser, showuser } from "../controllers/events.js"

router.post("/register", createUser);
router.post("/login", checkUser);
router.post("/mysecrets", addsecrets);

router.get("/data",showuser)


export default router;
