import { useState } from "react";
import { getDatabase, ref, push, remove } from "firebase/database";
import { db } from "@/lib/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

function RegisterVehicle() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [m_year, setMYear] = useState("");
  const [r_year, setRYear] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Generate a GUID
    const id = uuidv4();
    // Create a new vehicle object
    const vehicle = {
      id,
      make,
      model,
      m_year,
      r_year,
    };

    // Save the vehicle data to Firebase

    const database = getDatabase();
    const dataRef = ref(database, "path/to/vehicle");
    push(dataRef, vehicle)
      .then(() => {
        toast.success("Data saved successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error("Failed to save data.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error(error);
      });

    // Reset the form fields
    setMake("");
    setModel("");
    setMYear("");
    setRYear("");
  };

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Register Vehicle
            </h2>
            <p className="text-gray-500 mb-6">
              Enter Your Vehicle Details here.
            </p>
            <form onSubmit={handleRegister}>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Vehicle Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="make">Make</label>
                        <input
                          type="text"
                          name="make"
                          id="make"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Model</label>
                        <input
                          type="text"
                          name="model"
                          id="model"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          placeholder="email@domain.com"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="address">Manufacture Year</label>
                        <input
                          type="text"
                          name="m_year"
                          id="m_year"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={m_year}
                          onChange={(e) => setMYear(e.target.value)}
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="city">Registered Year</label>
                        <input
                          type="text"
                          name="r_year"
                          id="r_year"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={r_year}
                          onChange={(e) => setRYear(e.target.value)}
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterVehicle;
