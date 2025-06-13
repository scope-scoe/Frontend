import React, { useEffect } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setAllQueries } from "@/store/querySlice";
function useGetAllQueries() {
  const dispatch = useDispatch();
  useEffect(() => {
    const GetAllQueries = async () => {
      try {
        const res = await axios.get(
          `${USER_API_ENDPOINT}/tpc/getAllQueries`,
          {
            withCredentials: true,
          }
        );
        console.log("All Queries:", res);
        dispatch(setAllQueries(res.data.data));
      } catch (error) {
        console.error("Error fetching Queries:", error);
      }
    };
    GetAllQueries();
  }, []);
}

export default useGetAllQueries;
