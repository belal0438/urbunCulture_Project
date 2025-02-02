import { useState } from "react";

import "./App.css";
import InputForm from "./Input_Form/inputForm";
import Formfield from "./Input_Form/formfield";

function App() {
  const [data, setData] = useState("");
  const [show, setShow] = useState(true);
  const getData = (data) => {
    setData(data);
    setShow(false);
  };

  return (
    <div className="App">
      {show && <InputForm getData={getData} />}
      {!show && <Formfield data={data} />}
    </div>
  );
}

export default App;
