import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
// import { 
//   BrowserRouter, 
//   Route, 
//   Routes, 
//   Link
// } from "react-router-dom";

function App() {
  
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });

  useEffect(() => {
    getAllProducts();
    }, []);

  const showAllItems = product.map((el) => (
    <div key={el._id}>
    <img src={el.image} width={30} /> <br />
    Title: {el.title} <br />
    Category: {el.category} <br />
    Price: {el.price} <br />
    Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
    <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  function getAllProducts() {
    fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setProduct(data);
    });
    setViewer1(true);
    setViewer2(false);
  }

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Show one product :", id);
        console.log(data);
        const dataArr = [];
        dataArr.push(data);
        setOneProduct(dataArr);
      });
      setViewer1(false);
      setViewer2(true);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post a new product completed");
      console.log(data);
      if (data) {
        //const keys = Object.keys(data);
        const value = Object.values(data);
        alert(value);
      }
    });
  }

  return (

    <div>
      <div>
      <nav>
        <ul>
           <li>
              <button onClick={() => getAllProducts()}>Read</button>
           </li>
           <li>
              <button onClick={() => getOneProduct(0)}>Create</button>
           </li>
           <li>
              <button >Update</button>
           </li>
           <li>
              <button >Delete</button>
           </li>
           <li>
              <button >Credits</button>
           </li>
        </ul>
     </nav>
      </div>
      <h1>Catalog of Products</h1>
      

     
      {viewer1 && <div>Products {showAllItems}
      
      </div>}
      {viewer2 && <div>
        Product: {showOneItem}
        <div>
          <h3>Add a new product :</h3>
          <form action="">
            <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
            <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
            <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
            <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
            <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
            <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
            <input type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
            <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
            <button type="submit" onClick={handleOnSubmit}>
            submit
            </button>
          </form>
        </div>
      </div>}
    </div>

    // <BrowserRouter>
    //     
    //     <Routes>
    //       <Route path="/" element={<Read />} />
    //       <Route path="/create" element={<Create />} />
    //       <Route path="/update" element={<Update />} />
    //       <Route path="/delete" element={<Delete />} />
    //       <Route path="/credits" element={<Credits />} />
    //       <Route path="*" element={<NotFound />} />
    //     </Routes>
        
    // </BrowserRouter> 
  );
}



// function Read() {
//   return <h1>Read</h1>
// }

// function Create() {
//   return <h1>Create</h1>;
// }

// function Update() {
//   return <h1>Update</h1>;
// }

// function Delete() {
//   return <h1>Delete</h1>;
// }

// function Credits() {
//   return <h1>Credits</h1>;
// }


// function NotFound() {
//   return <h1>Not Found</h1>;
// }


export default App;
