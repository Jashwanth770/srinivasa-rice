import { Box, Ship, Truck } from 'lucide-react';

const Packaging = () => {
    return (
        <div className="bg-background pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight mb-4">Packaging & Logistics</h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="max-w-2xl mx-auto text-xl text-text-muted">
                        End-to-end export solutions from mill floor to seaports.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">

                    {/* Packaging Options */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-secondary flex items-center gap-3">
                            <Box className="h-8 w-8 text-primary" /> Standard Packaging
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 text-gray-700">
                            <p className="leading-relaxed">
                                We understand that proper packaging is crucial for preserving the aroma, texture, and quality of rice during long-haul transit. We offer standardized export-grade packaging as well as custom buyer-branded bags.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                                    <div>
                                        <strong className="block text-gray-900">PP Bags (Polypropylene)</strong>
                                        <span>26kg and 50kg standard bulk bags. Highly durable and moisture resistant.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                                    <div>
                                        <strong className="block text-gray-900">Non-Woven Bags</strong>
                                        <span>5kg, 10kg, 20kg premium bags suitable for direct retail distribution.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                                    <div>
                                        <strong className="block text-gray-900">Jute Bags</strong>
                                        <span>Eco-friendly traditional packaging available upon special request.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Logistics */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-secondary flex items-center gap-3">
                            <Ship className="h-8 w-8 text-primary" /> Port Connectivity
                        </h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 text-gray-700">
                            <img
                                src="https://images.unsplash.com/photo-1586528116311-ad8ed7c1590a?auto=format&fit=crop&q=80"
                                alt="Container Shipping"
                                className="w-full h-48 object-cover rounded-lg mb-6"
                            />
                            <p className="leading-relaxed">
                                Miryalaguda's strategic location in Telangana provides excellent rail and road connectivity to major eastern coastal ports.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <Truck className="h-6 w-6 text-secondary" />
                                    <div>
                                        <strong className="block text-gray-900">Krishnapatnam Port</strong>
                                        <span className="text-sm text-gray-500">Primary export hub for bulk break and containerized cargo.</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <Truck className="h-6 w-6 text-secondary" />
                                    <div>
                                        <strong className="block text-gray-900">Chennai Port</strong>
                                        <span className="text-sm text-gray-500">Alternative hub ensuring flexible and guaranteed shipping schedules.</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Packaging;
