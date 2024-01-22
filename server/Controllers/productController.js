import express from "express";
import { epsteinSchema } from "../Models/productSchema.js";

export const GetAllProducts = async (req, res) => {
  const data = await epsteinSchema.find({});
  res.send(data);
};

export const GetAllProductsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await epsteinSchema.findById(id);
    res.status(500).json(product);
  } catch (error) {
    res.status(500).json("error");
  }
};

export const PostProduct = async (req, res) => {
  try {
    const newProduct = new epsteinSchema({ ...req.body });
    await newProduct.save();
    res.status(200).json("added!");
  } catch (error) {
    res.status(500).json("error");
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await epsteinSchema.findByIdAndDelete(id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json("error");
  }
};
