import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';

const MarketDashboard = () => {
    const [prices, setPrices] = useState([]);
    const [lastFetchTime, setLastFetchTime] = useState(null);

    const fetchPrices = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/products`);
            if (response.ok) {
                const data = await response.json();
                setPrices(data);
                setLastFetchTime(new Date());
            }
        } catch (error) {
            console.error('Failed to fetch prices', error);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchPrices();

        // Polling every 60 seconds
        const interval = setInterval(fetchPrices, 60000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-background pt-10 pb-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight mb-4">Export Commodity Rates</h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="max-w-2xl mx-auto text-xl text-text-muted">
                        Live indicative wholesale estimates for Miryalaguda. Prices updated daily.
                    </p>
                    {lastFetchTime && (
                        <p className="text-sm text-gray-500 mt-4 flex justify-center items-center gap-1 font-medium bg-white inline-flex px-4 py-2 rounded-full shadow-sm border border-gray-100">
                            <Clock className="w-4 h-4 text-primary" />
                            Last Updated: {lastFetchTime.toLocaleTimeString()}
                        </p>
                    )}
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-secondary text-white text-sm uppercase tracking-wider">
                                    <th className="py-4 px-6 font-bold">Rice Variety</th>
                                    <th className="py-4 px-6 font-bold">Current Price (MT)</th>
                                    <th className="py-4 px-6 font-bold">Previous (MT)</th>
                                    <th className="py-4 px-6 font-bold text-center">Trend / % Chg</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {prices.map((item, index) => (
                                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-50'}>
                                        <td className="py-4 px-6 font-semibold text-gray-900">{item.variety_name}</td>
                                        <td className="py-4 px-6 font-bold text-lg text-secondary">₹{item.current_price_mt.toFixed(2)}</td>
                                        <td className="py-4 px-6 text-gray-500">₹{item.previous_price_mt.toFixed(2)}</td>

                                        <td className="py-4 px-6">
                                            <div className={`flex items-center justify-center gap-1 font-bold rounded-full py-1.5 px-3 w-fit mx-auto ${item.trend === 'up' ? 'bg-green-50 text-green-600 border border-green-200' :
                                                item.trend === 'down' ? 'bg-red-50 text-red-600 border border-red-200' :
                                                    'bg-gray-100 text-gray-500 border border-gray-200'
                                                }`}>
                                                {item.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                                                {item.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                                                {item.trend === 'neutral' && <Minus className="h-4 w-4" />}

                                                <span>{item.trend === 'up' ? '+' : ''}{item.percentage_change}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {prices.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-12 text-center text-gray-400">Loading market data...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-xs text-gray-500 text-center uppercase tracking-wider font-semibold">
                        All prices are FOB (Free On Board) estimates in INR.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MarketDashboard;
