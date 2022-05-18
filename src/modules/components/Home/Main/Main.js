import Trips from "../Trips/Trips";
import styles from "./main.module.css";
function Main({ handleSubmit, values, handleChange, details }) {
  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Choose starting point"
            name="firstDestination"
            value={values.firstDestination}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Choose destination point"
            name="secondDestination"
            value={values.secondDestination}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Find the route</button>
        </form>
      </div>
      <Trips details={details} />
    </>
  );
}

export default Main;
