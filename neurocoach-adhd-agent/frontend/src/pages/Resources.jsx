import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaDownload, FaExternalLinkAlt, FaSearch, FaFilter, FaBook, FaBrain, FaUsers, FaFileAlt } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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

const SearchSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ResourceCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ResourceHeader = styled.div`
  background: ${props => {
    switch (props.type) {
      case 'website': return '#667eea';
      case 'pdf': return '#28a745';
      case 'video': return '#dc3545';
      case 'tool': return '#ffc107';
      default: return '#6c757d';
    }
  }};
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ResourceIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
`;

const ResourceType = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
`;

const ResourceBody = styled.div`
  padding: 1.5rem;
`;

const ResourceTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const ResourceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ResourceMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #888;
`;

const ResourceActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.a`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #667eea;
          color: white;
          &:hover { background: #5a67d8; }
        `;
      case 'secondary':
        return `
          background: #28a745;
          color: white;
          &:hover { background: #218838; }
        `;
      default:
        return `
          background: #f8f9fa;
          color: #333;
          border: 1px solid #e9ecef;
          &:hover { background: #e9ecef; }
        `;
    }
  }}
`;

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SubtypeResources = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SubtypeSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SubtypeButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? '#667eea' : '#e9ecef'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
    background: ${props => props.active ? '#667eea' : '#f8f9ff'};
  }
`;

const Disclaimer = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 5px;
  padding: 1rem;
  margin-top: 2rem;
  color: #856404;
  font-size: 0.9rem;
`;

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSubtype, setSelectedSubtype] = useState('all');
  const navigate = useNavigate();

  const resources = [
    // Inattentive ADHD Resources
    {
      id: 1,
      title: 'CHADD - Inattentive ADHD Resources',
      description: 'Comprehensive resources specifically for inattentive ADHD presentation, including strategies for focus and organization.',
      url: 'https://chadd.org/for-adults/inattentive-adhd/',
      type: 'website',
      subtype: 'Inattentive',
      category: 'Clinical'
    },
    {
      id: 2,
      title: 'ADDitude Magazine - Focus & Attention',
      description: 'Evidence-based strategies for improving focus and attention in inattentive ADHD.',
      url: 'https://www.additudemag.com/category/adhd-treatment/focus-concentration/',
      type: 'website',
      subtype: 'Inattentive',
      category: 'Practical'
    },
    {
      id: 3,
      title: 'ADHD and Environmental Modifications',
      description: 'Research study on environmental modifications for ADHD management.',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/',
      type: 'pdf',
      subtype: 'Inattentive',
      category: 'Research'
    },

    // Hyperactive-Impulsive Resources
    {
      id: 4,
      title: 'CHADD - Hyperactive-Impulsive ADHD',
      description: 'Resources for managing hyperactivity and impulsivity in ADHD.',
      url: 'https://chadd.org/for-adults/hyperactive-impulsive-adhd/',
      type: 'website',
      subtype: 'Hyperactive-Impulsive',
      category: 'Clinical'
    },
    {
      id: 5,
      title: 'ADDitude Magazine - Hyperactivity & Impulsivity',
      description: 'Practical strategies for managing hyperactivity and impulsive behaviors.',
      url: 'https://www.additudemag.com/category/adhd-treatment/hyperactivity-impulsivity/',
      type: 'website',
      subtype: 'Hyperactive-Impulsive',
      category: 'Practical'
    },
    {
      id: 6,
      title: 'Movement Breaks and ADHD Symptoms',
      description: 'Scientific research on the effectiveness of movement breaks for ADHD.',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/',
      type: 'pdf',
      subtype: 'Hyperactive-Impulsive',
      category: 'Research'
    },

    // Combined ADHD Resources
    {
      id: 7,
      title: 'CHADD - Combined ADHD Resources',
      description: 'Comprehensive resources for combined ADHD presentation.',
      url: 'https://chadd.org/for-adults/combined-adhd/',
      type: 'website',
      subtype: 'Combined',
      category: 'Clinical'
    },
    {
      id: 8,
      title: 'ADDitude Magazine - Combined Type ADHD',
      description: 'Strategies for managing both inattention and hyperactivity.',
      url: 'https://www.additudemag.com/category/adhd-treatment/combined-type/',
      type: 'website',
      subtype: 'Combined',
      category: 'Practical'
    },
    {
      id: 9,
      title: 'Combined ADHD Treatment Approaches',
      description: 'Research on integrated treatment approaches for combined ADHD.',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/',
      type: 'pdf',
      subtype: 'Combined',
      category: 'Research'
    },

    // General ADHD Resources
    {
      id: 10,
      title: 'NIMH - Attention Deficit Hyperactivity Disorder',
      description: 'Official information from the National Institute of Mental Health.',
      url: 'https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd',
      type: 'website',
      subtype: 'all',
      category: 'Clinical'
    },
    {
      id: 11,
      title: 'ADHD Evidence-Based Treatment Guidelines',
      description: 'Comprehensive review of evidence-based ADHD treatments.',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/',
      type: 'pdf',
      subtype: 'all',
      category: 'Research'
    },
    {
      id: 12,
      title: 'WHO - Adult ADHD Self-Report Scale (ASRS)',
      description: 'Official ASRS v1.1 screening tool and documentation.',
      url: 'https://www.hcp.med.harvard.edu/ncs/asrs.php',
      type: 'tool',
      subtype: 'all',
      category: 'Clinical'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSubtype = selectedSubtype === 'all' || resource.subtype === selectedSubtype || resource.subtype === 'all';

    return matchesSearch && matchesType && matchesSubtype;
  });

  const resourcesByCategory = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {});

  const getResourceIcon = (type) => {
    switch (type) {
      case 'website': return <FaExternalLinkAlt />;
      case 'pdf': return <FaFileAlt />;
      case 'video': return <FaFileAlt />;
      case 'tool': return <FaFileAlt />;
      default: return <FaBook />;
    }
  };

  return (
    <Container>
      <Header>
        <Title>
          <FaBook /> Resource Library
        </Title>
        <BackButton onClick={() => navigate('/results')}>
          <FaArrowLeft /> Back to Results
        </BackButton>
      </Header>

      <SearchSection>
        <SearchInput
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="website">Websites</option>
          <option value="pdf">Research Papers</option>
          <option value="tool">Tools</option>
        </FilterSelect>
      </SearchSection>

      <SubtypeSelector>
        <SubtypeButton
          active={selectedSubtype === 'all'}
          onClick={() => setSelectedSubtype('all')}
        >
          All Types
        </SubtypeButton>
        <SubtypeButton
          active={selectedSubtype === 'Inattentive'}
          onClick={() => setSelectedSubtype('Inattentive')}
        >
          <FaBrain /> Inattentive
        </SubtypeButton>
        <SubtypeButton
          active={selectedSubtype === 'Hyperactive-Impulsive'}
          onClick={() => setSelectedSubtype('Hyperactive-Impulsive')}
        >
          <FaUsers /> Hyperactive-Impulsive
        </SubtypeButton>
        <SubtypeButton
          active={selectedSubtype === 'Combined'}
          onClick={() => setSelectedSubtype('Combined')}
        >
          <FaBrain /> Combined
        </SubtypeButton>
      </SubtypeSelector>

      {Object.entries(resourcesByCategory).map(([category, categoryResources]) => (
        <CategorySection key={category}>
          <CategoryTitle>
            {category === 'Clinical' && <FaUsers />}
            {category === 'Practical' && <FaBook />}
            {category === 'Research' && <FaFileAlt />}
            {category} Resources ({categoryResources.length})
          </CategoryTitle>

          <ResourcesGrid>
            {categoryResources.map((resource) => (
              <ResourceCard key={resource.id}>
                <ResourceHeader type={resource.type}>
                  <ResourceIcon>
                    {getResourceIcon(resource.type)}
                    {resource.title}
                  </ResourceIcon>
                  <ResourceType>{resource.type}</ResourceType>
                </ResourceHeader>

                <ResourceBody>
                  <ResourceTitle>{resource.title}</ResourceTitle>
                  <ResourceDescription>{resource.description}</ResourceDescription>

                  <ResourceMeta>
                    <span>ADHD Type: {resource.subtype}</span>
                  </ResourceMeta>

                  <ResourceActions>
                    <ActionButton
                      href={resource.url}
                      target="_blank"
                      variant="primary"
                    >
                      <FaExternalLinkAlt /> Visit
                    </ActionButton>
                    {resource.type === 'pdf' && (
                      <ActionButton
                        href={resource.url}
                        target="_blank"
                        variant="secondary"
                      >
                        <FaDownload /> Download
                      </ActionButton>
                    )}
                  </ResourceActions>
                </ResourceBody>
              </ResourceCard>
            ))}
          </ResourcesGrid>
        </CategorySection>
      ))}

      <Disclaimer>
        <strong>Important:</strong> These resources are for educational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for ADHD evaluation and treatment.
      </Disclaimer>
    </Container>
  );
};

export default Resources;
