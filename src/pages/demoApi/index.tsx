import axios from "axios";
import { Button } from "flowbite-react";

const DemoApi = () => {
  const clickHandler = async () => {
    const options = {
      method: "POST",
      url: "https://londontheatredirectstefan-skliarovv1.p.rapidapi.com/getEvents",
      headers: {
        "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
        "X-RapidAPI-Host":
          "LondonTheatreDirectstefan-skliarovV1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Button onClick={clickHandler} />
    </div>
  );
};

export default DemoApi;
