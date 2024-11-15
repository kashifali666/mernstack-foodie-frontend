import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/myorderData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      }
    );
    const data = await response.json();
    setOrderData(data.orderData);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="my-4">My Orders</h1>
        <div className="row">
          {orderData && orderData.order_data.length > 0 ? (
            <>
              <div className="col-12">
                {/* Display the order_date directly */}
                <h4 className="text-muted">
                  Order Date: {orderData.order_date}
                </h4>
                <hr />
              </div>
              {orderData.order_data.map((item, index) => (
                <div key={index} className="col-12">
                  <p>Product: {item.name}</p>
                  <p>Quantity: {item.qty}</p>
                  <p>Size: {item.size}</p>
                  <p>Price: {item.price}</p>
                </div>
              ))}
            </>
          ) : (
            <p>No orders found!</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
