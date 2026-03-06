import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', company: '', whatsapp: '', inquiry: '' });
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', company: '', whatsapp: '', inquiry: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-background pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight mb-4">Get in Touch</h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="max-w-2xl mx-auto text-xl text-text-muted">
                        Request bulk quotes, technical specifications, or logistics information.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Details */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 bg-white rounded-lg shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Office Location</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Miryalaguda,Nalgonda District, Telangana, India-508207
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 bg-white rounded-lg shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Phone / WhatsApp</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        +91 9866760028
                                    </p>
                                    <a
                                        href="https://wa.me/919866760028"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-block text-sm font-semibold text-secondary hover:text-primary transition-colors"
                                    >
                                        Chat on WhatsApp &rarr;
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 bg-white rounded-lg shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Email Address</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        srinivasulu@srinivascanvassing.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Request Bulk Quote</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                        placeholder="Global Imports Ltd"
                                    />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                                    <input
                                        type="tel"
                                        id="whatsapp"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                        placeholder="Your Whatsapp Number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-2">Inquiry Details (Quantity, Port, Specifications)</label>
                                <textarea
                                    id="inquiry"
                                    name="inquiry"
                                    value={formData.inquiry}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                                    placeholder="We are looking for 100 MT of Sona Masuri..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-4 rounded-lg transition-colors flex justify-center items-center"
                            >
                                {status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
                            </button>

                            {status === 'success' && (
                                <div className="p-4 bg-green-50 text-green-800 rounded-lg text-sm font-medium mt-4">
                                    Inquiry submitted successfully. Our team will contact you shortly!
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="p-4 bg-red-50 text-red-800 rounded-lg text-sm font-medium mt-4">
                                    Failed to send inquiry. Please try again later or email us directly.
                                </div>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
