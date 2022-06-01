import React, { useCallback, useContext, useState } from "react";
import { userFetch } from "../Api/Api";
import { User } from "../Api/Data";
import { LoginDetails } from "../components/Forms/LoginForm";
import axios, { AxiosResponse } from "axios";

interface UserContextValue {
  isLoading: boolean;
  user?: User;
  login: (loginDetails: LoginDetails) => Promise<boolean>;
  logout: () => void;
}

export const UserContext = React.createContext<UserContextValue>({
  isLoading: false,
  user: { email: "", password: "", isAdmin: false },
  login: (_loginDetails: LoginDetails): Promise<boolean> => {
    return new Promise(() => {});
  },
  logout: () => {},
});

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (loginDetails: LoginDetails) => {
    axios
      .post("http://localhost:5001/api/user/login")
      .then((res) => {
        let user = res.data.user;
        return user;
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    setIsLoading(true);

    return userFetch(loginDetails)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
        return true;
      })
      .catch((e) => {
        setIsLoading(false);
        throw e;
      });
  };

  // const login = useCallback(async (_loginDetails: LoginDetails) => {
  //   axios
  //     .post("http://localhost:5001/api/user/login")
  //     .then((res) => {
  //       let user = res;
  //       console.log(user);
  //       return user;
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         setIsLoading(false);
  //         setUser(undefined);
  //         console.log(err);
  //       }
  //     });
  //   setIsLoading(true);
  //   setUser(user);
  //   try {
  //     const thisUser = await userFetch(_loginDetails);
  //     setUser(thisUser);
  //     setIsLoading(false);
  //     return true;
  //   } catch (e) {
  //     setIsLoading(false);
  //     throw e;
  //   }
  // }, []);

  //   try {
  //     const user = await userFetch(loginDetails);
  //     setUser(user);
  //     setIsLoading(false);
  //     return true;
  //   } catch (e) {
  //     setIsLoading(false);
  //     throw e;

  // },

  const logout = async () => {
    setUser(undefined);
    setIsLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export const useUser = () => useContext(UserContext);
