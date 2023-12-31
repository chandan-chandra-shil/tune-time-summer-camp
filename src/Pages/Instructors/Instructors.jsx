import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/Loader";

const Instructors = () => {
  const [instructors, setInstructors] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(" https://tune-time-server.vercel.app/all-instructors")
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="">
      <Helmet>
        <title>Tune Time | Instructors</title>
      </Helmet>
      <h1 className="text-center py-12  font-bold md:text-5xl text-4xl   bg-orange-400">
        Our Instructors
      </h1>

      <div className="overflow-x-auto shadow border rounded p-5  my-12 container mx-auto">
        <table className="table ">
          {/* head */}
          <thead className="bg-base-200 text-md py-2">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Instructor Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {instructors?.map((item, index) => (
              <tr key={item._id} className="hover">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img src={item.image} alt="instructor image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Instructors;
