import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";
import styles from "./details.module.css";
function Details({ roadTime, roadLength, price, setPrice }) {
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
      <button onClick={generatePdf}>Download details</button>
      <Link className={styles.link} to="/">
        Home
      </Link>
    </div>
  );
}

export default Details;
