import { useNavigate } from "react-router-dom";
import posterImage from "../../assets/events/aleksandr-popov-hTv8aaPziOQ-unsplash.jpg";
import { FaTimes } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
const EventPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background:
          "linear-gradient(142deg, rgba(86,31,41,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(86,31,41,1) 100%)",
      }}
    >
      <div className="pt-10 pl-8">
        <h1 className="text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-left">
          EVENT TITLE <br />
        </h1>{" "}
      </div>
      <div className="flex w-full">
        <div className="left w-4/6 p-4">
          <div className="posterImage ml-4">
            <img src={posterImage} alt="" />
          </div>
        </div>
        <div className="right w-2/6 p-4">
          <div className="datetime border p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 backdrop-blur-md bg-black/50  ">
            <MdDateRange className="text-white" />
            <div className="date text-xs my-1 font-bold leading-tight tracking-tight  md:text-md text-white text-left">
              Sun Mar 24 2024
            </div>
            <div className="time text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-left">
              15:21:00{" "}
            </div>
          </div>
          <div className="address">
            <div className="location">LOCATION</div>
            <div className="map">MAP</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
