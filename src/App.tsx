import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RouteGuard } from "@/components/app/RouteGuard";
import { ErrorBoundary } from "@/components/app/ErrorBoundary";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const WorkspacesPage = lazy(() => import("@/pages/WorkspacesPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ContractsPage = lazy(() => import("@/pages/ContractsPage"));
const ContractDetailPage = lazy(() => import("@/pages/ContractDetailPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <TooltipProvider>
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Auth routes */}
                  <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                  </Route>

                  {/* Protected routes */}
                  <Route path="/workspaces" element={
                    <RouteGuard>
                      <ErrorBoundary><WorkspacesPage /></ErrorBoundary>
                    </RouteGuard>
                  } />

                  <Route path="/w/:workspaceId" element={
                    <RouteGuard>
                      <ErrorBoundary><AppLayout /></ErrorBoundary>
                    </RouteGuard>
                  }>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<ErrorBoundary><DashboardPage /></ErrorBoundary>} />
                    <Route path="contracts" element={<ErrorBoundary><ContractsPage /></ErrorBoundary>} />
                    <Route path="contracts/:contractId" element={<ErrorBoundary><ContractDetailPage /></ErrorBoundary>} />
                    <Route path="settings" element={<ErrorBoundary><SettingsPage /></ErrorBoundary>} />
                  </Route>

                  {/* Catch-all */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
