import React from "react";
import LogoLocalHero from "../../public/images/LocalHero_logo_no_background.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer py-8 w-full" style={{ backgroundColor: "#04b54e", color: "white" }}>
      <div className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 text-center sm:text-left">
          

          <div className="ml-4 sm:ml-8">
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Get the app
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About us
                </a>
              </li>
            </ul>
          </div>


          <div>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Help and Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms
                </a>
              </li>
            </ul>
          </div>


          <div>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cookie settings
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Accessibility statement
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center w-full">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <Image src={LogoLocalHero} alt="LocalHero Logo" height={60} width={60} />
          </a>
          
          <span className="text-sm text-white">
            © 2023{" "}
            <a href="/" className="hover:underline">
              LocalHero™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
