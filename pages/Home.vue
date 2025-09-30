<template>
  <div>
    <button class="nav-toggle" @click="toggleNav">☰</button>

    <div class="nav-overlay" :class="{ show: navOpen }" @click="closeNav"></div>
    <nav class="nav-slider" :class="{ open: navOpen }">
      <div class="nav-header">Quick Navigation</div>
      <ul class="nav-links">
        <li><a href="#problem" @click="closeNav">The Problem</a></li>
        <li><a href="#approach" @click="closeNav">Our Approach</a></li>
        <li><a href="#services" @click="closeNav">What's Included</a></li>
        <li><a href="#outcomes" @click="closeNav">Expected Outcomes</a></li>
        <li><a href="#pricing" @click="closeNav">Pricing</a></li>
        <li><a href="#contact" @click="closeNav">Contact Us</a></li>
      </ul>
    </nav>

    <div class="popup-overlay" :class="{ show: popupOpen }">
      <div class="popup-content" @click.stop>
        <button class="popup-close" @click="closePopup">×</button>
        <h3>Schedule Your Call</h3>
        <form @submit.prevent="handleSubmit">
          <input v-model="formData.name" type="text" placeholder="Your Name" required>
          <input v-model="formData.position" type="text" placeholder="Your Position" required>
          <input v-model="formData.company" type="text" placeholder="Company Name" required>
          <input v-model="formData.date" type="date" required>
          <input v-model="formData.time" type="time" required>
          <button type="submit" class="submit-btn">Schedule My Call!</button>
        </form>
      </div>
    </div>

    <section class="hero">
      <div class="hero-content">
        <h1>Revenue Operations Services</h1>
        <p>Scale your revenue engine with strategic automation, seamless integrations, and data-driven operations</p>
        <button class="cta-button" @click="openPopup">Schedule a Consultation</button>
      </div>
    </section>

    <section class="section problem-section" id="problem">
      <div class="container">
        <h2 class="section-title">The Problem</h2>
        <p class="section-subtitle">Most growing companies struggle with operational inefficiencies</p>
        <div class="problem-grid">
          <div class="problem-card">
            <h3>Disconnected Systems</h3>
            <p>Sales, marketing, and customer success teams operate in silos with fragmented data across multiple platforms.</p>
          </div>
          <div class="problem-card">
            <h3>Manual Workflows</h3>
            <p>Revenue teams spend countless hours on repetitive tasks instead of focusing on strategic initiatives.</p>
          </div>
          <div class="problem-card">
            <h3>Poor Data Quality</h3>
            <p>Incomplete or outdated data makes it impossible to forecast accurately or make informed decisions.</p>
          </div>
          <div class="problem-card">
            <h3>Lack of Visibility</h3>
            <p>Leadership lacks real-time insights into pipeline health and team performance.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section solution-section" id="approach">
      <div class="container">
        <h2 class="section-title">Our Approach</h2>
        <p class="section-subtitle">We build revenue operations infrastructure that scales with your business</p>
        <div class="solution-grid">
          <div v-for="(solution, index) in solutions" :key="index" class="solution-card">
            <div class="solution-number">{{ solution.number }}</div>
            <h3>{{ solution.title }}</h3>
            <p>{{ solution.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section services-section" id="services">
      <div class="container">
        <h2 class="section-title">What's Included</h2>
        <p class="section-subtitle">Comprehensive revenue operations support on a monthly retainer</p>
        <div class="services-grid">
          <div v-for="(service, index) in services" :key="index" 
               class="service-card" 
               :class="{ expanded: expandedService === index }"
               @click="toggleService(index)">
            <div class="service-header">
              <h3>{{ service.title }}</h3>
              <span class="toggle-icon">{{ expandedService === index ? '−' : '+' }}</span>
            </div>
            <p v-if="expandedService === index" class="service-description">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section benefits-section" id="outcomes">
      <div class="container">
        <h2 class="section-title">Expected Outcomes</h2>
        <p class="section-subtitle">Measurable improvements across key operational metrics</p>
        <div class="benefits-grid">
          <div v-for="(benefit, index) in benefits" :key="index" class="benefit-card">
            <div class="metric">{{ benefit.metric }}</div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section pricing-section" id="pricing">
      <div class="container">
        <h2 class="section-title">Monthly Retainer</h2>
        <p class="section-subtitle">Dedicated RevOps support with flexible engagement</p>
        <div class="pricing-container">
          <div class="pricing-card">
            <div class="price-header">
              <h3>RevOps Retainer</h3>
              <div class="price-tag">
                <span class="currency">$</span>3,500<span class="period">/month</span>
              </div>
            </div>
            <div class="price-body">
              <ul class="price-features">
                <li>Dedicated RevOps Specialist</li>
                <li>40 hours of strategic support per month</li>
                <li>CRM setup, configuration & optimization</li>
                <li>Custom workflow & automation development</li>
                <li>Tech stack integration & management</li>
                <li>Data operations & quality assurance</li>
                <li>Custom reporting & analytics dashboards</li>
                <li>Process documentation & training</li>
                <li>Monthly strategy & planning sessions</li>
                <li>Priority email & Slack support</li>
                <li>Quarterly business reviews</li>
              </ul>
            </div>
            <div class="price-footer">
              <button class="pricing-cta" @click="openPopup">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section" id="contact">
      <div class="cta-content">
        <h2>Ready to Scale Your Revenue Operations?</h2>
        <p>Let's discuss how we can build a more efficient, data-driven revenue engine for your business</p>
        <button class="cta-button-primary" @click="openPopup">Schedule a Call</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navOpen = ref(false)
const popupOpen = ref(false)
const expandedService = ref(null)
const formData = ref({
  name: '',
  position: '',
  company: '',
  date: '',
  time: ''
})

const solutions = [
  { number: '01', title: 'Revenue Audit & Strategy', description: 'Comprehensive assessment of your current tech stack, processes, and workflows to identify high-impact opportunities.' },
  { number: '02', title: 'Tech Stack Integration', description: 'Connect your CRM, marketing automation, and analytics tools into a unified ecosystem with seamless data flow.' },
  { number: '03', title: 'Process Automation', description: 'Design intelligent workflows that automate lead routing, data enrichment, follow-ups, and reporting.' },
  { number: '04', title: 'Data Infrastructure', description: 'Build robust data architecture with proper field mapping, validation rules, and governance policies.' },
  { number: '05', title: 'Analytics & Reporting', description: 'Create custom dashboards with real-time visibility into key metrics and pipeline health.' },
  { number: '06', title: 'Continuous Optimization', description: 'Ongoing monitoring, testing, and refinement of systems based on performance data.' }
]

const services = [
  { title: 'CRM Administration', description: 'Platform configuration, custom object creation, field management, user permissions, and ongoing system maintenance' },
  { title: 'Workflow Development', description: 'Custom automation build-out, trigger logic design, multi-step sequences, and conditional branching' },
  { title: 'Integration Management', description: 'API connections, data mapping, sync monitoring, error handling, and integration troubleshooting' },
  { title: 'Data Operations', description: 'Database hygiene, duplicate management, enrichment workflows, import/export processes, and migration support' },
  { title: 'Reporting & Analytics', description: 'Dashboard creation, custom report building, metric tracking, forecasting models, and data visualization' },
  { title: 'Lead Management', description: 'Lead scoring models, routing rules, qualification frameworks, and conversion optimization' },
  { title: 'Sales Enablement', description: 'Territory planning, quota management, sales process documentation, and performance tracking' },
  { title: 'Training & Support', description: 'Team onboarding, process documentation, best practices training, and ongoing technical support' }
]

const benefits = [
  { metric: '30-50%', title: 'Time Savings', description: 'Reduction in manual data entry and repetitive workflows through automation' },
  { metric: '20-35%', title: 'Faster Sales Cycles', description: 'Decrease in time from lead to close through optimized processes' },
  { metric: '95%+', title: 'Data Accuracy', description: 'Improvement in data quality through validation and enrichment' },
  { metric: '100%', title: 'Revenue Visibility', description: 'Complete transparency into pipeline health and performance metrics' }
]

const toggleNav = () => {
  navOpen.value = !navOpen.value
}

const closeNav = () => {
  navOpen.value = false
}

const openPopup = () => {
  popupOpen.value = true
}

const closePopup = () => {
  popupOpen.value = false
}

const toggleService = (index) => {
  expandedService.value = expandedService.value === index ? null : index
}

const handleSubmit = () => {
  const message = `Hi, I'd like to schedule a call for Revenue Operations Services.

*Details:*
- Name: ${formData.value.name}
- Position: ${formData.value.position}
- Company: ${formData.value.company}
- Preferred Date: ${formData.value.date}
- Preferred Time: ${formData.value.time}

Please schedule a call for me. Thank you!`

  const whatsappUrl = `https://wa.me/919991183530?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
  
  closePopup()
  formData.value = { name: '', position: '', company: '', date: '', time: '' }
}
</script>

<style scoped>
/* Paste all the CSS from the HTML document here */
</style>
