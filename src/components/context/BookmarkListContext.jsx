import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:3000";

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: "",
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        currentBookmark: null,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("unkknow action");
  }
}

export default function BookmarkListProvider({ children }) {
  const [{ isLoading, bookmarks, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        // setbookmarks(data);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "reject",
          payload: "an Error occured in loading bookamrks",
        });
      }
    }

    fetchBookmarkList();
  }, []);

  // single bookmark
  async function getBookmark(id) {
    // Number , ? !important
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "reject",
        payload: "an Error occured in fetching single  bookamrk",
      });
    }
  }
  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "reject",
        payload: error.message,
      });
    }
  }

  async function DeleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      // setbookmarks((prev) => prev.filter((item) => item.id !== id));
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "reject",
        payload: error.message,
      });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        getBookmark,
        currentBookmark,
        DeleteBookmark,
        createBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  return useContext(BookmarkContext);
}

// 1. pass dispatch
// 2. pass action
