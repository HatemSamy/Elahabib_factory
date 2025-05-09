import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import cors from "cors"
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express'
import * as indexRouter from './src/index.router.js'
import connectDB from './DB/connection.js'
import { GEH } from './src/services/errorHandling.js'
const app = express()
// setup port and the baseUrl
const port = process.env.PORT || 3000
const baseUrl = process.env.BASEURL
//convert Buffer Data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({}))
//Setup API Routing 
app.use(`${baseUrl}/Blog`, indexRouter.BlogRouter)
app.use(`${baseUrl}/Review`, indexRouter.ReviewRouter)
app.use(`${baseUrl}/requestForm`, indexRouter.requestFormRouter)
app.use(`${baseUrl}/Contact`, indexRouter.ContactRouter)




app.use('*', (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method")
})


connectDB()
// Handling Error
app.use(GEH)
app.listen(port, () => console.log(`Server is running on port ${port}!`))