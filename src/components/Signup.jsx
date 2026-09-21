import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, Input } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signup = async (data) => {
    setError("");
    try {
      const account = await authService.createAccount(data);
      if (account) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      
    }
  };
  return (
    <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-5">
      <aside className="relative overflow-hidden bg-orange-500 p-8 text-slate-950 sm:p-12 lg:col-span-2">
        <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full border-28 border-orange-300/60" />
        <div className="relative flex h-full flex-col justify-between gap-16">
          <Logo width="130px" />
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-orange-950/70">Start writing</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Make a little room for wonder.</h1>
            <p className="mt-5 leading-relaxed text-orange-950/70">Save your best observations and share the stories that stay with you.</p>
          </div>
        </div>
      </aside>
      <div className="p-8 sm:p-12 lg:col-span-3 lg:p-16">
        <div className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">Join the journal</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950">Create your account</h2>
          <p className="mt-3 text-slate-500">Already have an account? <Link to="/login" className="font-bold text-orange-600 hover:text-orange-700">Sign in</Link></p>
        </div>
      

        <form onSubmit={handleSubmit(signup)} className="max-w-md">
          <div className="space-y-5">
            <Input
              label="Full name"
              placeholder="Rudradeb Pal"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
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
              Sign up
            </Button>
              {error && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup
