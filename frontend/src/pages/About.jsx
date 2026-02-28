import { Wheat, CheckCircle2, TrendingUp } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-background pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight mb-4 animate-fade-in-up">
                        Deep Roots in the Miryalaguda Ecosystem
                    </h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="max-w-3xl mx-auto text-xl text-text-muted leading-relaxed">
                        Decades of canvassing expertise, connecting the finest local millers with global merchants.
                    </p>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="flex flex-col gap-6 w-full">
                        <img
                            src="/about-mill.png"
                            alt="Advanced Rice Milling Facility"
                            className="rounded-lg shadow-xl object-cover h-[250px] w-full"
                        />
                        <img
                            src="/about-canvassing.png"
                            alt="Rice Canvassing and Quality Inspection"
                            className="rounded-lg shadow-xl object-cover h-[250px] w-full"
                        />
                    </div>
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                            Located in Miryalaguda, Telangana—the renowned hub of paddy cultivation and milling in India—<span className="font-bold text-secondary">Srinivasa Rice Canvassing</span> operates at the very center of the rice trade ecosystem.
                        </p>
                        <p>
                            As experienced canvassers, we possess deep-rooted relationships with over 100+ state-of-the-art rice mills. We act as a trusted bridge, ensuring that international merchants receive exactly what they specify, from premium Sona Masuri to aromatic Basmati.
                        </p>
                        <p>
                            Our localized presence allows us to closely monitor paddy procurement, milling standards, and pre-shipment quality checks, offering our global clients unmatched transparency and reliability.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Wheat className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold text-secondary mb-3">Unmatched Quality</h3>
                        <p className="text-text-muted">Direct oversight during the milling and sortex processes ensures consistent grain length, color, and minimal broken percentage.</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold text-secondary mb-3">Quality Assurance</h3>
                        <p className="text-text-muted">Rigorous testing at independent labs for moisture, admixture, and pesticide residue before any consignment leaves the warehouse.</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <TrendingUp className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold text-secondary mb-3">Market Expertise</h3>
                        <p className="text-text-muted">We provide our buyers with real-time market intelligence, helping them time their bulk purchases against daily market fluctuations.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
