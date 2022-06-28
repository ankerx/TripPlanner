import { jsPDF } from "jspdf";
import { Modal } from "../../Home/Trips/Modal/Modal";
import { Link } from "react-router-dom";
import { capitalize } from "../../../core/utils";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

interface Props {
  roadTime: number;
  roadLength: number;
  price: number;
  setPrice: (arg: number) => void;
  values: {
    firstDestination: string;
    secondDestination: string;
  };
  saveDetails: () => void;
}
export const Details = ({
  roadTime,
  roadLength,
  price,
  setPrice,
  values,
  saveDetails,
}: Props) => {
  const [temp, setTemp] = useState("");
  const [saved, setSaved] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(event.target.value));
  };
  const generatePdf = () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = document.querySelector("#pdf") as HTMLDivElement;
    pdf.html(data).then(() => {
      pdf.save("road.pdf");
    });
  };

  const handleSave = () => {
    saveDetails();
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: values.secondDestination },
      headers: {
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        "X-RapidAPI-Key": "4ad9038353msh63669962654b11ap143e63jsnc4f9649b2c64",
      },
    };
    axios
      .request(options)
      .then((res) => setTemp(res.data.current.temp_c))
      .catch((error) => {
        console.log(error);
      });
  }, [values.secondDestination]);
  return (
    <div id="pdf">
      <h2>Details:</h2>
      <p>
        Current temperature in {capitalize(values.secondDestination)}: {temp}
        °C
      </p>
      <p>Distance: {roadLength.toFixed(1)} km</p>
      <p>Time: {roadTime.toFixed(0)} minutes</p>
      <form>
        <label>Price for kilometer $</label>
        <input
          type="number"
          placeholder="Put the price"
          value={price}
          onChange={handleChange}
        />{" "}
      </form>
      <p>Cost of the trip:</p>
      <p>{(roadLength * price * 1.1).toFixed(2)} $</p>

      <div className="buttons">
        <Link to="/">
          <button>Home </button>
        </Link>
        <button onClick={handleSave}>Save trip</button>
      </div>
      <button onClick={generatePdf}>Download details</button>
      {saved && <Modal />}
    </div>
  );
};
