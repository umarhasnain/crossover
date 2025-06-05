'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import Players from '@/components/Players';

// Dummy Components (replace with real ones)
const Users = () => <Typography variant="h6">Users Component</Typography>;
const Dashboard = () => <Typography variant="h6">Dashboard Component</Typography>;

const NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'players', title: 'Players', icon: <PeopleIcon /> },
  { segment: 'users', title: 'Users', icon: <BarChartIcon /> },
  { segment: 'logout', title: 'LogOut', icon: <BarChartIcon /> },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
});

function DemoPageContent({ pathname, onLogout }) {
  React.useEffect(() => {
    if (pathname === '/logout') {
      onLogout();
    }
  }, [pathname, onLogout]);

  switch (pathname) {
    case '/players':
      return <Players />;
    case '/users':
      return <Users />;
    case '/dashboard':
      return <Dashboard />;
    default:
      return <Typography variant="h6">Page: {pathname}</Typography>;
  }
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

function DashboardLayoutSidebarCollapsed(props) {
  const { window } = props;
  const [pathname, setPathname] = React.useState('/dashboard');
  const routerNext = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      const data = await res.json();

      if (res.ok) {
        toast.success('Admin Logout successful!');
        routerNext.push('/sign-in');
      } else {
        toast.error(data.error || 'Logout failed');
      }
    } catch (error) {
      toast.error('Something went wrong during logout');
    }
  };

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        title: 'Crossover',
        logo: (
          <Image
            src="/assets/images/logo.png"
            alt="Crossover Logo"
            width={32}
            height={32}
          />
        ),
      }}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 4 },
            width: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <DemoPageContent pathname={pathname} onLogout={handleLogout} />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutSidebarCollapsed.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutSidebarCollapsed;
