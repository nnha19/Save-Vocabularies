import { useHistory } from "react-router";

const Back = () => {
  const history = useHistory();
  return (
    <div
      onClick={history.goBack}
      className="p-4 text-xl cursor-pointer border-b-2 sticky top-0 bg-white"
    >
      <i className="fas fa-arrow-left"></i>
      <span className="ml-2">Back</span>
    </div>
  );
};

export default Back;
