import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

export default function AppLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map />
    </div>
  );
}
