import { Link } from 'react-router-dom';
import { Wheat, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary-dark text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <Wheat className="h-8 w-8 text-primary" />
                            <div className="flex flex-col">
                                <span className="font-bold text-xl leading-tight">Srinivasa</span>
                                <span className="text-sm font-semibold text-primary tracking-wider leading-tight">RICE CANVASSING</span>
                            </div>
                        </Link>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                            Premium Sona Masuri & Basmati Exporters from Sri Srinivasa Canvassing. We bridge the gap between quality Indian rice and global markets.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/products" className="hover:text-primary transition-colors">Our Products</Link></li>
                            <li><Link to="/packaging" className="hover:text-primary transition-colors">Packaging & Logistics</Link></li>
                            <li><Link to="/certifications" className="hover:text-primary transition-colors">Certifications</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>Miryalaguda,Nalgonda District, Telangana, India - 508207</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+91 9866760028</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>manocha1973@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary">Legal Info</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/legal#privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/legal#terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/legal#disclaimer" className="hover:text-primary transition-colors">Commodity Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-8 text-center text-sm text-gray-400 flex flex-col items-center gap-2">
                    <p>&copy; {new Date().getFullYear()} Sri Srinivasa Canvassing. All rights reserved.</p>
                    <p className="max-w-3xl text-xs text-gray-500 mt-2">
                        Pricing is indicative and subject to daily market fluctuations. Final quality verified by third-party inspection.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
