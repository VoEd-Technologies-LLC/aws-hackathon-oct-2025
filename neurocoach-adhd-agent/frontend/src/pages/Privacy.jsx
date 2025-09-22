import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

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
  border-left: 4px solid #28a745;
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

const Privacy = () => {
  return (
    <Container>
      <Header>
        <Title>
          <FaShieldAlt /> Privacy Policy
        </Title>
        <BackButton to="/">
          <FaArrowLeft /> Back to Home
        </BackButton>
      </Header>

      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <p>
          WorkingEdge, Inc. ("we," "our," or "us") respects your privacy and is committed to protecting
          your personal information. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use NeuroCoach ("the Service").
        </p>
        <p>
          Please read this Privacy Policy carefully. By using the Service, you agree to the collection
          and use of information in accordance with this policy.
        </p>
      </Section>

      <Section>
        <SectionTitle>2. Information We Collect</SectionTitle>

        <SectionSubTitle>2.1 Information You Provide</SectionSubTitle>
        <p>We may collect information you directly provide to us, including:</p>
        <List>
          <ListItem>Name and contact information (if you choose to provide it)</ListItem>
          <ListItem>Responses to the ASRS v1.1 questionnaire</ListItem>
          <ListItem>Chat conversations with our AI coaching assistants</ListItem>
          <ListItem>Account information (if you create an account)</ListItem>
          <ListItem>Feedback or communications you send to us</ListItem>
        </List>

        <SectionSubTitle>2.2 Automatically Collected Information</SectionSubTitle>
        <p>When you use the Service, we may automatically collect:</p>
        <List>
          <ListItem>Usage data and analytics</ListItem>
          <ListItem>Device information (type, operating system, browser)</ListItem>
          <ListItem>IP address and location information</ListItem>
          <ListItem>Session duration and interaction patterns</ListItem>
          <ListItem>Error logs and performance data</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. How We Use Your Information</SectionTitle>
        <p>We use the collected information for the following purposes:</p>
        <List>
          <ListItem>Provide and maintain the Service</ListItem>
          <ListItem>Process ASRS screening results and provide interpretations</ListItem>
          <ListItem>Deliver personalized coaching responses</ListItem>
          <ListItem>Improve our AI models and service quality</ListItem>
          <ListItem>Ensure security and prevent fraud</ListItem>
          <ListItem>Comply with legal obligations</ListItem>
          <ListItem>Communicate with you about the Service</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. Information Sharing and Disclosure</SectionTitle>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>

        <SectionSubTitle>4.1 Service Providers</SectionSubTitle>
        <p>We may share information with trusted third-party service providers who assist us in operating the Service, including:</p>
        <List>
          <ListItem>AWS (Amazon Web Services) for cloud hosting and AI services</ListItem>
          <ListItem>Analytics providers for service improvement</ListItem>
          <ListItem>Security and fraud prevention services</ListItem>
        </List>

        <SectionSubTitle>4.2 Legal Requirements</SectionSubTitle>
        <p>We may disclose your information if required by law or if we believe such action is necessary to:</p>
        <List>
          <ListItem>Comply with legal obligations</ListItem>
          <ListItem>Protect and defend our rights or property</ListItem>
          <ListItem>Prevent fraud or security issues</ListItem>
          <ListItem>Protect the personal safety of users or the public</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>5. Data Security</SectionTitle>
        <p>
          We implement appropriate technical and organizational security measures to protect your personal
          information against unauthorized access, alteration, disclosure, or destruction. These measures include:
        </p>
        <List>
          <ListItem>Encryption of data in transit and at rest</ListItem>
          <ListItem>Regular security assessments and updates</ListItem>
          <ListItem>Access controls and authentication procedures</ListItem>
          <ListItem>Secure AWS infrastructure with compliance certifications</ListItem>
        </List>
        <p>
          However, no method of transmission over the internet or electronic storage is 100% secure.
          While we strive to protect your information, we cannot guarantee absolute security.
        </p>
      </Section>

      <Section>
        <SectionTitle>6. Data Retention</SectionTitle>
        <p>
          We retain your information for as long as necessary to provide the Service and fulfill the
          purposes outlined in this Privacy Policy. Factors that influence retention periods include:
        </p>
        <List>
          <ListItem>Duration of your use of the Service</ListItem>
          <ListItem>Legal, regulatory, or contractual requirements</ListItem>
          <ListItem>Legitimate business needs</ListItem>
          <ListItem>Your requests for data deletion</ListItem>
        </List>
        <p>
          You may request deletion of your data at any time by contacting us using the information provided below.
        </p>
      </Section>

      <Section>
        <SectionTitle>7. Your Rights and Choices</SectionTitle>
        <p>Depending on your location, you may have the following rights regarding your personal information:</p>
        <List>
          <ListItem><strong>Access:</strong> Request information about the data we hold about you</ListItem>
          <ListItem><strong>Correction:</strong> Request correction of inaccurate or incomplete data</ListItem>
          <ListItem><strong>Deletion:</strong> Request deletion of your personal information</ListItem>
          <ListItem><strong>Portability:</strong> Request a copy of your data in a structured format</ListItem>
          <ListItem><strong>Objection:</strong> Object to processing of your personal information</ListItem>
          <ListItem><strong>Restriction:</strong> Request limitation of processing your data</ListItem>
        </List>
        <p>
          To exercise these rights, please contact us using the information provided below.
        </p>
      </Section>

      <Section>
        <SectionTitle>8. Cookies and Tracking Technologies</SectionTitle>
        <p>
          We use cookies and similar tracking technologies to enhance your experience with the Service.
          Cookies help us:
        </p>
        <List>
          <ListItem>Remember your preferences and settings</ListItem>
          <ListItem>Analyze usage patterns and improve the Service</ListItem>
          <ListItem>Maintain session security</ListItem>
          <ListItem>Provide personalized content</ListItem>
        </List>
        <p>
          You can control cookie settings through your browser preferences. However, disabling cookies
          may affect the functionality of the Service.
        </p>
      </Section>

      <Section>
        <SectionTitle>9. Children's Privacy</SectionTitle>
        <p>
          The Service is not intended for children under 13 years of age. We do not knowingly collect
          personal information from children under 13. If we become aware that we have collected personal
          information from a child under 13, we will take steps to delete such information.
        </p>
        <p>
          For users between 13 and 18 years old, parental consent is recommended before using the Service.
        </p>
      </Section>

      <Section>
        <SectionTitle>10. International Data Transfers</SectionTitle>
        <p>
          Your information may be transferred to and processed in countries other than your country of residence.
          These countries may have data protection laws that are different from the laws of your country.
        </p>
        <p>
          When we transfer your information internationally, we implement appropriate safeguards to protect
          your information in accordance with applicable data protection laws.
        </p>
      </Section>

      <ContactInfo>
        <ContactTitle>
          <FaShieldAlt /> Contact Information
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
          <strong>Email:</strong> privacy@workingedgeinc.com<br />
          <strong>Website:</strong> www.workingedgeinc.com
        </p>
        <p>
          For privacy-related inquiries, please contact our Privacy Officer at the email address above.
        </p>
      </ContactInfo>

      <Section>
        <SectionTitle>11. Changes to This Privacy Policy</SectionTitle>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting
          the new Privacy Policy on this page and updating the "Last Updated" date.
        </p>
        <p>
          We encourage you to review this Privacy Policy periodically for any changes. Your continued use
          of the Service after any modifications constitutes acceptance of the updated Privacy Policy.
        </p>
      </Section>

      <Section>
        <SectionTitle>12. Contact Us</SectionTitle>
        <p>
          If you have any questions about this Privacy Policy or our privacy practices, please contact us:
        </p>
        <p>
          <strong>Email:</strong> privacy@workingedgeinc.com<br />
          <strong>Phone:</strong> (555) 123-4567<br />
          <strong>Address:</strong> 123 Innovation Drive, Suite 456, Tech Valley, CA 94043
        </p>
        <p>
          We will respond to your inquiry within 30 days of receipt.
        </p>
      </Section>

      <Section style={{ textAlign: 'center', background: '#d4edda', padding: '1rem', borderRadius: '8px' }}>
        <p>
          <strong>Last Updated:</strong> September 21, 2025
        </p>
        <p>
          This Privacy Policy was last modified on September 21, 2025.
        </p>
      </Section>
    </Container>
  );
};

export default Privacy;
