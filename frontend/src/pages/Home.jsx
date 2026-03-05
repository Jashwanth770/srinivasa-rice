import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, ShieldCheck, Box, MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    company: "Price Alert Subscriber",
                    whatsapp: whatsapp,
                    inquiry: "🚨 AUTOMATED LEAD: Subscribed to Daily WhatsApp Price Alerts"
                })
            });

            if (response.ok) {
                toast.success('Successfully subscribed to morning price alerts!');
                setName('');
                setWhatsapp('');
            } else {
                toast.error('Failed to subscribe. Please try again.');
            }
        } catch (error) {
            toast.error('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

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
                        Premium <span className="text-primary">Rice  </span> <br /> Sourced Directly from Telangana's Finest Mills
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

            {/* WhatsApp Price Alert Lead Magnet */}
            <section className="bg-green-600 py-16 text-center transform -translate-y-4 shadow-xl z-30 relative mx-4 md:mx-auto max-w-5xl rounded-3xl overflow-hidden mt-[-3rem] md:mt-[-5rem]">
                <div className="absolute inset-0 bg-green-700 opacity-20"></div>
                <div className="relative z-10 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-4">
                        <MessageCircle className="w-12 h-12 text-white animate-bounce shadow-lg rounded-full" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
                        Wholesale Rice Prices Change Daily!
                    </h2>
                    <p className="text-green-50 text-lg max-w-2xl mx-auto mb-8 font-medium">
                        Enter your WhatsApp number to get tomorrow's exact CIF/FOB loading rates sent directly to your phone. Never miss a market drop.
                    </p>

                    <form onSubmit={handleSubscribe} className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center">
                        <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full md:w-64 px-5 py-4 rounded-xl text-gray-900 bg-white border-2 border-transparent focus:border-green-300 focus:ring-0 outline-none shadow-md font-medium text-lg placeholder-gray-400/60 placeholder:italic transition-all"
                        />
                        <div className="relative w-full md:w-80">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold border-r pr-2 border-gray-300">
                                WA
                            </span>
                            <input
                                type="tel"
                                required
                                placeholder="WhatsApp Number"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                className="w-full pl-16 pr-5 py-4 rounded-xl text-gray-900 bg-white border-2 border-transparent focus:border-green-300 focus:ring-0 outline-none shadow-md font-medium text-lg placeholder-gray-400/60 placeholder:italic transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full md:w-auto px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Subscribing...' : (
                                <>Get Alerts <Send className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>
                    <p className="text-green-100 text-xs mt-4">100% Free. No spam. Unsubscribe anytime.</p>
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
