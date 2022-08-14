import { Outlet } from "react-router-dom";
import Header from "../../components/header/header.component";

const GetStarted = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default GetStarted;