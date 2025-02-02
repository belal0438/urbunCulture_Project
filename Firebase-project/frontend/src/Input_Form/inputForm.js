import React, { useState } from "react";
import "./inputForm.css";

const InputForm = () => {
  const [name, setName] = useState("");
  const [totalBookinAmount, setTotalBookinAmount] = useState("");

  const formHandler = (event) => {
    event.preventDefault();

    let obj = {
      name,
      totalBookinAmount,
    };
    console.log(obj);
  };

  return (
    <div className="conatainer">
      <div> User Form </div>
      <form className="form" onSubmit={formHandler}>
        <div className="divContainer">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="InputField"
            value={name}
            onChange={(eve) => setName(eve.target.value)}
          />
        </div>
        <div className="divContainer">
          <label htmlFor="">totalBookingAmount</label>
          <input
            type="Number"
            className="InputField"
            value={totalBookinAmount}
            onChange={(eve) => setTotalBookinAmount(eve.target.value)}
          />
        </div>
        <div className="divContainer">
          <label htmlFor="">Status</label>
          <input
            type="String"
            className="InputField"
            value="Pending"
            disabled
          />
        </div>
        <button type="submit">Sudmit</button>
      </form>
    </div>
  );
};

export default InputForm;
