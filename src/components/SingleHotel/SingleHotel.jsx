import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHotels } from "../context/HotelsProvider.jsx";

import Loader from "../Loader/Loader.jsx";
function SingleHotel() {
  const { id } = useParams();

  const { getHotel, isLoadingCurrHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [getHotel, id]);

  if (isLoadingCurrHotel) {
    return <Loader />;
  }

  return (
    <div>
      <div className="room">
        <div className="roomDetail">
          <h2>{currentHotel.name}</h2>
        </div>
        <div>
          {currentHotel.number_of_picture_url} reviews ;
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
