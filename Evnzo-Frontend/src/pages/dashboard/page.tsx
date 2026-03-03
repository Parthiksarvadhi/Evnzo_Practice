import { useAppSelector } from '@/store/hooks';
import { useLogout } from '@/services/auth/auth.query';
import { LogOut, FileText, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const { mutate: logoutFn, isPending } = useLogout();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back, {user?.name ?? 'User'}
          </p>
        </div>
        <button
          onClick={() => logoutFn()}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-foreground hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Sign out
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/forms')}
          className="p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <FileText className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-gray-900">Forms</h3>
          </div>
          <p className="text-sm text-gray-600">Create and manage dynamic forms</p>
        </button>

        <button
          onClick={() => navigate('/dashboard/events')}
          className="p-6 bg-white border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
              <Calendar className="h-5 w-5 text-purple-600" strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-gray-900">Events</h3>
          </div>
          <p className="text-sm text-gray-600">Manage your events and schedules</p>
        </button>

        <button
          onClick={() => navigate('/dashboard/attendees')}
          className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
              <Users className="h-5 w-5 text-green-600" strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-gray-900">Attendees</h3>
          </div>
          <p className="text-sm text-gray-600">View and manage attendees</p>
        </button>
      </div>

      {/* Add your dashboard content here */}
      <div className="rounded-xl border border-border bg-white p-8 text-center">
        <p className="text-muted-foreground">
          Start building your application. Add pages in <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">src/pages/</code>
        </p>
      </div>
    </div>
  );
}
