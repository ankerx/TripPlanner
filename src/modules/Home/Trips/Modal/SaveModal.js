import styles from "./saveModal.module.css";

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>Trip saved!</p>
        <p>Go back to home to see all of your trips</p>
      </div>
    </div>
  );
}

export default Loading;
