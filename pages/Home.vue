<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Revenue Operations Services</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #1a202c;
      background: #ffffff;
      overflow-x: hidden;
    }

    .nav-toggle {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1001;
      background: #1e3a8a;
      color: white;
      border: none;
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.2rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      transition: all 0.3s;
    }

    .nav-toggle:hover {
      background: #1e40af;
      transform: scale(1.05);
    }

    .nav-slider {
      position: fixed;
      top: 0;
      left: -300px;
      width: 280px;
      height: 100vh;
      background: #ffffff;
      box-shadow: 2px 0 20px rgba(0,0,0,0.2);
      z-index: 1000;
      transition: left 0.3s ease;
      overflow-y: auto;
    }

    .nav-slider.open {
      left: 0;
    }

    .nav-header {
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      color: white;
      padding: 24px 20px;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .nav-links {
      list-style: none;
      padding: 20px 0;
    }

    .nav-links li {
      margin: 0;
    }

    .nav-links a {
      display: block;
      padding: 16px 20px;
      color: #1e293b;
      text-decoration: none;
      transition: all 0.3s;
      border-left: 4px solid transparent;
      font-weight: 500;
    }

    .nav-links a:hover {
      background: #f8fafc;
      border-left-color: #3b82f6;
      color: #1e3a8a;
    }

    .nav-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 999;
      display: none;
    }

    .nav-overlay.show {
      display: block;
    }

    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 20px;
      animation: fadeIn 0.3s ease;
    }

    .popup-overlay.show {
      display: flex;
    }

    @keyframes fadeIn {
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

    @keyframes slideUp {
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
    }

    .problem-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
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
      justify-content: space-between;
    }

    .service-header h3 {
      font-size: 1rem;
      color: #1e293b;
      font-weight: 600;
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
      display: none;
      animation: slideDown 0.3s ease;
    }

    .service-card.expanded .service-description {
      display: block;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

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

    @media (max-width: 768px) {
      .nav-toggle {
        top: 15px;
        left: 15px;
        padding: 10px 14px;
        font-size: 1.1rem;
      }

      .nav-slider {
        width: 260px;
      }

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
  </style>
</head>
<body>
  <button class="nav-toggle" onclick="toggleNav()">☰</button>

  <div class="nav-overlay" id="navOverlay" onclick="closeNav()"></div>
  <nav class="nav-slider" id="navSlider">
    <div class="nav-header">Quick Navigation</div>
    <ul class="nav-links">
      <li><a href="#problem" onclick="closeNav()">The Problem</a></li>
      <li><a href="#approach" onclick="closeNav()">Our Approach</a></li>
      <li><a href="#services" onclick="closeNav()">What's Included</a></li>
      <li><a href="#outcomes" onclick="closeNav()">Expected Outcomes</a></li>
      <li><a href="#pricing" onclick="closeNav()">Pricing</a></li>
      <li><a href="#contact" onclick="closeNav()">Contact Us</a></li>
    </ul>
  </nav>

  <div class="popup-overlay" id="popupOverlay">
    <div class="popup-content">
      <button class="popup-close" onclick="closePopup()">×</button>
      <h3>Schedule Your Call</h3>
      <form id="scheduleForm" onsubmit="handleSubmit(event)">
        <input type="text" id="name" placeholder="Your Name" required>
        <input type="text" id="position" placeholder="Your Position" required>
        <input type="text" id="company" placeholder="Company Name" required>
        <input type="date" id="date" required>
        <input type="time" id="time" required>
        <button type="submit" class="submit-btn">Schedule My Call!</button>
      </form>
    </div>
  </div>

  <section class="hero">
    <div class="hero-content">
      <h1>Revenue Operations Services</h1>
      <p>Scale your revenue engine with strategic automation, seamless integrations, and data-driven operations</p>
      <button class="cta-button" onclick="openPopup()">Schedule a Consultation</button>
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
        <div class="solution-card">
          <div class="solution-number">01</div>
          <h3>Revenue Audit & Strategy</h3>
          <p>Comprehensive assessment of your current tech stack, processes, and workflows to identify high-impact opportunities.</p>
        </div>
        <div class="solution-card">
          <div class="solution-number">02</div>
          <h3>Tech Stack Integration</h3>
          <p>Connect your CRM, marketing automation, and analytics tools into a unified ecosystem with seamless data flow.</p>
        </div>
        <div class="solution-card">
          <div class="solution-number">03</div>
          <h3>Process Automation</h3>
          <p>Design intelligent workflows that automate lead routing, data enrichment, follow-ups, and reporting.</p>
        </div>
        <div class="solution-card">
          <div class="solution-number">04</div>
          <h3>Data Infrastructure</h3>
          <p>Build robust data architecture with proper field mapping, validation rules, and governance policies.</p>
        </div>
        <div class="solution-card">
          <div class="solution-number">05</div>
          <h3>Analytics & Reporting</h3>
          <p>Create custom dashboards with real-time visibility into key metrics and pipeline health.</p>
        </div>
        <div class="solution-card">
          <div class="solution-number">06</div>
          <h3>Continuous Optimization</h3>
          <p>Ongoing monitoring, testing, and refinement of systems based on performance data.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section services-section" id="services">
    <div class="container">
      <h2 class="section-title">What's Included</h2>
      <p class="section-subtitle">Comprehensive revenue operations support on a monthly retainer</p>
      <div class="services-grid">
        <div class="service-card" onclick="toggleService(this)">
          <div class="service-header">
            <h3>CRM Administration</h3>
            <span class="toggle-icon">+</span>
          </div>
          <p class="service-description">Platform configuration, custom object creation, field management, user permissions, and ongoing system maintenance</p>
        </div>
        <div class="service-card" onclick="toggleService(this)">
          <div class="service-header">
            <h3>Workflow Development</h3>
            <span class="toggle-icon">+</span>
          </div>
          <p class="service-description">Custom automation build-out, trigger logic design, multi-step sequences, and conditional branching</p>
        </div>
        <div class="service-card" onclick="toggleService(this)">
          <div class="service-header">
            <h3>Integration Management</h3>
            <span class="toggle-icon">+</span>
          </div>
          <p class="service-description">API connections, data mapping, sync monitoring, error handling, and integration troubleshooting</p>
        </div>
        <div class="service-card" onclick="toggleService(this)">
          <div class="service-header">
            <h3>Data Operations</h3>
            <span class="toggle-icon">+</span>
          </div>
          <p class="service-description">Database hygiene, duplicate management, enrichment workflows, import/export processes, and migration support</p>
        </div>
        <div class="service-card" onclick="toggleService(this)">
          <div class="service-header">
            <h3>Reporting & Analytics</h3>
            <span class="toggle-icon">+</span>
          </div>
          <p class="service-description">Dashboard creation, custom report building, metric tracking, forecasting models, and data visualization</p>
        </div>
        <div class="service-card" onclick="toggleService(this)">
          <div class="service-header">
            <h3>Lead Management</h3>
            <span class="toggle-icon">+</span>
          </div>
          <p class="service-description">Lead scoring models, routing rules, qualification frameworks, and conversion optimization</p>
        </div>
        <div class="service-card" onclick="toggleService(this)">
          <div class="service-header">
            <h3>Sales Enablement</h3>
            <span class="toggle-icon">+</span>
          </div>
          <p class="service-description">Territory planning, quota management, sales process documentation, and performance tracking</p>
        </div>
        <div class="service-card" onclick="toggleService(this)">
          <div class="service-header">
            <h3>Training & Support</h3>
            <span class="toggle-icon">+</span>
          </div>
          <p class="service-description">Team onboarding, process documentation, best practices training, and ongoing technical support</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section benefits-section" id="outcomes">
    <div class="container">
      <h2 class="section-title">Expected Outcomes</h2>
      <p class="section-subtitle">Measurable improvements across key operational metrics</p>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="metric">30-50%</div>
          <h3>Time Savings</h3>
          <p>Reduction in manual data entry and repetitive workflows through automation</p>
        </div>
        <div class="benefit-card">
          <div class="metric">20-35%</div>
          <h3>Faster Sales Cycles</h3>
          <p>Decrease in time from lead to close through optimized processes</p>
        </div>
        <div class="benefit-card">
          <div class="metric">95%+</div>
          <h3>Data Accuracy</h3>
          <p>Improvement in data quality through validation and enrichment</p>
        </div>
        <div class="benefit-card">
          <div class="metric">100%</div>
          <h3>Revenue Visibility</h3>
          <p>Complete transparency into pipeline health and performance metrics</p>
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
            <button class="pricing-cta" onclick="openPopup()">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section" id="contact">
    <div class="cta-content">
      <h2>Ready to Scale Your Revenue Operations?</h2>
      <p>Let's discuss how we can build a more efficient, data-driven revenue engine for your business</p>
      <button class="cta-button-primary" onclick="openPopup()">Schedule a Call</button>
    </div>
  </section>

  <script>
    function toggleNav() {
      const navSlider = document.getElementById('navSlider');
      const navOverlay = document.getElementById('navOverlay');
      navSlider.classList.toggle('open');
      navOverlay.classList.toggle('show');
    }

    function closeNav() {
      const navSlider = document.getElementById('navSlider');
      const navOverlay = document.getElementById('navOverlay');
      navSlider.classList.remove('open');
      navOverlay.classList.remove('show');
    }

    function openPopup() {
      document.getElementById('popupOverlay').classList.add('show');
    }

    function closePopup() {
      document.getElementById('popupOverlay').classList.remove('show');
    }

    function toggleService(card) {
      card.classList.toggle('expanded');
    }

    function handleSubmit(event) {
      event.preventDefault();
      
      const name = document.getElementById('name').value;
      const position = document.getElementById('position').value;
      const company = document.getElementById('company').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      const message = `Hi, I'd like to schedule a call for Revenue Operations Services.

*Details:*
- Name: ${name}
- Position: ${position}
- Company: ${company}
- Preferred Date: ${date}
- Preferred Time: ${time}

Please schedule a call for me. Thank you!`;

      const whatsappUrl = `https://wa.me/919991183530?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      closePopup();
      document.getElementById('scheduleForm').reset();
    }
  </script>
</body>
</html>
