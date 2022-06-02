import { UseSwitchResult } from "@mui/base";
import { Email } from "@mui/icons-material";
import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { userFetch } from "../Api/Api";
import { LoginDetails } from "../components/Forms/LoginForm";

interface UserContextValue {
  users: User[];
  fetchUsers: () => void;
  fetchUser: (id: string) => void;
  createUser: () => void;
  updateUser: (users: User) => void;
  deleteUser: (id: string) => void;
  logoutUser: (id: string) => void;
  loginUser: () => void;
}

export interface BaseUser {
  email: string;
  password: string;
}

export interface User extends BaseUser {
  _id: string;
  isAdmin: Boolean;
}

export const UserContext = React.createContext<UserContextValue>({
  users: [],
  fetchUsers: () => {},
  fetchUser: (id: string) => {},
  createUser: () => {},
  updateUser: (email: User) => {},
  deleteUser: (id: string) => {},
  logoutUser: (id: string) => {},
  loginUser: () => {},
});

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [users, setUser] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [admin, setIsAdmin] = useState(false);

  const fetchUsers = useCallback(() => {
    axios.get<User[]>("/api/users").then((res) => {
      setUser(res.data);
    });
  }, []);

  const fetchUser = useCallback((id: string) => {
    axios
      .post<User>(`/api/users/${id}`)
      .then((res) => {
        setUser([res.data]);
      })
      .catch((err) => {
        if (err) console.log(err);
        if (null || undefined) {
          console.log(err + " sign up to make an order");
        }
      });
  }, []);

  const createUser = useCallback(() => {
    axios.post<User>("/api/users").then((res) => {
      setUser([...users, res.data]);
    });
  }, []);

  const loginUser = useCallback(() => {
    axios.get("/api/users").then((res) => {
      setUser([...users, res.data]);
    });
  }, []);

  const logoutUser = useCallback((id: string) => {
    axios.delete<User>(`/api/users/logout/${id}`).then((res) => {
      const userIndex = users.findIndex((users: User) => {
        return (users._id = id);
      });
    });
  }, []);

  const updateUser = useCallback((newUserData: User) => {
    axios
      .put<User>(`/api/users/${newUserData._id}`, {
        newUserData,
      })
      .then((res) => {
        const userIndex = users.findIndex((users: User) => {
          return (users._id = newUserData._id);
        });
        users[userIndex] = res.data;
        setUser(users);
      });
  }, []);

  const deleteUser = useCallback((id: string) => {
    axios.delete<User>(`/api/users/${id}`).then((res) => {
      const userIndex = users.findIndex((users: User) => {
        return (users._id = id);
      });
      setUser([...users.splice(userIndex, 1)]);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        fetchUser,
        fetchUsers,
        loginUser,
        logoutUser,
        deleteUser,
        updateUser,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export const useUser = () => useContext(UserContext);
