import React from 'react';
import styled from 'styled-components';
import { FaHeart, FaBrain, FaExternalLinkAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h4 {
    color: #ecf0f1;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        color: #bdc3c7;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: #3498db;
        }
      }
    }
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bold;

  svg {
    color: #3498db;
  }
`;

const Description = styled.p`
  color: #bdc3c7;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #bdc3c7;
  font-size: 1.2rem;
  transition: color 0.2s;

  &:hover {
    color: #3498db;
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid #34495e;
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  color: #95a5a6;
  font-size: 0.9rem;
  padding-bottom: 3rem; /* Space for fixed disclaimer */
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <LogoSection>
            <FaBrain />
            NeuroCoach
          </LogoSection>
          <Description>
            An AI-powered ADHD self-coaching assistant providing personalized
            screening, strategies, and therapy preparation support.
          </Description>
          <SocialLinks>
            <SocialLink href="https://github.com" target="_blank" title="GitHub">
              <FaExternalLinkAlt />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="https://chadd.org/" target="_blank">
                CHADD - ADHD Resources <FaExternalLinkAlt />
              </a>
            </li>
            <li>
              <a href="https://www.additudemag.com/" target="_blank">
                ADDitude Magazine <FaExternalLinkAlt />
              </a>
            </li>
            <li>
              <a href="https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd" target="_blank">
                NIMH ADHD Information <FaExternalLinkAlt />
              </a>
            </li>
            <li>
              <a href="https://www.hcp.med.harvard.edu/ncs/asrs.php" target="_blank">
                ASRS Screening Tool <FaExternalLinkAlt />
              </a>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h4>Support</h4>
          <ul>
            <li>
              <a href="https://github.com/your-username/neurocoach-adhd-agent/issues" target="_blank">
                Report Issues <FaExternalLinkAlt />
              </a>
            </li>
            <li>
              <a href="https://github.com/your-username/neurocoach-adhd-agent/discussions" target="_blank">
                Discussions <FaExternalLinkAlt />
              </a>
            </li>
            <li>
              <a href="mailto:support@neurocoach.dev">
                Contact Support
              </a>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="/privacy">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="/ethics">
                Ethics & Safety
              </a>
            </li>
            <li>
              <a href="https://aws.amazon.com/privacy/" target="_blank">
                AWS Privacy <FaExternalLinkAlt />
              </a>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h4>Company Information</h4>
          <ul>
            <li>
              <strong>WorkingEdge, Inc.</strong>
            </li>
            <li>
              <a href="https://www.workingedgeinc.com" target="_blank">
                www.workingedgeinc.com <FaExternalLinkAlt />
              </a>
            </li>
            <li>
              <a href="https://www.alicevoedwards.com" target="_blank">
                www.alicevoedwards.com <FaExternalLinkAlt />
              </a>
            </li>
            <li>
              <a href="mailto:hello@workingedgeinc.com">
                hello@workingedgeinc.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong> (555) 123-4567
            </li>
          </ul>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <Copyright>
          <span>© {currentYear} NeuroCoach. Built with</span>
          <FaHeart style={{ color: '#e74c3c' }} />
          <span>for the AWS AI Agent Hackathon</span>
        </Copyright>
        <div>
          <strong>Disclaimer:</strong> This is an educational tool and not a substitute for professional medical advice.
        </div>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
