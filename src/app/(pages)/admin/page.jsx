'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PeopleIcon from '@mui/icons-material/People';
import Players from '@/components/Players';
import Image from 'next/image';

// Dummy Components (replace with real ones)
const Users = () => <Typography variant="h6">Users Component</Typography>;
const Dashboard = () => <Typography variant="h6">Dashboard Component</Typography>;

const NAVIGATION = [
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    { segment: 'players', title: 'Players', icon: <PeopleIcon /> },
    { segment: 'users', title: 'Users', icon: <BarChartIcon /> },
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

function renderContent(pathname) {
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

function DemoPageContent({ pathname }) {
    return (
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
            {renderContent(pathname)}
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutSidebarCollapsed(props) {
    const { window } = props;
    const [pathname, setPathname] = React.useState('/dashboard');

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
                <DemoPageContent pathname={pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}

DashboardLayoutSidebarCollapsed.propTypes = {
    window: PropTypes.func,
};

export default DashboardLayoutSidebarCollapsed;
3