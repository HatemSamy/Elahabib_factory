import { Router } from "express";
import * as ReviewController from "./controller/Review.js";
const router= Router()


router.post("/addreview", ReviewController.addReview)
router.get("/get-reviews", ReviewController.getAllReviews)

















export default router