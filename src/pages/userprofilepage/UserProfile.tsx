import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { Card } from "flowbite-react";
import { MdDateRange } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";

import EventCard from "./EventCardUser";

const UserProfile: React.FC = () => {
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
          <h1 className="text-xl my-2 font-bold leading-tight tracking-wide  md:text-2xl text-white text-left">
            User Profile <br />
          </h1>{" "}
        </div>
        <div className="flex sm:w-5/6 w-full mx-auto sm:border border-gray-700  flex-col sm:flex-row rounded-xl ">
          {/* Profile Side */}
          <div className="sm:w-1/3 sm:p-4 w-full p-1">
            <div className="posterImage ">
              <img
                className="rounded-t-lg w-full object-cover object-center aspect-ratio-rounded "
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
                    Digvijay Sinh Chauhan
                  </span>
                </div>
                <div className="username flex gap-2">
                  <MdEmail className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                  <span className="text-sm   md:text-base text-white m-0">
                    email@digvijaysinh.com
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
                  100
                </span>
                <span className="text-sm   md:text-base text-white m-0">
                  Events Participated
                </span>
              </Card>
              <Card className="bg-gradient-to-r from-fuchsia-600 to-pink-600 border-0 w-1/2">
                <span className="text-sm   md:text-base text-white m-0">
                  100
                </span>
                <span className="text-sm   md:text-base text-white m-0">
                  Events Hosted
                </span>
              </Card>
            </div>
          </div>
        </div>
        {/* Event Hosting History */}
        <div className=""></div>
        <div className="pt-10 px-2 sm:w-5/6 w-full mx-auto flex flex-col justify-between">
          <h1 className="text-xl my-2 font-bold leading-tight tracking-wide  md:text-2xl text-white text-left">
            Participation History <br />
          </h1>{" "}
        </div>
        <div className="flex sm:w-5/6 w-full mx-auto sm:border border-gray-700  flex-col sm:flex-row rounded-xl ">
          <div className="flex sm:w-5/6 w-full mx-auto sm:border border-gray-700  flex-col sm:flex-row rounded-xl mt-3">
            {/* Profile Side */}
            <div className="sm:w-1/3 flex items-center sm:p-4 w-full p-1">
              <div className="posterImage ">
                <img
                  className="rounded-t-lg w-full object-cover object-center aspect-ratio-16-9 "
                  src={`http://localhost:5000/uploads/image-1710848396506garba_event.jpg`}
                  alt=""
                />{" "}
              </div>
            </div>
            {/* Bookings Table Side */}
            <div className="sm:w-2/3 sm:p-4 w-full p-1 ">
              <div className="datetime flex items-center p-3 rounded-xl sm:py-3 backdrop-blur-md bg-black/50  ">
                <div className="flex flex-col gap-3">
                  {" "}
                  <div className="username flex gap-2 flex-col">
                    <span className="text-sm   md:text-base text-white m-0">
                      GARBA EVENT 2024
                    </span>
                    <span className="text-sm max-w-fit p-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-600   md:text-base text-white m-0">
                      5 x ₹ 300 = ₹ 1500
                    </span>
                  </div>
                  <div className="username flex gap-2">
                    <MdDateRange className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                    <span className="text-sm   md:text-base text-white m-0">
                      Thursday, February 15, 2024 3:45:26 PM- Thursday, February
                      15, 2024 3:45:26 PM
                    </span>
                  </div>
                  <div className="username flex gap-2">
                    <TbStatusChange className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                    <span className="text-sm   md:text-base text-white m-0">
                      Booking confirmed
                    </span>
                  </div>
                  <div className="username flex gap-2">
                    <RiSecurePaymentFill className="text-yellow-300 mr-2 text-xl md:text-2xl" />

                    <span className="text-sm   md:text-base text-white m-0">
                      Payment done
                    </span>
                  </div>
                  {/* <span className="text-sm   md:text-base text-white m-0">
                {event?.end_date}
              </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
