import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const {
    createUser,
    logInGoogle: googleSignIn,
    updateUserProfile,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    if (data.password !== confirmPassword) {
      toast.error("password and confirm password does not match");
      return;
    }
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            image: data.photoURL,
          };
          fetch(" https://tune-time-server.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                toast.success("Register Successfully");
                navigate("/");
              }
            });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };
  // handle google login
  const handleGoogleSignUp = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log("from singup ", loggedUser);
        const saveUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
        };
        fetch(" https://tune-time-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("login successfully");
            navigate("/");
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="mx-auto container  md:my-6 rounded  ">
      <Helmet>
        <title>Tune Time | SignUp</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body md:w-1/2 mx-auto border rounded p-10 shadow"
      >
        <h2 className="text-3xl font-bold">Please SignUp!</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Name</span>
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="name"
            className="input input-bordered  "
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
            className="input input-bordered  "
          />
          {errors.email && (
            <span className="text-red-600">Email is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label ">
            <span className="label-text text-lg">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 10,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
            })}
            className="input input-bordered"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-600">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-600">
              password must be six characters
            </span>
          )}
          {errors.password?.type === "maxLength" && (
            <span className="text-red-600">
              password must be less than 10 characters
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-600">
              password must have one uppercase and one special characters
            </span>
          )}
        </div>
        <div className="form-control">
          <label className="label ">
            <span className="label-text text-lg">Conform Password</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="conform password"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Photo URL</span>
          </label>
          <input
            type="text"
            {...register("photoURL")}
            placeholder="photo url"
            className="input input-bordered  "
          />
        </div>

        <div className="form-control mt-6">
          <input
            type="submit"
            className="border px-8 py-2 bg-orange-200 rounded font-semibold hover:bg-orange-400"
            value="SignUp"
          />
        </div>
        <div className="divider">or</div>
        <div
          onClick={handleGoogleSignUp}
          className=" btn btn-outline hover:bg-orange-400 flex gap-2 justify-center items-center"
        >
          <span className="text-md">SignUp With</span>
          <FcGoogle className="w-6 h-6"></FcGoogle>
        </div>
        <p className="text-center mt-4">
          Already Have an Account?
          <Link to="/login" className="ms-2 text-orange-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
