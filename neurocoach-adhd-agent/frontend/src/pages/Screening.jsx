import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (min-width: 768px) {
    margin: 2rem 0;
    flex-wrap: nowrap;
  }
`;

const ProgressStep = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;

  @media (min-width: 768px) {
    margin: 0 1rem;
  }
`;

const StepCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${props => props.active ? '#667eea' : props.completed ? '#28a745' : '#e9ecef'};
  color: ${props => props.active || props.completed ? 'white' : '#6c757d'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.5rem;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const StepLabel = styled.span`
  font-size: 0.8rem;
  color: #666;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
    margin-bottom: 2rem;
  }
`;

const QuestionText = styled.h3`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Options = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e9ecef'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.selected ? '#f8f9ff' : 'white'};

  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }

  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

const RadioInput = styled.input`
  margin-right: 0.75rem;
  width: 18px;
  height: 18px;
  accent-color: #667eea;

  @media (min-width: 768px) {
    margin-right: 1rem;
    width: 20px;
    height: 20px;
  }
`;

const OptionText = styled.span`
  font-size: 0.9rem;
  color: #333;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (min-width: 768px) {
    margin-top: 2rem;
    flex-wrap: nowrap;
  }
`;

const BackButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    background: #5a6268;
  }

  &:disabled {
    background: #e9ecef;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

const NextButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    background: #5a67d8;
  }

  &:disabled {
    background: #e9ecef;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

const SubmitButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background: #218838;
  }

  &:disabled {
    background: #e9ecef;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
`;

const Disclaimer = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  color: #856404;
  font-size: 0.85rem;

  @media (min-width: 768px) {
    padding: 1rem;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }
`;

// ASRS v1.1 Questions
const questions = [
  {
    id: 1,
    text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" }
    ]
  },
  {
    id: 2,
    text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" }
    ]
  },
  {
    id: 3,
    text: "How often do you have problems remembering appointments or obligations?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" }
    ]
  },
  {
    id: 4,
    text: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" }
    ]
  },
  {
    id: 5,
    text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" }
    ]
  },
  {
    id: 6,
    text: "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very Often" }
    ]
  }
];

const Screening = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAnswerSelect = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Store answers in sessionStorage for now
      // In production, this would be sent to the backend API
      sessionStorage.setItem('asrsAnswers', JSON.stringify(answers));

      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error('Error submitting screening:', error);
      setIsSubmitting(false);
    }
  };

  const isAnswered = answers[questions[currentQuestion].id] !== undefined;
  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  return (
    <Container>
      <Header>
        <Title>ADHD Screening Assessment</Title>
        <Subtitle>
          Please answer the following questions about your experiences over the past 6 months.
          This is the WHO-validated ASRS v1.1 questionnaire.
        </Subtitle>
      </Header>

      <Disclaimer>
        <strong>Important:</strong> This screening tool is for educational purposes only and is not a substitute for professional medical evaluation. Please consult with a qualified healthcare provider for proper ADHD assessment and diagnosis.
      </Disclaimer>

      <ProgressBar>
        {questions.map((question, index) => (
          <ProgressStep key={question.id}>
            <StepCircle completed={index < currentQuestion} active={index === currentQuestion}>
              {index < currentQuestion ? <FaCheck /> : index + 1}
            </StepCircle>
            <StepLabel>Question {index + 1}</StepLabel>
          </ProgressStep>
        ))}
      </ProgressBar>

      <QuestionCard>
        <QuestionText>
          {questions[currentQuestion].text}
        </QuestionText>

        <Options>
          {questions[currentQuestion].options.map((option) => (
            <Option
              key={option.value}
              selected={answers[questions[currentQuestion].id] === option.value}
            >
              <RadioInput
                type="radio"
                name={`question-${questions[currentQuestion].id}`}
                value={option.value}
                checked={answers[questions[currentQuestion].id] === option.value}
                onChange={() => handleAnswerSelect(questions[currentQuestion].id, option.value)}
              />
              <OptionText>{option.label}</OptionText>
            </Option>
          ))}
        </Options>
      </QuestionCard>

      <Navigation>
        <BackButton
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <FaArrowLeft /> Previous
        </BackButton>

        {currentQuestion === questions.length - 1 ? (
          <SubmitButton
            onClick={handleSubmit}
            disabled={!allAnswered || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Complete Screening'}
          </SubmitButton>
        ) : (
          <NextButton
            onClick={handleNext}
            disabled={!isAnswered}
          >
            Next <FaArrowRight />
          </NextButton>
        )}
      </Navigation>
    </Container>
  );
};

export default Screening;
