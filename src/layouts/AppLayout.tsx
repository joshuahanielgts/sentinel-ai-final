import { Outlet, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, FileText, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import { useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CommandPalette } from '@/components/app/CommandPalette';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', path: 'dashboard', icon: LayoutDashboard },
  { label: 'Contracts', path: 'contracts', icon: FileText },
  { label: 'Settings', path: 'settings', icon: Settings },
];

export function AppLayout() {
  const { user, signOut } = useAuth();
  const { workspace, setWorkspace } = useWorkspaceContext();
  const { workspaceId } = useParams();
  const { data: workspaces } = useWorkspaces();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (workspaceId && workspaces) {
      const ws = workspaces.find((w) => w.id === workspaceId);
      if (ws && ws.id !== workspace?.id) setWorkspace(ws);
    }
  }, [workspaceId, workspaces]);

  const handleWorkspaceSwitch = (wsId: string) => {
    const current = location.pathname.split('/').slice(3).join('/');
    navigate(`/w/${wsId}/${current || 'dashboard'}`);
  };

  return (
    <div className="flex min-h-screen bg-background scanlines">
      <CommandPalette />
      {/* Sidebar */}
      <aside className="w-64 bg-card/95 backdrop-blur border-r border-border flex flex-col shrink-0 fixed top-0 left-0 bottom-0 z-40">
        {/* Branding */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-mono text-sm font-bold text-foreground tracking-wider">SENTINEL AI</span>
            <span className="text-xs font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">v1.0</span>
          </div>
        </div>

        {/* Workspace switcher */}
        <div className="p-3 border-b border-border">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-secondary/50 hover:bg-secondary text-sm font-mono text-foreground transition-colors">
              <span className="truncate">{workspace?.name || 'Select Workspace'}</span>
              <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {workspaces?.map((ws) => (
                <DropdownMenuItem key={ws.id} onClick={() => handleWorkspaceSwitch(ws.id)} className="font-mono text-sm">
                  {ws.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => navigate('/workspaces')} className="font-mono text-sm text-muted-foreground">
                Manage Workspaces...
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname.includes(`/${path}`);
            return (
              <Link
                key={path}
                to={`/w/${workspaceId}/${path}`}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-mono transition-all',
                  isActive
                    ? 'nav-active text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground truncate flex-1">
              {user?.email}
            </span>
            <button onClick={() => signOut()} className="text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen bg-background grid-bg overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
