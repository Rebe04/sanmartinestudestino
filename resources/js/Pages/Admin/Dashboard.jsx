import AdminLayout from '@/Layouts/Admin/AdminLayout';

export default function Dashboard() {
    return (
            <div>
                <h1 className="text-3xl font-bold text-smd-dark">Dashboard</h1>
                <p className="mt-4 text-gray-600">
                    Aquí irán tus métricas y estadísticas principales.
                </p>
            </div>
    );
};

Dashboard.layout = page => <AdminLayout children={page} title="Dashboard" />;
