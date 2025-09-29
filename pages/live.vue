<template>
  <div :class="['chat-wrapper', isDarkMode ? 'dark-mode' : 'light-mode']">
    <div class="chat-container">
      <!-- Sidebar for Desktop -->
      <div :class="['sidebar', isDarkMode ? 'sidebar-dark' : 'sidebar-light']">
        <div class="sidebar-header">
          <button @click="startNewChat" :class="['new-chat-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New chat</span>
          </button>
        </div>
        
        <div class="sidebar-content">
          <div v-if="chatHistory.length > 0" class="history-label">Recent</div>
          <div v-for="chat in chatHistory" :key="chat.id" @click="loadChat(chat)" :class="['history-item', isDarkMode ? 'history-item-dark' : 'history-item-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            <span class="history-title">{{ chat.title }}</span>
          </div>
        </div>
        
        <div :class="['sidebar-footer', isDarkMode ? 'footer-dark' : 'footer-light']">
          <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="human-chat-btn footer-human-btn">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="human-chat-text">Chat with Human</span>
          </a>
          <button @click="toggleTheme" :class="['footer-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
            <svg v-if="isDarkMode" class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Sidebar -->
      <div v-if="showMenu" @click="showMenu = false" class="mobile-overlay"></div>
      <div :class="['mobile-sidebar', showMenu ? 'mobile-sidebar-open' : '', isDarkMode ? 'sidebar-dark' : 'sidebar-light']">
        <div class="sidebar-header">
          <button @click="showMenu = false; startNewChat()" :class="['new-chat-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New chat</span>
          </button>
        </div>
        
        <div class="sidebar-content">
          <div v-if="chatHistory.length > 0" class="history-label">Recent</div>
          <div v-for="chat in chatHistory" :key="chat.id" @click="loadChat(chat)" :class="['history-item', isDarkMode ? 'history-item-dark' : 'history-item-light']">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            <span class="history-title">{{ chat.title }}</span>
          </div>
        </div>
        
        <div :class="['sidebar-footer', isDarkMode ? 'footer-dark' : 'footer-light']">
          <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="human-chat-btn footer-human-btn">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="human-chat-text">Chat with Human</span>
          </a>
          <button @click="toggleTheme" :class="['footer-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
            <svg v-if="isDarkMode" class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu toggle -->
      <button @click="showMenu = !showMenu" :class="['mobile-menu-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
        <svg class="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <!-- Main content -->
      <div class="main-content">
        <!-- Header -->
        <div :class="['chat-header', isDarkMode ? 'header-dark' : 'header-light']">
          <div class="header-title">
            <span class="brand-name">AR Solutions</span>
            <span class="model-badge">AI</span>
          </div>
        </div>

        <!-- Chat area -->
        <div class="chat-area">
          <!-- Empty state -->
          <div v-if="messages.length === 0" class="empty-state">
            <h1 :class="['empty-title', isDarkMode ? 'text-white' : 'text-gray-800']">Hey there! How can I help you today?</h1>
            
            <div class="search-container-center">
              <div :class="['search-box', isDarkMode ? 'search-dark' : 'search-light']">
                <input
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

          <!-- Chat messages -->
          <div v-else class="messages-wrapper">
            <div ref="messagesContainer" class="messages-container">
              <div class="messages-inner">
                <div v-for="(message, index) in messages" :key="index" class="message-group">
                  <div :class="['message-row', message.type === 'user' ? 'message-user' : 'message-bot']">
                    <div class="message-content-wrapper">
                      <div class="message-content">
                        <p class="message-text">{{ message.text }}</p>
                        <a v-if="message.hasButton" :href="message.buttonLink" target="_blank" class="launch-btn">
                          {{ message.buttonText }}
                        </a>
                      </div>
                      <div v-if="message.type === 'bot'" class="message-actions">
                        <button @click="copyMessage(message.text)" class="action-btn" title="Copy">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                        </button>
                        <button @click="likeMessage(index)" class="action-btn" title="Good response">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                          </svg>
                        </button>
                        <button @click="dislikeMessage(index)" class="action-btn" title="Bad response">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path>
                          </svg>
                        </button>
                        <button @click="regenerateResponse(index)" class="action-btn" title="Regenerate">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                          </svg>
                        </button>
                        <button @click="shareMessage(message.text)" class="action-btn" title="Share">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                          </svg>
                        </button>
                        <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="action-btn" title="WhatsApp">
                          <svg class="icon-xs" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                          </svg>
                        </a>
                        <a href="tel:+919050983530" class="action-btn" title="Call">
                          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom input -->
            <div class="input-area">
              <div class="input-container">
                <div :class="['search-box', isDarkMode ? 'search-dark' : 'search-light']">
                  <input
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
  name: 'ChatbotPage',
  data() {
    return {
      query: "",
      showMenu: false,
      messages: [],
      isDarkMode: false,
      chatHistory: [],
      currentChatId: null,
      kb: {
        keywords: {
          pricing: ['cost', 'price', 'fee', 'payment', 'pay', 'charge', 'expensive', 'cheap', 'afford', 'money', 'rupees', 'rs', '₹', 'budget'],
          features: ['features', 'include', 'get', 'what', 'benefit', 'offer', 'provide', 'service', 'package', 'comes with'],
          timeline: ['when', 'how long', 'time', 'duration', 'days', 'delivery', 'fast', 'quick', 'ready', 'complete'],
          products: ['product', 'sell', 'item', 'clothing', 'shoes', 'jewellery', 'jewelry', 'fashion', 'niche', 'categories'],
          technical: ['technical', 'tech', 'difficult', 'easy', 'knowledge', 'skill', 'learn', 'manage', 'complicated'],
          domain: ['domain', 'website name', 'url', 'web address', 'brand name', 'site name'],
          training: ['training', 'teach', 'learn', 'help', 'support', 'tutorial', 'guide', 'how to'],
          platform: ['shopify', 'platform', 'ecommerce', 'e-commerce', 'which platform'],
          payment_gateway: ['payment gateway', 'accept payment', 'online payment', 'transaction', 'pay online'],
          design: ['design', 'logo', 'banner', 'look', 'appearance', 'branding', 'graphics'],
          confirmation: ['start', 'begin', 'sign up', 'register', 'book', 'confirm', 'interested', 'want', 'ready'],
          installment: ['installment', 'instalment', 'emi', 'partial payment', 'split payment'],
          quickdelivery: ['quick delivery', 'fast delivery', 'urgent', 'asap', 'faster']
        },
        responses: {
          greeting: "Thank you for your interest in AR Solutions! We help entrepreneurs launch professional online stores quickly and affordably. Starting your own branded online store has never been this simple.",
          
          fullPackage: "With AR Solutions, you'll get:\n\n✓ Complete Shopify store setup\n✓ 1-year free domain (your brand name as a gift from us)\n✓ Payment gateway integration for easy online payments\n✓ Up to 20 products listed & ready to sell\n✓ Simple logo design, banners & content creation\n✓ FREE training on store management\n✓ Project delivered in 25 days\n✓ Transparent pricing with no hidden charges\n✓ Monthly subscription (paid separately, cancel anytime)\n\nYou'll get a ready-to-use, business-grade online store at the lowest possible cost — designed to help you start selling from day one.",
          
          pricing: "The total project cost is ₹7,999/- (including all taxes). To begin, you only need to pay a confirmation milestone of ₹1,599/- to secure your project slot. The remaining balance will be paid in 4 simple instalments during the 25-day project timeline.",
          
          quickDelivery: "Want faster delivery? Choose our Quick Delivery Option by paying 70% upfront for a faster, hassle-free setup!",
          
          noTech: "You don't need to worry about the tech side — we handle it all for you! No technical knowledge required. We take care of building your complete business-ready store.",
          
          timeline: "Your complete store will be delivered in 25 days. Want it faster? Choose our Quick Delivery Option by paying 70% upfront.",
          
          domain: "Yes! You get a 1-year free domain with your brand name as a gift from us. It's included in the package.",
          
          training: "We provide FREE training on how to manage your store and add products. You'll learn everything you need to run your store successfully.",
          
          platform: "We build your store on Shopify, one of the world's most reliable and user-friendly ecommerce platforms. It's trusted by millions of businesses worldwide.",
          
          products: "You can sell any type of products — clothing, shoes, jewellery, or any niche you choose. The store can be customized for your specific business. You'll be able to sell directly on Google, social media, and worldwide.",
          
          paymentGateway: "Yes! We integrate a payment gateway so you can accept online payments easily from customers. This is included in the setup.",
          
          design: "We provide simple logo design, banners, and content creation for your store. Everything is included in the package.",
          
          installments: "After paying the confirmation fee of ₹1,599/-, the remaining balance will be paid in 4 simple instalments during the 25-day project timeline. It's flexible and easy.",
          
          confirmation: "To get started, you only need to pay ₹1,599/- as a confirmation fee to secure your project slot. Click the button below to begin your journey!"
        }
      }
    }
  },
  methods: {
    generateResponse(q) {
      const query = q.toLowerCase();
      const kb = this.kb;
      
const greetings = ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste'];
if (greetings.some(g => query === g || query === g + '!' || query === g + '?')) {
  return {
    text: "Hi there! Welcome to AR Solutions! 👋\n\nI can help you with information about launching your online store. Feel free to ask me about:\n\n• Pricing and payment plans\n• What's included in our package\n• Timeline and delivery\n• Technical requirements\n• And more!\n\nWhat would you like to know?",
    hasButton: false
  };
}

// If greeting with more text (like "hi, I need a store"), treat as inquiry
if (greetings.some(g => query.startsWith(g + ' ') || query.startsWith(g + ','))) {
  return {
    text: `${kb.responses.greeting}\n\n${kb.responses.fullPackage}`,
    hasButton: true
  };
}
      
      if (kb.keywords.confirmation.some(kw => query.includes(kw))) {
        return {
          text: kb.responses.confirmation,
          hasButton: true
        };
      }
      
      if (kb.keywords.pricing.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.pricing}\n\n${kb.responses.quickDelivery}\n\n${kb.responses.confirmation}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.installment.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.installments}\n\n${kb.responses.pricing}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.quickdelivery.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.quickDelivery}\n\n${kb.responses.timeline}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.features.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.fullPackage}\n\n${kb.responses.pricing}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.timeline.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.timeline}\n\n${kb.responses.confirmation}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.technical.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.noTech}\n\n${kb.responses.fullPackage}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.products.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.products}\n\n${kb.responses.pricing}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.domain.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.domain}\n\n${kb.responses.confirmation}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.training.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.training}\n\n${kb.responses.confirmation}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.platform.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.platform}\n\n${kb.responses.fullPackage}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.payment_gateway.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.paymentGateway}\n\n${kb.responses.confirmation}`,
          hasButton: true
        };
      }
      
      if (kb.keywords.design.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.design}\n\n${kb.responses.confirmation}`,
          hasButton: true
        };
      }
      
      const ecommerceKeywords = ['ecommerce', 'e-commerce', 'online store', 'store', 'shop', 'website', 'sell online', 'business'];
      if (ecommerceKeywords.some(kw => query.includes(kw))) {
        return {
          text: `${kb.responses.greeting}\n\n${kb.responses.fullPackage}\n\n${kb.responses.pricing}`,
          hasButton: true
        };
      }
      
      return {
        text: "Thank you for reaching out! I'd be happy to help you with information about our ecommerce store setup service. Feel free to ask about pricing, features, timeline, or anything else. You can also chat with our team directly for personalized assistance.",
        hasButton: false
      };
    },

async handleSearch() {
  if (!this.query.trim()) return;
  
  const userQuery = this.query.trim();
  
  if (!this.currentChatId) {
    this.currentChatId = Date.now();
  }
  
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
      timestamp: new Date(),
      hasButton: aiResponse.hasButton,
      buttonText: 'Launch My Store - ₹1,599',
      buttonLink: 'https://pages.razorpay.com/pl_R6OXxjqi9EpIhJ/view'
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

    startNewChat() {
      if (this.messages.length > 0) {
        this.chatHistory.unshift({
          id: this.currentChatId || Date.now(),
          title: this.messages[0].text.substring(0, 30) + (this.messages[0].text.length > 30 ? '...' : ''),
          messages: [...this.messages],
          date: new Date()
        });
      }
      
      this.messages = [];
      this.query = "";
      this.currentChatId = null;
    },

    loadChat(chat) {
      if (this.messages.length > 0 && this.currentChatId !== chat.id) {
        const existingIndex = this.chatHistory.findIndex(c => c.id === this.currentChatId);
        if (existingIndex === -1) {
          this.chatHistory.unshift({
            id: this.currentChatId,
            title: this.messages[0].text.substring(0, 30) + (this.messages[0].text.length > 30 ? '...' : ''),
            messages: [...this.messages],
            date: new Date()
          });
        }
      }
      this.messages = [...chat.messages];
      this.currentChatId = chat.id;
      this.showMenu = false;
      this.scrollToBottom();
    },

copyMessage(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Message copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy message: ', err);
      alert('Failed to copy message');
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Message copied to clipboard!');
    } catch (err) {
      alert('Failed to copy message');
    }
    document.body.removeChild(textArea);
  }
},

likeMessage(index) {
  alert('Thank you for your feedback! 👍');
  console.log('Liked message at index:', index);
},

dislikeMessage(index) {
  alert('Thank you for your feedback. We will improve! 👎');
  console.log('Disliked message at index:', index);
},

regenerateResponse(index) {
  if (index > 0 && this.messages[index - 1]?.type === 'user') {
    const userQuery = this.messages[index - 1].text;
    
    // Remove the old bot response
    this.messages.splice(index, 1);
    
    // Generate new response
    setTimeout(() => {
      const aiResponse = this.generateResponse(userQuery);
      
      this.messages.push({
        type: 'bot',
        text: aiResponse.text,
        timestamp: new Date(),
        hasButton: aiResponse.hasButton,
        buttonText: 'Launch My Store - ₹1,599',
        buttonLink: 'https://pages.razorpay.com/pl_R6OXxjqi9EpIhJ/view'
      });
      
      this.scrollToBottom();
    }, 300);
  }
},

shareMessage(text) {
  if (navigator.share) {
    navigator.share({
      title: 'AR Solutions AI Response',
      text: text
    }).catch(err => {
      console.log('Share cancelled or failed:', err);
    });
  } else {
    // Fallback - copy to clipboard
    this.copyMessage(text);
  }
}
  }
}
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
  background-color: #212121;
  color: #ececec;
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
  background-color: #171717;
  border-color: #363636;
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
  background-color: #2f2f2f;
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

.history-item-dark:hover {
  background-color: #2f2f2f;
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
  flex: 1;
  max-width: none;
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

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid;
}

.header-dark {
  background-color: #212121;
  border-color: #363636;
}

.header-light {
  background-color: #ffffff;
  border-color: #e5e5e5;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 40px;
}

.brand-name {
  font-size: 18px;
  font-weight: 600;
}

.model-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: 600;
  background: linear-gradient(135deg, #00d084 0%, #00a86b 100%);
  color: white;
  border-radius: 4px;
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

.human-chat-text {
  display: none;
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
  border-radius: 24px;
  padding: 4px 4px 4px 16px;
  transition: border-color 0.2s;
  width: 100%;
}

.search-dark {
  background-color: #2f2f2f;
  border-color: #4d4d4d;
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
  padding: 12px 8px;
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
  width: 32px;
  height: 32px;
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

.dark-mode .input-area {
  background: linear-gradient(to top, #212121 0%, #212121 85%, transparent 100%);
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
  .header-title {
    margin-left: 48px;
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
  .header-title {
    margin-left: 44px;
  }
  .mobile-menu-btn {
    top: 10px;
    left: 8px;
    padding: 6px;
  }
  .chat-header {
    padding: 8px 10px;
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
}

@media (max-width: 360px) {
  .empty-title {
    font-size: 18px;
  }
  .human-chat-btn {
    padding: 5px 8px;
    font-size: 11px;
  }
  .human-chat-text {
    display: none;
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

.text-gray-800 {
  color: #1f2937;
}
</style>
