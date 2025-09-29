// knowledge-base.js
// Place this file in the pages directory (same folder as live.vue)

const knowledgeBase = {
  // Main service information
  serviceOverview: {
    name: "AR Solutions Ecommerce Store Setup",
    tagline: "Launch Your Online Store Today",
    description: "Starting your own branded online store has never been this simple. With just a small project confirmation fee, you secure your place, and we take care of building your complete business-ready store.",
    mainBenefit: "Think of it as investing once to unlock a platform where you can sell products—be it clothing, shoes, jewellery, or any niche you choose—directly on Google, social media, and worldwide."
  },

  // Pricing information
  pricing: {
    totalCost: 7999,
    currency: "INR",
    confirmationFee: 1599,
    installments: 4,
    quickDeliveryOption: "70% upfront for faster delivery",
    includes: "all taxes",
    note: "Transparent pricing — no hidden charges"
  },

  // What's included in the package
  features: [
    "Complete Shopify store setup",
    "1-year free domain (your brand name as a gift from us)",
    "Payment gateway integration so you can accept online payments easily",
    "Up to 20 products listed & ready to sell",
    "Simple logo design, banners & content creation for your store",
    "Training on how to manage your store & add products (free)",
    "Project delivered in 25 days",
    "Transparent pricing — no hidden charges",
    "Monthly subscription (paid separately, cancel anytime)"
  ],

  // Delivery timeline
  timeline: {
    standardDelivery: "25 days",
    quickDeliveryAvailable: true,
    quickDeliveryCondition: "Pay 70% upfront"
  },

  // Product categories supported
  supportedProducts: [
    "clothing",
    "shoes",
    "jewellery",
    "fashion accessories",
    "beauty products",
    "home decor",
    "electronics",
    "books",
    "toys",
    "sports equipment",
    "any niche product"
  ],

  // Common questions and answers
  faqs: {
    "What is the total cost?": "The total project cost is ₹7,999/- including all taxes.",
    
    "How much do I need to pay now?": "You only need to pay a confirmation milestone of ₹1,599/- to secure your project slot. The remaining balance will be paid in 4 simple instalments during the 25-day project timeline.",
    
    "What payment options do I have?": "You can either pay ₹1,599 upfront and the rest in 4 installments, or choose the Quick Delivery Option by paying 70% upfront for faster setup.",
    
    "How long does it take?": "Your complete store will be delivered in 25 days. If you choose the Quick Delivery Option (70% upfront payment), we can deliver it faster.",
    
    "Do I need technical knowledge?": "No! You don't need to worry about the tech side — we handle it all for you. Plus, we provide free training on how to manage your store and add products.",
    
    "What platform do you use?": "We build your store on Shopify, which is one of the most reliable and user-friendly ecommerce platforms in the world.",
    
    "Can I sell any type of product?": "Yes! You can sell clothing, shoes, jewellery, or any niche you choose. The store can be customized for your specific business.",
    
    "Is the domain included?": "Yes! You get a 1-year free domain with your brand name as a gift from us.",
    
    "How many products can I list?": "We'll list up to 20 products for you initially. After that, you can add unlimited products yourself using the training we provide.",
    
    "Are there any hidden charges?": "No! We have transparent pricing with no hidden charges. The only additional cost is the monthly Shopify subscription, which you pay directly to Shopify and can cancel anytime.",
    
    "Will I be able to accept payments?": "Yes! We'll integrate a payment gateway so you can accept online payments easily from customers.",
    
    "Do you provide design services?": "Yes! We provide simple logo design, banners, and content creation for your store.",
    
    "Will I get training?": "Yes! We provide free training on how to manage your store and add products yourself.",
    
    "Can I cancel the subscription?": "Yes! The monthly Shopify subscription can be cancelled anytime by you.",
    
    "Where can I sell?": "You can sell directly on Google, social media, and worldwide through your store."
  },

  // Keywords for intent detection
  keywords: {
    pricing: ["cost", "price", "fee", "payment", "pay", "charge", "expensive", "cheap", "afford", "money", "rupees", "₹"],
    
    features: ["features", "include", "get", "what", "benefit", "offer", "provide", "service", "package"],
    
    timeline: ["when", "how long", "time", "duration", "days", "delivery", "fast", "quick", "ready"],
    
    products: ["product", "sell", "item", "clothing", "shoes", "jewellery", "jewelry", "fashion", "niche"],
    
    technical: ["technical", "tech", "difficult", "easy", "knowledge", "skill", "learn", "manage"],
    
    domain: ["domain", "website name", "url", "web address", "brand name"],
    
    training: ["training", "teach", "learn", "help", "support", "tutorial", "guide"],
    
    platform: ["shopify", "platform", "ecommerce", "e-commerce", "online store", "webstore"],
    
    payment_gateway: ["payment", "gateway", "accept payment", "online payment", "transaction"],
    
    design: ["design", "logo", "banner", "look", "appearance", "branding"],
    
    confirmation: ["start", "begin", "sign up", "register", "book", "confirm", "interested", "want"]
  },

  // Response templates
  responseTemplates: {
    greeting: "Hi! Thank you for your interest in AR Solutions! 🎉 We help entrepreneurs like you launch professional online stores quickly and affordably.",
    
    pricingSummary: "Our complete ecommerce store setup costs just ₹7,999/- (all taxes included). You only pay ₹1,599/- to confirm your project, and the rest in 4 easy installments over 25 days. Want faster delivery? Pay 70% upfront for our Quick Delivery Option!",
    
    featuresSummary: "You'll get everything you need to start selling: ✅ Complete Shopify store, ✅ Free 1-year domain, ✅ Payment gateway, ✅ 20 products listed, ✅ Logo & banners, ✅ Free training, ✅ 25-day delivery!",
    
    noTechRequired: "Great news! You don't need any technical knowledge. We handle all the tech work for you, and we'll train you on how to manage your store easily. 😊",
    
    callToAction: "Ready to start your online business? Click the 'Launch My Store' button below to secure your slot with just ₹1,599/-!",
    
    humanHandoff: "For detailed discussions or personalized guidance, I'd recommend chatting with our team directly. Click 'Chat with Human' to connect via WhatsApp! 📱"
  },

  // Contact information
  contact: {
    whatsapp: "919050983530",
    whatsappLink: "https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0",
    phone: "+919050983530",
    paymentLink: "https://pages.razorpay.com/pl_R6OXxjqi9EpIhJ/view"
  }
};

// AI Response Generator Function
function generateResponse(userQuery) {
  const query = userQuery.toLowerCase().trim();
  const kb = knowledgeBase;
  
  // Check for greetings
  const greetings = ["hi", "hello", "hey", "good morning", "good evening", "good afternoon"];
  if (greetings.some(g => query === g || query.startsWith(g + " "))) {
    return {
      text: `${kb.responseTemplates.greeting} ${kb.responseTemplates.featuresSummary}`,
      hasButton: true,
      buttonText: "Launch My Store",
      buttonLink: kb.contact.paymentLink
    };
  }
  
  // Check for pricing queries
  if (kb.keywords.pricing.some(kw => query.includes(kw))) {
    return {
      text: `${kb.responseTemplates.pricingSummary}\n\n${kb.responseTemplates.callToAction}`,
      hasButton: true,
      buttonText: "Launch My Store",
      buttonLink: kb.contact.paymentLink
    };
  }
  
  // Check for feature queries
  if (kb.keywords.features.some(kw => query.includes(kw))) {
    return {
      text: `${kb.responseTemplates.featuresSummary}\n\n${kb.responseTemplates.pricingSummary}`,
      hasButton: true,
      buttonText: "Launch My Store",
      buttonLink: kb.contact.paymentLink
    };
  }
  
  // Check for timeline queries
  if (kb.keywords.timeline.some(kw => query.includes(kw))) {
    return {
      text: `Your complete store will be delivered in ${kb.timeline.standardDelivery}! Want it faster? Choose our Quick Delivery Option by paying 70% upfront. 🚀\n\n${kb.responseTemplates.callToAction}`,
      hasButton: true,
      buttonText: "Launch My Store",
      buttonLink: kb.contact.paymentLink
    };
  }
  
  // Check for technical knowledge concerns
  if (kb.keywords.technical.some(kw => query.includes(kw))) {
    return {
      text: `${kb.responseTemplates.noTechRequired}\n\n${kb.responseTemplates.featuresSummary}`,
      hasButton: true,
      buttonText: "Launch My Store",
      buttonLink: kb.contact.paymentLink
    };
  }
  
  // Check for product-related queries
  if (kb.keywords.products.some(kw => query.includes(kw))) {
    return {
      text: `You can sell any type of products: ${kb.supportedProducts.slice(0, 5).join(", ")}, and more! We'll help you set up your store for your specific niche. 🛍️\n\n${kb.responseTemplates.pricingSummary}`,
      hasButton: true,
      buttonText: "Launch My Store",
      buttonLink: kb.contact.paymentLink
    };
  }
  
  // Check for domain queries
  if (kb.keywords.domain.some(kw => query.includes(kw))) {
    return {
      text: `Yes! You get a 1-year free domain with your brand name as a gift from us! 🎁 It's included in the ₹7,999/- package.\n\n${kb.responseTemplates.callToAction}`,
      hasButton: true,
      buttonText: "Launch My Store",
      buttonLink: kb.contact.paymentLink
    };
  }
  
  // Check for training queries
  if (kb.keywords.training.some(kw => query.includes(kw))) {
    return {
      text: `We provide FREE training on how to manage your store and add products! You'll be a pro in no time. 📚\n\n${kb.responseTemplates.callToAction}`,
      hasButton: true,
      buttonText: "Launch My Store",
      buttonLink: kb.contact.paymentLink
    };
  }
  
  // Check for confirmation/start queries
  if (kb.keywords.confirmation.some(kw => query.includes(kw))) {
    return {
      text: `Awesome! Let's get you started! 🎉\n\nTo begin, you only need to pay ₹1,599/- as a confirmation fee. The rest will be paid in 4 easy installments over 25 days.\n\nClick below to secure your slot now!`,
      hasButton: true,
      buttonText: "Launch My Store - ₹1,599",
      buttonLink: kb.contact.paymentLink
    };
  }
  
  // Check if query matches any FAQ
  for (const [question, answer] of Object.entries(kb.faqs)) {
    if (query.includes(question.toLowerCase().substring(0, 10))) {
      return {
        text: `${answer}\n\n${kb.responseTemplates.callToAction}`,
        hasButton: true,
        buttonText: "Launch My Store",
        buttonLink: kb.contact.paymentLink
      };
    }
  }
  
  // Check for ecommerce-related general queries
  const ecommerceKeywords = ["ecommerce", "e-commerce", "online store", "store", "shop", "website", "sell online"];
  if (ecommerceKeywords.some(kw => query.includes(kw))) {
    return {
      text: `Hi! Thank you so much for your interest in starting an online store! 🎉\n\nWe specialize in helping entrepreneurs like you launch professional ecommerce stores in just 25 days.\n\n${kb.responseTemplates.featuresSummary}\n\n${kb.responseTemplates.pricingSummary}`,
      hasButton: true,
      buttonText: "Launch My Store",
      buttonLink: kb.contact.paymentLink
    };
  }
  
  // Default response for unrecognized queries
  return {
    text: `Thank you for reaching out! While I'm learning to answer more questions, I'd love to connect you with our team for the best assistance. 😊\n\n${kb.responseTemplates.humanHandoff}`,
    hasButton: false
  };
}
