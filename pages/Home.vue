import { useState } from 'react';

export default function RevOpsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    date: '',
    time: ''
  });

  const problems = [
    {
      icon: '🔗',
      title: 'Disconnected Systems',
      description: 'Sales, marketing, and customer success teams operate in silos with fragmented data across multiple platforms.'
    },
    {
      icon: '⚙️',
      title: 'Manual Workflows',
      description: 'Revenue teams spend countless hours on repetitive tasks instead of focusing on strategic initiatives.'
    },
    {
      icon: '📊',
      title: 'Poor Data Quality',
      description: 'Incomplete or outdated data makes it impossible to forecast accurately or make informed decisions.'
    },
    {
      icon: '👁️',
      title: 'Lack of Visibility',
      description: 'Leadership lacks real-time insights into pipeline health and team performance.'
    }
  ];

  const solutions = [
    {
      number: '01',
      title: 'Revenue Audit & Strategy',
      description: 'Comprehensive assessment of your current tech stack, processes, and workflows to identify high-impact opportunities.'
    },
    {
      number: '02',
      title: 'Tech Stack Integration',
      description: 'Connect your CRM, marketing automation, and analytics tools into a unified ecosystem with seamless data flow.'
    },
    {
      number: '03',
      title: 'Process Automation',
      description: 'Design intelligent workflows that automate lead routing, data enrichment, follow-ups, and reporting.'
    },
    {
      number: '04',
      title: 'Data Infrastructure',
      description: 'Build robust data architecture with proper field mapping, validation rules, and governance policies.'
    },
    {
      number: '05',
      title: 'Analytics & Reporting',
      description: 'Create custom dashboards with real-time visibility into key metrics and pipeline health.'
    },
    {
      number: '06',
      title: 'Continuous Optimization',
      description: 'Ongoing monitoring, testing, and refinement of systems based on performance data.'
    }
  ];

  const services = [
    {
      icon: '💼',
      title: 'CRM Administration',
      description: 'Platform configuration, custom object creation, field management, user permissions, and ongoing system maintenance'
    },
    {
      icon: '⚡',
      title: 'Workflow Development',
      description: 'Custom automation build-out, trigger logic design, multi-step sequences, and conditional branching'
    },
    {
      icon: '🔌',
      title: 'Integration Management',
      description: 'API connections, data mapping, sync monitoring, error handling, and integration troubleshooting'
    },
    {
      icon: '🗄️',
      title: 'Data Operations',
      description: 'Database hygiene, duplicate management, enrichment workflows, import/export processes, and migration support'
    },
    {
      icon: '📈',
      title: 'Reporting & Analytics',
      description: 'Dashboard creation, custom report building, metric tracking, forecasting models, and data visualization'
    },
    {
      icon: '🎯',
      title: 'Lead Management',
      description: 'Lead scoring models, routing rules, qualification frameworks, and conversion optimization'
    },
    {
      icon: '🚀',
      title: 'Sales Enablement',
      description: 'Territory planning, quota management, sales process documentation, and performance tracking'
    },
    {
      icon: '🎓',
      title: 'Training & Support',
      description: 'Team onboarding, process documentation, best practices training, and ongoing technical support'
    }
  ];

  const benefits = [
    { metric: '30-50%', title: 'Time Savings', description: 'Reduction in manual data entry and repetitive workflows through automation' },
    { metric: '20-35%', title: 'Faster Sales Cycles', description: 'Decrease in time from lead to close through optimized processes' },
    { metric: '95%+', title: 'Data Accuracy', description: 'Improvement in data quality through validation and enrichment' },
    { metric: '100%', title: 'Revenue Visibility', description: 'Complete transparency into pipeline health and performance metrics' }
  ];

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);
  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hi, I'd like to schedule a call for Revenue Operations Services.

*Details:*
• Name: ${formData.name}
• Position: ${formData.position}
• Company: ${formData.company}
• Preferred Date: ${formData.date}
• Preferred Time: ${formData.time}

Please schedule a call for me. Thank you!`;
    
    const whatsappUrl = `https://wa.me/919991183530?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    closePopup();
    setFormData({ name: '', position: '', company: '', date: '', time: '' });
  };

  return (
    <div className="revops-page">
      {/* Popup Form */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            <h3>Schedule Your Call</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Your Position"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
              <button type="submit" className="submit-btn">Schedule My Call!</button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Revenue Operations Services</h1>
          <p>Scale your revenue engine with strategic automation, seamless integrations, and data-driven operations</p>
          <button onClick={openPopup} className="cta-button">Schedule a Consultation</button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section problem-section">
        <div className="container">
          <h2 className="section-title">The Problem</h2>
          <p className="section-subtitle">Most growing companies struggle with operational inefficiencies</p>
          <div className="problem-grid">
            {problems.map((problem, index) => (
              <div key={index} className="problem-card">
                <div className="problem-icon">{problem.icon}</div>
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section solution-section">
        <div className="container">
          <h2 className="section-title">Our Approach</h2>
          <p className="section-subtitle">We build revenue operations infrastructure that scales with your business</p>
          <div className="solution-grid">
            {solutions.map((solution, index) => (
              <div key={index} className="solution-card">
                <div className="solution-number">{solution.number}</div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">What's Included</h2>
          <p className="section-subtitle">Comprehensive revenue operations support on a monthly retainer</p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`service-card ${expandedService === index ? 'expanded' : ''}`}
                onClick={() => toggleService(index)}
              >
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <span className="toggle-icon">{expandedService === index ? '−' : '+'}</span>
                </div>
                {expandedService === index && (
                  <p className="service-description">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="container">
          <h2 className="section-title">Expected Outcomes</h2>
          <p className="section-subtitle">Measurable improvements across key operational metrics</p>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="metric">{benefit.metric}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section pricing-section">
        <div className="container">
          <h2 className="section-title">Monthly Retainer</h2>
          <p className="section-subtitle">Dedicated RevOps support with flexible engagement</p>
          <div className="pricing-container">
            <div className="pricing-card">
              <div className="price-header">
                <h3>RevOps Retainer</h3>
                <div className="price-tag">
                  <span className="currency">$</span>3,500<span className="period">/month</span>
                </div>
              </div>
              <div className="price-body">
                <ul className="price-features">
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
              <div className="price-footer">
                <button onClick={openPopup} className="pricing-cta">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Scale Your Revenue Operations?</h2>
            <p>Let's discuss how we can build a more efficient, data-driven revenue engine for your business</p>
            <button onClick={openPopup} className="cta-button-primary">Schedule a Call</button>
          </div>
        </div>
      </section>

      <style>{`
        .revops-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
          line-height: 1.6;
          color: #1a202c;
          background: #ffffff;
          overflow-x: hidden;
        }

        /* Popup Styles */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .popup-content {
          background: white;
          border-radius: 16px;
          padding: 40px 30px;
          max-width: 480px;
          width: 100%;
          position: relative;
          animation: slideUp 0.3s ease;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .popup-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 32px;
          color: #64748b;
          cursor: pointer;
          line-height: 1;
          padding: 5px;
          transition: color 0.3s;
        }

        .popup-close:hover {
          color: #1e293b;
        }

        .popup-content h3 {
          font-size: 1.75rem;
          margin-bottom: 24px;
          color: #1e293b;
          font-weight: 700;
        }

        .popup-content form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .popup-content input {
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
          font-family: inherit;
        }

        .popup-content input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .submit-btn {
          padding: 16px;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          margin-top: 8px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(30, 58, 138, 0.3);
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: #ffffff;
          padding: 100px 20px 80px;
          text-align: center;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .hero p {
          font-size: 1.1rem;
          margin-bottom: 32px;
          opacity: 0.95;
          line-height: 1.6;
        }

        .cta-button {
          display: inline-block;
          padding: 14px 40px;
          background: #ffffff;
          color: #1e3a8a;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section {
          padding: 70px 20px;
        }

        .section-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 12px;
          color: #1a202c;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1rem;
          color: #64748b;
          margin-bottom: 48px;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        /* Problem Section */
        .problem-section {
          background: #f8fafc;
        }

        .problem-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .problem-card {
          background: #ffffff;
          padding: 28px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          text-align: center;
        }

        .problem-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        .problem-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .problem-card h3 {
          font-size: 1.15rem;
          margin-bottom: 12px;
          color: #1e293b;
          font-weight: 600;
        }

        .problem-card p {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* Solution Section */
        .solution-section {
          background: #ffffff;
        }

        .solution-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .solution-card {
          background: #ffffff;
          padding: 32px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .solution-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.12);
          transform: translateY(-4px);
        }

        .solution-number {
          display: inline-block;
          padding: 6px 14px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .solution-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: #1e293b;
          font-weight: 600;
        }

        .solution-card p {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* Services Section */
        .services-section {
          background: #f8fafc;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }

        .service-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 10px;
          border: 2px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .service-card.expanded {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .service-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .service-icon {
          font-size: 1.8rem;
          flex-shrink: 0;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .service-header h3 {
          font-size: 1rem;
          color: #1e293b;
          font-weight: 600;
          flex: 1;
        }

        .toggle-icon {
          font-size: 1.5rem;
          color: #3b82f6;
          font-weight: 600;
          transition: transform 0.3s;
        }

        .service-card.expanded .toggle-icon {
          transform: rotate(180deg);
        }

        .service-description {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
          color: #475569;
          font-size: 0.9rem;
          line-height: 1.6;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Benefits Section */
        .benefits-section {
          background: #ffffff;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }

        .benefit-card {
          text-align: center;
          padding: 36px 24px;
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        .metric {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 12px;
        }

        .benefit-card h3 {
          font-size: 1.1rem;
          margin-bottom: 12px;
          color: #1e293b;
          font-weight: 600;
        }

        .benefit-card p {
          color: #64748b;
          font-size: 0.85rem;
          line-height: 1.6;
        }

        /* Pricing Section */
        .pricing-section {
          background: #f8fafc;
        }

        .pricing-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .pricing-card {
          background: #ffffff;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .price-header {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: #ffffff;
          padding: 36px 32px;
          text-align: center;
        }

        .price-header h3 {
          font-size: 1.3rem;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .price-tag {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1;
        }

        .currency {
          font-size: 1.5rem;
          vertical-align: top;
          margin-right: 4px;
        }

        .period {
          font-size: 1.2rem;
          font-weight: 400;
          opacity: 0.9;
        }

        .price-body {
          padding: 32px;
        }

        .price-features {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .price-features li {
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          font-size: 0.9rem;
          position: relative;
          padding-left: 28px;
        }

        .price-features li:last-child {
          border-bottom: none;
        }

        .price-features li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .price-footer {
          padding: 0 32px 32px;
        }

        .pricing-cta {
          display: block;
          width: 100%;
          padding: 16px;
          background: #1e3a8a;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pricing-cta:hover {
          background: #1e40af;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(30, 58, 138, 0.3);
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: #ffffff;
          padding: 80px 20px;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-section h2 {
          font-size: 2.25rem;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .cta-section p {
          font-size: 1.1rem;
          margin-bottom: 36px;
          opacity: 0.95;
          line-height: 1.6;
        }

        .cta-button-primary {
          display: inline-block;
          padding: 16px 48px;
          background: #ffffff;
          color: #1e3a8a;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        .cta-button-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero {
            padding: 80px 20px 60px;
          }

          .hero h1 {
            font-size: 1.75rem;
          }

          .hero p {
            font-size: 0.95rem;
          }

          .cta-button {
            padding: 12px 32px;
            font-size: 0.95rem;
          }

          .section {
            padding: 50px 20px;
          }

          .section-title {
            font-size: 1.6rem;
          }

          .section-subtitle {
            font-size: 0.9rem;
            margin-bottom: 36px;
          }

          .problem-grid,
          .solution-grid,
          .services-grid,
          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .problem-card,
          .solution-card,
          .service-card,
          .benefit-card {
            padding: 20px;
          }

          .problem-icon {
            font-size: 2rem;
          }

          .service-icon {
            font-size: 1.5rem;
          }

          .metric {
            font-size: 2rem;
          }

          .cta-section {
            padding: 60px 20px;
          }

          .cta-section h2 {
            font-size: 1.75rem;
          }

          .cta-section p {
            font-size: 0.95rem;
          }

          .cta-button-primary {
            padding: 14px 36px;
            font-size: 0.95rem;
          }

          .price-tag {
            font-size: 2.5rem;
          }

          .popup-content {
            padding: 32px 24px;
          }

          .popup-content h3 {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 480px) {
          .hero h1 {
            font-size: 1.5rem;
          }

          .section-title {
            font-size: 1.4rem;
          }

          .problem-card h3,
          .solution-card h3,
          .benefit-card h3 {
            font-size: 1rem;
          }

          .problem-card p,
          .solution-card p,
          .benefit-card p,
          .service-description {
            font-size: 0.85rem;
          }

          .service-header h3 {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
