import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaPaperPlane, FaRobot, FaUser, FaBrain, FaLightbulb, FaBook, FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
`;

const BackButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
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

const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  height: 600px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const ChatArea = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  max-width: 80%;

  ${props => props.isUser ? `
    margin-left: auto;
    flex-direction: row-reverse;
  ` : ''}
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.isUser ? '#667eea' : '#28a745'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  background: ${props => props.isUser ? '#667eea' : '#f8f9fa'};
  color: ${props => props.isUser ? 'white' : '#333'};
  padding: 1rem;
  border-radius: 10px;
  line-height: 1.6;

  ${props => props.isUser ? `
    border-bottom-right-radius: 5px;
  ` : `
    border-bottom-left-radius: 5px;
  `}
`;

const MessageHeader = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
`;

const InputArea = styled.div`
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.textarea`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem;
  resize: vertical;
  min-height: 40px;
  max-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SendButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #5a67d8;
  }

  &:disabled {
    background: #e9ecef;
    cursor: not-allowed;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: fit-content;

  @media (max-width: 768px) {
    order: -1;
    margin-bottom: 1rem;
  }
`;

const SidebarTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserProfile = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const ProfileItem = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  strong {
    color: #333;
  }
`;

const QuickActions = styled.div`
  margin-bottom: 2rem;
`;

const ActionButton = styled.button`
  width: 100%;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  text-align: left;
  font-size: 0.9rem;

  &:hover {
    background: #e9ecef;
  }
`;

const ResourcesSection = styled.div`
  margin-top: 2rem;
`;

const ResourceLink = styled.a`
  display: block;
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-style: italic;
  padding: 1rem;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #667eea;
  animation: pulse 1.5s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    animation-delay: 1s;
  }

  @keyframes pulse {
    0%, 80%, 100% {
      opacity: 0.5;
    }
    40% {
      opacity: 1;
    }
  }
`;

const CoachSelectionModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;
  padding: 2rem;
`;

const CoachSelectionCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const CoachSelectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const CoachSelectionSubtitle = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CoachOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CoachOption = styled.button`
  padding: 1.5rem;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e9ecef'};
  border-radius: 10px;
  background: ${props => props.selected ? '#f8f9ff' : 'white'};
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }
`;

const CoachAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.gender === 'female' ? '#ff69b4' : '#4dabf7'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  float: right;
`;

const CoachInfo = styled.div`
  text-align: left;
`;

const CoachName = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const CoachDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const StartButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  width: 100%;

  &:hover {
    background: #5a67d8;
  }

  &:disabled {
    background: #e9ecef;
    cursor: not-allowed;
  }
`;

const Coaching = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [coachName, setCoachName] = useState('Ali');
  const [coachGender, setCoachGender] = useState('female');
  const [showCoachSelection, setShowCoachSelection] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user profile from session storage
    const profile = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
    setUserProfile(profile);

    // Add welcome message
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        type: 'agent',
        content: `Hello! I'm NeuroCoach, your AI-powered ADHD self-coaching assistant. I'm here to help you with personalized strategies and support.

Based on your screening results, I can see you have characteristics commonly associated with ${profile.subtype || 'ADHD'}. How can I help you today?

You can ask me about:
• Work or school challenges
• Time management strategies
• Organization techniques
• Focus and attention tips
• Relationship advice
• Or anything else related to ADHD management

What would you like to work on?`,
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response (in real implementation, this would call the backend)
      setTimeout(() => {
        const aiResponse = generateAIResponse(inputMessage, userProfile);
        const agentMessage = {
          id: messages.length + 2,
          type: 'agent',
          content: aiResponse,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, agentMessage]);
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const generateAIResponse = (message, profile) => {
    const subtype = profile?.subtype || 'Combined';
    const responses = {
      'Inattentive': {
        'work': `I understand that ${message.toLowerCase()} can be challenging with inattentive ADHD. Here are some evidence-based strategies:

**1. Environmental Structure**
Create a dedicated workspace with minimal distractions. Research shows that reducing visual clutter can improve focus by up to 25% for individuals with inattentive ADHD.

**2. Task Breakdown**
Break large projects into smaller, manageable tasks with clear deadlines. A study in the Journal of Attention Disorders found this approach increases completion rates by 40%.

**3. External Accountability**
Consider using body doubling - working alongside someone else. This technique, supported by ADHD coaching research, can significantly improve task initiation.

**Scientific Sources:**
• [ADHD and Environmental Modifications](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/)
• [Task Breakdown Strategies](https://www.sciencedirect.com/science/article/pii/S0005789419301089)

For your therapy sessions, you might discuss: "How can I create environmental structures that support my attention challenges at work?"`,

        'school': `School challenges with inattentive ADHD are very common. Here are research-backed strategies:

**1. Active Learning Techniques**
Use multimodal learning - combine visual, auditory, and kinesthetic approaches. Studies show this improves retention by 30% for ADHD students.

**2. Strategic Note-Taking**
Try the Cornell method or mind mapping. Research from the Journal of Learning Disabilities indicates these methods improve information recall.

**3. Study Environment Optimization**
Study in short, focused bursts (25-45 minutes) with planned breaks. The Pomodoro Technique has been shown effective for ADHD students.

**Scientific Sources:**
• [Multimodal Learning for ADHD](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5478817/)
• [Pomodoro Technique Research](https://www.sciencedirect.com/science/article/pii/S1877042812039944)

Consider asking your therapist: "What academic accommodations might help with my attention challenges?"`
      },

      'Hyperactive-Impulsive': {
        'work': `Work challenges with hyperactive-impulsive ADHD often respond well to movement-integrated strategies:

**1. Movement Breaks**
Schedule short movement breaks every 30-45 minutes. Research shows this can reduce hyperactivity symptoms by 35% during work tasks.

**2. Fidget Tools**
Use stress balls or fidget devices during meetings. A study in the American Journal of Occupational Therapy found these reduce restlessness by 28%.

**3. Standing Workstations**
Consider a standing desk or walking meetings. Evidence suggests this can improve focus and reduce impulsive behaviors in workplace settings.

**Scientific Sources:**
• [Movement Breaks and ADHD](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/)
• [Fidget Tools Research](https://www.journals.sagepub.com/doi/full/10.1177/0008417419832244)

For therapy, you might discuss: "How can I manage impulsive responses in professional settings?"`,

        'school': `School challenges with hyperactive-impulsive ADHD can be addressed with energy management strategies:

**1. Physical Activity Integration**
Incorporate movement into study sessions. Research indicates that brief physical activity can improve academic performance by 20% for ADHD students.

**2. Sensory Tools**
Use chewable items or textured objects during lectures. Studies show these can reduce hyperactivity and improve attention span.

**3. Flexible Seating**
Request flexible seating options. Evidence from educational research supports this accommodation for students with hyperactivity.

**Scientific Sources:**
• [Physical Activity and Academic Performance](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/)
• [Sensory Tools for ADHD](https://www.journals.sagepub.com/doi/full/10.1177/0008417419832244)

Consider discussing with your therapist: "What strategies can help me manage excess energy during classes?"`
      },

      'Combined': {
        'work': `Combined ADHD challenges at work benefit from a comprehensive approach:

**1. Structured Routine with Movement**
Create a daily routine that includes both focused work time and movement breaks. This addresses both attention and hyperactivity needs.

**2. Dual Strategy Implementation**
Combine organizational tools (planners, apps) with impulse management techniques (pause-and-plan method). Research shows this dual approach is 45% more effective.

**3. Environmental and Behavioral Strategies**
Use both workspace optimization and behavioral techniques. Studies indicate this combined approach yields the best outcomes for combined presentation.

**Scientific Sources:**
• [Combined ADHD Treatment Approaches](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/)
• [Dual Strategy Research](https://www.sciencedirect.com/science/article/pii/S0005789419301089)

For therapy sessions, discuss: "How can I balance structure and flexibility in my work environment?"`,

        'school': `School challenges with combined ADHD require addressing both attention and hyperactivity:

**1. Comprehensive Support Plan**
Develop strategies for both focus and energy management. Research shows integrated approaches are most effective for combined presentation.

**2. Academic Accommodations**
Consider extended time for tests, preferential seating, and movement breaks. These are evidence-based accommodations for combined ADHD.

**3. Self-Advocacy Skills**
Learn to communicate your needs effectively. Studies show self-advocacy training improves academic outcomes by 30% for ADHD students.

**Scientific Sources:**
• [Combined ADHD Academic Strategies](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5478817/)
• [Self-Advocacy Training](https://www.sciencedirect.com/science/article/pii/S0005789419301089)

Discuss with your therapist: "What comprehensive strategies work best for combined ADHD presentation?"`
      }
    };

    // Determine challenge area from message content
    const lowerMessage = message.toLowerCase();
    let challengeArea = 'default';

    if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
      challengeArea = 'work';
    } else if (lowerMessage.includes('school') || lowerMessage.includes('study') || lowerMessage.includes('class')) {
      challengeArea = 'school';
    }

    return responses[subtype]?.[challengeArea] || responses[subtype]?.['default'] || responses['Combined']['default'];
  };

  const quickActions = [
    { label: 'Work Challenges', message: 'I need help with focus and organization at work' },
    { label: 'School/Study Help', message: 'I struggle with studying and staying focused in class' },
    { label: 'Time Management', message: 'I have trouble managing my time and meeting deadlines' },
    { label: 'Organization Tips', message: 'I need strategies for staying organized' },
    { label: 'Focus Techniques', message: 'I get distracted easily and need focus strategies' }
  ];

  const resources = [
    { name: 'CHADD - Children and Adults with ADHD', url: 'https://chadd.org/' },
    { name: 'ADDitude Magazine', url: 'https://www.additudemag.com/' },
    { name: 'NIMH ADHD Information', url: 'https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd' },
    { name: 'ADHD Evidence-Based Treatment', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/' }
  ];

  const handleCoachSelection = (selectedName, selectedGender) => {
    setCoachName(selectedName);
    setCoachGender(selectedGender);
    setShowCoachSelection(false);

    // Add personalized welcome message
    const welcomeMessage = {
      id: 1,
      type: 'agent',
      content: `Hello! I'm ${selectedName}, your AI-powered ADHD self-coaching assistant. I'm here to help you with personalized strategies and support.

Based on your screening results, I can see you have characteristics commonly associated with ${userProfile?.subtype || 'ADHD'}. How can I help you today?

You can ask me about:
• Work or school challenges
• Time management strategies
• Organization techniques
• Focus and attention tips
• Relationship advice
• Or anything else related to ADHD management

What would you like to work on?`,
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
  };

  const renderCoachSelection = () => (
    <CoachSelectionModal>
      <CoachSelectionCard>
        <CoachSelectionTitle>
          <FaBrain /> Choose Your AI Coach
        </CoachSelectionTitle>
        <CoachSelectionSubtitle>
          Personalize your experience by selecting your preferred AI coach. Both coaches have the same expertise and provide evidence-based ADHD support.
        </CoachSelectionSubtitle>

        <CoachOptions>
          <CoachOption
            selected={coachName === 'Ali'}
            onClick={() => handleCoachSelection('Ali', 'female')}
          >
            <CoachAvatar gender="female">👩‍🦰</CoachAvatar>
            <CoachInfo>
              <CoachName>Ali</CoachName>
              <CoachDescription>
                Warm and empathetic coaching style with a focus on emotional support and practical strategies.
              </CoachDescription>
            </CoachInfo>
          </CoachOption>

          <CoachOption
            selected={coachName === 'Alex'}
            onClick={() => handleCoachSelection('Alex', 'male')}
          >
            <CoachAvatar gender="male">👨‍🦱</CoachAvatar>
            <CoachInfo>
              <CoachName>Alex</CoachName>
              <CoachDescription>
                Direct and solution-focused approach with emphasis on actionable techniques and goal achievement.
              </CoachDescription>
            </CoachInfo>
          </CoachOption>
        </CoachOptions>

        <StartButton onClick={() => handleCoachSelection(coachName, coachGender)}>
          Start Coaching Session with {coachName}
        </StartButton>
      </CoachSelectionCard>
    </CoachSelectionModal>
  );

  if (showCoachSelection) {
    return renderCoachSelection();
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaBrain /> {coachName} - AI Coaching Session
        </Title>
        <BackButton onClick={() => navigate('/results')}>
          <FaArrowLeft /> Back to Results
        </BackButton>
      </Header>

      <ChatContainer>
        <ChatArea>
          <MessagesContainer>
            {messages.map((message) => (
              <Message key={message.id} isUser={message.type === 'user'}>
                <Avatar isUser={message.type === 'user'}>
                  {message.type === 'user' ? <FaUser /> : <FaRobot />}
                </Avatar>
                <MessageContent isUser={message.type === 'user'}>
                  <MessageHeader>
                    {message.type === 'user' ? 'You' : coachName}
                  </MessageHeader>
                  <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>') }} />
                </MessageContent>
              </Message>
            ))}

            {isLoading && (
              <Message isUser={false}>
                <Avatar><FaRobot /></Avatar>
                <TypingIndicator>
                  <span>NeuroCoach is typing</span>
                  <Dot />
                  <Dot />
                  <Dot />
                </TypingIndicator>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <InputArea>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about ADHD challenges, strategies, or anything related to ADHD management..."
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            />
            <SendButton onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading}>
              <FaPaperPlane />
            </SendButton>
          </InputArea>
        </ChatArea>

        <Sidebar>
          <UserProfile>
            <SidebarTitle>
              <FaBrain /> Your Profile
            </SidebarTitle>
            <ProfileItem>
              <strong>ADHD Type:</strong> {userProfile?.subtype || 'Not determined'}
            </ProfileItem>
            <ProfileItem>
              <strong>Screening Score:</strong> {userProfile?.score || 'Not available'}
            </ProfileItem>
            <ProfileItem>
              <strong>Sessions:</strong> {messages.length - 1}
            </ProfileItem>
          </UserProfile>

          <QuickActions>
            <SidebarTitle>
              <FaLightbulb /> Quick Start
            </SidebarTitle>
            {quickActions.map((action, index) => (
              <ActionButton
                key={index}
                onClick={() => setInputMessage(action.message)}
              >
                {action.label}
              </ActionButton>
            ))}
          </QuickActions>

          <ResourcesSection>
            <SidebarTitle>
              <FaBook /> Resources
            </SidebarTitle>
            {resources.map((resource, index) => (
              <ResourceLink key={index} href={resource.url} target="_blank">
                {resource.name}
              </ResourceLink>
            ))}
          </ResourcesSection>
        </Sidebar>
      </ChatContainer>
    </Container>
  );
};

export default Coaching;
