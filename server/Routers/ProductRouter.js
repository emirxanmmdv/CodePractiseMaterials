import express from "express"
import { DeleteProduct, GetAllProducts, GetAllProductsByID, PostProduct } from "../Controllers/productController.js"

export const productRouter = express.Router()

productRouter.get("/", GetAllProducts)
productRouter.get("/:id", GetAllProductsByID)
productRouter.post("/", PostProduct)
productRouter.delete("/:id", DeleteProduct)




