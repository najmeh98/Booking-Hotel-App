import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useBookmark } from "../context/BookmarkListContext";

function getFlagEmoji(countryCode) {
  const codepoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codepoints);
}

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();

  const { createBookmark } = useBookmark();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState("");
  const [geoCodingError, setGeoCodingError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocation() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "this location is not a city!please  click somewhere else!"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(getFlagEmoji(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchLocation();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    // action
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <p>{geoCodingError}</p>;

  return (
    <div>
      <h2>Bookmark new Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="CityName">CityName</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            name="cityName"
            id="cityName"
          />
        </div>

        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span className="flag">{countryCode}</span>
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Back
          </button>
          <button className="btn btn--primary"> Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
