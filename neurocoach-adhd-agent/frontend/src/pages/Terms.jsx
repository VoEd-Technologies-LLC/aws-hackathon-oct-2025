import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaFileContract } from 'react-icons/fa';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.8;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
`;

const BackButton = styled(Link)`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    background: #5a6268;
  }
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const SectionSubTitle = styled.h3`
  color: #495057;
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1.1rem;
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const ContactInfo = styled.div`
  background: #e7f3ff;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
`;

const ContactTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Terms = () => {
  return (
    <Container>
      <Header>
        <Title>
          <FaFileContract /> Terms and Conditions
        </Title>
        <BackButton to="/">
          <FaArrowLeft /> Back to Home
        </BackButton>
      </Header>

      <Section>
        <SectionTitle>1. Acceptance of Terms</SectionTitle>
        <p>
          By accessing and using NeuroCoach ("the Service"), you accept and agree to be bound by the terms
          and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>
      </Section>

      <Section>
        <SectionTitle>2. Description of Service</SectionTitle>
        <p>
          NeuroCoach is an AI-powered educational tool designed to provide information about ADHD characteristics
          and coping strategies. The Service includes:
        </p>
        <List>
          <ListItem>ADHD screening using the validated ASRS v1.1 questionnaire</ListItem>
          <ListItem>Personalized coaching conversations with AI assistants</ListItem>
          <ListItem>Educational resources and coping strategy recommendations</ListItem>
          <ListItem>Therapy preparation guidance and talking points</ListItem>
        </List>
        <p>
          <strong>Important:</strong> NeuroCoach is an educational tool and is not a substitute for professional
          medical advice, diagnosis, or treatment.
        </p>
      </Section>

      <Section>
        <SectionTitle>3. Medical Disclaimer</SectionTitle>
        <p>
          <strong>NEUROCOACH IS NOT A MEDICAL SERVICE.</strong> The Service provides educational information
          only and is not intended to diagnose, treat, cure, or prevent any medical condition, including ADHD.
        </p>
        <p>
          The ASRS v1.1 screening tool is for educational purposes only. A positive screening result does not
          confirm an ADHD diagnosis, and a negative result does not rule out ADHD. Only qualified healthcare
          professionals can provide medical diagnoses.
        </p>
        <p>
          Always consult with a qualified healthcare provider for proper evaluation and diagnosis of ADHD or
          any other medical condition.
        </p>
      </Section>

      <Section>
        <SectionTitle>4. User Responsibilities</SectionTitle>
        <p>By using the Service, you agree to:</p>
        <List>
          <ListItem>Provide accurate and truthful information</ListItem>
          <ListItem>Use the Service only for educational purposes</ListItem>
          <ListItem>Seek professional medical advice for health concerns</ListItem>
          <ListItem>Respect the intellectual property rights of WorkingEdge, Inc.</ListItem>
          <ListItem>Not misuse or attempt to reverse-engineer the Service</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>5. Privacy and Data Collection</SectionTitle>
        <p>
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect,
          use, and protect your information. By using the Service, you consent to the collection and use
          of information as outlined in our Privacy Policy.
        </p>
      </Section>

      <Section>
        <SectionTitle>6. Intellectual Property</SectionTitle>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive
          property of WorkingEdge, Inc. and its licensors. The Service is protected by copyright, trademark,
          and other laws.
        </p>
      </Section>

      <Section>
        <SectionTitle>7. Limitation of Liability</SectionTitle>
        <p>
          In no event shall WorkingEdge, Inc., nor its directors, employees, partners, agents, suppliers,
          or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
          resulting from your use of the Service.
        </p>
      </Section>

      <Section>
        <SectionTitle>8. Disclaimer of Warranties</SectionTitle>
        <p>
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. WorkingEdge, Inc. makes no
          representations or warranties of any kind, express or implied, as to the operation of the Service
          or the information, content, or materials included therein.
        </p>
      </Section>

      <ContactInfo>
        <ContactTitle>
          <FaFileContract /> Contact Information
        </ContactTitle>
        <p><strong>WorkingEdge, Inc.</strong></p>
        <p>
          <strong>Legal Address:</strong><br />
          123 Innovation Drive, Suite 456<br />
          Tech Valley, CA 94043<br />
          United States
        </p>
        <p>
          <strong>Mailing Address:</strong><br />
          PO Box 789<br />
          Silicon Valley, CA 94044<br />
          United States
        </p>
        <p>
          <strong>Phone:</strong> (555) 123-4567<br />
          <strong>Email:</strong> legal@workingedgeinc.com<br />
          <strong>Website:</strong> www.workingedgeinc.com
        </p>
        <p>
          For questions about these Terms and Conditions, please contact us at the email address above.
        </p>
      </ContactInfo>

      <Section>
        <SectionTitle>9. Governing Law</SectionTitle>
        <p>
          These Terms shall be interpreted and governed by the laws of the State of California, United States,
          without regard to conflict of law provisions.
        </p>
      </Section>

      <Section>
        <SectionTitle>10. Changes to Terms</SectionTitle>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
          revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
        </p>
      </Section>

      <Section>
        <SectionTitle>11. Contact Us</SectionTitle>
        <p>
          If you have any questions about these Terms and Conditions, please contact us:
        </p>
        <p>
          <strong>Email:</strong> legal@workingedgeinc.com<br />
          <strong>Phone:</strong> (555) 123-4567<br />
          <strong>Address:</strong> 123 Innovation Drive, Suite 456, Tech Valley, CA 94043
        </p>
      </Section>

      <Section style={{ textAlign: 'center', background: '#fff3cd', padding: '1rem', borderRadius: '8px' }}>
        <p>
          <strong>Last Updated:</strong> September 21, 2025
        </p>
        <p>
          These Terms and Conditions were last modified on September 21, 2025.
        </p>
      </Section>
    </Container>
  );
};

export default Terms;
