import image from "../assets/Logo/image.png"
function Logo({ light = false, classname="text-gray-900" }){
    return <div className={`flex min-w-max items-center gap-2 whitespace-nowrap text-xl font-bold tracking-tight ${light ? "text-white" : "text-slate-900"}`}>
        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-sm"><img src={image} alt="Rudra" className="h-full w-full object-cover" /></span>
        <span className={classname}>Rudra<span className="text-orange-600">.ink</span></span>
    </div>
}
export default Logo
