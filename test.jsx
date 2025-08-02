import React from 'react'

const test = () => {
  return (
    <>
         <div className="relative w-32 h-32 mx-auto">
        {/* Center image (K3RRY logo) */}
        <img
          src={K3RRY_logo}
          alt="K3RRY Logo"
          className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 z-10"
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


      <div className="relative w-40 h-40 mx-auto">
        <style>
          {`
            @keyframes orbit {
              0% {
                transform: rotateY(0deg);
              }
              100% {
                transform: rotateY(360deg);
              }
            }
          `}
        </style>
      
        <div
          className="absolute inset-0 origin-center"
          style={{
            animation: 'orbit 5s linear infinite',
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src={efootball_logo}
            alt="eFootball Logo"
            className="absolute left-0 top-1/2 w-12 h-12 -translate-y-1/2"
          />
          <img
            src={K3RRY_logo}
            alt="K3RRY Logo"
            className="absolute right-0 top-1/2 w-12 h-12 -translate-y-1/2"
          />
        </div>
      </div>
    </>
  )
}

export default test