<template>
  <div class="homepage">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">AR Solutions</div>
        <div class="nav-links">
          <a href="#services">Services</a>
          <a href="#outcomes">Outcomes</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      <div class="hero-content">
        <div class="badge">Revenue Operations Excellence</div>
        <h1>Transform Your Revenue Engine</h1>
        <p>Scale your business with strategic automation, seamless integrations, and data-driven operations that deliver measurable results</p>
        <div class="hero-buttons">
          <button class="cta-button primary">Get Started</button>
          <button class="cta-button secondary">Watch Demo</button>
        </div>
        <div class="trust-indicators">
          <div class="indicator">
            <span class="number">500+</span>
            <span class="label">Clients Served</span>
          </div>
          <div class="indicator">
            <span class="number">95%</span>
            <span class="label">Satisfaction Rate</span>
          </div>
          <div class="indicator">
            <span class="number">3.5M+</span>
            <span class="label">Hours Saved</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Our Services</span>
          <h2 class="section-title">Comprehensive Revenue Operations</h2>
          <p class="section-subtitle">End-to-end solutions designed to streamline your operations and accelerate growth</p>
        </div>
        
        <div class="services-grid">
          <div 
            v-for="service in services" 
            :key="service.id"
            class="service-card"
            @mouseenter="showTooltip = service.id"
            @mouseleave="showTooltip = null"
          >
            <div class="service-icon">{{ service.icon }}</div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            
            <!-- Professional AI Tooltip -->
            <transition name="slide-up">
              <div v-if="showTooltip === service.id" class="ai-popup" @click.stop>
                <div class="popup-header">
                  <div class="ai-avatar">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="popup-title">
                    <span class="title">AR AI Assistant</span>
                    <span class="subtitle">Powered by Advanced ML</span>
                  </div>
                </div>
                <div class="popup-body">
                  <p>Get instant, detailed insights about {{ service.title }} tailored to your business needs.</p>
                </div>
                <button 
                  class="popup-cta"
                  @click="handleAskAI(service.query)"
                >
                  <span>Ask AI About This</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3L13 8L8 13M13 8H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Outcomes Section -->
    <section id="outcomes" class="outcomes-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Proven Results</span>
          <h2 class="section-title">Measurable Business Impact</h2>
          <p class="section-subtitle">Real outcomes that drive sustainable growth and operational excellence</p>
        </div>
        
        <div class="outcomes-grid">
          <div 
            v-for="outcome in outcomes" 
            :key="outcome.id"
            class="outcome-card"
            @mouseenter="showTooltip = outcome.id"
            @mouseleave="showTooltip = null"
          >
            <div class="outcome-content">
              <div class="metric-container">
                <div class="metric">{{ outcome.metric }}</div>
                <div class="metric-badge">{{ outcome.badge }}</div>
              </div>
              <h3>{{ outcome.title }}</h3>
              <p>{{ outcome.description }}</p>
            </div>
            
            <!-- Professional AI Tooltip -->
            <transition name="slide-up">
              <div v-if="showTooltip === outcome.id" class="ai-popup" @click.stop>
                <div class="popup-header">
                  <div class="ai-avatar">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="popup-title">
                    <span class="title">AR AI Assistant</span>
                    <span class="subtitle">Powered by Advanced ML</span>
                  </div>
                </div>
                <div class="popup-body">
                  <p>Discover how to achieve {{ outcome.metric }} {{ outcome.title.toLowerCase() }} for your organization.</p>
                </div>
                <button 
                  class="popup-cta"
                  @click="handleAskAI(outcome.query)"
                >
                  <span>Ask AI About This</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3L13 8L8 13M13 8H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="contact" class="cta-section">
      <div class="cta-container">
        <h2>Ready to Transform Your Operations?</h2>
        <p>Join hundreds of companies that have scaled their revenue operations with our proven solutions</p>
        <button class="cta-button primary large">Schedule Your Strategy Call</button>
      </div>
    </section>
  </div>
</template>

<script setup>
const router = useRouter()
const showTooltip = ref(null)

const services = [
  {
    id: 'crm',
    icon: '⚙️',
    title: 'CRM Administration',
    description: 'Complete platform configuration, custom object creation, and ongoing system maintenance to keep your CRM operating at peak efficiency.',
    query: 'Tell me about CRM Administration services and how it can help my business with platform configuration and management'
  },
  {
    id: 'workflow',
    icon: '🔄',
    title: 'Workflow Automation',
    description: 'Intelligent automation that eliminates manual tasks, with custom triggers, multi-step sequences, and conditional logic.',
    query: 'Explain Workflow Development and automation capabilities for business processes'
  },
  {
    id: 'integration',
    icon: '🔗',
    title: 'Integration Management',
    description: 'Seamless API connections, data mapping, and sync monitoring across your entire tech stack for unified operations.',
    query: 'What is Integration Management and how does it connect different business systems'
  },
  {
    id: 'data',
    icon: '📊',
    title: 'Data Operations',
    description: 'Database hygiene, duplicate management, enrichment workflows, and migration support for pristine data quality.',
    query: 'How do you ensure data quality and what data operations services do you provide'
  },
  {
    id: 'analytics',
    icon: '📈',
    title: 'Analytics & Reporting',
    description: 'Custom dashboards, metric tracking, forecasting models, and data visualization for actionable insights.',
    query: 'What analytics and reporting capabilities do you offer for business intelligence'
  },
  {
    id: 'enablement',
    icon: '🎯',
    title: 'Sales Enablement',
    description: 'Territory planning, quota management, process documentation, and performance tracking to empower your sales team.',
    query: 'Tell me about sales enablement services and how they improve team performance'
  }
]

const outcomes = [
  {
    id: 'time',
    metric: '30-50%',
    badge: 'Time Saved',
    title: 'Increased Efficiency',
    description: 'Dramatic reduction in manual data entry and repetitive workflows through intelligent automation',
    query: 'How can I achieve 30-50% time savings through automation in my business'
  },
  {
    id: 'sales',
    metric: '20-35%',
    badge: 'Faster Close',
    title: 'Accelerated Sales Cycles',
    description: 'Shorter time from lead to close through optimized processes and automated workflows',
    query: 'How to reduce sales cycle time by 20-35% with optimized processes'
  },
  {
    id: 'data',
    metric: '95%+',
    badge: 'Accuracy',
    title: 'Data Quality',
    description: 'Superior data accuracy through validation, enrichment, and automated quality controls',
    query: 'What are the best practices for improving data accuracy to 95% or higher'
  },
  {
    id: 'visibility',
    metric: '100%',
    badge: 'Transparency',
    title: 'Revenue Visibility',
    description: 'Complete real-time transparency into pipeline health, performance metrics, and forecasting',
    query: 'How can I achieve complete revenue visibility and pipeline transparency'
  }
]

const handleAskAI = (query) => {
  router.push({
    path: '/searchengine',
    query: { q: query }
  })
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.homepage {
  min-height: 100vh;
  background: #0f0f23;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #ffffff;
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(15, 15, 35, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  padding: 20px 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 40px;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #667eea;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 40px 80px;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: -200px;
  left: -100px;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  bottom: -150px;
  right: -100px;
  animation-delay: -5s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, -50px) scale(1.1); }
  66% { transform: translate(-50px, 50px) scale(0.9); }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 50px;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 30px;
  letter-spacing: 0.5px;
}

.hero-content h1 {
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #a8b2d1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-content p {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 60px;
}

.cta-button {
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cta-button.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cta-button.large {
  padding: 20px 40px;
  font-size: 1.1rem;
}

.trust-indicators {
  display: flex;
  gap: 60px;
  justify-content: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.indicator .number {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.indicator .label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Sections */
.services-section,
.outcomes-section {
  padding: 120px 40px;
  position: relative;
}

.services-section {
  background: linear-gradient(180deg, #0f0f23 0%, #1a1a3e 100%);
}

.outcomes-section {
  background: linear-gradient(180deg, #1a1a3e 0%, #0f0f23 100%);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 50px;
  color: #667eea;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: white;
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.service-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
}

.service-card:hover::before {
  opacity: 1;
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.service-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: white;
  position: relative;
  z-index: 1;
}

.service-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

/* Outcomes Grid */
.outcomes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.outcome-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.outcome-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.outcome-card:hover {
  transform: translateY(-8px);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
}

.outcome-card:hover::before {
  opacity: 1;
}

.outcome-content {
  position: relative;
  z-index: 1;
}

.metric-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.metric {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.metric-badge {
  padding: 4px 12px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.outcome-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: white;
}

.outcome-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-size: 1rem;
}

/* Professional AI Popup */
.ai-popup {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: linear-gradient(135deg, #1e1e3f 0%, #2d2d5f 100%);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  z-index: 10;
  backdrop-filter: blur(20px);
}

.popup-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.ai-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.ai-avatar svg {
  width: 24px;
  height: 24px;
}

.popup-title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.popup-title .title {
  font-size: 1rem;
  font-weight: 700;
  color: white;
}

.popup-title .subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.popup-body {
  margin-bottom: 16px;
}

.popup-body p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.popup-cta {
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.popup-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.popup-cta svg {
  transition: transform 0.3s ease;
}

.popup-cta:hover svg {
  transform: translateX(4px);
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* CTA Section */
.cta-section {
  padding: 120px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.cta-container h2 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: white;
}

.cta-container p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  
  .trust-indicators {
    flex-direction: column;
    gap: 30px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .services-grid,
  .outcomes-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-container h2 {
    font-size: 2rem;
  }
  
  .cta-container p {
    font-size: 1rem;
  }
  
  .navbar {
    padding: 15px 0;
  }
  
  .nav-container {
    padding: 0 20px;
  }
  
  .hero {
    padding: 100px 20px 60px;
  }
  
  .services-section,
  .outcomes-section,
  .cta-section {
    padding: 80px 20px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .metric {
    font-size: 2.5rem;
  }
  
  .service-card,
  .outcome-card {
    padding: 30px 20px;
  }
  
  .ai-popup {
    left: 10px;
    right: 10px;
    bottom: 10px;
    padding: 16px;
  }
}
</style>
