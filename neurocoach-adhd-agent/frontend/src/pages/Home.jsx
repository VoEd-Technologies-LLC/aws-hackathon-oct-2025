import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBrain, FaChartLine, FaComments, FaBookOpen } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Hero = styled.section`
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    padding: 4rem 0;
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: #ff6b6b;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: #ff5252;
  }

  @media (min-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
`;

const Features = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin: 2rem 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Disclaimer = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem 0;
  color: #856404;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    margin: 2rem 0;
    font-size: 1rem;
  }
`;

const Home = () => {
  return (
    <Container>
      <Hero>
        <Title>🧠 NeuroCoach</Title>
        <Subtitle>
          Your AI-Powered ADHD Self-Coaching Companion
        </Subtitle>
        <CTAButton to="/screening">
          Start Your Journey
        </CTAButton>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>
            <FaChartLine />
          </FeatureIcon>
          <FeatureTitle>ADHD Screening</FeatureTitle>
          <FeatureDescription>
            Complete the WHO-validated ASRS v1.1 questionnaire to understand
            your ADHD characteristics and tendencies.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <FaComments />
          </FeatureIcon>
          <FeatureTitle>Personalized Coaching</FeatureTitle>
          <FeatureDescription>
            Get tailored strategies and coping techniques based on your
            unique challenges and ADHD presentation.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <FaBrain />
          </FeatureIcon>
          <FeatureTitle>Therapy Preparation</FeatureTitle>
          <FeatureDescription>
            Receive specific talking points and questions to make your
            therapy sessions more productive and focused.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <FaBookOpen />
          </FeatureIcon>
          <FeatureTitle>Resource Library</FeatureTitle>
          <FeatureDescription>
            Access curated resources, tools, and guides from reputable
            ADHD organizations like CHADD and NIMH.
          </FeatureDescription>
        </FeatureCard>
      </Features>

      <Disclaimer>
        <strong>Important:</strong> NeuroCoach is an educational and self-coaching tool,
        not a diagnostic or medical service. Always consult with qualified healthcare
        professionals for ADHD evaluation and treatment.
      </Disclaimer>
    </Container>
  );
};

export default Home;
