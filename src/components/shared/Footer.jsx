import React from "react";
function Footer  ()  {
  return (
    <div className="bg-zinc-600 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">SCOPE</h2>
            <p className="text-sm text-scope-light/80">
              Streamlined Communication and Organised Placement Engagement
            </p>
          </div>
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} SCOPE. All rights reserved.</p>
            <p className="mt-1">
              A comprehensive college communication platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
