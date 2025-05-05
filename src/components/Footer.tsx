import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-title text-2xl font-bold mb-4">
              DecorKaro<span className="text-yellow-500">.</span>
            </h3>
            <p className="text-slate-400 mb-6 font-secondary">
              Transform your home with affordable modular interior packages. Choose from Essentials, Premium & Luxe packages. Serving Mumbai and across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-yellow-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-yellow-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-yellow-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-title font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 font-secondary">
              <li><a href="#" className="text-slate-400 hover:text-yellow-500 transition-colors">Home</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-yellow-500 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-yellow-500 transition-colors">Services</a></li>
              <li><a href="#portfolio" className="text-slate-400 hover:text-yellow-500 transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-yellow-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-title font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 font-secondary">
              <li><a href="#services" className="text-slate-400 hover:text-yellow-500 transition-colors">1BHK Package</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-yellow-500 transition-colors">2BHK Package</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-yellow-500 transition-colors">3BHK Package</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-yellow-500 transition-colors">4BHK Package</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-yellow-500 transition-colors">Modular Kitchen</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-title font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                <span className="text-slate-400 font-secondary">DecorKaro Design Studio, 123 Design Avenue, Juhu, Mumbai - 400049, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-yellow-500 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-slate-400 hover:text-yellow-500 transition-colors font-secondary">+91 9876 543 210</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-yellow-500 flex-shrink-0" />
                <a href="mailto:info@decorkaro.in" className="text-slate-400 hover:text-yellow-500 transition-colors font-secondary">info@decorkaro.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} DecorKaro Interior Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;