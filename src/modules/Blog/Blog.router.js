import { Router } from "express";
import * as BlogController from "./controller/Blog.js"
import { fileValidation, myMulter } from "../../services/multer.js";
const router=Router()



router.post("/create",myMulter(fileValidation.image).single("image"),BlogController.createBlog)
router.get("/All-Blogs",BlogController.getAllBlogs)



export default router