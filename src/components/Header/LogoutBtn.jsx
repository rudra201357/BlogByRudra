import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import {logout} from "../../store/authSlice"
function LogoutBtn(){
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
    }
    return (<>
    <button
    className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-900 hover:text-white"
     onClick={logoutHandler}
     >Logout</button>
    </>
    );
}
export default LogoutBtn