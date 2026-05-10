import { Award, ShieldCheck, CheckCircle } from 'lucide-react';

const Certifications = () => {
    return (
        <div className="bg-background pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight mb-4">Our Credentials</h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="max-w-2xl mx-auto text-xl text-text-muted">
                        Certified quality trusted by global importers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Award className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">APEDA</h3>
                        <p className="text-text-muted">
                            Registered with the Agricultural and Processed Food Products Export Development Authority (APEDA), ensuring adherence to the highest Indian export standards.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <ShieldCheck className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">FSSAI</h3>
                        <p className="text-text-muted">
                            Compliant with the Food Safety and Standards Authority of India, verifying that our products meet stringent safety and hygiene criteria before export.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">ISO 9001:2015</h3>
                        <p className="text-text-muted">
                            Our partner mills hold ISO certifications for quality management systems to guarantee continuous improvement and structural integrity in crop handling.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Certifications;
