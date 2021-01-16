import { useHistory } from "react-router-dom";
import s from "../Button/Button.module.css";

export default function Button({ location }) {
  const history = useHistory();
  console.log(location);
  const onBack = (evt) => {
    evt.preventDefault();
    if (location?.state?.from) {
      history.push(location.state.from);
    } else {
      history.push("/");
    }
  };
  return (
    <button onClick={onBack} className={s.button}>
      Go Back
    </button>
  );
}
