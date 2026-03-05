import { Outlet, NavLink } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import { Menu, Home, PlusSquare, Calendar } from 'lucide-react';

function AppShellContent() {
  const { isCollapsed, toggle } = useSidebar();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home, end: true },
    { path: '/dashboard/events', label: 'Events', icon: Calendar },
    { path: '/dashboard/forms/create', label: 'Create Form', icon: PlusSquare },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'h-full bg-white border-r border-border transition-all duration-200 flex flex-col',
          isCollapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-width)]',
        )}
      >
        <div className="flex items-center h-[var(--topbar-height)] px-4 border-b border-border">
          {!isCollapsed && (
            <span className="text-lg font-semibold text-foreground">My App</span>
          )}
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-[var(--topbar-height)] border-b border-border bg-white flex items-center px-4 gap-3">
          <button
            onClick={toggle}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
          >
            <Menu className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
          </button>
          <div className="flex-1" />
          {/* Add your top bar content here */}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AppShell() {
  return (
    <SidebarProvider>
      <AppShellContent />
    </SidebarProvider>
  );
}
