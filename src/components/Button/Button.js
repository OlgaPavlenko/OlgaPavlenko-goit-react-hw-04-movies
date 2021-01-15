import { useHistory } from "react-router-dom";

export default function Button({ location }) {
  const history = useHistory();
  const onBack = (evt) => {
    evt.preventDefault();
    if (location?.state?.from) {
      history.push(location.state.from);
    } else {
      history.push("/movies");
    }
  };
  return <button onClick={onBack}>Go Back</button>;
}
