import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

export default function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, setIsLoading, currentBookmark } = useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (setIsLoading || !currentBookmark) return <Loader />;

  return (
    <div>
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        🔙 Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className={`bookmarkItem `}>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}
