import React, { useEffect } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setRegisteredEvents } from "@/store/eventSlice";
function useGetRegisteredEvents() {
  const dispatch = useDispatch();
  useEffect(() => {
    const GetRegisteredEvents = async () => {
      try {
        const res = await axios.get(
          `${USER_API_ENDPOINT}/student/getAllRegisteredEvents`,
          {
            withCredentials: true,
          }
        );
        console.log("All Registered Events:", res);
        dispatch(setRegisteredEvents(res.data.data));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    GetRegisteredEvents();
  }, []);
}

export default useGetRegisteredEvents;
