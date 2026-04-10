import { Outlet } from 'react-router-dom';
import { MarketingNavbar } from '@/components/marketing/MarketingNavbar';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';

export function MarketingLayout() {
  return (
    <div className="min-h-screen bg-background grid-bg scanlines">
      <MarketingNavbar />
      <main>
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
}
