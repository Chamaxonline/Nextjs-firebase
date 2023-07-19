import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch the vehicle data from Firebase
    const fetchData = async () => {
      const database = getDatabase();
      const dataRef = ref(database, "path/to/vehicle");

      try {
        onValue(dataRef, (snapshot) => {
          const data = snapshot.val();

          if (data) {
            // Convert the data object into an array
            const vehicleList = Object.entries(data).map(([key, value]) => ({
              id: key,
              ...value,
            }));
            setVehicles(vehicleList);
          } else {
            // Handle the case when there is no data
            setVehicles([]);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Make
              </th>
              <th scope="col" className="px-6 py-3">
                Model
              </th>
              <th scope="col" className="px-6 py-3">
                Manufacture Year
              </th>
              <th scope="col" className="px-6 py-3">
                Registered Year
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={vehicle.id}
              >
                <td className="px-6 py-4">{vehicle.make}</td>
                <td className="px-6 py-4">{vehicle.model}</td>
                <td className="px-6 py-4">{vehicle.m_year}</td>
                <td className="px-6 py-4">{vehicle.r_year}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
      </div>
   
  );
}

export default VehicleList;
