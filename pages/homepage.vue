<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Revenue Operations Services</h1>
        <p>Scale your revenue engine with strategic automation, seamless integrations, and data-driven operations</p>
        <button class="cta-button">Schedule a Consultation</button>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">What's Included</h2>
        <p class="section-subtitle">Comprehensive revenue operations support</p>
        
        <div class="services-grid">
          <div 
            v-for="service in services" 
            :key="service.id"
            class="service-card"
            @mouseenter="showTooltip = service.id"
            @mouseleave="showTooltip = null"
          >
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            
            <!-- AI Query Tooltip -->
            <transition name="fade">
              <div v-if="showTooltip === service.id" class="ai-tooltip">
                <div class="tooltip-content">
                  <span class="tooltip-icon">🤖</span>
                  <span class="tooltip-text">Ask AR AI for more details</span>
                </div>
                <button 
                  class="ask-ai-btn"
                  @click="handleAskAI(service.query)"
                >
                  Ask AI
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Outcomes Section -->
    <section class="outcomes-section">
      <div class="container">
        <h2 class="section-title">Expected Outcomes</h2>
        <p class="section-subtitle">Measurable improvements across key operational metrics</p>
        
        <div class="outcomes-grid">
          <div 
            v-for="outcome in outcomes" 
            :key="outcome.id"
            class="outcome-card"
            @mouseenter="showTooltip = outcome.id"
            @mouseleave="showTooltip = null"
          >
            <div class="metric">{{ outcome.metric }}</div>
            <h3>{{ outcome.title }}</h3>
            <p>{{ outcome.description }}</p>
            
            <!-- AI Query Tooltip -->
            <transition name="fade">
              <div v-if="showTooltip === outcome.id" class="ai-tooltip">
                <div class="tooltip-content">
                  <span class="tooltip-icon">🤖</span>
                  <span class="tooltip-text">Ask AR AI for more details</span>
                </div>
                <button 
                  class="ask-ai-btn"
                  @click="handleAskAI(outcome.query)"
                >
                  Ask AI
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showTooltip = ref(null)

const services = [
  {
    id: 'crm',
    title: 'CRM Administration',
    description: 'Platform configuration, custom object creation, field management, user permissions, and ongoing system maintenance',
    query: 'Tell me about CRM Administration services and how it can help my business with platform configuration and management'
  },
  {
    id: 'workflow',
    title: 'Workflow Development',
    description: 'Custom automation build-out, trigger logic design, multi-step sequences, and conditional branching',
    query: 'Explain Workflow Development and automation capabilities for business processes'
  },
  {
    id: 'integration',
    title: 'Integration Management',
    description: 'API connections, data mapping, sync monitoring, error handling, and integration troubleshooting',
    query: 'What is Integration Management and how does it connect different business systems'
  }
]

const outcomes = [
  {
    id: 'time',
    metric: '30-50%',
    title: 'Time Savings',
    description: 'Reduction in manual data entry and repetitive workflows through automation',
    query: 'How can I achieve 30-50% time savings through automation in my business'
  },
  {
    id: 'sales',
    metric: '20-35%',
    title: 'Faster Sales Cycles',
    description: 'Decrease in time from lead to close through optimized processes',
    query: 'How to reduce sales cycle time by 20-35% with optimized processes'
  },
  {
    id: 'data',
    metric: '95%+',
    title: 'Data Accuracy',
    description: 'Improvement in data quality through validation and enrichment',
    query: 'What are the best practices for improving data accuracy to 95% or higher'
  }
]

const handleAskAI = (query) => {
  // Store query for the search page
  localStorage.setItem('aiQuery', JSON.stringify({
    query: query,
    timestamp: new Date().toISOString()
  }))
  
  // Navigate to search page
  // If using Vue Router: router.push({ name: 'Search', query: { q: query } })
  // For simple navigation:
  window.location.href = '/search.html?q=' + encodeURIComponent(query)
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.hero {
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
}

.hero-content h1 {
  font-size: 3rem;
  color: white;
  margin-bottom: 20px;
  font-weight: 700;
}

.hero-content p {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  background: white;
  color: #667eea;
  padding: 15px 40px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.services-section,
.outcomes-section {
  padding: 80px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  color: white;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 700;
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 50px;
}

.services-grid,
.outcomes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.service-card,
.outcome-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.service-card:hover,
.outcome-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.service-card h3,
.outcome-card h3 {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 15px;
  font-weight: 600;
}

.service-card p,
.outcome-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
}

.metric {
  font-size: 3rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 15px;
}

.ai-tooltip {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  z-index: 10;
  min-width: 200px;
}

.tooltip-content {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.tooltip-icon {
  font-size: 1.2rem;
}

.tooltip-text {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.ask-ai-btn {
  width: 100%;
  background: white;
  color: #0099ff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.ask-ai-btn:hover {
  background: #f0f0f0;
  transform: scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .services-grid,
  .outcomes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
