import React from "react";

import { Button } from "./components/elements/Button";

const NotFound = () => {
  
  return (
    <div className="h-screen bg-white text-center !pt-20 text-black w-full">
      <h1 className="font-normal text-[44px]">ERROR</h1>
      <div className="w-fit mx-auto relative">
        <p className="text-[350px] font-bold leading-[100%]">404</p>
      </div>
      <p className="w-[754px] mx-auto text-[25px] text-white/50">
        The page you are trying to access doesn’t exist or has been moved. Try
        going to our homepage.
      </p>

      <Button as="link" href="/" className="text-black m-auto mt-6">
        Go to Homepage
      </Button>
    </div>
  );
};

export default NotFound;
