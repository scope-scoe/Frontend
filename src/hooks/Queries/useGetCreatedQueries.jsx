import React, { useEffect } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setCreatedQueries } from "@/store/querySlice";
function useGetCreatedQueries() {
  const dispatch = useDispatch();
  useEffect(() => {
    const GetCreatedQueries = async () => {
      try {
        const res = await axios.get(
          `${USER_API_ENDPOINT}/student/getCreatedQueries`,
          {
            withCredentials: true,
          }
        );
        console.log("All Queries:", res);
        dispatch(setCreatedQueries(res.data.data));
      } catch (error) {
        console.error("Error fetching Queries:", error);
      }
    };
    GetCreatedQueries();
  }, []);
}

export default useGetCreatedQueries;
