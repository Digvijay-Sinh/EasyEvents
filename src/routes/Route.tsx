import { Route, Routes } from "react-router-dom";
import AddEventPage from "../pages/addeventpage";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import EventBookingPage from "../pages/eventbookingpage";
import EventGroupPage from "../pages/eventgrouppage";
import EventPage from "../pages/eventpage";
import SearchPage from "../pages/searchpage";
import SuccessPage from "../pages/successpage";
import HomePage from "../pages/homepage";
import PrivateRequestPage from "../pages/privateRequestCheck";
import FormHookTest from "../pages/formHookTest";
import ProtectedPage from "../pages/protectedpage";
import CheckBg from "../pages/checkbg";
import DemoApi from "../pages/demoApi";

const RouteContainer = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addevent" element={<AddEventPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hookform" element={<FormHookTest />} />
        <Route path="/eventbooking" element={<EventBookingPage />} />
        <Route path="/eventgroup" element={<EventGroupPage />} />
        <Route path="/eventpage" element={<EventPage />} />
        <Route path="/searchpage" element={<SearchPage />} />
        <Route path="/private" element={<PrivateRequestPage />} />
        <Route path="/checkBg" element={<CheckBg />} />
        <Route path="/demoapi" element={<DemoApi />} />
        <Route
          path="/protected"
          element={
            <ProtectedPage>
              <>This is protected content</>
            </ProtectedPage>
          }
        />
        <Route path="/successpage" element={<SuccessPage />} />{" "}
      </Routes>
    </>
  );
};

export default RouteContainer;
