import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../hook/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const EnrolledClasses = () => {
 const { user } = useContext(AuthContext);
 const [axiosSecure] = useAxiosSecure();

 const { data: myEnrolled = [], refetch } = useQuery({
   queryKey: ["myEnrolled", user?.email],
   enabled: !!user?.email && !!localStorage.getItem("access-token"),
   queryFn: async () => {
     const res = await axiosSecure(`/my-enrolled?email=${user?.email}`);
     return res.data;
   },
 });
  
  return (
    <div className="w-[70%]">
      <Helmet>
        <title>Tune Time | Enrolled Classes</title>
      </Helmet>
      <h2 className="md:text-4xl text-center text-2xl text-orange-600 font-bold ">
        Enrolled Classes Page
      </h2>

      <div className=" my-5">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="uppercase">
                <th>#</th>
                <th>Class</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myEnrolled.map((enroll, idx) => (
                <tr key={enroll._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={enroll.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{enroll.className}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      ${enroll.price}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {enroll.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnrolledClasses;