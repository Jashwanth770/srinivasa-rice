import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Legal = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return (
        <div className="bg-background pt-10 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight mb-4">Legal & Policies</h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-10"></div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-16">

                    <section id="privacy-policy" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
                        <div className="prose text-gray-600 max-w-none space-y-4">
                            <p>
                                This Privacy Policy describes how Sri Srinivasa Canvassing collects, uses, and safeguards your business data in accordance with B2B GDPR guidelines.
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Data Collection</h3>
                            <p>
                                We collect personal and professional information such as Name, Company Name, Email Address, Phone Number, and Inquiry Details when you voluntarily submit a request via our contact form. This website is purely for informational B2B inquiries.
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Data Usage</h3>
                            <p>
                                Your data is strictly used to communicate with you regarding your wholesale and export inquiries. We do not sell, distribute, or lease your business data to third parties.
                            </p>
                        </div>
                    </section>

                    <hr className="border-gray-100" />

                    <section id="terms" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
                        <div className="prose text-gray-600 max-w-none space-y-4">
                            <p>
                                By accessing this website, you agree to be bound by these website Terms and Conditions of Use.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>This website and its content are for informational purposes designed specifically for B2B procurement.</li>
                                <li>No direct sales or financial transactions occur through this platform.</li>
                                <li>We reserve the right to review, update, or decline inquiry requests based on stock availability and export regulations.</li>
                                <li>All intellectual property, logos, and written content belong to Sri Srinivasa Canvassing.</li>
                            </ul>
                        </div>
                    </section>

                    <hr className="border-gray-100" />

                    <section id="disclaimer" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Commodity Disclaimer</h2>
                        <div className="prose text-gray-600 max-w-none space-y-4">
                            <div className="bg-yellow-50 border-l-4 border-primary p-4 rounded-r text-gray-800 italic">
                                "All pricing discussed following an inquiry is strictly indicative and subject to daily market fluctuations. Final supply quality and documentation are verified by independent third-party inspection (SGS/Bureau Veritas) at the port of loading."
                            </div>
                            <p className="mt-4">
                                Rice is an agricultural commodity prone to weather constraints, transit delays, and policy framework changes by the Government of India. As canvassers, we ensure exact mapping to specifications, but total supply timelines are subject to port congestion and shipping line availability.
                            </p>
                        </div>
                    </section>

                </div>

            </div>
        </div>
    );
};

export default Legal;
