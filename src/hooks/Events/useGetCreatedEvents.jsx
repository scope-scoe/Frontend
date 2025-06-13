import React, { useEffect } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setCreatedEvents } from "@/store/eventSlice";
function useGetAllEvents() {
  const dispatch = useDispatch();
  useEffect(() => {
    const GetCreatedEvents = async () => {
      try {
        const res = await axios.get(
          `${USER_API_ENDPOINT}/teacher/getAllCreatedEvents`,
          {
            withCredentials: true,
          }
        );
        //console.log("All Events:", res);
        dispatch(setCreatedEvents(res.data.data));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    GetCreatedEvents();
  }, []);
}

export default useGetAllEvents;
