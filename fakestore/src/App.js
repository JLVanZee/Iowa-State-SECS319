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
    fetch("http://localhost:27017/")
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
      fetch("http://localhost:27017/" + id)
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
      

     
      {viewer1 && <div>Products {showAllItems}</div>}
      {viewer2 && <div>Product: {showOneItem}</div>}
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
