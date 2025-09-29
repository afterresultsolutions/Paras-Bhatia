// Simple knowledge base for AR Solutions chatbot
// This file contains all the AI responses

const responses = {
  ecommerce: "Hi! Thank you for your interest in starting an online store! We build complete Shopify stores in 25 days. Total cost: ₹7,999 (pay ₹1,599 to start).",
  
  pricing: "Our setup costs ₹7,999 total. Pay only ₹1,599 now, rest in 4 installments over 25 days.",
  
  features: "You get: Shopify store, free domain (1 year), payment gateway, 20 products listed, logo design, and free training.",
  
  default: "Thank you for reaching out! Please chat with our team for detailed assistance."
};

function getResponse(query) {
  const q = query.toLowerCase();
  
  if (q.includes('ecommerce') || q.includes('store') || q.includes('shop')) {
    return { text: responses.ecommerce, hasButton: true };
  }
  
  if (q.includes('price') || q.includes('cost') || q.includes('pay')) {
    return { text: responses.pricing, hasButton: true };
  }
  
  if (q.includes('feature') || q.includes('get') || q.includes('include')) {
    return { text: responses.features, hasButton: true };
  }
  
  return { text: responses.default, hasButton: false };
}
