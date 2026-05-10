import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const LiveTicker = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/products`);
                if (response.ok) {
                    const data = await response.json();
                    // Get all for the ticker
                    setPrices(data);
                }
            } catch (error) {
                console.error('Failed to fetch prices', error);
            }
        };

        fetchPrices();
    }, []);

    if (prices.length === 0) return null;

    return (
        <div className="bg-[#111827] text-white overflow-hidden py-2 border-b border-gray-800 flex relative z-50">
            <div className="absolute left-0 bg-[#111827] z-10 px-4 h-full flex items-center font-bold text-sm text-primary uppercase tracking-widest pointer-events-none">
                Market Rates
            </div>

            {/* Spacer so the marquee doesn't overlap the label */}
            <div className="w-32 shrink-0"></div>

            <div className="flex animate-marquee whitespace-nowrap">
                {prices.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 mx-8 text-sm font-medium">
                        <span className="text-gray-300">{item.variety_name}:</span>
                        <span className="font-bold">₹{item.current_price_mt}/MT</span>

                        <span className={`flex items-center text-xs font-bold ${item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                            }`}>
                            {item.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                            {item.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                            {item.trend === 'neutral' && <Minus className="h-3 w-3 mr-1" />}

                            {item.trend === 'up' ? '+' : ''}{item.percentage_change}%
                        </span>
                    </div>
                ))}

                {/* Duplicate list for infinite scroll loop without jumping */}
                {prices.map((item) => (
                    <div key={`clone-${item.id}`} className="flex items-center gap-2 mx-8 text-sm font-medium">
                        <span className="text-gray-300">{item.variety_name}:</span>
                        <span className="font-bold">₹{item.current_price_mt}/MT</span>

                        <span className={`flex items-center text-xs font-bold ${item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                            }`}>
                            {item.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                            {item.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                            {item.trend === 'neutral' && <Minus className="h-3 w-3 mr-1" />}

                            {item.trend === 'up' ? '+' : ''}{item.percentage_change}%
                        </span>
                    </div>
                ))}
                {/* Third duplicate to ensure it is continuous */}
                {prices.map((item) => (
                    <div key={`clone-2-${item.id}`} className="flex items-center gap-2 mx-8 text-sm font-medium">
                        <span className="text-gray-300">{item.variety_name}:</span>
                        <span className="font-bold">₹{item.current_price_mt}/MT</span>

                        <span className={`flex items-center text-xs font-bold ${item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                            }`}>
                            {item.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                            {item.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                            {item.trend === 'neutral' && <Minus className="h-3 w-3 mr-1" />}

                            {item.trend === 'up' ? '+' : ''}{item.percentage_change}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveTicker;
