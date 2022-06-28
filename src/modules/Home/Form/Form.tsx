import { ChangeEvent, MouseEvent } from "react";
import { Details } from "../../../App";

import Trips from "../Trips/Trips";

interface Props {
  values: {
    firstDestination: string;
    secondDestination: string;
  };
  details: Details[];
  errors: string;

  handleSubmit: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Form = ({
  handleSubmit,
  values,
  handleChange,
  details,
  errors,
}: Props) => {
  return (
    <>
      <div>
        <form>
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

          {errors && <p data-testid="error">{errors}</p>}
          <button onClick={handleSubmit}>Find the route</button>
        </form>
      </div>

      <Trips details={details} />
    </>
  );
};
