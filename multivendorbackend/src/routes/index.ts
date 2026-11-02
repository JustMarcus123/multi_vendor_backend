import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as AuthV from "../validators/authValidators"
import validate from "../middleware/validate";
import asyncHandler from "../utils/asyncHandlers";
import * as auth from "../controllers/auth.controllers"

const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Router is working!' });
});

//let's create limits on credential entry per timeframe use rate limit
 const authLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
 } )


router.get("/health", (_req, res)=>{
    res.json({status:"ok"});
})

// authentication routes
router.post("/auth/register", authLimiter, validate(AuthV.RegisterSchema),asyncHandler(auth.register) )

export default router;