import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <footer className="h-[350px] overflow-hidden bg-black text-white pt-14 pb-8 px-6 md:px-12 lg:px-20 p-2">
      {/* Top Section */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-10"
        data-aos="fade-up">
          
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Auto PPT</h2>
          <p className="text-gray-300 leading-relaxed">
            We help you elevate your brand with stunning design, development,
            and digital solutions tailored to your business.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-400 transition" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-gray-400 transition" />
            <Linkedin className="w-5 h-5 cursor-pointer hover:text-gray-400 transition" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-400 transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer transition"><a href="/">Home</a></li>
            <li className="hover:text-white cursor-pointer transition"><a href="/about">About</a></li>
            <li className="hover:text-white cursor-pointer transition"><a href="/work">Workspace</a></li>
            <li className="hover:text-white cursor-pointer transition"><a href="/project">Project</a></li>
            <li className="hover:text-white cursor-pointer transition"><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1" />
              Harindanga Bazar pakur, Jharkhand, India
            </li>

            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5" /> +91 7761917649
            </li>

            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5" /> wiweb7649@gmail.com
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Join Newsletter</h3>
          <p className="text-gray-300 mb-4">
            Subscribe to get updates & offers.
          </p>

          <div className="flex bg-white rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 py-2 px-4 text-black outline-none"
            />
            <button className="bg-[crimson] text-white font-medium px-5 hover:bg-green-400 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className="border-t border-red-800 mt-10 pt-5 text-center text-gray-400 text-sm">
          
        © {new Date().getFullYear()} YourBrand — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
