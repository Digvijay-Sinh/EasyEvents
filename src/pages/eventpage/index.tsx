import { useNavigate } from "react-router-dom";
import posterImage from "../../assets/events/aleksandr-popov-hTv8aaPziOQ-unsplash.jpg";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
const EventPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="mx-auto"
      style={{
        background:
          "linear-gradient(142deg, rgba(86,31,41,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(86,31,41,1) 100%)",
      }}
    >
      <div className="pt-10 w-5/6 mx-auto flex justify-between">
        <h1 className="text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-left">
          EVENT TITLE <br />
        </h1>{" "}
        <div className="flex flex-col">
          {" "}
          <span className="text-xs   md:text-sm text-gray-500 m-0">
            Registration opens on Sun Mar 24 2024
          </span>
          <span className="text-xs   md:text-sm text-gray-500 m-0">
            and closes on Sun Mar 24 2024
          </span>
        </div>
      </div>
      <div className="flex w-5/6 mx-auto border rounded-3xl m-4">
        <div className="left w-4/6 p-4 ">
          <div className="posterImage ">
            <img
              className="rounded-t-lg w-full object-cover object-center aspect-ratio-16-9 "
              src={posterImage}
              alt=""
            />{" "}
          </div>
        </div>
        <div className="right w-2/6 p-4 ">
          <div className="datetime flex items-center border p-3 rounded-3xl sm:py-3 backdrop-blur-md bg-black/50  ">
            <MdDateRange className="text-white mr-2 text-xl md:text-2xl" />
            <div className="flex flex-col">
              {" "}
              <span className="text-sm   md:text-base text-white m-0">
                Sun Mar 24 2024
              </span>
              <span className="text-sm   md:text-base text-white m-0">
                15:21:00{" "}
              </span>
            </div>
            <span className="text-sm   md:text-base text-white mx-4">-</span>
            <div className="flex flex-col">
              {" "}
              <span className="text-sm   md:text-base text-white m-0">
                Sun Mar 24 2024
              </span>
              <span className="text-sm   md:text-base text-white m-0">
                15:21:00{" "}
              </span>
            </div>
          </div>
          <div className="datetime mt-3 flex items-center border p-3 rounded-3xl sm:py-3 backdrop-blur-md bg-black/50  ">
            <FaMapMarkerAlt className="text-white mr-2 text-xl md:text-2xl" />
            <div className="flex flex-col">
              {" "}
              <span className="text-sm   md:text-base text-white m-0">
                IIM Ahmedabad
              </span>
              <span className="text-sm   md:text-base text-white m-0">
                Vastrapur, Ahmedabad, Gujarat, India
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
