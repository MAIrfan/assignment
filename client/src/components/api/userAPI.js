import { useEffect, useState } from "react";
import axios from "axios";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          setUser(res.data);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token, callback]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    callback: [callback, setCallback],
  };
};

export default UserAPI;
