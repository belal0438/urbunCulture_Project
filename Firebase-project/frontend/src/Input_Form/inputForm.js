import React, { useState } from "react";
import "./inputForm.css";
import axios from "axios";

const InputForm = (props) => {
  const [name, setName] = useState("");
  const [totalBookingAmount, settotalBookingAmount] = useState("");

  const formHandler = async (event) => {
    try {
      event.preventDefault();

      let obj = {
        name,
        totalBookingAmount,
      };
      // console.log(obj);
      const result = await axios.post(
        "http://localhost:5000/api/v1/add-booking",
        obj
      );

      if (result.status == 201) {
        // console.log("result>>", result);
        props.getData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
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
            value={totalBookingAmount}
            onChange={(eve) => settotalBookingAmount(eve.target.value)}
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
