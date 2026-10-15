import { Link } from "react-router-dom";
import { CamFrame } from "@/components/broadcast";

const NotFound = () => (
  <CamFrame label="CAM 4 · Empty net" corners="all">
    <div className="container-site flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="tag-live">Whistle · 404</span>
      <h1 className="mt-3 font-display text-[22vw] font-black uppercase leading-none text-ice-white sm:text-[200px]">Offside.</h1>
      <p className="mt-2 text-lg text-muted-text">This page doesn't exist, or it's been moved.</p>
      <Link to="/" className="btn-primary mt-8">
        Back to centre ice
      </Link>
    </div>
  </CamFrame>
);

export default NotFound;
