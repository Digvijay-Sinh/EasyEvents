import React, { useEffect, useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { Card } from "flowbite-react";
import { MdDateRange } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { MdHistory, MdEventRepeat } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface SelectedUserData {
  id: number;
  email: string;
  name: string | null;
  isAuthenticated: boolean;
  googleId: string | null;
}

interface Venue {
  id: number;
  name: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
  city: string;
  state: string;
  country: string;
  google_place_id: string;
}

interface Image {
  id: number;
  poster_image: string;
  event_id: number;
}

interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_date_toRegister: string;
  end_date_toRegister: string;
  mode: string;
  capacity: number;
  price: number;
  organizer_id: number;
  venue_id: number;
  category_id: number;
  type_id: number;
  venue: Venue;
  images: Image[];
}

interface Booking {
  id: number;
  eventId: number;
  userId: number;
  bookingDateTime: string;
  numberOfTickets: number;
  bookingStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  bookingReference: string;
  event: Event;
}

interface UserParticipatedEvent {
  booking: Booking;
}

interface OrganizerEvent {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_date_toRegister: string;
  end_date_toRegister: string;
  mode: string;
  capacity: number;
  price: number;
  organizer_id: number;
  venue_id: number;
  category_id: number;
  type_id: number;
  venue: Venue;
  images: Image[];
}

interface UserEventsDetails {
  userData: SelectedUserData[];
  userParticipatedEvents: UserParticipatedEvent[];
  organizerEvents: OrganizerEvent[];
}

// import EventCard from "./EventCardUser";

const UserProfile: React.FC = () => {
  const userId = useParams().userId;

  const [eventsDetails, setEventsDetails] = useState<UserEventsDetails>({
    userData: [],
    userParticipatedEvents: [],
    organizerEvents: [],
  });
  const convertedEventDate = (backendDate: string) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Create a Date object from the backend date string
    const utcDate = new Date(backendDate);

    // Convert the date to the user's timezone
    const userLocalDate = new Date(
      utcDate.toLocaleString("en-US", { timeZone: userTimeZone })
    );
    console.log(userLocalDate);

    const formattedTime = userLocalDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Get the time portion of the date
    // const time = userLocalDate.toLocaleTimeString("en-US", {
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true,
    // });
    // https://dv8rlqlr-5173.inc1.devtunnels.ms/
    return `${userLocalDate.toDateString()} ${formattedTime}`;
  };

  const fetchDetailedEventData = async () => {
    try {
      // Make a GET request to fetch categories from the backend
      const response = await axios.get<UserEventsDetails>(
        `http://localhost:5000/api/v1/events/getUserEventsDetails/${userId}`
      );

      console.log(response.data);

      // Set the fetched categories in the state
      setEventsDetails(response.data);

      console.log("=========categories==============");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        if (error.response && error.response.data) {
          // Handle specific error messages from backend
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        } else {
          // Other errors
          toast.error("An error occurred");
        }
      } else {
        // Handle non-Axios errors
        toast.error("An error occurred");
        console.error("An error occurred:", error);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailedEventData();
  }, []);

  useEffect(() => {
    console.log("====================================");
    console.log(eventsDetails);
    console.log("====================================");
  }, [eventsDetails]);

  return (
    <>
      <div
        className="mx-auto"
        style={{
          background:
            "linear-gradient(142deg, rgba(86,31,41,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(86,31,41,1) 100%)",
        }}
      >
        {/* Title */}
        <div className="pt-10 px-2 sm:w-5/6 w-full mx-auto flex flex-col justify-between">
          <h1 className="text-xl w-1/2 mx-auto  md:w-full text-center my-2 font-bold leading-tight tracking-wide  md:text-2xl text-white sm:text-left">
            User Profile <br />
          </h1>{" "}
        </div>
        <div className="flex sm:w-5/6 w-full mx-auto sm:border border-gray-700  flex-col sm:flex-row rounded-xl ">
          {/* Profile Side */}
          <div className="sm:w-1/3 sm:p-4 w-full p-1">
            <div className="posterImage ">
              <img
                className="md:rounded-t-lg rounded-full w-1/2 mx-auto  md:w-full object-cover object-center aspect-ratio-rounded "
                src={`http://localhost:5000/uploads/image-1710848304991Aditya_Gadhvi.jpg`}
                alt=""
              />{" "}
            </div>
          </div>
          {/* Bookings Table Side */}
          <div className="sm:w-2/3 sm:p-4 w-full p-1 ">
            <div className="datetime flex items-center border border-gray-700 p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
              <div className="flex flex-col gap-3">
                {" "}
                <div className="username flex gap-2">
                  <RiAccountCircleFill className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                  <span className="text-sm   md:text-base text-white m-0">
                    {eventsDetails.userData[0]?.name}
                  </span>
                </div>
                <div className="username flex gap-2">
                  <MdEmail className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                  <span className="text-sm   md:text-base text-white m-0">
                    {eventsDetails.userData[0]?.email}
                  </span>
                </div>
                <div className="username flex gap-2">
                  <FaPhoneAlt className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                  <span className="text-sm   md:text-base text-white m-0">
                    +91 9378341199
                  </span>
                </div>
                {/* <span className="text-sm   md:text-base text-white m-0">
                {event?.end_date}
              </span> */}
              </div>
            </div>
            <div className="datetime flex items-center justify-evenly m-1 p-3 gap-2 rounded-xl sm:py-3   ">
              <Card className="bg-gradient-to-r from-fuchsia-600 to-pink-600 border-0 w-1/2 px-0">
                <span className="text-sm   md:text-base text-white m-0">
                  {eventsDetails.userParticipatedEvents.length}
                </span>
                <span className="text-sm   md:text-base text-white m-0">
                  Events <br className="sm:hidden" /> Participated
                </span>
              </Card>
              <Card className="bg-gradient-to-r from-fuchsia-600 to-pink-600 border-0 w-1/2">
                <span className="text-sm   md:text-base text-white m-0">
                  {eventsDetails.organizerEvents.length}
                </span>
                <span className="text-sm   md:text-base text-white m-0">
                  Events <br className="sm:hidden" /> Hosted
                </span>
              </Card>
            </div>
          </div>
        </div>
        {/* Event Hosting History */}
        <div className=""></div>
        <div className="pt-10 px-2 sm:w-5/6 w-full mx-auto flex flex-col justify-between">
          <h1 className="text-xl my-2 font-bold leading-tight tracking-wide  md:text-2xl text-white text-left">
            {/* Participation History <br /> */}

            <Tabs
              aria-label="Default tabs"
              className="border-b-0"
              style="underline"
            >
              <Tabs.Item active title="Events Participated" icon={MdHistory}>
                {eventsDetails.userParticipatedEvents.map((booking) => {
                  return (
                    <div className="flex sm:w-full w-full  sm:border border-gray-700  flex-col sm:flex-row rounded-xl mt-3">
                      {/* Profile Side */}
                      <div className="sm:w-1/3 flex items-center sm:p-4 w-full p-1">
                        <div className="posterImage ">
                          <img
                            className="rounded-t-lg w-full object-cover object-center aspect-ratio-16-9 "
                            src={`http://localhost:5000/uploads/${booking.booking.event.images[0].poster_image}`}
                            alt=""
                          />{" "}
                        </div>
                      </div>
                      {/* Bookings Table Side */}
                      <div className="sm:w-2/3 sm:p-4 w-full p-1 ">
                        <div className="datetime flex items-center p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
                          <div className="flex flex-col gap-3">
                            {" "}
                            <div className="username w-full flex gap-2 justify-between items-center">
                              <span className="text-sm   md:text-base text-white m-0">
                                {booking.booking.event.title}
                              </span>
                              <span className="text-sm max-w-fit p-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-600   md:text-base text-white m-0">
                                {booking.booking.numberOfTickets} x ₹{" "}
                                {booking.booking.event.price} = ₹{" "}
                                {booking.booking.totalAmount}
                              </span>
                            </div>
                            <div className="username flex gap-2">
                              <MdDateRange className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                              <span className="text-sm   md:text-base text-white m-0">
                                {convertedEventDate(
                                  booking.booking.event?.start_date
                                )}
                                -
                                {convertedEventDate(
                                  booking.booking.event?.end_date
                                )}
                              </span>
                            </div>
                            <div className="username flex gap-2">
                              <TbStatusChange className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                              <span className="text-sm   md:text-base text-white m-0">
                                Booking Status: {booking.booking.bookingStatus}
                              </span>
                            </div>
                            <div className="username flex gap-2">
                              <RiSecurePaymentFill className="text-yellow-300 mr-2 text-xl md:text-2xl" />
                              <span className="text-sm   md:text-base text-white m-0">
                                Payment Status: {booking.booking.paymentStatus}
                              </span>
                            </div>
                            {/* <span className="text-sm   md:text-base text-white m-0">
                {event?.end_date}
              </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Tabs.Item>
              <Tabs.Item title="Events Hosted" icon={MdEventRepeat}>
                {eventsDetails.organizerEvents.map((event) => {
                  return (
                    <div className="flex sm:w-full w-full  sm:border border-gray-700  flex-col sm:flex-row rounded-xl mt-3">
                      {/* Profile Side */}
                      <div className="sm:w-1/3 flex items-center sm:p-4 w-full p-1">
                        <div className="posterImage ">
                          <img
                            className="rounded-t-lg w-full object-cover object-center aspect-ratio-16-9 "
                            src={`http://localhost:5000/uploads/${event.images[0].poster_image}`}
                            alt=""
                          />{" "}
                        </div>
                      </div>
                      {/* Bookings Table Side */}
                      <div className="sm:w-2/3 sm:p-4 w-full p-1 ">
                        <div className="datetime flex items-center p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
                          <div className="flex flex-col gap-3">
                            {" "}
                            <div className="username w-full flex gap-2 justify-between items-center">
                              <span className="text-sm   md:text-base text-white m-0">
                                {event.title}
                              </span>
                              {/* <span className="text-sm max-w-fit p-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-600   md:text-base text-white m-0">
                                {booking.booking.numberOfTickets} x ₹{" "}
                                {booking.booking.event.price} = ₹{" "}
                                {booking.booking.totalAmount}
                              </span> */}
                            </div>
                            <div className="username flex gap-2">
                              <MdDateRange className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                              <span className="text-sm   md:text-base text-white m-0">
                                {convertedEventDate(event?.start_date)}-
                                {convertedEventDate(event?.end_date)}
                              </span>
                            </div>
                            {/* <div className="username flex gap-2">
                              <TbStatusChange className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                              <span className="text-sm   md:text-base text-white m-0">
                                Booking Status: {booking.booking.bookingStatus}
                              </span>
                            </div> */}
                            {/* <div className="username flex gap-2">
                              <RiSecurePaymentFill className="text-yellow-300 mr-2 text-xl md:text-2xl" />
                              <span className="text-sm   md:text-base text-white m-0">
                                Payment Status: {booking.booking.paymentStatus}
                              </span>
                            </div> */}
                            {/* <span className="text-sm   md:text-base text-white m-0">
                {event?.end_date}
              </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Tabs.Item>
            </Tabs>
          </h1>{" "}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
