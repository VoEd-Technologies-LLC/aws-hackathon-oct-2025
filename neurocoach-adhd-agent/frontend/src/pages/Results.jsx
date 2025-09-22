import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBrain, FaChartBar, FaArrowRight, FaDownload } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ResultsCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ScoreSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ScoreCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: ${props => props.variant === 'primary' ? '#667eea' : '#f8f9fa'};
  color: ${props => props.variant === 'primary' ? 'white' : '#333'};
  border-radius: 10px;
`;

const ScoreNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ScoreLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const SubtypeSection = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: #e7f3ff;
  border-radius: 8px;
  border-left: 4px solid #667eea;
`;

const SubtypeTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SubtypeDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CharacteristicsList = styled.ul`
  color: #666;
  line-height: 1.8;
`;

const Disclaimer = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 5px;
  padding: 1rem;
  margin: 2rem 0;
  color: #856404;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
`;

const PrimaryButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    background: #5a67d8;
  }
`;

const SecondaryButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    background: #218838;
  }
`;

const ResourcesSection = styled.div`
  margin-top: 3rem;
`;

const ResourcesTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ResourceCard = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ResourceTitle = styled.h4`
  color: #333;
  margin-bottom: 0.5rem;
`;

const ResourceDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ResourceLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Results = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real implementation, this would call the backend API
    // For now, we'll simulate the scoring
    const calculateResults = () => {
      const answers = JSON.parse(sessionStorage.getItem('asrsAnswers') || '{}');

      // Calculate total score (Part A questions: 1-6)
      const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);

      // Determine subtype based on responses
      let subtype = 'Inattentive';
      let characteristics = [
        'Difficulty sustaining attention on tasks',
        'Problems with organization and time management',
        'Tendency to lose important items',
        'Easily distracted by external stimuli'
      ];

      // Check for hyperactive symptoms (questions 5-6)
      const hyperactiveScore = (answers[5] || 0) + (answers[6] || 0);
      if (hyperactiveScore >= 4) {
        subtype = 'Combined';
        characteristics.push('Restlessness or feeling "driven by a motor"');
        characteristics.push('Difficulty sitting still for extended periods');
      }

      const resultData = {
        totalScore,
        maxScore: 24,
        subtype,
        characteristics,
        interpretation: getInterpretation(totalScore),
        recommendations: getRecommendations(subtype)
      };

      setResults(resultData);
      setLoading(false);
    };

    calculateResults();
  }, []);

  const getInterpretation = (score) => {
    if (score >= 14) return 'High likelihood of ADHD characteristics';
    if (score >= 9) return 'Moderate likelihood of ADHD characteristics';
    return 'Lower likelihood of ADHD characteristics';
  };

  const getRecommendations = (subtype, score) => {
    const baseRecommendations = [
      '<strong>IMPORTANT MEDICAL DISCLAIMER:</strong> This is not a clinical diagnosis. This screening tool provides educational information only and is not a substitute for professional medical evaluation. Please consult with a qualified healthcare provider for proper ADHD assessment and diagnosis.',
      'Consider discussing these results with a healthcare professional for proper evaluation',
      'Track your symptoms and challenges over time to identify patterns',
      'Explore general productivity and organizational tools that may be helpful'
    ];

    const subtypeRecommendations = {
      'Inattentive': [
        'Use external cues and timers to support task initiation and completion',
        'Break large tasks into smaller, manageable steps with visual progress tracking',
        'Set up a structured environment with designated spaces for different activities',
        'Use calendar apps and reminder systems for appointments and deadlines'
      ],
      'Hyperactive-Impulsive': [
        'Incorporate short movement breaks during focused work periods',
        'Practice mindfulness techniques to improve impulse control',
        'Use fidget tools or standing desks to manage restlessness',
        'Create routines that channel excess energy productively'
      ],
      'Combined': [
        'Combine strategies for both inattention and hyperactivity challenges',
        'Use a structured daily routine with built-in movement breaks',
        'Implement both organizational tools and impulse management techniques',
        'Consider body doubling or accountability partnerships for task completion'
      ]
    };

    // Score-based recommendations
    if (score >= 18) {
      baseRecommendations.splice(1, 0, 'Your screening suggests significant ADHD characteristics - professional evaluation is strongly recommended');
    } else if (score >= 14) {
      baseRecommendations.splice(1, 0, 'Your screening suggests ADHD characteristics that warrant further evaluation by a healthcare professional');
    } else {
      baseRecommendations.splice(1, 0, 'Your screening score is below the threshold typically associated with ADHD, but if you\'re experiencing challenges, consult a healthcare provider');
    }

    return [...baseRecommendations, ...subtypeRecommendations[subtype]];
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div>Analyzing your results...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Your ADHD Screening Results</Title>
        <Subtitle>
          Based on your responses to the ASRS v1.1 questionnaire
        </Subtitle>
      </Header>

      <ResultsCard>
        <ScoreSection>
          <ScoreCard variant="primary">
            <ScoreNumber>{results.totalScore}</ScoreNumber>
            <ScoreLabel>Total Score</ScoreLabel>
          </ScoreCard>
          <ScoreCard>
            <ScoreNumber>{results.maxScore}</ScoreNumber>
            <ScoreLabel>Maximum Possible</ScoreLabel>
          </ScoreCard>
        </ScoreSection>

        <SubtypeSection>
          <SubtypeTitle>
            <FaBrain /> Likely ADHD Presentation: {results.subtype}
          </SubtypeTitle>
          <SubtypeDescription>
            Based on your screening responses, your pattern of symptoms most closely
            aligns with {results.subtype.toLowerCase()} ADHD characteristics.
          </SubtypeDescription>

          <CharacteristicsList>
            {results.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </CharacteristicsList>
        </SubtypeSection>

        <div style={{ margin: '2rem 0' }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Interpretation</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            {results.interpretation}. This screening tool provides educational
            information about ADHD characteristics but is not a clinical diagnosis.
          </p>
        </div>

        <div style={{ margin: '2rem 0' }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Recommendations</h3>
          <CharacteristicsList>
            {results.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </CharacteristicsList>
        </div>
      </ResultsCard>

      <Disclaimer>
        <strong>Important:</strong> This screening is for educational purposes only.
        A positive screening result does not confirm an ADHD diagnosis, and a negative
        result does not rule out ADHD. Please consult with a qualified healthcare
        professional for proper evaluation and diagnosis.
      </Disclaimer>

      <ActionButtons>
        <PrimaryButton onClick={() => navigate('/coaching')}>
          Start Coaching Session <FaArrowRight />
        </PrimaryButton>
        <SecondaryButton onClick={() => navigate('/resources')}>
          <FaDownload /> Download Resources
        </SecondaryButton>
      </ActionButtons>

      <ResourcesSection>
        <ResourcesTitle>Recommended Resources</ResourcesTitle>
        <ResourcesGrid>
          <ResourceCard>
            <ResourceTitle>CHADD</ResourceTitle>
            <ResourceDescription>
              Children and Adults with Attention-Deficit/Hyperactivity Disorder
            </ResourceDescription>
            <ResourceLink href="https://chadd.org" target="_blank">
              Visit CHADD.org
            </ResourceLink>
          </ResourceCard>

          <ResourceCard>
            <ResourceTitle>NIMH ADHD Information</ResourceTitle>
            <ResourceDescription>
              National Institute of Mental Health ADHD resources and research
            </ResourceDescription>
            <ResourceLink href="https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd" target="_blank">
              Visit NIMH
            </ResourceLink>
          </ResourceCard>

          <ResourceCard>
            <ResourceTitle>ADDitude Magazine</ResourceTitle>
            <ResourceDescription>
              Practical strategies and support for ADHD management
            </ResourceDescription>
            <ResourceLink href="https://www.additudemag.com" target="_blank">
              Visit ADDitude
            </ResourceLink>
          </ResourceCard>
        </ResourcesGrid>
      </ResourcesSection>
    </Container>
  );
};

export default Results;
