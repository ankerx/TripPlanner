import Map from "./modules/Maps/Map/Map";
import Main from "./modules/Home/Main/Main";
import axios from "axios";
import { useState } from "react";
import { Localization } from "./core/api/FetchData";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [roadTime, setRoadTime] = useState(0);
  const [roadLength, setRoadLength] = useState(0);
  const [price, setPrice] = useState(0);
  const [cords, setCords] = useState();
  const [values, setValues] = useState({
    firstDestination: "",
    secondDestination: "",
  });

  const [details, setDetails] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const req1 = axios.get(Localization(values.firstDestination, "", ""));
    const req2 = axios.get(Localization(values.secondDestination, "", ""));
    const res = await axios.all([req1, req2]);
    console.log(res);
    setCords(res);
    navigate("/map");
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cords={cords}
              setCords={setCords}
              details={details}
            />
          }
        />
        <Route
          path="/map"
          element={
            cords ? (
              <Map
                cords={cords}
                setRoadLength={setRoadLength}
                setRoadTime={setRoadTime}
                roadLength={roadLength}
                roadTime={roadTime}
                price={price}
                setPrice={setPrice}
                setDetails={setDetails}
                values={values}
              />
            ) : (
              <Main
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                cords={cords}
                setCords={setCords}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
