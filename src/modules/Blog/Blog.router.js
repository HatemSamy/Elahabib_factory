import { Router } from "express";
import * as BlogRouter from "./controller/Blog.js"
import { fileValidation, myMulter } from "../../services/multer.js";
const router=Router()

router.post("/NewBlog",myMulter(fileValidation.image).single("image"),BlogRouter.createBlog)
router.get("/Blogs",BlogRouter.getAllBlogs)
router.get("/:id",BlogRouter.getBlogById)


export default router