import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/products`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const defaultImages = [
        "https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1613589973273-fae710ae1ee7?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1568051243851-f9b18bc86134?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1569470984168-3069c9b5fdef?auto=format&fit=crop&q=80"
    ];

    return (
        <div className="bg-background pt-10 pb-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight mb-4">Our Premium Catalog</h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="max-w-2xl mx-auto text-xl text-text-muted">
                        Sourced directly from certified millers in Miryalaguda. Available in bulk quantities for immediate export.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading live catalog...</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {products.map((product, index) => (
                            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                                    <img
                                        src={product.image_url ? `${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/${product.image_url}` : defaultImages[index % defaultImages.length]}
                                        alt={product.variety_name}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-bold text-secondary">{product.variety_name}</h3>
                                        </div>
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                            Premium quality {product.variety_name} rice ready for global export. Contact us for detailed COA and exact specifications.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Estimate</h4>
                                            <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">₹{product.current_price_mt.toFixed(2)} / MT</span>
                                        </div>
                                    </div>

                                    <Link
                                        to="/contact"
                                        className="mt-auto block text-center w-full bg-secondary hover:bg-secondary-dark text-white font-semibold py-2.5 rounded transition-colors text-sm"
                                    >
                                        Request Specs & Final Quote
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
