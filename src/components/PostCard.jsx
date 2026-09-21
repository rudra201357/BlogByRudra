import service from "../appwrite/appWriteConfig";

import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="aspect-4/3 w-full overflow-hidden bg-slate-100">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div className="p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Featured story</p>
          <h2 className="text-xl font-bold leading-tight text-slate-900">{title}</h2>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
