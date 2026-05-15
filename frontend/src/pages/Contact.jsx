import { useState } from 'react';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { countries } from '../data/countries';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', company: '', whatsapp: '', inquiry: '' });
    const [countryCode, setCountryCode] = useState('+91');
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const fullNumber = `${countryCode}${formData.whatsapp}`;
            const submissionData = { ...formData, whatsapp: fullNumber };
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/contact`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submissionData)
            });
            if (response.ok) {
                setStatus('success');
                const adminPhone = "919866760028";
                const message = `Hello Sri Srinivasa Canvassing, I have a new inquiry:\n\n*Name:* ${formData.name}\n*Company:* ${formData.company}\n*My WhatsApp:* ${fullNumber}\n*Inquiry:* ${formData.inquiry}`;
                window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`, '_blank');
                setFormData({ name: '', company: '', whatsapp: '', inquiry: '' });
            } else setStatus('error');
        } catch { setStatus('error'); }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

    const contactInfo = [
        { icon: MapPin, title: 'Office Location', detail: 'Miryalaguda, Nalgonda District, Telangana, India - 508207' },
        { icon: Phone, title: 'Phone / WhatsApp', detail: '+91 9866760028', link: 'https://wa.me/919866760028', linkText: 'Chat on WhatsApp →' },
        { icon: Mail, title: 'Email Address', detail: 'srinivasulu@srinivascanvassing.com' },
    ];

    const inputClass = "w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border-2 border-border/20 bg-black/20 text-white focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-white/20 font-black text-base md:text-lg";

    return (
        <div className="bg-background pt-6 md:pt-10 pb-10 md:pb-14 min-h-screen transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div {...fadeUp} className="text-center mb-8 md:mb-12">
                    <h1 className="text-2xl md:text-4xl font-display font-black text-white tracking-tight mb-3 uppercase">Get in Touch</h1>
                    <div className="w-12 md:w-16 h-1 bg-primary mx-auto rounded-full mb-4 md:mb-5" />
                    <p className="max-w-2xl mx-auto text-base md:text-lg text-white/70 font-bold leading-relaxed px-2">Request bulk quotes, technical specifications, or global logistics information directly from our export team.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
                    {/* Left Side: Contact Info */}
                    <motion.div {...fadeUp} className="space-y-8 md:space-y-12">
                        <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight mb-6 md:mb-10">Contact Hub</h2>
                        <div className="space-y-6 md:space-y-10">
                            {contactInfo.map(c => (
                                <div key={c.title} className="flex items-start gap-4 md:gap-6 group">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <c.icon className="h-6 w-6 md:h-8 md:w-8 text-primary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg md:text-xl text-white mb-1 md:mb-2 uppercase tracking-wide">{c.title}</h3>
                                        <p className="text-base md:text-lg text-white/60 font-bold leading-relaxed">{c.detail}</p>
                                        {c.link && (
                                            <a href={c.link} target="_blank" rel="noopener noreferrer" className="mt-2 md:mt-4 inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs md:text-sm hover:underline">
                                                {c.linkText}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div {...fadeUp}>
                        <div className="premium-card !p-6 sm:!p-10 md:!p-12 rounded-[2rem] md:rounded-[2.5rem] border-primary/10 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16 blur-2xl md:blur-3xl" />
                            
                            <h2 className="text-2xl md:text-3xl font-display font-black text-white mb-8 md:mb-10 uppercase tracking-tight text-center md:text-left">Request Bulk Quote</h2>
                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <div className="space-y-2 md:space-y-3">
                                        <label htmlFor="name" className="block text-xs md:text-sm font-black text-white uppercase tracking-widest ml-1">Full Name</label>
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2 md:space-y-3">
                                        <label htmlFor="company" className="block text-xs md:text-sm font-black text-white uppercase tracking-widest ml-1">Company Name</label>
                                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className={inputClass} placeholder="Global Imports Ltd" />
                                    </div>
                                </div>

                                <div className="space-y-2 md:space-y-3">
                                    <label htmlFor="whatsapp" className="block text-xs md:text-sm font-black text-white uppercase tracking-widest ml-1">WhatsApp Number</label>
                                    <div className="flex gap-2 md:gap-3">
                                        <div className="relative flex-shrink-0">
                                            <select 
                                                value={countryCode}
                                                onChange={(e) => setCountryCode(e.target.value)}
                                                className="appearance-none w-24 md:w-32 h-full pl-4 md:pl-6 pr-8 md:pr-10 py-3.5 md:py-4 rounded-xl border-2 border-border/20 bg-black/20 text-white focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all font-black text-base md:text-lg cursor-pointer"
                                            >
                                                {countries.map((c) => (
                                                    <option key={`${c.name}-${c.code}`} value={c.code} className="bg-secondary text-white">
                                                        {c.flag} {c.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-primary rotate-90" />
                                            </div>
                                        </div>
                                        <input type="tel" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required className={inputClass} placeholder="WhatsApp Number" />
                                    </div>
                                </div>

                                <div className="space-y-2 md:space-y-3">
                                    <label htmlFor="inquiry" className="block text-xs md:text-sm font-black text-white uppercase tracking-widest ml-1">Inquiry Details</label>
                                    <textarea id="inquiry" name="inquiry" value={formData.inquiry} onChange={handleChange} required rows="4" className={`${inputClass} resize-none`} placeholder="Requirement details..." />
                                </div>

                                <button type="submit" disabled={status === 'submitting'} className="button-primary w-full !py-4 md:!py-6 !text-lg md:!text-xl !rounded-xl md:!rounded-2xl shadow-xl shadow-primary/20">
                                    {status === 'submitting' ? 'PROcessing...' : 'Submit Official Inquiry'}
                                </button>

                                {status === 'success' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 bg-emerald/10 text-emerald-400 rounded-xl md:rounded-2xl text-sm md:text-base font-black text-center border border-emerald/20 uppercase tracking-widest shadow-lg shadow-emerald/10">
                                        Intelligence Dispatched Successfully.
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 bg-red-500/10 text-red-400 rounded-xl md:rounded-2xl text-sm md:text-base font-black text-center border border-red-500/20 uppercase tracking-widest">
                                        Transmission Failed.
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
