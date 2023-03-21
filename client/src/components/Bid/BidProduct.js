import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../context/authContext/authContexProvider";
import data from "../../data/products.json";
import BidForm from "./BidForm";
import BidProductInfo from "./BidProductInfo";

const BidProduct = ({ socket }) => {
  const [amount, setAmount] = useState("");
  const [dataRecived, setDataRecived] = useState(null);
  const [currentBid, setCurrentBid] = useState({
    currentBid: 0,
    lastBidder: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();
  const { user } = useContext(authContext);
  // get product from static json file
  const product = data.products.filter((product) => product.id === id).pop();

  // reversed array

  useEffect(() => {
    const getOneProduct = async (model) => {
      const url = `http://localhost:4000/products/${model}`;
      try {
        const response = await axios.get(url, {
          withCredentials: true,
        });
        console.log(response.data.data.product);
        socket.emit("bid", response.data.data.product);
      } catch (error) {
        console.error(error);
      }
    };
    getOneProduct(product.model);
  }, []);

  const updateProduct = async (product) => {
    const url = "http://localhost:4000/products";

    try {
      const response = await axios.put(url, product, { withCredentials: true });
      //   console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // socket üzerinde teklifi iletiyoruz
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBid = {
      model: product.model,
      lastBidder: user?.username || user,
      currentBid: Number(amount),
      bids: Array.isArray(currentBid.bids)
        ? [
            ...currentBid.bids,
            { bidder: user?.username || user, bid: Number(amount) },
          ]
        : [{ bidder: user?.username || user, bid: Number(amount) }],
    };
    if (newBid.currentBid > currentBid.currentBid) {
      socket.emit("bid", newBid);
      setCurrentBid(newBid);
      updateProduct(newBid);
    } else {
      socket.emit("bid", currentBid);
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setAmount(inputValue);
    setIsDisabled(inputValue <= currentBid.currentBid);
  };

  // socket üzerinden geri dönen teklifi alıyoruz
  useEffect(() => {
    socket.on("reciveBid", (data) => {
      if (currentBid.currentBid < data.currentBid) {
        setCurrentBid(data);
      }

      setDataRecived(data);
    });
  }, [socket]);

  return (
    <div className="flex flex-col sm:flex-row w-full justify-between gap-12 sm:gap-24 ">
      <BidProductInfo product={product} />

      <div className="sm:w-[500px] w-full">
        <div></div>
        <h1 className="text-3xl">
          Curret Highest Bid: {currentBid.currentBid} ₺
        </h1>

        <BidForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          amount={amount}
          isDisabled={isDisabled}
          currentBid={currentBid}
        />
        {dataRecived && (
          <div className="my-4">
            <h2 className="text-lg font-medium text-blue-600 ">
              Highest Bidder: {currentBid.lastBidder}
            </h2>
            <div className="mt-4">
              <h2>LastBids:</h2>
              <ul className="flex flex-col-reverse list-disc list-inside p-2">
                {currentBid.bids.map((bid) => (
                  <li key={bid.bidder + Math.random() * 20}>
                    {bid.bidder} Bidded : {bid.bid} ₺
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidProduct;
