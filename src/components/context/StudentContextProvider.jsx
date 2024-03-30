import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export default function StudentContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

   const getUsers = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/getStudents`, {
        headers: { token: `Bearer ${token}` }
      });
      setUserData(data.users.length);
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const getStudentById = async (studentId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/getStudent/${studentId}`, {
        headers: { token: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const removeUser = async (userId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/deleteStudent/${userId}`,
        { headers: { token: `Bearer ${token}` } }
      );
      console.log(data);
     
      return data;
    } catch (error) {
      console.error("Error removing user:", error);
      throw error;
    }
  };
  const extractNameFromToken =() => {
    
    const token = localStorage.getItem("userToken");
    
    if (token) {
      const decodedToken = jwtDecode(token);
      
      
      return decodedToken;
    } else {
   
      console.error("User token not found in localStorage.");
      return null;
    }
  };

  const getStudentSection = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/student/section`, {
        headers: { token: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };
  const getStudentTask= async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/student/getMyTask`, {
        headers: { token: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    getUsers();
    extractNameFromToken();
    setUserToken(token);
  }, []);

  return (
    <userContext.Provider value={{ userToken, getUsers, userData, removeUser,extractNameFromToken,getStudentById, getStudentSection,getStudentTask }}>
      {children}
    </userContext.Provider>
  );
}
