<template>
  <div id="app">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Revenue Operations Services</h1>
        <p>Scale your revenue engine with strategic automation, seamless integrations, and data-driven operations</p>
        <button @click="showPopup = true" class="cta-button">Schedule a Consultation</button>
      </div>
    </section>

    <!-- Problem Section -->
    <section class="section problem-section">
      <div class="container">
        <h2 class="section-title">The Problem</h2>
        <p class="section-subtitle">Most growing companies struggle with operational inefficiencies that directly impact revenue growth</p>
        <div class="problem-grid">
          <div class="problem-card" v-for="problem in problems" :key="problem.title">
            <h3>{{ problem.title }}</h3>
            <p>{{ problem.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section services-section">
      <div class="container">
        <h2 class="section-title">What's Included</h2>
        <p class="section-subtitle">Comprehensive revenue operations support on a monthly retainer basis</p>
        <div class="services-grid">
          <div class="service-card" v-for="(service, index) in services" :key="service.title">
            <div class="service-header" @click="toggleService(index)" :aria-expanded="service.expanded">
              <div class="service-icon-title">
                <div class="service-icon" :class="{ active: service.expanded }" aria-hidden>
                  <component :is="service.svg" />
                </div>
                <h3>{{ service.title }}</h3>
              </div>

              <svg class="chevron" :class="{ expanded: service.expanded }" fill="#64748b" viewBox="0 0 24 24" aria-hidden>
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41Z"/>
              </svg>
            </div>
            <div class="service-content" :class="{ expanded: service.expanded }">
              <p>{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="section pricing-section">
      <div class="container">
        <h2 class="section-title">Monthly Retainer</h2>
        <p class="section-subtitle">Dedicated RevOps support with flexible engagement</p>
        <div class="pricing-container">
          <div class="pricing-card">
            <div class="price-header">
              <h3>RevOps Retainer</h3>
              <div class="price-tag">
                <span style="font-size: 0.5em; vertical-align: top;">$</span>3,500<span style="font-size: 0.4em; font-weight: 400;">/month</span>
              </div>
            </div>
            <ul class="price-features">
              <li v-for="feature in features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Scale Your Revenue Operations?</h2>
          <p>Let's discuss how we can build a more efficient, data-driven revenue engine for your business</p>
          <button @click="showPopup = true" class="cta-button">Schedule a Call</button>
        </div>
      </div>
    </section>

    <!-- WhatsApp Popup -->
    <div v-if="showPopup" class="whatsapp-popup" @click.self="closePopup">
      <div class="popup-content" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
        <button class="close-btn" @click="closePopup" aria-label="Close">
          <svg width="24" height="24" fill="#64748b" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
          </svg>
        </button>
        <div class="popup-header">
          <h2 id="popupTitle">Schedule Your Consultation</h2>
          <p>Fill in your details and we'll connect on WhatsApp</p>
        </div>
        <form @submit.prevent="sendWhatsApp" novalidate>
          <div class="form-group">
            <label for="name">Your Name *</label>
            <input id="name" type="text" v-model="formData.name" required placeholder="John Doe">
          </div>

          <div class="form-group">
            <label for="position">Position *</label>
            <input id="position" type="text" v-model="formData.position" required placeholder="CEO, CTO, etc.">
          </div>

          <div class="form-group">
            <label for="company">Company Name *</label>
            <input id="company" type="text" v-model="formData.company" required placeholder="Your Company">
          </div>

          <div class="form-group">
            <label for="date">Preferred Date *</label>
            <input id="date" type="date" v-model="formData.date" required :min="today">
          </div>

          <div class="form-group">
            <label for="time">Preferred Time *</label>
            <select id="time" v-model="formData.time" required>
              <option value="">Select a time</option>
              <option v-for="t in times" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>

          <button type="submit" class="whatsapp-btn" :disabled="sending">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L2 22l5.71-.97A9.91 9.91 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2m1.98 15.64c-.44.47-1.26 1.07-2.07 1.11c-.87.05-1.22.04-2.45-.5c-1.22-.54-2.42-1.67-3.07-2.87c-.64-1.2-.68-2.2-.69-2.44c-.01-.24.2-.6.45-.78c.13-.09.3-.15.49-.27c.18-.11.38-.27.56-.4c.18-.13.36-.12.61.03c.25.14.98.66 1.2.79c.22.13.36.19.52.32c.16.13.32.11.54-.06c.22-.18.95-.97 1.15-1.31c.2-.34.04-.52-.15-.72c-.19-.2-1.63-1.84-1.88-2.08c-.25-.23-.4-.33-.58-.42c-.18-.09-.36-.09-.52-.09c-.16 0-.34.03-.51.03c-.17 0-.45.06-.69.26c-.24.2-.92.89-.92 2.18c0 1.29.94 3.12 2.13 4.59c1.19 1.47 3.65 3.19 6.04 3.46c1.53.17 2.21-.22 2.42-.39c.21-.17 1.24-1.01 1.41-1.5c.17-.49.17-.9.12-1.03c-.05-.13-.18-.2-.38-.33c-.2-.13-1.16-.56-1.6-.9Z"/>
            </svg>
            <span v-if="!sending">Send on WhatsApp</span>
            <span v-else>Opening WhatsApp...</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const showPopup = ref(false)
const sending = ref(false)

const problems = ref([
  { title: 'Fragmented systems', description: 'Multiple tools with poor integrations lead to lost leads and manual work.' },
  { title: 'Data inconsistency', description: 'Sales, marketing, and finance metrics are not aligned across systems.' },
  { title: 'Slow deal velocity', description: 'Operational blockers slow down the sales funnel and increase churn.' },
  { title: 'Limited automation', description: 'Repetitive tasks consume time that could be spent on strategy.' }
])

// SVG components as inline render functions
const SvgSettings = {
  render() {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
        <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.03-.32.07-.64.07-.97c0-.33-.04-.65-.07-.97l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.03.32-.07.65-.07.97c0 .33.04.65.07.97l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.13-.22.07-.49-.12-.64l-2.11-1.65Z"/>
      </svg>
    )
  }
}

const SvgZap = {
  render() {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
        <path d="M11 15H6l7-14v8h5l-7 14v-8Z"/>
      </svg>
    )
  }
}

const SvgIntegration = {
  render() {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
        <path d="M8.5 12A1.5 1.5 0 0 0 7 13.5A1.5 1.5 0 0 0 8.5 15h8a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5h-8m0-6A1.5 1.5 0 0 0 7 7.5A1.5 1.5 0 0 0 8.5 9h8A1.5 1.5 0 0 0 18 7.5A1.5 1.5 0 0 0 16.5 6h-8M4 5a1 1 0 0 1 1-1a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1a1 1 0 0 1-1-1V5m16 0v14a1 1 0 0 1-1 1a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1a1 1 0 0 1 1 1Z"/>
      </svg>
    )
  }
}

const SvgDatabase = {
  render() {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
        <path d="M12 3C7 3 3 4.79 3 7s4 4 9 4s9-1.79 9-4s-4-4-9-4m0 9c-5 0-9-1.79-9-4v3c0 2.21 4 4 9 4s9-1.79 9-4V8c0 2.21-4 4-9 4m0 7c-5 0-9-1.79-9-4v3c0 2.21 4 4 9 4s9-1.79 9-4v-3c0 2.21-4 4-9 4Z"/>
      </svg>
    )
  }
}

const SvgAnalytics = {
  render() {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2v7m4 0h-2V7h2v10m4 0h-2v-4h2v4Z"/>
      </svg>
    )
  }
}

const SvgTarget = {
  render() {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
        <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 2a8 8 0 0 1 8 8a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8m0 2a6 6 0 0 0-6 6a6 6 0 0 0 6 6a6 6 0 0 0 6-6a6 6 0 0 0-6-6m0 2a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2Z"/>
      </svg>
    )
  }
}

const SvgGrowth = {
  render() {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
        <path d="M16 6l2.29 2.29l-4.88 4.88l-4-4L2 16.59L3.41 18l6-6l4 4l6.3-6.29L22 12V6h-6Z"/>
      </svg>
    )
  }
}

const SvgBook = {
  render() {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-5 14H7v-2h7v2m3-4H7v-2h10v2m0-4H7V7h10v2Z"/>
      </svg>
    )
  }
}

const services = ref([
  { title: 'Systems & Automation', icon: 'settings', svg: SvgSettings, description: 'Audit and automate core processes across sales, marketing, and customer success.', expanded: false },
  { title: 'Workflow Automation', icon: 'zap', svg: SvgZap, description: 'Build automations to remove manual handoffs and accelerate deal velocity.', expanded: false },
  { title: 'Integrations', icon: 'integration', svg: SvgIntegration, description: 'Connect CRMs, marketing tools, analytics, and billing to create a single source of truth.', expanded: false },
  { title: 'Data & Warehouse', icon: 'database', svg: SvgDatabase, description: 'Centralise data and implement reliable pipelines and warehouse design.', expanded: false },
  { title: 'Reporting & Analytics', icon: 'analytics', svg: SvgAnalytics, description: 'Build dashboards and measurement frameworks for revenue operations.', expanded: false },
  { title: 'Sales Enablement', icon: 'target', svg: SvgTarget, description: 'Implement playbooks, SLA definitions, and deal desk processes to improve conversion.', expanded: false },
  { title: 'Growth Operations', icon: 'growth', svg: SvgGrowth, description: 'Support growth experiments with tagging, cohort analysis and instrumentation.', expanded: false },
  { title: 'Training & Documentation', icon: 'book', svg: SvgBook, description: 'Operational runbooks, onboarding flows and documentation for sustained scale.', expanded: false }
])

const features = ref([
  'Dedicated RevOps lead (40 hrs/month)',
  'Integration & automation sprints',
  'Weekly reporting & dashboards',
  'Quarterly strategy reviews',
  'Playbooks, runbooks & training'
])

const times = ref(['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'])

const formData = reactive({ name: '', position: '', company: '', date: '', time: '' })

const today = computed(() => {
  const d = new Date()
  const iso = d.toISOString().split('T')[0]
  return iso
})

function toggleService(i) {
  services.value[i].expanded = !services.value[i].expanded
}

function closePopup() {
  showPopup.value = false
}

async function sendWhatsApp() {
  // Basic validation
  if (!formData.name || !formData.position || !formData.company || !formData.date || !formData.time) {
    alert('Please complete all fields before sending.')
    return
  }

  sending.value = true

  const phone = '919991183530' // target number
  const message = `Hi, my name is ${formData.name} ( ${formData.position} at ${formData.company} ). I'd like to schedule a RevOps consultation on ${formData.date} at ${formData.time}. Please confirm availability.`

  // Use wa.me / api.whatsapp.com link
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`

  // Open WhatsApp in new tab/window
  window.open(url, '_blank')

  // Reset form after a short delay
  setTimeout(() => {
    formData.name = ''
    formData.position = ''
    formData.company = ''
    formData.date = ''
    formData.time = ''
    sending.value = false
    showPopup.value = false
  }, 800)
}
</script>

<style scoped>
/* --- Copy of your existing styles, slightly tuned and scoped --- */
*{box-sizing:border-box}
:root{--blue-900:#1e3a8a;--blue-500:#3b82f6}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica',Arial,sans-serif;margin:0;color:#1a202c}

.hero{background:linear-gradient(135deg,var(--blue-900) 0%,var(--blue-500) 100%);color:#fff;padding:80px 20px 64px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-50%;right:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:50px 50px;animation:float 22s linear infinite}
@keyframes float{0%{transform:translate(0,0) rotate(0deg)}100%{transform:translate(-50px,-50px) rotate(360deg)}}
.hero-content{max-width:900px;margin:0 auto;position:relative;z-index:1}
.hero h1{font-size:clamp(1.6rem,5vw,3.25rem);margin-bottom:18px;font-weight:700}
.hero p{font-size:clamp(0.95rem,2.5vw,1.15rem);margin-bottom:28px;opacity:.95;line-height:1.6}
.cta-button{display:inline-block;padding:12px 36px;background:#fff;color:var(--blue-900);border-radius:8px;font-weight:600;box-shadow:0 6px 18px rgba(0,0,0,0.12);border:none;cursor:pointer}
.cta-button:hover{transform:translateY(-3px)}

.container{max-width:1100px;margin:0 auto;padding:0 20px}
.section{padding:64px 20px}
.section-title{text-align:center;font-size:clamp(1.6rem,4vw,2.25rem);margin-bottom:12px;color:#1a202c}
.section-subtitle{text-align:center;color:#64748b;margin-bottom:48px;max-width:720px;margin-left:auto;margin-right:auto;line-height:1.6}

.problem-section{background:#f8fafc;border-top:1px solid #e2e8f0}
.problem-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin-top:28px}
.problem-card{background:#fff;padding:20px;border-radius:10px;border:1px solid #e2e8f0;transition:all .25s ease}
.problem-card:hover{transform:translateY(-6px);box-shadow:0 8px 22px rgba(0,0,0,0.06)}
.problem-card h3{font-size:1.05rem;margin-bottom:10px}
.problem-card p{color:#475569;line-height:1.6;font-size:.95rem}

.services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-top:24px}
.service-card{background:#fff;border-radius:10px;border:1px solid #e2e8f0;overflow:hidden;transition:all .25s ease}
.service-card:hover{border-color:var(--blue-500);box-shadow:0 10px 30px rgba(59,130,246,0.12);transform:translateY(-4px)}
.service-header{padding:18px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,#f8fafc 0%,#fff 100%)}
.service-icon-title{display:flex;align-items:center;gap:14px}
.service-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:#eff6ff;border-radius:8px;transition:all .25s ease;color:var(--blue-500)}
.service-icon.active{background:var(--blue-500);color:#fff;transform:scale(1.03)}
.service-header h3{font-size:1rem;color:#1e293b}
.chevron{width:22px;height:22px;transition:transform .28s ease}
.chevron.expanded{transform:rotate(180deg)}
.service-content{max-height:0;overflow:hidden;transition:all .35s ease;padding:0 18px}
.service-content.expanded{max-height:260px;padding:12px 18px 18px}
.service-content p{color:#64748b;line-height:1.6}

.pricing-section{background:#f8fafc;border-top:1px solid #e2e8f0}
.pricing-container{max-width:640px;margin:36px auto 0}
.pricing-card{background:#fff;border-radius:14px;border:2px solid #e2e8f0;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06)}
.price-header{background:linear-gradient(135deg,var(--blue-900) 0%,var(--blue-500) 100%);color:#fff;padding:36px 30px 32px;text-align:center}
.price-tag{font-size:3rem;font-weight:700}
.price-features{list-style:none;padding:28px 32px}
.price-features li{padding:12px 0 12px 32px;border-bottom:1px solid #f1f5f9;color:#334155;font-size:1rem;position:relative}
.price-features li:before{content:"✓";position:absolute;left:0;color:var(--blue-500);font-weight:700;font-size:1.05rem}

.whatsapp-popup{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px}
.popup-content{background:#fff;border-radius:12px;padding:28px;max-width:520px;width:100%;max-height:90vh;overflow-y:auto;position:relative}
.close-btn{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:none;background:#f1f5f9;display:flex;align-items:center;justify-content:center;cursor:pointer}
.close-btn:hover{background:#e2e8f0;transform:rotate(90deg)}
.popup-header{text-align:center;margin-bottom:14px}
.popup-header h2{font-size:1.25rem;margin-bottom:6px}
.popup-header p{color:#64748b}
.form-group{margin-bottom:14px}
.form-group label{display:block;margin-bottom:6px;color:#334155;font-weight:600}
.form-group input,.form-group select{width:100%;padding:10px 12px;border:1px solid #e2e8f0;border-radius:8px;font-size:1rem}
.form-group input:focus,.form-group select:focus{outline:none;border-color:var(--blue-500);box-shadow:0 0 0 4px rgba(59,130,246,0.06)}
.whatsapp-btn{width:100%;padding:12px;background:#25d366;color:#fff;border-radius:8px;border:none;font-weight:700;display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer}
.whatsapp-btn:disabled{opacity:.7;cursor:not-allowed}

.cta-section{background:linear-gradient(135deg,var(--blue-900) 0%,var(--blue-500) 100%);color:#fff;padding:72px 20px}
.cta-content{max-width:760px;margin:0 auto;text-align:center}

@media (max-width:768px){
  .section{padding:40px 16px}
  .hero{padding:56px 16px}
  .problem-grid,.services-grid{grid-template-columns:1fr}
  .popup-content{padding:18px}
  .price-features{padding:20px}
}
</style>
