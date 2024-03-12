import { useNavigate } from "react-router-dom";
// import DemoAddEvent from "./DemoAddEvent";
import AddEventForm from "./AddEventForm";
import { useState } from "react";
import AddEventForm22 from "./AddEventForm22";
import AddEventForm3 from "./AddEventForm3";
import AddEventForm4 from "./AddEventForm4";

const AddEventPage = () => {
  const navigate = useNavigate();

  const [showForm1, setShowForm1] = useState(true);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);

  const formShow = () => {
    if (showForm1 && !showForm2 && !showForm3 && !showForm4) {
      return <AddEventForm />;
    }
    if (!showForm1 && showForm2 && !showForm3 && !showForm4) {
      return <AddEventForm22 />;
    }
    if (!showForm1 && !showForm2 && showForm3 && !showForm4) {
      return <AddEventForm3 />;
    }
    if (!showForm1 && !showForm2 && !showForm3 && showForm4) {
      return <AddEventForm4 />;
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(142deg, rgba(86,31,41,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(86,31,41,1) 100%)",
      }}
      className=""
    >
      <div>{formShow()}</div>
      {/* AddEventPage
      <div>
        <button
          className="bg-slate-500"
          onClick={() => {
            navigate("/eventgroup");
          }}
        >
          Publish event
        </button>
      </div> */}
    </div>
  );
};

export default AddEventPage;
