import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAthenticated: false,
};

const FAKE_USER = {
  name: "Ali",
  email: "user@gmail.com",
  password: "1234",
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAthenticated: false,
      };
    default:
      throw new Error("Unknow action !");
  }
}

export default function AuthProvider({ children }) {
  const [{ user, isAthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
