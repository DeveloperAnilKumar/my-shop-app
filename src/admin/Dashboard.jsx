import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      hello
      <ul>
        <li>
          <Link to="/add"> add product</Link>
        </li>
        <li>
          <Link to="/view"> view product</Link>
        </li>
       
        <li>
          <Link to="/add/category"> add category</Link>
        </li>
       
        <li>
          <Link to="/view/category"> view category</Link>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;
