import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants";
import React, { useEffect, useState } from "react";

const Navbar = () => {
   const [time, setTime] = useState(dayjs());
   
   useEffect(() => {
   
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <nav>
      <div>
        <img src="images/logo.svg" />
        <p className="font-bold">Aniket's Portfolio</p>
        <ul>
          {navLinks.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({id, img}) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time>{time.format("ddd MMM D  h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
