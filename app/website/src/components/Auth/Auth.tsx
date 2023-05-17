import { useEffect, useState } from "react";
import { fetchService } from "../../utils/AxiosInterceptor";

export default function Auth() {
  const [message, setMessage] = useState("");
  const url = import.meta.env.VITE_API_URL;
  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: url + "auth-endpoint",
    };

    // make the API call
    fetchService(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);
  return (
    <div>
      <h1 className="text-center">Auth Component</h1>

      <h3 className="text-center text-danger">{message}</h3>
    </div>
  );
}
