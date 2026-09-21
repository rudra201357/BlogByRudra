import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login as authLogin } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-5">
      <aside className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-12 lg:col-span-2">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-24 border-orange-500/30" />
        <div className="relative flex h-full flex-col justify-between gap-16">
          <Logo width="130px" classname="text-gray-400" light />
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-400">Welcome back</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Keep the good ideas moving.</h1>
            <p className="mt-5 leading-relaxed text-slate-400">Return to your personal corner of stories, notes, and things worth remembering.</p>
          </div>
        </div>
      </aside>
      <div className="p-8 sm:p-12 lg:col-span-3 lg:p-16">
        <div className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">Your journal</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950">Sign in to Rudra.ink</h2>
          <p className="mt-3 text-slate-500">New here? <Link to="/signup" className="font-bold text-orange-600 hover:text-orange-700">Create an account</Link></p>
        </div>
        

        <form onSubmit={handleSubmit(login)} className="max-w-md">
          <div className="space-y-5">
            <Input
              label="Email address"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            {error && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
