import Map from "./modules/Maps/Map/Map";
import { Form } from "./modules/Home/Form/Form";
import axios from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";
import { localization } from "./core/api/fetchData";
import { Routes, Route, useNavigate } from "react-router-dom";

export interface Details {
  from: string;
  to: string;
  distance: number;
  time: number;
  price: number;
}
export interface Cords {
  [key: string]: any;
}
export interface Data {
  address: {
    label: string;
  };
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);

  const [roadTime, setRoadTime] = useState(0);
  const [roadLength, setRoadLength] = useState(0);
  const [price, setPrice] = useState(0);

  const [errors, setErrors] = useState("");

  const [cords, setCords] = useState<Array<Cords>>([]);
  const [values, setValues] = useState({
    firstDestination: "",
    secondDestination: "",
  });

  const [details, setDetails] = useState<Array<Details>>([]);

  const saveDetails = () => {
    setDetails((prev) => {
      const newDetails = {
        from: values.firstDestination,
        to: values.secondDestination,
        distance: roadLength,
        time: roadTime,
        price: price,
      };
      return [...prev, newDetails];
    });
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (values.firstDestination.length && values.secondDestination.length > 2) {
      try {
        const reqOne = axios.get(localization(values.firstDestination, "", ""));
        const reqTwo = axios.get(
          localization(values.secondDestination, "", "")
        );
        const res = await axios.all([reqOne, reqTwo]);
        const firstResponse = await res[0].data.items.length;
        const secondResponse = await res[1].data.items.length;
        const data: Data[] = res.map((item) => item.data.items);
        setData(data);
        setCords(res);
        if (firstResponse === 0 || secondResponse === 0) {
          setErrors("Unable to find a route");
        } else {
          navigate("/map");
          setErrors("");
        }
      } catch (err) {
        setErrors("Unable to find a route");
        throw new Error("Unable to find a route");
      }
    } else {
      return setErrors("Inputs are not valid!");
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Form
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              details={details}
              errors={errors}
            />
          }
        />
        <Route
          path="/map"
          element={
            cords && (
              <Map
                data={data}
                cords={cords}
                setRoadLength={setRoadLength}
                setRoadTime={setRoadTime}
                roadLength={roadLength}
                roadTime={roadTime}
                price={price}
                setPrice={setPrice}
                values={values}
                saveDetails={saveDetails}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
