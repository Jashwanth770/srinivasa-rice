import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, ShieldCheck, Box } from 'lucide-react';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80"
                    alt="Golden Paddy Field"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 animate-fade-in-up">
                        Premium <span className="text-primary">Sona Masuri </span> <br /> Sourced Directly from Telangana's Finest Mills
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-200 mb-10">
                        Sourcing the finest quality rice from the heartland of India to global markets. Trusted canvassers and merchant exporters.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/contact"
                            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                        >
                            Request Bulk Quote <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            to="/products"
                            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg transition-all backdrop-blur-sm"
                        >
                            View Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features/Highlights Section */}
            <section className="py-20 bg-background text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-secondary mb-16">Global Shipping Capabilities</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="h-20 w-20 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                <Globe2 className="h-10 w-10 text-primary group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Worldwide Export</h3>
                            <p className="text-text-muted">Efficient logistics network connecting Krishnapatnam and Chennai ports to international destinations.</p>
                        </div>

                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="h-20 w-20 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                <ShieldCheck className="h-10 w-10 text-primary group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Certified Quality</h3>
                            <p className="text-text-muted">Rigorous third-party inspections and APEDA & FSSAI certified milling partners ensure premium quality.</p>
                        </div>

                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="h-20 w-20 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                <Box className="h-10 w-10 text-primary group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Custom Packaging</h3>
                            <p className="text-text-muted">Available in 26kg, 50kg PP bags and customizable bulk packaging tailored to importer requirements.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
