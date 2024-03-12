import { Event } from "../index";
interface EventDetailsProps {
  event: Event;
  customKey: number;
}

const EventCard: React.FC<EventDetailsProps> = ({ event, customKey }) => {
  return (
    <>
      <div className="max-w-sm min-w-fit m-2 border  rounded-lg shadow   w-5/6  p-2 backdrop-blur-md bg-white/10 ">
        <a href="#">
          <img
            className="rounded-t-lg"
            src={`http://localhost:5000/uploads/event_business_${customKey}.jpg`}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-sm  font-bold tracking-tight text-white  md:text-2xl sm:text-3xl xs:text-3xl">
              {event.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-xs text-gray-400">{event.date}</p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg   bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default EventCard;
