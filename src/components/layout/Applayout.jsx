import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Header from './Header';


const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;