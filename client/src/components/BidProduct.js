import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../context/authContext/authContexProvider";
import data from "../data/products.json";

const BidProduct = ({ socket }) => {
  const [amount, setAmount] = useState("");
  const [dataRecived, setDataRecived] = useState(null);
  const [currentBid, setCurrentBid] = useState({
    currentBid: 0,
    lastBidder: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(authContext);
  // get product from static json file
  const product = data.products.filter((product) => product.id === id).pop();

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
    <div>
      <div className="bg-gray-500 w-[500px] p-4">
        <h2>Place a Bid</h2>
        <form className="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <img src={product.image} alt="" />
            </div>
            <h3 className="">{product.model}</h3>
            <div className="flex flex-col gap-4">
              <label htmlFor="amount">Bidding Amount</label>
              <div className="flex gap-6  ">
                <div className="flex flex-col">
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
                    required
                    className="rounded border-2 border-gray-300"
                  />
                  (Enter a number greater than {currentBid.currentBid})
                </div>

                <button
                  className="bg-orange-400 disabled:bg-orange-200 py-1 px-2 rounded"
                  disabled={isDisabled}
                >
                  {isDisabled ? " disabled" : "Place Bid"}
                </button>
              </div>
            </div>
          </div>
        </form>
        {dataRecived && (
          <div className="my-4">
            <h2>Curret Highest Bid: {currentBid.currentBid}</h2>
            <h2>Highest Bidder: {currentBid.lastBidder}</h2>
            <div>
              <h2>LastBids:</h2>
              <ul>
                {currentBid.bids.map((bid) => (
                  <li key={bid.bidder + Math.random() * 20}>
                    {bid.bidder} : Bidded {bid.bid}
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
