import { useNavigate } from "react-router-dom";
import Hero from "./components/Hero";
import axios from "axios";
import { axiosPrivate } from "../../api/axios";
import { AuthData, useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";
import EventCard from "./components/EventCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SearchBar from "./components/SearchBar";
import toast from "react-hot-toast";

// import { Carousel } from "flowbite-react";

export enum EventType {
  CONFERENCE = "CONFERENCE",
  SEMINAR = "SEMINAR",
  WORKSHOP = "WORKSHOP",
  // Add more types as needed
}

export interface Event {
  eventID: number;
  title: string;
  description: string;
  date: string;
  location: string;
  virtual: boolean;
  offline: boolean;
  freeEntry: boolean;
  eventType: EventType; // Using enum
  organizerID: number;
  posterImage: string;
  thumbnailImage: string;
}

const HomePage = () => {
  const { auth, setAuth } = useAuth();

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/events");
        if (res && res.status === 200) {
          console.log("==========res data================");
          console.log(res?.data);

          // setAuth({ email, accessToken });
          // setAuth({
          //   accessToken,
          //   email,
          // });
          setEvents(res.data);
        }
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

    getAllEvents();
  }, []);

  const navigate = useNavigate();
  const refresh = async () => {
    const response = await axios.get("/api/v1/auth/refreshToken", {
      withCredentials: true,
    });
    if (
      response.status === 403 ||
      response.status === 401 ||
      response.status === 400
    ) {
      navigate("/");
      return null; // Return null or handle the error accordingly
    }
    setAuth((prevAuth: AuthData | null) => ({
      ...prevAuth!,
      accessToken: response.data.accessToken,
      // Include other properties if needed
    }));
    return response.data.accessToken;
  };
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          if (auth && "accessToken" in auth) {
            config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          // Set the expiration time to 20 seconds from the current time

          // Set the cookie with the specified expiration time

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return (
    <div
      style={{
        background:
          "linear-gradient(142deg, rgba(86,31,41,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(86,31,41,1) 100%)",
      }}
      className=""
    >
      <Hero />
      <div className="cardContainer   ">
        <div>
          <SearchBar />
        </div>

        <div>
          <h1 className="text-xl my-2 font-bold leading-tight tracking-tight  md:text-2xl text-white text-center">
            Recommended Events
          </h1>
        </div>
        <div>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={true}
            className="flex gap-2"
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 3,
                partialVisibilityGutter: 40,
                slidesToSlide: 3,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
                slidesToSlide: 1,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 2,
                partialVisibilityGutter: 30,
                slidesToSlide: 2,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {events?.map((event, index) => {
              return <EventCard customKey={index} event={event} />;
            })}
            {/* <EventCard /> */}
            {/* <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard /> */}
          </Carousel>
        </div>
        {/* <Carousel indicators={false} slide={false} leftControl="left">
          <div className="flex gap-10">
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
          <div className="flex gap-10">
            <EventCard />
            <EventCard />
            <EventCard />
          </div>

          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </Carousel> */}
      </div>
      Homepage2
      <div>
        <button
          className="bg-slate-500"
          onClick={() => {
            navigate("/eventpage");
          }}
        >
          Event page
        </button>
      </div>
      <div>
        <button
          className="bg-slate-500"
          onClick={() => {
            navigate("/addevent");
          }}
        >
          Add event
        </button>
      </div>
    </div>
  );
};

export default HomePage;
