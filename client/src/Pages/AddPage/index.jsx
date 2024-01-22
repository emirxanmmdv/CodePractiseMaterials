import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
const AddPage = () => {
  const [product, setProduct] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:7000/products/");
      setProduct(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const postProduct = async (values) => {
    const response = await axios.post(
      "http://localhost:7000/products/",
      values
    );
    getProduct();
  };

  const deleteProduct = async (id) => {
    const response = await axios.delete(`http://localhost:7000/products/${id}`);
    getProduct();
  };

  const searchBar = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="add">
      <Formik
        initialValues={{ image: "", name: "", desc: "", price: "" }}
        validationSchema={Yup.object({
          image: Yup.string().required("Required"),
          name: Yup.string()
            .matches(/^[a-zA-Z ]+?$/, "Only text allowed")
            .required("Required"),
          desc: Yup.string().required("Required"),
          price: Yup.string()
            .matches(/^[1-9]\d*$/, "price must be higher than 0")
            .required("Required"),
        })}
        onSubmit={(values, { resetForm }) => {
          postProduct(values);
          resetForm({ values: "" });
        }}
      >
        <Form>
          <label htmlFor="image">URL :</label>
          <Field name="image" type="text" />
          <ErrorMessage name="image" />

          <label htmlFor="name">Name :</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label htmlFor="desc">Desc : </label>
          <Field name="desc" type="text" />
          <ErrorMessage name="desc" />

          <label htmlFor="price">Price : </label>
          <Field name="price" type="text" />
          <ErrorMessage name="price" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <div className="searchBar">
        <input type="text" value={search} onChange={(e) => searchBar(e)} />
      </div>
      <div className="sortByName">
        <button onClick={()=>setSort({x: "name", asc:true})}>A-Z</button>
        <button onClick={()=>setSort({x: "name", asc:false})}>Z-A</button>
        <button onClick={()=>setSort("")}>Default</button>
      </div>
      <div className="sortByPrice">
        <button onClick={()=>setSort({x: "price", asc:true})}>Less to More</button>
        <button onClick={()=>setSort({x: "price", asc:false})}>More to Less</button>
        <button onClick={()=>setSort("")}>Default</button>
      </div>
      <div className="productTable">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {product
              ? product
                  .filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .sort((a, b) => {
                    if (sort && sort.asc === true) {
                      return a[sort.x] > b[sort.x]
                        ? 1
                        : a[sort.x] < b[sort.x]
                        ? -1
                        : 0;
                    } else if (sort && sort.asc === false) {
                      return a[sort.x] < b[sort.x]
                        ? 1
                        : a[sort.x] > b[sort.x]
                        ? -1
                        : 0;
                    } else {
                      return null;
                    }
                  })

                  .map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={item.image} />
                      </td>
                      <td>
                        <h1>{item.name}</h1>
                      </td>
                      <td>
                        <p>{item.desc}</p>
                      </td>
                      <td>
                        <p>${item.price}</p>
                      </td>
                      <td>
                        <button onClick={() => deleteProduct(item._id)}>
                          X
                        </button>
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddPage;
