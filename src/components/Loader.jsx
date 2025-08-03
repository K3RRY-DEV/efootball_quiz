import K3RRY_logo from '../Images/K3RRY.png'
import efootball_logo from '../Images/efootball_logo.png';


const Loader = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="relative w-32 h-32 mx-auto">
        {/* Center image (K3RRY logo) */}
        <img
          src={K3RRY_logo}
          alt="K3RRY Logo"
          className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse"
        />
      
        {/* Rotating container */}
        <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
          {/* Orbiting image (eFootball logo) */}
          <img
            src={efootball_logo}
            alt="eFootball Logo"
            className="absolute top-0 left-1/2 w-12 h-12 -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  )
}

export default Loader