import React, { useCallback, useContext, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { LoginDetails } from "../components/Forms/LoginForm";
import { boolean } from "yup/lib/locale";
import { loginUser } from "../../../backend/resources/user";

interface UserContextValue {
  users: User[];
  user?: User;
  fetchUsers: () => void;
  fetchUser: (id: string) => void;
  createUser: () => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  loginUser: (loginDetails: LoginDetails) => void;
  logoutUser: (id: string) => void;
}

/** Remember this is used backendside as well, update both of needed. */
export interface BaseUser {
  email: string;
  password: string;
}

export interface User extends BaseUser {
  _id: string;
  isAdmin: boolean;
}

export const UserContext = React.createContext<UserContextValue>({
  users: [],
  user: undefined,
  fetchUsers: () => {},
  fetchUser: (id: string) => {},
  createUser: () => {},
  updateUser: (user: User) => {},
  deleteUser: (id: string) => {},
  logoutUser: (id: string) => {},
  loginUser: (loginDetails: LoginDetails) => {},
});

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>();

  const fetchUsers = useCallback(() => {
    axios.get<User[]>("/api/user").then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  const fetchUser = useCallback((id: string) => {
    axios.post<User[]>(`/api/user/${id}`).then((res) => {
      setUsers([...res.data]);
      console.log(res.data);
    });
  }, []);

  const createUser = useCallback(() => {
    axios.post<User>("/api/user").then((res) => {
      setUser(res.data);
    });
  }, []);

  const loginUser = useCallback(() => {
    axios
      .post<User>("api/user/login", {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        setUser(res.data);
        console.log(res.data);
        return res.data;
      });
  }, []);

  const logoutUser = useCallback((id: string) => {
    axios.delete<User>(`/api/user/logout/${id}`).then((res) => {
      setUser(undefined);
    });
  }, []);

  const updateUser = useCallback((newUserData: User) => {
    axios
      .put<User>(`/api/user/${newUserData._id}`, {
        newUserData,
      })
      .then((res) => {
        const userIndex = users.findIndex((user: User) => {
          return (user._id = newUserData._id);
        });
        users[userIndex] = res.data;
        setUsers(users);
      });
  }, []);

  const deleteUser = useCallback((id: string) => {
    axios.delete<User>(`/api/user/${id}`).then((res) => {
      const userIndex = users.findIndex((user: User) => {
        return (user._id = id);
      });
      setUsers([...users.splice(userIndex, 1)]);
    });
  }, []);

  useEffect(() => {
    axios.get<User>(`/api/user/auth`).then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        fetchUser,
        fetchUsers,
        loginUser,
        logoutUser,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export const useUser = () => useContext(UserContext);
