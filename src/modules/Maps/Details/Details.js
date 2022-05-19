import { jsPDF } from "jspdf";
import SaveModal from "../../Home/Trips/Modal/SaveModal";
import { Link } from "react-router-dom";
import styles from "./details.module.css";
import { useState } from "react";

function Details({
  roadTime,
  roadLength,
  price,
  setPrice,
  values,
  setDetails,
}) {
  const [saved, setSaved] = useState(false);
  const handleChange = (event) => {
    setPrice(event.target.value);
  };
  const generatePdf = () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = document.querySelector("#pdf");
    pdf.html(data).then(() => {
      pdf.save("road.pdf");
    });
  };
  const handleSave = () => {
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
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  return (
    <div className={styles.container} id="pdf">
      <h2>Details:</h2>
      <p>Distance: {roadLength.toFixed(1)} km</p>
      <p>Time: {roadTime.toFixed(0)} minutes</p>
      <form className={styles.form}>
        <label>Price for kilometer $</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Put the price"
          value={price}
          onChange={handleChange}
        />{" "}
      </form>
      <p>Cost of the trip:</p>
      <p>{(roadLength.toFixed(1) * price * 1.1).toFixed(2)} $</p>
      <div className="buttons">
        <Link className={styles.link} to="/">
          <button>Home </button>
        </Link>
        <button onClick={handleSave}>Save trip</button>
      </div>
      <button onClick={generatePdf}>Download details</button>
      {saved && <SaveModal />}
    </div>
  );
}

export default Details;
