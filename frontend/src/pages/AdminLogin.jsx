import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://srinivasa-rice.onrender.com'}/api/admin/login`, {
                method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: formData.toString()
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('admin_token', data.access_token);
                toast.success('Login successful!');
                navigate('/admin');
            } else toast.error('Invalid credentials');
        } catch { toast.error('Error connecting to server'); }
        finally { setLoading(false); }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl border border-border dark:border-white/10 bg-surface dark:bg-secondary-light/30 text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm";

    return (
        <div className="min-h-screen bg-background dark:bg-secondary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-display font-extrabold text-text-main dark:text-white">Admin Dashboard</h2>
                <p className="mt-2 text-sm text-text-muted dark:text-gray-400">Secure inventory management</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="premium-card rounded-2xl py-8 px-6 sm:px-10">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-text-muted dark:text-gray-400 mb-2">Username</label>
                            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} placeholder="admin@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted dark:text-gray-400 mb-2">Password</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                        </div>
                        <button type="submit" disabled={loading} className={`w-full flex justify-center py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
