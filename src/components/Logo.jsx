function Logo({width="100px", light=false}){
    return <div style={{ width }} className={`flex items-center gap-2 whitespace-nowrap text-xl font-bold tracking-tight ${light ? "text-white" : "text-slate-900"}`}>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-500 text-sm text-white">R</span>
        <span>Rudra<span className="text-orange-600">.ink</span></span>
    </div>
}
export default Logo
