import React from "react";
import { Link } from "react-router-dom";

const NotFoundView = () => {
  return<>
   <div>Not Found 404</div>
   <Link to="/">Main page</Link>
  </>;
};

export default NotFoundView;
