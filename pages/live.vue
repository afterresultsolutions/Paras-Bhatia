<template>
  <div :class="['chat-wrapper', isDarkMode ? 'dark-mode' : 'light-mode']">
    <div class="chat-container">
      <div class="main-content">
        <div :class="['chat-header', isDarkMode ? 'header-dark' : 'header-light']">
 <div class="header-title">
  <a href="https://afterresult.solutions/" target="_blank" class="brand-name">
    AR Solutions
  </a>
  <span class="model-badge">AI</span>
</div>
<!-- Your button -->
<button @click="toggleTheme" 
        :class="['theme-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
  <svg v-if="isDarkMode" class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
    </path>
  </svg>
  <svg v-else class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
    </path>
  </svg>
</button>
        </div>

        <div class="chat-area">
          <div v-if="messages.length === 0" class="empty-state">
            <h1 :class="['empty-title', isDarkMode ? 'text-white' : 'text-gray-800']">Hey there! How can I help you today?</h1>
            
            <div class="search-container-center">
              <div :class="['search-box', isDarkMode ? 'search-dark' : 'search-light']">
                <input
                  ref="queryInput"
                  v-model="query"
                  @keyup.enter="handleSearch"
                  type="text"
                  placeholder="Ask anything"
                  :class="['search-input', isDarkMode ? 'input-dark' : 'input-light']"
                />
                <button @click="handleSearch" :class="['send-btn', query.trim() ? 'send-btn-active' : '']">
                  <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                </button>
              </div>
              <div :class="['disclaimer', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
                AR Solutions AI can make mistakes. Check important info.
              </div>
            </div>
          </div>

          <div v-else class="messages-wrapper">
            <div ref="messagesContainer" class="messages-container">
              <div class="messages-inner">
                <div v-for="(message, index) in messages" :key="index" class="message-group">
                  <div :class="['message-row', message.type === 'user' ? 'message-user' : 'message-bot']">
                    <div class="message-content-wrapper">
                      <div class="message-content">
                        <p class="message-text">{{ message.text }}</p>
                      </div>
                      <div v-if="message.type === 'bot'" class="message-actions">
                        <button @click="copyMessage(message.text)" class="action-btn" title="Copy">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                        </button>
                        <a href="https://api.whatsapp.com/send/?phone=919050983530" target="_blank" class="action-btn" title="WhatsApp">
                          <svg class="icon-xs" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="input-area">
              <div class="input-container">
                <div :class="['search-box', isDarkMode ? 'search-dark' : 'search-light']">
                  <input
                    ref="queryInputBottom"
                    v-model="query"
                    @keyup.enter="handleSearch"
                    type="text"
                    placeholder="Message AR Solutions AI"
                    :class="['search-input', isDarkMode ? 'input-dark' : 'input-light']"
                  />
                  <button @click="handleSearch" :class="['send-btn', query.trim() ? 'send-btn-active' : '']">
                    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                  </button>
                </div>
                <div :class="['disclaimer', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
                  AR Solutions AI can make mistakes. Check important info.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RevOpsChatbot',
  data() {
    return {
      query: "",
      messages: [],
      isDarkMode: false,
      kb: {
        keywords: {
          greeting: ['hi', 'hello', 'hey', 'hola', 'greetings', 'good morning', 'good afternoon', 'good evening', 'whats up', 'sup', 'yo'],
          pricing: ['cost', 'price', 'fee', 'payment', 'pay', 'charge', 'expensive', 'cheap', 'afford', 'money', 'rupees', 'rs', '₹', 'budget', 'rate', 'quote', 'estimate', 'investment', 'spend', 'value', 'worth', 'affordable', 'costly', 'economical', 'pricing structure', 'payment plan', 'how much', 'what price', 'total cost', 'retainer', 'monthly', 'monthly cost'],
          revops: ['revenue operations', 'revops', 'rev ops', 'operations', 'revenue', 'revenue engine', 'operational efficiency', 'revenue optimization'],
          services: ['services', 'service', 'what do you do', 'what you do', 'offerings', 'solutions', 'what you offer', 'what is included', 'included', 'package', 'what included', 'service list', 'help with', 'provide', 'support', 'offer', 'do you offer', 'tell me about services'],
          crm: ['crm', 'salesforce', 'hubspot', 'pipedrive', 'customer relationship', 'crm setup', 'crm admin', 'crm management', 'platform', 'system', 'crm administration'],
          automation: ['automation', 'workflow', 'automate', 'automatic', 'process automation', 'workflow automation', 'automated processes', 'efficiency', 'streamline', 'automated workflow'],
          integration: ['integration', 'integrate', 'connect', 'sync', 'api', 'connection', 'tech stack', 'tools', 'platforms', 'systems', 'data flow', 'connect systems', 'system integration'],
          data: ['data', 'database', 'data quality', 'data management', 'data operations', 'clean data', 'data hygiene', 'enrichment', 'migration', 'data cleaning'],
          reporting: ['reporting', 'reports', 'analytics', 'dashboard', 'metrics', 'kpi', 'insights', 'visibility', 'forecasting', 'data visualization', 'custom reports', 'dashboards'],
          timeline: ['when', 'how long', 'time', 'duration', 'delivery', 'timeline', 'completion', 'turnaround', 'how soon', 'start', 'when start', 'when can you start', 'how quickly'],
          hours: ['hours', 'how many hours', '40 hours', 'monthly hours', 'time commitment', 'support hours', 'dedicated time', 'hours per month', 'hours included'],
          problem: ['problem', 'challenge', 'issue', 'struggle', 'pain point', 'difficulty', 'bottleneck', 'inefficiency', 'manual', 'disconnected', 'what problems', 'solve'],
          benefits: ['benefits', 'outcomes', 'results', 'improvements', 'roi', 'value', 'impact', 'advantages', 'what will i get', 'expect', 'expected outcomes', 'what benefit'],
          approach: ['approach', 'methodology', 'process', 'how you work', 'strategy', 'method', 'framework', 'steps', 'how do you work', 'your approach'],
          technical: ['technical', 'tech', 'difficult', 'easy', 'knowledge', 'skill', 'complex', 'complicated', 'expertise required', 'need technical knowledge', 'technical skills'],
          training: ['training', 'teach', 'learn', 'help', 'support', 'onboarding', 'documentation', 'guide', 'walkthrough', 'training included', 'will you train'],
          lead_management: ['lead', 'leads', 'lead routing', 'lead scoring', 'qualification', 'lead management', 'conversion', 'manage leads'],
          sales_enablement: ['sales enablement', 'territory', 'quota', 'sales process', 'performance tracking', 'sales support', 'help sales team'],
          confirmation: ['start', 'begin', 'sign up', 'interested', 'want', 'ready', 'proceed', 'get started', 'schedule', 'book', 'consultation', 'lets start', 'im interested', 'want to start'],
          contact: ['contact', 'reach', 'email', 'phone', 'call', 'demo', 'meeting', 'consultation', 'connect', 'get in touch', 'talk', 'speak', 'contact you', 'reach out', 'contact details', 'phone number'],
          aboutar: ['about', 'who are you', 'ar solutions', 'afterresult', 'your company', 'company info', 'agency', 'about company', 'tell me about', 'what is ar solutions'],
          comparison: ['compare', 'difference', 'better than', 'vs', 'versus', 'why choose', 'what makes different', 'unique', 'advantage', 'why you', 'why ar solutions'],
          guarantee: ['guarantee', 'assured', 'promise', 'results', 'refund', 'risk', 'guaranteed', 'assurance'],
          casual: ['i am good', 'im good', 'i am fine', 'im fine', 'doing well', 'doing good', 'all good', 'great', 'fine', 'okay', 'ok', 'good', 'not bad'],
          howareyou: ['how are you', 'how are you doing', 'whats up', 'hows it going', 'how you doing', 'how is it going'],
          whoareyou: ['who are you', 'what are you', 'your name', 'about you', 'bot', 'ai', 'chatbot', 'are you ai', 'are you bot'],
          thankyou: ['thank you', 'thanks', 'thank u', 'thx', 'appreciate', 'grateful', 'thanks a lot', 'thank you so much'],
          bye: ['bye', 'goodbye', 'see you', 'later', 'farewell', 'gotta go', 'take care', 'see ya'],
          urgent: ['urgent', 'asap', 'immediately', 'right now', 'quick', 'fast', 'urgently', 'emergency'],
          interested: ['interested', 'sounds good', 'tell me more', 'more info', 'details', 'more details', 'elaborate', 'explain more'],
          pipeline: ['pipeline', 'sales pipeline', 'deal flow', 'funnel', 'opportunities', 'sales funnel'],
          specialist: ['specialist', 'expert', 'dedicated', 'consultant', 'who will work', 'team', 'your team', 'who works']
        },
        responses: {
          greeting: "Hi there! Welcome to AR Solutions RevOps Services\n\nWe help growing companies scale their revenue through:\n✓ CRM automation & optimization\n✓ Workflow automation\n✓ Tech stack integration\n✓ Data operations\n✓ Custom reporting\n\nWhat would you like to know?",
          greeting_detailed: "Thank you for your interest in our RevOps Services!\n\nWe provide comprehensive revenue operations support on a monthly retainer:\n✓ CRM Administration & Optimization\n✓ Workflow Automation Development\n✓ Tech Stack Integration Management\n✓ Data Operations & Quality Assurance\n✓ Custom Reporting & Analytics\n✓ 40 hours of dedicated support monthly\n\nWhat would you like to know more about?",
          revops: "Revenue Operations (RevOps) aligns your sales, marketing, and customer success teams through unified systems, automated workflows, and clean data - helping you scale efficiently.\n\nWant to know how we can help?",
          revops_detailed: "Revenue Operations Services\n\nWe build and optimize your revenue infrastructure:\n• CRM setup, configuration & ongoing management\n• Custom workflow & automation development\n• Tech stack integration (API connections, data sync)\n• Data operations & quality assurance\n• Custom dashboards & analytics\n• Lead management & routing systems\n• Process documentation & team training\n\nAll delivered through a flexible monthly retainer with 40 hours of dedicated support.",
          pricing: "₹3,500/month retainer\n\nIncludes:\n✓ 40 hours of dedicated RevOps specialist support\n✓ CRM admin & optimization\n✓ Workflow automation\n✓ Tech integrations\n✓ Custom reporting\n✓ Data operations\n✓ Training & documentation\n\nFlexible engagement - cancel anytime!",
          pricing_detailed: "Monthly Retainer: ₹3,500\n\nWhat's Included:\n✓ 40 hours of strategic support per month\n✓ Dedicated RevOps Specialist\n✓ CRM setup, configuration & optimization\n✓ Custom workflow & automation development\n✓ Tech stack integration & management\n✓ Data operations & quality assurance\n✓ Custom reporting & analytics dashboards\n✓ Process documentation & training\n✓ Monthly strategy & planning sessions\n✓ Priority email & Slack support\n✓ Quarterly business reviews\n\nFlexible engagement - cancel anytime with 30 days notice.",
          services: "Our RevOps Services:\n\n✓ CRM Administration\n✓ Workflow Automation\n✓ Integration Management\n✓ Data Operations\n✓ Reporting & Analytics\n✓ Lead Management\n✓ Sales Enablement\n✓ Training & Support\n\nAll included in your monthly retainer. What interests you most?",
          services_detailed: "RevOps Services (Monthly Retainer)\n\nCRM Administration: Platform config, custom objects, field management, permissions\nWorkflow Development: Automation build-out, trigger logic, multi-step sequences\nIntegration Management: API connections, data mapping, sync monitoring\nData Operations: Database hygiene, enrichment, migration support\nReporting & Analytics: Dashboard creation, metric tracking, forecasting\nLead Management: Scoring models, routing rules, qualification frameworks\nSales Enablement: Territory planning, quota management, process documentation\nTraining & Support: Onboarding, documentation, ongoing technical support\n\n40 hours per month to tackle your highest priorities.",
          crm: "We handle complete CRM administration:\n✓ Setup & configuration\n✓ Custom objects & fields\n✓ User permissions & roles\n✓ Ongoing optimization\n\nWorks with Salesforce, HubSpot, Pipedrive & more!",
          automation: "We design intelligent workflows that automate:\n✓ Lead routing\n✓ Data enrichment\n✓ Follow-ups\n✓ Reporting\n\nResult: 30-50% time savings on manual tasks!",
          integration: "We connect your entire tech stack:\n✓ CRM ↔ Marketing automation\n✓ Analytics tools\n✓ Sales platforms\n✓ Custom APIs\n\nSeamless data flow across all systems!",
          data: "We ensure clean, reliable data:\n✓ Validation rules\n✓ Enrichment workflows\n✓ Duplicate management\n✓ Data governance\n\nAchieve 95%+ data accuracy!",
          reporting: "Custom dashboards for:\n✓ Pipeline health\n✓ Key metrics & KPIs\n✓ Team performance\n✓ Forecasting\n\nReal-time visibility into what matters!",
          timeline: "Quick Start:\n• Kickoff: Immediate after signup\n• Initial audit: First week\n• Quick wins: Within 7-10 days\n• Major improvements: 30 days\n• Ongoing optimization: Monthly\n\nReady to get started?",
          hours: "40 hours/month of dedicated support\n\nWe prioritize your highest-impact items each month:\n• Automation builds\n• Integration projects\n• Report creation\n• Ongoing optimization\n• Training & support\n\nFlexible allocation based on your needs!",
          problem: "Common Revenue Operations Problems:\n\n❌ Disconnected systems & siloed data\n❌ Manual, time-consuming workflows\n❌ Poor data quality\n❌ Lack of visibility\n\n✅ We solve all of these!\n\nWhich one affects you most?",
          benefits: "Expected Outcomes:\n\n30-50% time savings (automation)\n20-35% faster sales cycles\n95%+ data accuracy\n100% revenue visibility\n\nMeasurable improvements within 30 days!",
          approach: "Our 6-Step Approach:\n\n1. Revenue audit & strategy\n2. Tech stack integration\n3. Process automation\n4. Data infrastructure\n5. Analytics & reporting\n6. Continuous optimization\n\nResults-driven, hands-on support!",
          technical: "No technical knowledge needed!\n\nOur RevOps specialists handle:\n✓ All technical implementation\n✓ Complex integrations\n✓ System configurations\n✓ Troubleshooting\n\nYou just tell us what you need - we make it happen!",
          training: "Complete Training Included:\n\n✓ Team onboarding sessions\n✓ Process documentation\n✓ Video tutorials\n✓ Ongoing support\n\nWe ensure your team is confident and self-sufficient!",
          lead_management: "Lead Management Systems:\n\n✓ Automated scoring models\n✓ Intelligent routing rules\n✓ Qualification frameworks\n✓ Conversion optimization\n\nNo lead falls through the cracks!",
          sales_enablement: "Sales Enablement Support:\n\n✓ Territory planning\n✓ Quota management\n✓ Sales process documentation\n✓ Performance tracking\n\nHelp your team sell more efficiently!",
          confirmation: "Ready to scale your revenue operations?\n\nLet's schedule a consultation to discuss:\n• Your specific challenges\n• How we can help\n• Next steps\n\nSchedule a call now!",
          contact: "Contact AR Solutions:\n\nEmail: info.afterresult@gmail.com\nWhatsApp: +91 9050983530\nWebsite: https://afterresult.solutions\n\nReach out directly or schedule a consultation!",
          aboutar: "About AR Solutions\n\nWe're a digital growth agency specializing in:\n✓ Revenue Operations\n✓ E-Commerce Solutions\n✓ Marketing Automation\n\nHelping growing businesses scale efficiently since 2024!",
          comparison: "Why Choose AR Solutions?\n\n✅ Affordable (₹3,500/month)\n✅ Flexible - no long-term lock-in\n✅ Dedicated specialist (40 hrs)\n✅ Comprehensive RevOps support\n✅ Fast implementation\n✅ Complete training included\n\nQuality service at SME-friendly pricing!",
          guarantee: "Our Commitment:\n\n✓ Measurable operational improvements\n✓ Better data quality\n✓ Increased revenue visibility\n✓ Transparent pricing\n✓ Complete support\n\nYour success is our priority!",
          howareyou: "Doing great, thanks for asking!\n\nReady to help you optimize your revenue operations. What can I assist you with?",
          whoareyou: "I'm your RevOps assistant from AR Solutions!\n\nI'm here to answer questions about our revenue operations services and help you scale your business efficiently.\n\nWhat would you like to know?",
          thankyou: "You're very welcome!\n\nHappy to help anytime. Any other questions about our RevOps services?",
          bye: "Goodbye!\n\nFeel free to reach out anytime you need revenue operations support. Have a great day!",
          casual: "Glad to hear that!\n\nHow can I help you with your revenue operations today?",
          interested: "Great to hear you're interested!\n\nLet me share more details about our RevOps services...\n\nWhat specifically would you like to know about?",
          urgent: "I understand the urgency!\n\nWe can start immediately after kickoff:\n• Quick wins within the first week\n• Priority support available\n\nSchedule a consultation now to get started ASAP!",
          pipeline: "Pipeline Visibility:\n\nWe provide complete real-time dashboards showing:\n✓ Deal flow & stages\n✓ Conversion rates\n✓ Velocity metrics\n✓ Forecast accuracy\n\nNever lose sight of your revenue again!",
          specialist: "Your Dedicated RevOps Specialist:\n\n✓ Expert in CRM, automation & integrations\n✓ 40 hours/month focused on your business\n✓ Works on your highest-priority items\n✓ Direct communication via email/Slack\n\nYou get experienced, dedicated support!",
          default: "Thanks for your message!\n\nI can help you with:\n• RevOps services & pricing\n• CRM automation & integrations\n• Data operations & reporting\n• Getting started\n\nWhat would you like to know about?"
        }
      }
    };
  },
  methods: {
    generateResponse(q) {
      const query = q.toLowerCase().trim();
      const kb = this.kb;
      
      const categoryScores = {};
      
      Object.keys(kb.keywords).forEach(category => {
        let score = 0;
        const keywords = kb.keywords[category];
        
        keywords.forEach(keyword => {
          const kw = keyword.toLowerCase();
          
          if (query === kw) {
            score += 100;
          } else if (query.startsWith(kw + ' ') || query.startsWith(kw + ',')) {
            score += 50;
          } else if (query.endsWith(' ' + kw) || query.endsWith(',' + kw)) {
            score += 45;
          } else if (new RegExp('\\b' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(query)) {
            score += 30;
          } else if (query.includes(kw)) {
            score += 15;
          }
        });
        
        if (score > 0) {
          categoryScores[category] = score;
        }
      });
      
      let bestCategory = null;
      let bestScore = 0;
      
      Object.entries(categoryScores).forEach(([category, score]) => {
        if (score > bestScore) {
          bestScore = score;
          bestCategory = category;
        }
      });
      
      if (bestCategory && bestScore >= 15) {
        const responseKey = bestCategory;
        let responseText = kb.responses[responseKey] || kb.responses.default;
        
        if (bestScore >= 30 && kb.responses[responseKey + '_detailed']) {
          responseText = kb.responses[responseKey + '_detailed'];
        }
        
        return { text: responseText };
      }
      
      return { text: kb.responses.default };
    },

    async handleSearch() {
      if (!this.query.trim()) return;
      
      const userQuery = this.query.trim();
      
      this.messages.push({
        type: 'user',
        text: userQuery,
        timestamp: new Date()
      });
      
      this.query = "";
      
      await this.$nextTick();
      this.scrollToBottom();
      
      setTimeout(() => {
        const aiResponse = this.generateResponse(userQuery);
        
        this.messages.push({
          type: 'bot',
          text: aiResponse.text,
          timestamp: new Date()
        });
        
        this.scrollToBottom();
      }, 500);
    },

    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.messagesContainer) {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        }
      });
    },

    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
    },

    copyMessage(text) {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          alert('Message copied to clipboard!');
        }).catch(() => {
          alert('Failed to copy message');
        });
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.chat-wrapper {
  width: 100%;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  transition: background-color 0.2s, color 0.2s;
}

.dark-mode {
  background-color: #2d4a9e;
  color: #ffffff;
}

.light-mode {
  background-color: #ffffff;
  color: #2f2f2f;
}

.chat-container {
  display: flex;
  height: 100vh;
  position: relative;
}

.sidebar {
  width: 260px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid;
  transition: background-color 0.2s;
}

.sidebar-dark {
  background-color: #1e3a7a;
  border-color: #3d5aa8;
}

.sidebar-light {
  background-color: #f9f9f9;
  border-color: #e5e5e5;
}

.sidebar-header {
  padding: 12px 8px;
  border-bottom: 1px solid;
}

.sidebar-dark .sidebar-header {
  border-color: #363636;
}

.sidebar-light .sidebar-header {
  border-color: #e5e5e5;
}

.new-chat-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  background: none;
}

.btn-dark {
  color: #ececec;
  border-color: #4d4d4d;
}

.btn-dark:hover {
  background-color: #3d5aa8;
}

.btn-light {
  color: #2f2f2f;
  border-color: #d1d1d1;
}

.btn-light:hover {
  background-color: #f0f0f0;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.history-label {
  font-size: 11px;
  font-weight: 500;
  padding: 8px 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 4px;
}
.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 8px;
  transition: background-color 0.2s;
  margin-bottom: 4px;
  position: relative;
}

.history-item-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
  cursor: pointer;
}

.history-item-actions {
  display: flex; /* Changed from display: none */
  align-items: center;
  gap: 4px;
}

/* Keep hover effect for desktop only */
@media (min-width: 769px) {
  .history-item-actions {
    display: none;
  }

  .history-item:hover .history-item-actions {
    display: flex;
  }
} 

.history-action-btn {
  padding: 4px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .history-action-btn:hover {
  background-color: #3a3a3a;
}

.light-mode .history-action-btn:hover {
  background-color: #d9d9d9;
}

.history-delete-btn:hover {
  color: #ef4444 !important;
}

.archived-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid;
}

.sidebar-dark .archived-section {
  border-color: #363636;
}

.sidebar-light .archived-section {
  border-color: #e5e5e5;
}

.history-item-dark:hover {
  background-color: #3d5aa8;
}
  
.history-item-light:hover {
  background-color: #ececec;
}

.history-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-footer {
  padding: 12px 8px;
  border-top: 1px solid;
  display: flex;
  gap: 8px;
}

.footer-dark {
  border-color: #363636;
}

.footer-light {
  border-color: #e5e5e5;
}

.footer-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  background: none;
  max-width: 60px;
}

.footer-human-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 12px;
  font-size: 10px;
  font-weight: 500;
  background: # 000000; 
  color: white;
  border: none;
  border-radius: 18px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
  flex: 1;
  max-width: none;
  white-space: nowrap;
}
.mobile-human-btn:hover {
  opacity: 0.85 !important;
}

.human-chat-text {
  display: inline;
}

.footer-human-btn:hover {
  opacity: 0.9;
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  transition: transform 0.3s;
}

.mobile-sidebar-open {
  transform: translateX(0);
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.mobile-menu-btn {
  position: fixed;
  top: 14px;
  left: 12px;
  z-index: 998;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
/* Sidebar toggle - hidden by default */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.sidebar-open {
  transform: translateX(0);
}

.close-sidebar-btn {
  position: absolute;
  right: 8px;
  top: 12px;
  padding: 6px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 6px;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .close-sidebar-btn:hover {
  background-color: #2f2f2f;
}

.light-mode .close-sidebar-btn:hover {
  background-color: #ececec;
}

.sidebar-search {
  padding: 8px;
  border-bottom: 1px solid;
}
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 18px;
  height: 18px;
  color: #6b7280;
  pointer-events: none;
}

.sidebar-dark .sidebar-search {
  border-color: #363636;
}

.sidebar-light .sidebar-search {
  border-color: #e5e5e5;
}

.search-chat-input {
  width: 100%;
  padding: 8px 12px 8px 46px;  /* Changed from 42px to 46px */
  border: 1px solid;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input-dark.search-chat-input {
  background-color: #3d5aa8;
  border-color: #5670c4;
  color: #ffffff;
}

.input-light.search-chat-input {
  background-color: #f4f4f4;
  border-color: #d1d1d1;
  color: #2f2f2f;
}

.search-chat-input:focus {
  border-color: #667eea;
}

.no-results {
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}
.quick-pills {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 8px;
  border-bottom: 1px solid;
}

.sidebar-dark .quick-pills {
  border-color: #363636;
}

.sidebar-light .quick-pills {
  border-color: #e5e5e5;
}

.pill-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
}

.pill-dark {
  background-color: transparent;
  color: #ececec;
}

.pill-dark:hover {
  background-color: #2f2f2f;
}

.pill-light {
  background-color: transparent;
  color: #2f2f2f;
}

.pill-light:hover {
  background-color: #f0f0f0;
}

.pill-btn span {
  flex: 1;
  white-space: nowrap;
}

.menu-toggle-btn {
  position: absolute;
  top: 18px;
  left: 12px;
  z-index: 998;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

@media (min-width: 769px) {
  .menu-toggle-btn {
    display: block;
  }
  
  .mobile-sidebar {
    display: none;
  }
} 

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-bottom: 2px solid;
  position: relative;
  min-height: 60px;
}

.header-dark {
  background-color: #2d4a9e;
  border-color: #3d5aa8;
}

.header-light {
  background-color: #ffffff;
  border-color: #e5e5e5;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.brand-name {
  font-size: 18px;
  font-weight: 600;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 4px;
}

.live-dot {
  width: 8px;
  height: 8px;
  background-color: #ff6b35;
  border-radius: 50%;
  animation: pulse 2s infinite;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.8);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.15);
  }
}

.live-text {
  font-size: 11px;
  font-weight: 600;
  color: #ff6b35;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.human-chat-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.human-chat-btn:hover {
  opacity: 0.9;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: calc(100vh - 200px);
}

.empty-title {
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 60px;
  text-align: center;
}

.search-container-center {
  width: 100%;
  max-width: 600px;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid;
  border-radius: 20px;
  padding: 2px 4px 2px 14px;
  transition: border-color 0.2s;
  width: 100%;
  max-height: 44px;
}

.search-dark {
  background-color: #3d5aa8;
  border-color: #5670c4;
}

.search-light {
  background-color: #f4f4f4;
  border-color: #d1d1d1;
}

.search-box:focus-within {
  border-color: #6e6e6e;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 10px 8px;
  font-size: 15px;
  min-width: 0;
}

.input-dark {
  color: #ececec;
}

.input-dark::placeholder {
  color: #8e8e8e;
}

.input-light {
  color: #2f2f2f;
}

.input-light::placeholder {
  color: #8e8e8e;
}

.send-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background-color: #676767;
  color: white;
  cursor: not-allowed;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.send-btn-active {
  background-color: #ececec;
  color: #2f2f2f;
  cursor: pointer;
}

.send-btn-active:hover {
  background-color: #d9d9d9;
}

.disclaimer {
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  padding-bottom: 40px;
}

.messages-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 0;
}

.messages-inner {
  max-width: 768px;
  margin: 0 auto;
  padding: 24px 20px 0;
}

.message-group {
  margin-bottom: 24px;
}

.message-row {
  display: flex;
  gap: 16px;
}

.message-user {
  flex-direction: row-reverse;
}

.message-bot {
  flex-direction: row;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-bot {
  background: transparent;
  padding: 2px;
}

.avatar-user {
  background-color: #5436da;
}

.avatar-icon {
  width: 28px;
  height: 28px;
  color: white;
}

.message-content-wrapper {
  flex: 1;
  min-width: 0;
}

.message-user .message-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-bot .message-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.message-content {
  margin-bottom: 8px;
  max-width: 70%;
}

.message-user .message-content {
  background-color: #2f2f2f;
  color: white;
  padding: 12px 16px;
  border-radius: 18px;
  border-bottom-right-radius: 4px;
}

.light-mode .message-user .message-content {
  background-color: #f0f0f0;
  color: #2f2f2f;
}

.message-text {
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
}

.launch-btn {
  display: inline-block;
  margin-top: 12px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.launch-btn:hover {
  opacity: 0.9;
}

.message-actions {
  display: flex;
  gap: 4px;
  margin-top: 8px;
  opacity: 1;
  transition: opacity 0.2s;
}

.action-btn {
  padding: 6px;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .action-btn:hover {
  background-color: #2f2f2f;
}

.light-mode .action-btn:hover {
  background-color: #f0f0f0;
}

.input-area {
  padding: 20px;
  border-top: 1px solid transparent;
  position: sticky;
  bottom: 0;
  z-index: 100;
}

.temp-mode-indicator {
  text-align: center;
  padding: 8px 16px;
  margin-bottom: 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.dark-mode .temp-mode-indicator {
  background-color: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.4);
}
@media (max-width: 768px) {
  .temp-mode-indicator {
    font-size: 11px;
    padding: 6px 12px;
    margin-bottom: 10px;
  }
}
.dark-mode .input-area {
  background: linear-gradient(to top, #2d4a9e 0%, #2d4a9e 85%, transparent 100%);
}

.light-mode .input-area {
  background: linear-gradient(to top, #ffffff 0%, #ffffff 85%, transparent 100%);
}

.input-container {
  max-width: 768px;
  margin: 0 auto;
}

.icon-xs {
  width: 16px;
  height: 16px;
}

.icon-sm {
  width: 20px;
  height: 20px;
}

.icon-md {
  width: 24px;
  height: 24px;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #4d4d4d;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6e6e6e;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 240px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
  
  .chat-header {
    padding: 10px 8px;
  }
  
  .header-title {
    position: static;
    transform: none;
    margin: 0 auto;
    padding: 0 50px;
    justify-content: center;
    flex: 1;
  }
  
  .brand-name {
    font-size: 16px;
  }
  
  .model-badge {
    width: 18px;
    height: 18px;
    font-size: 10px;
  }
  
  .live-text {
    font-size: 10px;
  }
  
  .live-dot {
    width: 7px;
    height: 7px;
  }
  
  .header-actions {
    gap: 6px;
    position: static;
  }
  
  .header-link {
    display: none;
  }
  
  .auth-btn {
    padding: 6px 12px;
    font-size: 13px;
  }
  .empty-title {
    font-size: 22px;
    margin-bottom: 30px;
  }
  .messages-inner {
    padding: 20px 12px 0;
  }
  .input-area {
    padding: 12px;
  }
  .search-container-center {
    max-width: 100%;
    padding: 0 12px;
  }
  .empty-state {
    padding: 12px;
    justify-content: flex-start;
    padding-top: 40px;
  }
  .message-row {
    gap: 12px;
  }
  .avatar {
    width: 28px;
    height: 28px;
  }
  .avatar-icon {
    width: 24px;
    height: 24px;
  }
  .message-text {
    font-size: 14px;
  }
  .disclaimer {
    padding-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .empty-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .chat-header {
    padding: 8px 6px;
  }
  
  .header-title {
    padding: 0 45px;
  }
  
  .brand-name {
    font-size: 15px;
  }
  
  .model-badge {
    width: 16px;
    height: 16px;
    font-size: 9px;
  }
  
  .live-text {
    font-size: 9px;
  }
  
  .live-dot {
    width: 6px;
    height: 6px;
  }
  .human-chat-btn {
    padding: 6px 10px;
    font-size: 12px;
    gap: 4px;
  }
  .brand-name {
    font-size: 16px;
  }
  .model-badge {
    width: 18px;
    height: 18px;
    font-size: 10px;
  }
  .search-input {
    font-size: 14px;
    padding: 10px 6px;
  }
  .send-btn {
    width: 28px;
    height: 28px;
  }
  .search-box {
    padding: 3px 3px 3px 12px;
  }
  .messages-inner {
    padding: 16px 8px 0;
  }
  .input-area {
    padding: 10px 8px;
  }
  .search-container-center {
    padding: 0 8px;
  }
  .message-row {
    gap: 8px;
  }
  .avatar {
    width: 24px;
    height: 24px;
  }
  .avatar-icon {
    width: 20px;
    height: 20px;
  }
  .message-text {
    font-size: 13px;
    line-height: 1.5;
  }
  .launch-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
  .action-btn {
    padding: 4px;
  }
  .icon-xs {
    width: 14px;
    height: 14px;
  }
  .disclaimer {
    font-size: 11px;
    margin-top: 8px;
    padding-bottom: 15px;
  }
  .footer-human-btn {
    padding: 8px 8px;
    font-size: 11px;
    gap: 4px;
  }
  
  .search-input {
    padding: 9px 6px;
    font-size: 14px;
  }
  
  .send-btn {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 360px) {
  .empty-title {
    font-size: 18px;
  }
  
  .header-title {
    padding: 0 40px;
  }
  
  .brand-name {
    font-size: 14px;
  }
  
  .model-badge {
    width: 15px;
    height: 15px;
    font-size: 8px;
  }
  
  .live-indicator {
    gap: 3px;
  }
  
  .live-text {
    font-size: 8px;
  }
  
  .live-dot {
    width: 5px;
    height: 5px;
  }
  
  .human-chat-btn {
    padding: 5px 8px;
    font-size: 11px;
  }
  
  .human-chat-text {
    display: none;
  }
  
  .auth-btn {
    padding: 5px 10px;
    font-size: 12px;
  }
  .search-input {
    font-size: 13px;
    padding: 8px 6px;
  }
  .messages-inner {
    padding: 12px 6px 0;
  }
  .input-area {
    padding: 8px 6px;
  }
  .search-container-center {
    padding: 0 6px;
  }
}

@media (min-width: 640px) {
  .human-chat-text {
    display: inline;
  }
}

@media (min-width: 769px) {
  .mobile-menu-btn {
    display: none;
  }
  .mobile-sidebar {
    display: none;
  }
  .header-title {
    margin-left: 0;
  }
  .empty-state {
    justify-content: center;
    padding-top: 20px;
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  .empty-state {
    padding-top: 20px;
  }
  .empty-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
}

@media (hover: none) and (pointer: coarse) {
  .search-box {
    padding: 6px 6px 6px 16px;
  }
  .search-input {
    padding: 14px 8px;
    font-size: 16px;
  }
  .send-btn {
    width: 36px;
    height: 36px;
  }
  .action-btn {
    padding: 8px;
    min-height: 36px;
    min-width: 36px;
  }
  .human-chat-btn {
    padding: 10px 14px;
    min-height: 40px;
  }
  .mobile-menu-btn {
    padding: 10px;
    min-height: 40px;
    min-width: 40px;
  }
  .message-actions {
    opacity: 1;
  }
}

.text-gray-400 {
  color: #9ca3af;
}

.text-gray-500 {
  color: #6b7280;
}

.text-gray-600 {
  color: #4b5563;
}

.text-white {
  color: white;
}
.archived-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid;
}

.sidebar-dark .archived-section {
  border-color: #363636;
}

.sidebar-light .archived-section {
  border-color: #e5e5e5;
}

.archived-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  background: none;
  text-align: left;
}

.archived-toggle span {
  flex: 1;
}

.arrow-icon {
  transition: transform 0.2s;
}

.arrow-rotated {
  transform: rotate(180deg);
}

.archived-chats {
  margin-top: 8px;
}

.temp-chat-btn {
  position: absolute;
  right: 16px;
  padding: 8px;
  border: 1px solid;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: none;
}

.temp-chat-btn.temp-active {
  background-color: #fee2e2 !important;
  border-color: #ef4444 !important;
  color: #ef4444 !important;
}

.dark-mode .temp-chat-btn.temp-active {
  background-color: #7f1d1d !important;
  border-color: #ef4444 !important;
  color: #ef4444 !important;
}

@media (max-width: 768px) {
  .temp-chat-btn {
    right: 8px;
    padding: 6px;
  }
}

.text-gray-800 {
  color: #1f2937;
}
/* Mobile: Always show action buttons */
@media (max-width: 768px) {
  .history-item-actions {
    display: flex !important;
  }
}
.whatsapp-marketing-btn {
  display: inline-block;
  margin-top: 12px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  color: white;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.whatsapp-marketing-btn:hover {
  opacity: 0.9;
}
</style>
