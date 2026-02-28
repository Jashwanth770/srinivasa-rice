import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut, Trash2, Plus, Edit2, Check, X, ImagePlus } from 'lucide-react';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newVariety, setNewVariety] = useState({ name: '', initial_price: '' });
    const [newImage, setNewImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editPrice, setEditPrice] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/products`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            toast.error('Failed to load products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!newVariety.name || !newVariety.initial_price) return;

        const formData = new FormData();
        formData.append('name', newVariety.name);
        formData.append('initial_price', parseFloat(newVariety.initial_price));
        if (newImage) {
            formData.append('image', newImage);
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/products/add`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                toast.success(`${newVariety.name} added successfully`);
                setNewVariety({ name: '', initial_price: '' });
                setNewImage(null);
                // clear file input
                const fileInput = document.getElementById('new-image-input');
                if (fileInput) fileInput.value = '';
                fetchProducts(); // Auto refresh
            } else {
                const error = await response.json();
                toast.error(error.detail || 'Failed to add product');
            }
        } catch (error) {
            toast.error('Network error');
        }
    };

    const handleSaveUpdate = async (id, varietyName) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/products/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: varietyName,
                    new_price_mt: parseFloat(editPrice)
                })
            });

            if (response.ok) {
                toast.success(`Price updated successfully`);
                setEditingId(null);
                fetchProducts(); // Auto refresh
            } else {
                toast.error('Failed to update price');
            }
        } catch (error) {
            toast.error('Network error');
        }
    };

    const handleDelete = async (id, name) => {
        const isConfirmed = window.confirm(`Are you sure you want to remove ${name}? This will remove it from the live website immediately.`);
        if (!isConfirmed) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/products/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success(`${name} deleted!`);
                fetchProducts(); // Auto refresh
            } else {
                toast.error('Failed to delete product');
            }
        } catch (error) {
            toast.error('Network error');
        }
    };

    const handleImageUpload = async (id, file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/products/${id}/image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                toast.success('Image updated successfully');
                fetchProducts();
            } else {
                const error = await response.json();
                toast.error(error.detail || 'Failed to update image');
            }
        } catch (error) {
            toast.error('Network error while uploading image');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage live market rates and rice varieties.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>

                {/* Add Product Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-primary" /> Add New Variety
                    </h2>
                    <form onSubmit={handleAddProduct} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Variety Name</label>
                            <input
                                type="text"
                                required
                                value={newVariety.name}
                                onChange={(e) => setNewVariety({ ...newVariety, name: e.target.value })}
                                placeholder="e.g. Broken Rice 100%"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            />
                        </div>
                        <div className="flex-1 w-full md:max-w-xs">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Price (₹/MT)</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={newVariety.initial_price}
                                onChange={(e) => setNewVariety({ ...newVariety, initial_price: e.target.value })}
                                placeholder="0.00"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            />
                        </div>
                        <div className="flex-1 w-full md:max-w-xs">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                            <input
                                id="new-image-input"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewImage(e.target.files[0])}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm transition-colors text-sm h-[42px]"
                        >
                            Add Product
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="py-3 px-6">Image</th>
                                    <th className="py-3 px-6">ID</th>
                                    <th className="py-3 px-6">Variety Name</th>
                                    <th className="py-3 px-6">Current Price (₹/MT)</th>
                                    <th className="py-3 px-6">Last Updated</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50">
                                        <td className="py-4 px-6 text-sm text-center w-24">
                                            <div className="relative group w-16 h-16 bg-gray-100 rounded overflow-hidden shadow-inner flex items-center justify-center border border-gray-200 mx-auto">
                                                {item.image_url ? (
                                                    <img src={`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/${item.image_url}`} alt={item.variety_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-gray-400 text-xs">No img</span>
                                                )}

                                                {/* Upload Overlay */}
                                                <label className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity">
                                                    <ImagePlus className="w-5 h-5 mb-1" />
                                                    <span className="text-[10px] font-medium leading-tight">Upload</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handleImageUpload(item.id, e.target.files[0])}
                                                    />
                                                </label>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500">#{item.id}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.variety_name}</td>

                                        {/* Editable Price Column */}
                                        <td className="py-4 px-6 text-sm">
                                            {editingId === item.id ? (
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={editPrice}
                                                    onChange={(e) => setEditPrice(e.target.value)}
                                                    className="w-32 px-2 py-1 border border-primary rounded focus:outline-none focus:ring-1 focus:ring-primary"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="font-semibold text-gray-700">₹{item.current_price_mt.toFixed(2)}</span>
                                            )}
                                        </td>

                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            {new Date(item.last_updated).toLocaleString()}
                                        </td>

                                        {/* Actions Column */}
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex justify-center items-center gap-3">
                                                {editingId === item.id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleSaveUpdate(item.id, item.variety_name)}
                                                            className="text-green-600 hover:text-green-800 bg-green-50 p-1.5 rounded"
                                                            title="Save"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingId(null)}
                                                            className="text-gray-500 hover:text-gray-700 bg-gray-100 p-1.5 rounded"
                                                            title="Cancel"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => { setEditingId(item.id); setEditPrice(item.current_price_mt.toString()); }}
                                                        className="text-blue-600 hover:text-blue-800 bg-blue-50 p-1.5 rounded"
                                                        title="Edit Price"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleDelete(item.id, item.variety_name)}
                                                    className="text-red-600 hover:text-red-800 bg-red-50 p-1.5 rounded transition-colors"
                                                    title="Delete Variety"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-500">
                                            No products found. Add a variety above.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
