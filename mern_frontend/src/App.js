import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";


function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);
  const [newPrice, setNewPrice] = useState({});

  const [addNewProduct, setAddNewProduct] = useState({
    _id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "http://127.0.0.1:4000/images/image04.jpg",
    rating: { rate: 2.1, count: 430 },
  });
  const [viewer3, setViewer3] = useState(false);

  const [checked4, setChecked4] = useState(false);
  const [viewer4, setViewer4] = useState(false);

  const [viewer5, setViewer5] = useState(false);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => {
      setProduct(data);
    });
  });

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
    setViewer3(false);
    setViewer4(false);
    setViewer5(false);
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
      
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function updateProduct() {
    setViewer1(false);
    setViewer2(true);
    setViewer3(false);
    setViewer4(false);
    setViewer5(false);
  }

  function addProduct() {
    setViewer1(false);
    setViewer2(false);
    setViewer3(true);
    setViewer4(false);
    setViewer5(false);
  }

  function deleteProduct(){
    setViewer1(false);
    setViewer2(false);
    setViewer3(false);
    setViewer4(true);
    setViewer5(false);
  }

  function showCredits(){
    setViewer1(false);
    setViewer2(false);
    setViewer3(false);
    setViewer4(false);
    setViewer5(true);
  }

  function getCart(){
    console.log("Cart: ", cart);
    console.log("Total: ", cartTotal);
    setViewer1(false);
    setViewer2(true);
    setViewer3(false);
    setViewer4(false);
    setViewer5(false);
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


  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Delete a product completed : ", deleteid);
      console.log(data);
      if (data) {
        //const keys = Object.keys(data);
        const value = Object.values(data);
        alert(value);
      }
    });
    setChecked4(!checked4);
  }

  function updateOneProduct(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: e.target.value}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Update a product completed");
      console.log(data);
      if (data) {
        //const keys = Object.keys(data);
        const value = Object.values(data);
        alert(value);
      }
    });
  }

  function handleUpdateChange(evt){
    const value = evt.target.value;
    setNewPrice({...newPrice, price: value});
    
  }

  const addOneProduct = (el) => {
    console.log("Product added with id: ", el._id);
    setCart([...cart, el]);
  }

  const removeOneProduct = (el) => {
    
    let hardCopy = [...cart];
    let item = hardCopy.find((cartItem) => cartItem !== el._id);
    hardCopy = hardCopy.filter((cartItem) => cartItem != item);
    setCart(hardCopy);
  };

  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };
    

  const showAllItems = product.map((el) => (
    <div id={el._id} key={el._id}>
      <img src={el.image} /> <br />
      <h2>Title: {el.title}</h2> <br />
      Category: {el.category} <br />
      Price: ${el.price} <br />
      Rate: {el.rating.rate}  <br />
      Number of Reviews: {el.rating.count} <br />
      <button id="add" onClick={() => addOneProduct(el)} >Add</button>
      <button id="remove" onClick={() => removeOneProduct(el)}>Remove</button>
    </div>
  ));

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      <h1>Title: {el.title}</h1> <br />
      Category: {el.category} <br />
      Price: ${el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  const showCartItems = cart.map((el) => (
    <div id={el._id} key={el._id}>
      <img src={el.image} /> <br />
      <h2>Title: {el.title}</h2> <br />
      Category: {el.category} <br />
      Price: ${el.price} <br />
      Rate: {el.rating.rate}  <br />
      Number of Reviews: {el.rating.count} <br />
      <button id="remove" onClick={() => removeOneProduct(el)}>Remove</button>
    </div>
  ))

    


  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <button onClick={() => getAllProducts()}>Products</button>
            </li>
            <li>
              <button onClick={() => getCart()}>Cart</button>
            </li>
            
            <li>
              <button onClick={() => showCredits()}>Credits</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>

      
        <div>
          

          {/* <input type="text" id="message" name="message" placeholder="id" onChange={(e) =>getOneProduct(e.target.value)} /> */}
          {viewer1 && <div>
            <h1 id="CatalogTitle">Our Catalog</h1>
            <div id="Products">
              {showAllItems}
            </div>
          </div>}
          {viewer2 && <div>          
            <h3>Cart</h3>
            <div id="Products">
              {showCartItems}
            </div>
            
          
          </div>}
          {viewer3 && <div> 
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
          </div>}

          {viewer4 && <div>
            <h3>Delete one product:</h3>
            <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
            {showOneItem}
            <button onClick={() => deleteOneProduct(oneProduct[0])}>Delete</button>
            {/* {checked4 && (
              <div key={product[index]._id}>
                <img src={product[index].image} width={30} /> <br />
                Id:{product[index]._id} <br />
                Title: {product[index].title} <br />
                Category: {product[index].category} <br />
                Price: {product[index].price} <br />
                Rate :{product[index].rating.rate} and Count:
                {product[index].rating.count} <br />
              </div>
            )} */}
          </div>}

          {viewer5 && <div>
            <h3>Course Number: 319</h3>
            <h3>Course Name: Construction of User Interfaces</h3>
            <h3>Date: 4/30/2023</h3>
            <h3>Professor Name: Dr. Abraham N. Aldaco Gastelum</h3>
            <h3>Authors: Harley Peacher hpeacher@iastate.edu</h3>
            <h3>Jaret Van Zee  jlvanzee@iastate.edu</h3>
            <p>Jaret and I have worked hard to take what we learned in class and make it our own. 
              I worked mostly on the front-end and Jaret the back-end. Together we were able to
              create a web interface that could access and update data within MongoDB.</p> 
            </div>}
        </div>
      </main>
    </div>
    
  );
}





export default App;
