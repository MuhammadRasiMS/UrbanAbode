import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/places")
      .then((response) =>
        setPlaces(response.data)
      );
  }, []);
    return (
      <div className="mt-10 grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {place.photos?.[0] && (
                    <img
                      src={"http://localhost:4000/uploads/" + place.photos[0]}
                      alt=""
                      className="rounded-2xl object-cover aspect-square"
                    />
                  )}
                </div>
                <h3 className="font-bold">{place.address}</h3>
                <h2 className="text-sm text-gray-500">{place.title}</h2>
                <div className="mt-1">
                  <span className="font-bold">₹{place.price}</span> per night
                </div>
              </motion.div>
            </Link>
          ))}
      </div>
    );
}