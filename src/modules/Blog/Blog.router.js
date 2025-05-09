import { Router } from "express";
import * as BlogRouter from "./controller/Blog.js"
import { fileValidation, myMulter } from "../../services/multer.js";
const router=Router()

router.post("/create",myMulter(fileValidation.image).single("image"),BlogRouter.createBlog)
router.get("/All-Blogs",BlogRouter.getAllBlogs)
router.get("/:id",BlogRouter.getBlogById)


export default router