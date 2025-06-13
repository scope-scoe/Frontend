import React, { useEffect } from 'react'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constants'
import { useDispatch } from 'react-redux'
import { setAllEvents } from '@/store/eventSlice';
function useGetAllEvents() {
  const dispatch = useDispatch();
  useEffect(() => {
    const GetAllEvents=async()=>{
      try {
        const res=await axios.get(`${USER_API_ENDPOINT}/student/getAllEvents`,{
          withCredentials: true
        });
        //console.log("All Events:", res.data.data);
        dispatch(setAllEvents(res.data.data));
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }
    GetAllEvents();
  }, [])
}

export default useGetAllEvents