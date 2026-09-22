import {PostCard} from "../components/index";
import service from "../appwrite/appWriteConfig";
import { Container } from "../components/index";
import authService from "../appwrite/auth";
import { useState, useEffect } from "react";
import {LogoutBtn} from "../components/index";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [changeName, setChangeName] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [posts,setPosts] = useState([]);
  const [field, setField] = useState("Account");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await authService.getUserProfile();

        if (userProfile) {
          setUser(userProfile);
          setName(userProfile.name || "");
          setUserId(userProfile.$id.toString())
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(()=>{
    const fetchCurrentUserPosts = async ()=>{
      if (!userId) return;

      try{
        const response = await service.listMyPosts(userId);
        setPosts(response?.documents || []);
      } catch(error){
        console.log(error)
      }
    };
    fetchCurrentUserPosts();
  }, [userId])

  const handleChangeName = async () => {
    // UPDATE → enable input
    if (!changeName) {
      setChangeName(true);
      return;
    }

    // SAVE
    const formattedName = name.trim().toUpperCase();

    // Don't allow empty name
    if (!formattedName) {
      return;
    }

    try {
      const updatedUser = await authService.changeName(formattedName);

      if (updatedUser !== false) {
        const refreshedUser = await authService.getUserProfile();
        setUser(refreshedUser);
        setName(refreshedUser?.name || formattedName);

        // SAVE → UPDATE
        setChangeName(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setPasswordMessage("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    try {
      await authService.changePassword(passwords.oldPassword, passwords.newPassword);
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordMessage("Password updated successfully.");
    } catch {
      setPasswordMessage("Unable to update your password. Check the current password and try again.");
    }
  };

  const updatePassword = (field, value) => {
    setPasswords((current) => ({ ...current, [field]: value }));
  };

  return (
    <Container>
      <section className="mx-auto max-w-5xl px-1 py-5" id="profile-content">
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-slate-300/70 pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="flex gap-20">
            <button className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-orange-600 hover:bg-slate-900 hover:text-white rounded-xl p-2" onClick={()=>setField("Account")}>Account settings</button>
            <button className="mb-3 text-xs font-bold uppercase tracking-[0.28em]  hover:bg-slate-900 hover:text-white rounded-xl p-2 text-orange-600" onClick={()=>setField("Posts")}>Posts</button>
            <LogoutBtn/>
            </div>
         
            <hr style={{
              color: '#000000',
              backgroundColor: '#000000',
              height: '2px',
              borderColor: '#000000',
              border: 'none'
      }} />
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{field==="Account"? "Your Profile":"Your Posts"}</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">{field==="Account" ? "Keep your author details current and your account secure.":"See all your journals at a glance." }</p>
          </div>
          {field==="Account" && (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-2xl font-bold text-orange-300 shadow-lg shadow-slate-950/15">
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>
          )}
        </div>
{field==="Account" && (
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="flex min-h-97.5 flex-col rounded-3xl border border-slate-200 bg-white/85 p-7 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-9">
            <div className="mb-8">
              <p className="text-sm font-semibold text-orange-600">Personal details</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950">About you</h2>
            </div>
            <dl className="divide-y divide-slate-200/80">
              <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-4 first:pt-0">
                <dt className="text-sm font-medium text-slate-500">Name</dt>
                <dd className="truncate text-sm font-semibold text-slate-900">{user?.name || "Loading..."}</dd>
              </div>
              <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-4">
                <dt className="text-sm font-medium text-slate-500">Email</dt>
                <dd className="truncate text-sm font-semibold text-slate-900">{user?.email || "Loading..."}</dd>
              </div>
            </dl>
            <div className="mt-auto border-t border-slate-200/80 pt-7">
              {changeName && (
                <input aria-label="New name" autoFocus className="mb-3 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" onChange={(event) => setName(event.target.value)} value={name} />
              )}
              <button className="w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/15 hover:-translate-y-0.5 hover:bg-orange-600" onClick={handleChangeName} type="button">
                {changeName ? "Save name" : "Edit name"}
              </button>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.75)] sm:p-9">
            <div className="mb-8">
              <p className="text-sm font-semibold text-orange-300">Security</p>
              <h2 className="mt-1 text-2xl font-bold">Change password</h2>
            </div>
            <form className="space-y-4" onSubmit={handlePasswordChange}>
              {[["oldPassword", "Current password"], ["newPassword", "New password"], ["confirmPassword", "Confirm password"]].map(([field, label]) => (
                <label className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[9.5rem_1fr] sm:gap-4" key={field}>
                  <span className="text-sm font-medium text-slate-300">{label}</span>
                  <input className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10" onChange={(event) => updatePassword(field, event.target.value)} required type="password" value={passwords[field]} />
                </label>
              ))}
              {passwordMessage && <p className="text-sm text-orange-300">{passwordMessage}</p>}
              <button className="mt-3 w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-slate-950 hover:-translate-y-0.5 hover:bg-orange-400" type="submit">Update password</button>
            </form>
          </article>
        </div>
      )}
      {field === "Posts" && posts.length &&(
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post)=>(
                    <div key={post.$id}>
                 <PostCard {...post} />
                 </div>
            ))}
            </div>
      )}
      </section>
    </Container>
  );
}