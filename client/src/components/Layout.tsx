import { Container } from '@mui/material'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useUser } from '../contexts/UserContext';
import Footer from './Footer/Footer'
import Header from './Header/Header'


function Layout() {
  const { getCurrentUser } = useUser();
  
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <Container maxWidth={false} disableGutters={true} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header />
      <Container component="main" disableGutters={true} sx={{ flexGrow: "1" }}>
        <Outlet />
      </Container>
      <Footer />
    </Container>
  )
}

export default Layout
