# 🧪 NeuroCoach Testing Instructions

## Overview
This document provides comprehensive testing instructions for the NeuroCoach ADHD Self-Coaching Agent. Follow these steps to thoroughly test all functionality before the hackathon demo.

## 📋 Prerequisites

### 1. Environment Setup
- ✅ Node.js (v16 or higher) installed
- ✅ npm or yarn package manager
- ✅ AWS CLI configured (optional, for full deployment)
- ✅ Modern web browser (Chrome, Firefox, Safari, Edge)

### 2. Project Setup
```bash
cd neurocoach-adhd-agent
npm install
```

### 3. Development Server
```bash
npm start
```
- Server should start on `http://localhost:3000`
- Open browser and navigate to the URL

## 🏠 **Test 1: Home Page**

### Expected Results:
- ✅ Professional landing page with NeuroCoach branding
- ✅ Hero section with gradient background
- ✅ "Start Your Journey" call-to-action button
- ✅ 4 feature cards (ADHD Screening, Personalized Coaching, Therapy Preparation, Resource Library)
- ✅ Medical disclaimer at bottom
- ✅ Responsive design (test on mobile/desktop)

### Mobile Testing:
- ✅ Touch-friendly buttons and navigation
- ✅ Readable text on small screens
- ✅ Proper spacing and layout

## 📝 **Test 2: ADHD Screening (ASRS v1.1)**

### Test Flow:
1. Click "Start Your Journey" or navigate to `/screening`
2. Read the instructions and disclaimer
3. Answer all 6 questions with different response patterns

### Test Scenarios:

#### **Scenario A: Predominantly Inattentive ADHD**
- Questions 1-4: Score 3-4 (Often/Very Often)
- Questions 5-6: Score 0-1 (Never/Rarely)
- **Expected Result**: Part A Score: 14-16, Subtype: Inattentive

#### **Scenario B: Predominantly Hyperactive-Impulsive ADHD**
- Questions 1-4: Score 0-1 (Never/Rarely)
- Questions 5-6: Score 3-4 (Often/Very Often)
- **Expected Result**: Part A Score: 14-16, Subtype: Hyperactive-Impulsive

#### **Scenario C: Combined ADHD Presentation**
- All Questions: Score 3-4 (Often/Very Often)
- **Expected Result**: Part A Score: 20-24, Subtype: Combined

#### **Scenario D: Low ADHD Characteristics** ⭐ **NEW**
- All Questions: Score 0-1 (Never/Rarely)
- **Expected Result**: Part A Score: 0-6, Below clinical threshold

### Navigation Testing:
- ✅ Previous/Next buttons work correctly
- ✅ Progress indicator shows current question
- ✅ Cannot proceed without answering current question
- ✅ Form validation works properly

## 📊 **Test 3: Results Page**

### Expected Results:
- ✅ ASRS score display (Part A: X/24)
- ✅ ADHD subtype interpretation
- ✅ Evidence-based explanation
- ✅ Scientific citations included
- ✅ "Continue to Coaching" button
- ✅ Medical disclaimers throughout

### Test All 4 Scenarios:
- ✅ **Inattentive**: "Characteristics commonly associated with inattentive ADHD"
- ✅ **Hyperactive-Impulsive**: "Characteristics commonly associated with hyperactive-impulsive ADHD"
- ✅ **Combined**: "Characteristics commonly associated with combined ADHD"
- ✅ **Low Score**: "Score below clinical threshold... not typically associated with clinically significant ADHD"

## 🎭 **Test 4: AI Coach Selection** ⭐ **NEW**

### Test Flow:
1. Navigate to `/coaching` after completing screening
2. Coach selection modal appears automatically
3. Choose between Ali (female) and Alex (male)

### Expected Results:
- ✅ Modal appears on first visit to coaching page
- ✅ **Ali**: "Warm and empathetic coaching style"
- ✅ **Alex**: "Direct and solution-focused approach"
- ✅ Coach name appears in page title and messages
- ✅ Personalized welcome message from selected coach

### Test Both Coaches:
- ✅ **Ali**: Pink/magenta avatar with 👩‍🦰 emoji
- ✅ **Alex**: Blue avatar with 👨‍🦱 emoji
- ✅ Different coaching styles reflected in responses

## 💬 **Test 5: AI Coaching Conversations**

### Test Categories:

#### **Work Challenges**
- Type: "I keep missing deadlines at work"
- Expected: Strategies for task initiation, organization, time management
- Expected: Therapy talking points included

#### **School/Study Challenges**
- Type: "I struggle with studying and staying focused"
- Expected: Academic accommodations, study techniques, focus strategies
- Expected: Evidence-based recommendations

#### **Time Management**
- Type: "I have trouble managing my time"
- Expected: Pomodoro technique, task breakdown, prioritization
- Expected: Scientific citations

#### **Organization**
- Type: "I need help staying organized"
- Expected: Environmental structure, tools, systems
- Expected: ADHD-specific strategies

### Response Quality Testing:
- ✅ Personalized based on ADHD subtype
- ✅ Evidence-based with scientific citations
- ✅ Includes therapy preparation talking points
- ✅ Professional and supportive tone
- ✅ Medical disclaimers included

## 📚 **Test 6: Resources Page**

### Expected Results:
- ✅ Curated ADHD resources from reputable organizations
- ✅ **CHADD** - Children and Adults with ADHD
- ✅ **ADDitude Magazine** - ADHD resources
- ✅ **NIMH** - National Institute of Mental Health
- ✅ **ASRS Screening Tool** - Harvard Medical School
- ✅ Working links to external resources
- ✅ Professional presentation

## 📄 **Test 7: Legal Pages**

### Terms and Conditions (`/terms`)
- ✅ Comprehensive terms covering service description
- ✅ Medical disclaimers and liability limitations
- ✅ WorkingEdge, Inc. contact information
- ✅ Professional legal formatting

### Privacy Policy (`/privacy`)
- ✅ Detailed privacy policy with data collection info
- ✅ GDPR-compliant user rights
- ✅ Cookie and tracking disclosure
- ✅ WorkingEdge, Inc. privacy contact

### Navigation Testing:
- ✅ Links in header navigation
- ✅ Links in footer
- ✅ Back navigation to home page

## 📱 **Test 8: Mobile Responsiveness**

### Test Devices/Screen Sizes:
- ✅ **Mobile Phone** (375px width)
- ✅ **Tablet** (768px width)
- ✅ **Desktop** (1200px+ width)

### Mobile-Specific Testing:
- ✅ Touch-friendly button sizes (minimum 44px)
- ✅ Readable text on small screens
- ✅ Proper spacing for finger navigation
- ✅ Responsive navigation menu
- ✅ Mobile-optimized forms and inputs

## 🔧 **Test 9: Technical Functionality**

### Browser Testing:
- ✅ **Chrome**: Full functionality
- ✅ **Firefox**: All features working
- ✅ **Safari**: Proper rendering
- ✅ **Edge**: Complete compatibility

### Performance Testing:
- ✅ Page load time < 3 seconds
- ✅ Smooth animations and transitions
- ✅ No console errors
- ✅ Proper error handling

### Accessibility Testing:
- ✅ Keyboard navigation works
- ✅ Screen reader compatibility
- ✅ High contrast support
- ✅ Focus indicators visible

## 🏆 **Test 10: Complete User Journey**

### End-to-End Testing:

#### **Journey 1: Full ADHD Screening**
1. Start from home page
2. Complete ASRS screening (Scenario A - Inattentive)
3. Review results page
4. Select AI coach (Ali)
5. Ask work-related question
6. Receive personalized response
7. Check resources page
8. Navigate back to home

#### **Journey 2: Mobile Experience**
1. Test on mobile device/browser
2. Complete full screening process
3. Test coaching conversation
4. Verify all pages work on mobile
5. Test navigation and touch interactions

#### **Journey 3: Error Handling**
1. Try to proceed without answering questions
2. Test invalid inputs
3. Verify error messages appear
4. Test network connectivity issues

## 🐛 **Troubleshooting Guide**

### Common Issues:

#### **"Cannot connect to backend"**
- ✅ Check if development server is running
- ✅ Verify API endpoints are configured
- ✅ Check browser console for errors

#### **"ASRS scoring not working"**
- ✅ Ensure all questions are answered
- ✅ Check browser console for JavaScript errors
- ✅ Verify sessionStorage is working

#### **"Mobile layout broken"**
- ✅ Test on actual mobile device
- ✅ Check browser developer tools responsive mode
- ✅ Verify viewport meta tag is present

#### **"Styling issues"**
- ✅ Clear browser cache
- ✅ Hard refresh the page
- ✅ Check if CSS is loading properly

### Debug Tools:
- ✅ Browser Developer Tools (F12)
- ✅ React Developer Tools extension
- ✅ Network tab for API calls
- ✅ Console for JavaScript errors

## 📋 **Test Checklist**

### ✅ **Core Functionality**
- [ ] Home page loads correctly
- [ ] ASRS screening works (all 4 scenarios)
- [ ] Results page displays properly
- [ ] AI coach selection works
- [ ] Coaching conversations function
- [ ] Resources page accessible
- [ ] Legal pages working

### ✅ **User Experience**
- [ ] Intuitive navigation
- [ ] Professional appearance
- [ ] Fast loading times
- [ ] Mobile responsive design
- [ ] Touch-friendly interface

### ✅ **Technical Requirements**
- [ ] No console errors
- [ ] All links working
- [ ] Forms validate properly
- [ ] Responsive breakpoints correct
- [ ] Cross-browser compatibility

### ✅ **Content Quality**
- [ ] Medical disclaimers present
- [ ] Evidence-based responses
- [ ] Professional tone
- [ ] Scientific citations included
- [ ] Ethical considerations addressed

## 🎯 **Demo Preparation**

### 3-Minute Demo Script:
1. **Introduction (15s)**: Show home page and explain NeuroCoach
2. **ASRS Screening (45s)**: Complete screening with Scenario A
3. **Results (30s)**: Show personalized results and interpretation
4. **AI Coaching (60s)**: Select coach and demonstrate conversation
5. **Resources (30s)**: Show resource library and legal compliance

### Key Demo Points:
- ✅ **4 ADHD scenarios** including new low-score scenario
- ✅ **AI coach personalization** (Ali/Alex selection)
- ✅ **Mobile optimization** for all devices
- ✅ **Professional legal compliance** (Terms/Privacy)
- ✅ **Evidence-based responses** with scientific citations

## 📞 **Support Information**

### For Issues:
- **Email**: support@neurocoach.dev
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check README.md for setup instructions

### Emergency Contacts:
- **WorkingEdge, Inc.**: (555) 123-4567
- **Dr. Alice Vo Edwards**: hello@workingedgeinc.com

---

## 🎉 **Testing Complete!**

Once you've completed all tests successfully, NeuroCoach is ready for the hackathon demo. The application includes:

- ✅ **4 comprehensive test scenarios**
- ✅ **AI coach personalization**
- ✅ **Mobile-responsive design**
- ✅ **Professional legal compliance**
- ✅ **Evidence-based ADHD coaching**
- ✅ **Complete user journey**

**Total Testing Time Estimate: 2-3 hours**

**Good luck with your hackathon demo!** 🚀
