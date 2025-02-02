import React, { useState } from "react";
import axios from "axios";

const Formfield = (props) => {
  const ID = props.data.id;
  const { name, status, totalBookingAmount } = props.data.booking;

  const [gstData, setGstData] = useState(null);

  // Function to fetch GST on button click
  const handleConfirm = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/add-booking/${ID}`
      );
      setGstData(response.data.gstData);
    } catch (error) {
      console.error("Error fetching GST data:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <ul>
          <li>
            <strong>Book_ID:</strong> {ID}
          </li>
          <li>
            <strong>Name:</strong> {name}
          </li>
          <li>
            <strong>Total Booking Amount:</strong> {totalBookingAmount}
          </li>
          <li>
            <strong>Status:</strong> {status}
          </li>
        </ul>
        <button onClick={handleConfirm}>Confirm</button>

        {/* Show GST details after fetching */}
        {gstData && (
          <div>
            <h3>GST Calculation</h3>
            <p>
              <strong>Total GST:</strong> {gstData.gstAmount}
            </p>
            <p>
              <strong>CGST:</strong> {gstData.cgst}
            </p>
            <p>
              <strong>SGST:</strong> {gstData.sgst}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Formfield;
