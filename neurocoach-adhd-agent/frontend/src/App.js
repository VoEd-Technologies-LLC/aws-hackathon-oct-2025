import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import styled from 'styled-components';
import awsconfig from './aws-exports';

// Components
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';

// Pages
import Home from './pages/Home';
import Screening from './pages/Screening';
import Results from './pages/Results';
import Coaching from './pages/Coaching';
import Resources from './pages/Resources';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// Configure Amplify
Amplify.configure(awsconfig);

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-bottom: 60px; /* Space for fixed disclaimer */
`;

function App() {
  return (
    <Router>
      <AppContainer className="App">
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/screening" element={<Screening />} />
            <Route path="/results" element={<Results />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
