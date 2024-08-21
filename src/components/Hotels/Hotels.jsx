import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Loader from "../Loader/Loader";

export default function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();

  if (isLoading) return <Loader />;

  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            to={`/hotels/${item.id}?lat=${item.latitude}&lang=${item.longitude}`}
            key={item}
          >
            <div
              className={`searchItem ${
                item.id === currentHotel?.id ? "current-hotel" : ""
              }`}
            >
              <img src={item.piture_url.url} alt={item.name} />
              <div className="searchItemDesc"></div>
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                €&nbsp;{item.price} €&nbsp;
                <span>night</span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
