<template>
  <div class="search-page">
    <!-- Header -->
    <header class="search-header">
      <div class="header-content">
        <h1 class="logo">AR AI Assistant</h1>
        <button class="back-btn" @click="goBack">← Back to Home</button>
      </div>
    </header>

    <!-- Search Bar -->
    <div class="search-container">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Ask me anything about Revenue Operations..."
          @keyup.enter="handleSearch"
          class="search-input"
        />
        <button @click="handleSearch" class="search-btn">
          Search
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>AR AI is thinking...</p>
    </div>

    <!-- Results -->
    <div v-if="showResults && !isLoading" class="results-container">
      <div class="result-card">
        <div class="ai-badge">
          <span class="ai-icon">🤖</span>
          <span>AR AI Response</span>
        </div>
        
        <h2 class="result-title">{{ currentQuery }}</h2>
        
        <div class="result-content">
          <p v-html="aiResponse"></p>
        </div>

        <!-- Related Questions -->
        <div v-if="relatedQuestions.length > 0" class="related-section">
          <h3>Related Questions</h3>
          <div class="related-questions">
            <button
              v-for="(question, index) in relatedQuestions"
              :key="index"
              @click="askQuestion(question)"
              class="related-btn"
            >
              {{ question }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-if="!showResults && !isLoading && hasSearched" class="no-results">
      <p>No results found. Please try a different query.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const searchQuery = ref('')
const currentQuery = ref('')
const aiResponse = ref('')
const isLoading = ref(false)
const showResults = ref(false)
const hasSearched = ref(false)
const relatedQuestions = ref([])

// Training data for AR AI
const trainingData = {
  'crm administration': {
    response: `<strong>CRM Administration Services</strong><br><br>
    Our CRM Administration service provides comprehensive management of your Customer Relationship Management platform. We handle:<br><br>
    
    <strong>Platform Configuration:</strong> We set up and customize your CRM to match your business processes, including custom fields, page layouts, and record types.<br><br>
    
    <strong>User Management:</strong> We manage user permissions, roles, and access controls to ensure data security and proper workflow.<br><br>
    
    <strong>Custom Objects:</strong> We create custom objects and relationships to track unique business data that standard CRM objects don't cover.<br><br>
    
    <strong>Ongoing Maintenance:</strong> Regular system updates, bug fixes, and optimization to keep your CRM running smoothly.<br><br>
    
    <strong>Benefits:</strong> A well-administered CRM improves data quality, increases user adoption, and provides better insights into your customer relationships. Our clients typically see a 40% increase in CRM usage and 30% improvement in data accuracy.`,
    related: [
      'How much does CRM administration cost?',
      'Which CRM platforms do you support?',
      'How long does CRM setup take?'
    ]
  },
  
  'workflow development': {
    response: `<strong>Workflow Development & Automation</strong><br><br>
    Transform your manual processes into intelligent, automated workflows that save time and reduce errors.<br><br>
    
    <strong>Custom Automation:</strong> We build workflows that automatically handle repetitive tasks like data entry, email notifications, task assignments, and record updates.<br><br>
    
    <strong>Trigger Logic:</strong> Set up sophisticated rules that trigger actions based on specific conditions, such as lead score changes, deal stage movements, or customer behaviors.<br><br>
    
    <strong>Multi-Step Sequences:</strong> Create complex automation sequences that guide leads through nurture campaigns or onboard new customers automatically.<br><br>
    
    <strong>Conditional Branching:</strong> Implement if-then logic that adapts workflows based on customer data, ensuring personalized experiences at scale.<br><br>
    
    <strong>Impact:</strong> Our workflow automation typically saves teams 30-50% of their time on manual tasks, allowing them to focus on strategic activities that drive revenue.`,
    related: [
      'Can workflows integrate with email?',
      'How complex can automation workflows be?',
      'What platforms support workflow automation?'
    ]
  },
  
  'integration management': {
    response: `<strong>Integration Management Services</strong><br><br>
    Connect all your business tools into a unified ecosystem where data flows seamlessly between systems.<br><br>
    
    <strong>API Connections:</strong> We build secure connections between your CRM, marketing automation, analytics, support, and other business tools.<br><br>
    
    <strong>Data Mapping:</strong> We ensure data fields are correctly mapped between systems so information stays consistent and accurate across platforms.<br><br>
    
    <strong>Sync Monitoring:</strong> Continuous monitoring of data synchronization to catch and resolve issues before they impact your business.<br><br>
    
    <strong>Error Handling:</strong> Robust error detection and resolution processes to maintain data integrity.<br><br>
    
    <strong>Common Integrations:</strong> Salesforce, HubSpot, Marketo, Slack, Zendesk, Google Analytics, Zapier, and custom APIs.<br><br>
    
    <strong>Results:</strong> Integrated systems eliminate data silos, reduce manual data entry by 60-80%, and provide a complete view of customer interactions.`,
    related: [
      'How many integrations can you set up?',
      'Do integrations work in real-time?',
      'What if an integration breaks?'
    ]
  },
  
  'time savings': {
    response: `<strong>Achieving 30-50% Time Savings Through Automation</strong><br><br>
    Our automation solutions help teams reclaim significant time by eliminating manual, repetitive tasks.<br><br>
    
    <strong>Key Time-Saving Areas:</strong><br><br>
    
    <strong>1. Data Entry Automation:</strong> Automatically capture and update customer information from forms, emails, and other sources - saving 10-15 hours per week for sales teams.<br><br>
    
    <strong>2. Lead Routing:</strong> Instant, rule-based lead assignment eliminates manual distribution - reducing response time from hours to minutes.<br><br>
    
    <strong>3. Report Generation:</strong> Automated dashboards and scheduled reports eliminate hours of manual data compilation each week.<br><br>
    
    <strong>4. Follow-up Sequences:</strong> Automated email and task reminders ensure no lead falls through the cracks without manual tracking.<br><br>
    
    <strong>ROI Example:</strong> For a 10-person sales team spending 15 hours/week on manual tasks, automation can save 150 hours monthly - equivalent to hiring an additional team member.`,
    related: [
      'What tasks can be automated?',
      'How quickly can I see time savings?',
      'Is automation difficult to maintain?'
    ]
  },
  
  'sales cycle': {
    response: `<strong>Reducing Sales Cycle Time by 20-35%</strong><br><br>
    Optimized processes and automation significantly accelerate your sales cycle from initial contact to closed deal.<br><br>
    
    <strong>How We Reduce Sales Cycle Time:</strong><br><br>
    
    <strong>1. Faster Lead Response:</strong> Automated lead routing and instant notifications ensure leads are contacted within minutes, not hours.<br><br>
    
    <strong>2. Streamlined Qualification:</strong> Lead scoring models automatically identify high-value prospects, so sales focuses on the right opportunities.<br><br>
    
    <strong>3. Automated Follow-ups:</strong> No more manual reminders - the system automatically schedules and tracks follow-up activities.<br><br>
    
    <strong>4. Better Visibility:</strong> Real-time pipeline dashboards help identify and resolve bottlenecks quickly.<br><br>
    
    <strong>5. Improved Handoffs:</strong> Seamless transitions between marketing, sales, and customer success with all context preserved.<br><br>
    
    <strong>Real Impact:</strong> Clients typically see sales cycles shorten from 60 days to 40-45 days, dramatically improving cash flow and revenue predictability.`,
    related: [
      'How do you measure sales cycle time?',
      'What causes long sales cycles?',
      'Can automation help with complex B2B sales?'
    ]
  },
  
  'data accuracy': {
    response: `<strong>Improving Data Accuracy to 95%+</strong><br><br>
    Clean, accurate data is the foundation of effective revenue operations. Here's how we achieve exceptional data quality:<br><br>
    
    <strong>Data Quality Strategies:</strong><br><br>
    
    <strong>1. Validation Rules:</strong> Implement field-level validation to prevent bad data from entering your system in the first place.<br><br>
    
    <strong>2. Automated Enrichment:</strong> Connect to data providers to automatically fill in missing information like company size, industry, and contact details.<br><br>
    
    <strong>3. Duplicate Management:</strong> Set up rules and workflows to identify and merge duplicate records automatically.<br><br>
    
    <strong>4. Regular Audits:</strong> Scheduled data quality checks identify issues before they become problems.<br><br>
    
    <strong>5. Standardization:</strong> Enforce consistent formatting for fields like phone numbers, addresses, and company names.<br><br>
    
    <strong>Impact:</strong> Accurate data leads to better forecasting, more personalized customer experiences, and confident decision-making. Poor data costs businesses an average of 20-30% in revenue opportunities.`,
    related: [
      'How do you clean existing data?',
      'What causes data quality problems?',
      'How often should data be cleaned?'
    ]
  },
  
  'pricing': {
    response: `<strong>Revenue Operations Retainer Pricing</strong><br><br>
    Our monthly retainer provides dedicated RevOps support with flexible engagement:<br><br>
    
    <strong>$3,500 per month includes:</strong><br><br>
    
    • Dedicated RevOps Specialist assigned to your account<br>
    • 40 hours of strategic support each month<br>
    • CRM setup, configuration & ongoing optimization<br>
    • Custom workflow & automation development<br>
    • Tech stack integration & management<br>
    • Data operations & quality assurance<br>
    • Custom reporting & analytics dashboards<br>
    • Process documentation & training<br>
    • Monthly strategy & planning sessions<br>
    • Priority email & Slack support<br>
    • Quarterly business reviews<br><br>
    
    <strong>Why Retainer Model?</strong><br>
    Unlike project-based work, our retainer ensures continuous optimization and support as your business evolves. You get a trusted partner who understands your systems deeply.<br><br>
    
    <strong>ROI:</strong> Clients typically see 5-10x ROI through time savings, increased revenue, and improved efficiency within 3-6 months.`,
    related: [
      'Can I customize the retainer?',
      'What if I need more than 40 hours?',
      'Is there a minimum commitment?'
    ]
  }
}

const getAIResponse = (query) => {
  const lowerQuery = query.toLowerCase()
  
  // Find matching training data
  for (const [key, data] of Object.entries(trainingData)) {
    if (lowerQuery.includes(key)) {
      return {
        response: data.response,
        related: data.related
      }
    }
  }
  
  // Default response if no match
  return {
    response: `<strong>Thank you for your question!</strong><br><br>
    While I don't have specific information about "${query}" in my training data yet, I can help you with:<br><br>
    
    • CRM Administration and platform management<br>
    • Workflow Development and automation<br>
    • Integration Management between systems<br>
    • Time-saving automation strategies<br>
    • Sales cycle optimization<br>
    • Data accuracy improvements<br>
    • Pricing and service details<br><br>
    
    Please try asking about one of these topics, or contact us directly for personalized assistance!`,
    related: [
      'Tell me about CRM Administration services',
      'How can I achieve 30-50% time savings?',
      'What is your pricing structure?'
    ]
  }
}

const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  
  currentQuery.value = searchQuery.value
  isLoading.value = true
  showResults.value = false
  hasSearched.value = true
  
  // Simulate AI processing time
  setTimeout(() => {
    const result = getAIResponse(searchQuery.value)
    aiResponse.value = result.response
    relatedQuestions.value = result.related
    isLoading.value = false
    showResults.value = true
  }, 1500)
}

const askQuestion = (question) => {
  searchQuery.value = question
  handleSearch()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goBack = () => {
  // If using Vue Router: router.push('/')
  window.location.href = '/'
}

// Check for query from homepage on mount
onMounted(() => {
  // Check URL parameter
  const urlQuery = route.query.q
  if (urlQuery) {
    searchQuery.value = decodeURIComponent(urlQuery)
    handleSearch()
    return
  }
  
  // Check localStorage
  const storedQuery = localStorage.getItem('aiQuery')
  if (storedQuery) {
    const queryData = JSON.parse(storedQuery)
    searchQuery.value = queryData.query
    handleSearch()
    localStorage.removeItem('aiQuery')
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.search-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #312e81 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.search-header {
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.search-container {
  max-width: 800px;
  margin: 60px auto 40px;
  padding: 0 20px;
}

.search-box {
  display: flex;
  gap: 10px;
  background: white;
  border-radius: 50px;
  padding: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.search-input {
  flex: 1;
  border: none;
  padding: 15px 25px;
  font-size: 1.1rem;
  outline: none;
  background: transparent;
}

.search-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 35px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.loading-container {
  text-align: center;
  padding: 60px 20px;
  color: white;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-container p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

.results-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.result-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.ai-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.ai-icon {
  font-size: 1.2rem;
}

.result-title {
  font-size: 1.8rem;
  color: #1e3a8a;
  margin-bottom: 25px;
  font-weight: 700;
}

.result-conten
