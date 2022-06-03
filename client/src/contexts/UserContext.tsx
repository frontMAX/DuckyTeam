import React, { useCallback, useContext } from "react";
import axios from "axios";
import { LoginDetails } from "../components/Forms/LoginForm";

interface UserContextValue {
  isLoggedIn: boolean;
  users: User[];
  user?: User;
  fetchUsers: () => void;
  fetchUser: (id: string) => void;
  createUser: (loginDetails: LoginDetails) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  loginUser: (loginDetails: LoginDetails) => void;
  logoutUser: () => void;
  getCurrentUser: () => void;
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
  user: {
    email: "",
    password: "",
    isAdmin: false,
    _id: "",
  },
  fetchUsers: () => {},
  fetchUser: (id: string) => {},
  createUser: (loginDetails: LoginDetails) => {},
  updateUser: (user: User) => {},
  getCurrentUser: () => {},
  deleteUser: (id: string) => {},
  logoutUser: () => {},
  loginUser: (loginDetails: LoginDetails): Promise<boolean> => {
    return new Promise(() => {});
  },
  isLoggedIn: false,
});

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>();
  let [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const fetchUsers = useCallback(() => {
    axios.get<User[]>("/api/user").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const fetchUser = useCallback((id: string) => {
    axios.post<User>(`/api/user/${id}`).then((res) => {
      setUsers([res.data]);
    });
  }, []);

  const createUser = useCallback((loginDetails: LoginDetails) => {
    axios.post<User>("/api/user").then((res) => {
      setUsers([...users, res.data]);
    });
  }, []);

  const loginUser = useCallback(async (loginDetails: LoginDetails) => {
    const result = await axios.post<User>(
      "/api/user/login",
      {
        email: loginDetails.email,
        password: loginDetails.password,
      },
      { withCredentials: true }
    );

    setUser(result.data);

    if (result.data) {
      setIsLoggedIn(true);
    }

    console.log("from func", user);

    return result.data;
  }, []);

  const getCurrentUser = useCallback(async () => {
    const result = await axios.get<User>("/api/user/auth", {
      withCredentials: true,
    });
    setUser(result.data);

    if (result.data) {
      setIsLoggedIn(true);
    }
    console.log(isLoggedIn);
    return result.data;
  }, []);

  const logoutUser = useCallback(() => {
    axios.delete<User>(`/api/user/logout`).then((res) => {
      setIsLoggedIn(false);
      setUser(undefined);
      return false;
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
        getCurrentUser,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export const useUser = () => useContext(UserContext);
