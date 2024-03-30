import React,{ createContext, useContext, useEffect, useState }  from 'react'
import axios from "axios";
export const TaskContext = createContext();
export default function TaskContextProvider({children}) {
      const getSuperTask = async () => {
        try {
          const token = localStorage.getItem("userToken");
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/supervisor/getSuperTask`, {
            headers: { token: `Bearer ${token}` }
          });
          return data;
        } catch (error) {
          console.error("Error fetching task:", error);
          throw error;
        }
      };
      const getSuperSubmission = async () => {
        try {
          const token = localStorage.getItem("userToken");
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/supervisor/getTaskSubmission`, {
            headers: { token: `Bearer ${token}` }
          });
          return data;
        } catch (error) {
          console.error("Error fetching task:", error);
          throw error;
        }
      };
      const getTaskById = async (id) => {
        try {
          const token = localStorage.getItem("userToken");
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/supervisor/getTask/${id}`, {
            headers: { token: `Bearer ${token}` }
          });
          return data;
        } catch (error) {
          console.error("Error fetching task:", error);
          throw error;
        }
      };
      const removeTask = async (taskId) => {
        try {
          const token = localStorage.getItem("userToken");
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/supervisor/deleteTask/${taskId}`,
            { headers: { token: `Bearer ${token}` } }
          );
          console.log(data);
          return data;
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(()=>{
        getSuperTask();
      },[])
  return (
    <TaskContext.Provider value={{getSuperTask,getTaskById,removeTask,getSuperSubmission}}>
      {children}
    </TaskContext.Provider>
  )
}
