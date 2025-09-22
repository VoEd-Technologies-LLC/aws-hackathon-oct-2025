import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBrain, FaBars, FaTimes } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;

  &:hover {
    color: #667eea;
  }
`;

const LogoIcon = styled(FaBrain)`
  color: #667eea;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    color: #667eea;
    background: #f8f9ff;
  }

  &.active {
    color: #667eea;
    background: #f8f9ff;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #667eea;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Disclaimer = styled.div`
  background: #fff3cd;
  border-bottom: 1px solid #ffeaa7;
  padding: 0.5rem 0;
  text-align: center;
  font-size: 0.85rem;
  color: #856404;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Disclaimer>
        <strong>Important:</strong> NeuroCoach is an educational tool, not a diagnostic service. Consult healthcare professionals for ADHD evaluation.
      </Disclaimer>

      <HeaderContainer>
        <HeaderContent>
          <Logo to="/">
            <LogoIcon />
            NeuroCoach
          </Logo>

          <Nav isOpen={isMobileMenuOpen}>
            <NavLink
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/screening"
              className={location.pathname === '/screening' ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Screening
            </NavLink>
            <NavLink
              to="/coaching"
              className={location.pathname === '/coaching' ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Coaching
            </NavLink>
            <NavLink
              to="/resources"
              className={location.pathname === '/resources' ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Resources
            </NavLink>
            <NavLink
              to="/terms"
              className={location.pathname === '/terms' ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Terms
            </NavLink>
            <NavLink
              to="/privacy"
              className={location.pathname === '/privacy' ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Privacy
            </NavLink>
          </Nav>

          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Header;
