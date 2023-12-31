import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Loader";

const ManageClasses = () => {
  const [classes, setClasses] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(" https://tune-time-server.vercel.app/all-class")
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="border md:p-10 p-5 shadow-md">
      <Helmet>
        <title>Tune Time | Manage Classes</title>
      </Helmet>
      <h2 className="text-center text-3xl font-bold mb-4 text-orange-600">
        Manage All Classes
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-orange-200 text-md">
            <tr>
              <th>#</th>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>

              <th>Instructor Email</th>
              <th>Available Sets</th>
              <th>Price</th>
              <th>Action</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {classes?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.image} alt="image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item?.name}</td>
                <td>{item?.instructor_name}</td>
                <td>{item?.instructor_email}</td>
                <td>{item?.available_seats}</td>
                <td>{item?.price}</td>
                <td>
                  <span className="border px-4 py-2 rounded-md text-white font-bold hover:bg-orange-600  bg-orange-500">
                    Approve
                  </span>
                  <span className="border px-4 py-2 rounded-md font-bold hover:bg-red-600  bg-red-500 ms-2 ">
                    Deny
                  </span>
                  <span className="border px-4 py-2 rounded-md font-bold hover:bg-orange-600  bg-orange-500 ms-2 text-white">
                    Feedback
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
