<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AfterResult Quotation Estimator</title>
<style>
  body {
    font-family: "Inter", Arial, sans-serif;
    background: #000;
    color: #ddd;
    margin: 0;
    padding: 20px;
  }
  #calculatorContainer {
    max-width: 800px;
    width: 100%;
    margin: 20px auto;
    padding: 15px;
    background: #181818;
    border-radius: 18px;
    border: 2px solid #f39c12;
    box-shadow: 0 0 40px #f39c12;
    box-sizing: border-box;
  }
  h2 {
    color: #f39c12;
    font-weight: 400;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 15px;
  }
  label {
    display: block;
    font-size: 13px;
    color: #ccc;
    margin-bottom: 5px;
    font-weight: 300;
  }
  select,
  input[type="number"],
  input[type="text"],
  input[type="email"],
  input[type="tel"] {
    width: 100%;
    padding: 8px 14px;
    border-radius: 20px;
    border: 2px solid #f39c12;
    background: #111;
    color: #fff;
    font-size: 14px;
    margin-bottom: 14px;
    outline: none;
    transition: border-color 0.3s;
    text-align: left;
  }
  select:hover,
  select:focus,
  input:hover,
  input:focus {
    border-color: #e67e22;
  }
  .button-row {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    margin-top: 8px;
    flex-wrap: wrap;
  }
  button {
    flex: 1;
    padding: 10px 0;
    border: none;
    border-radius: 25px;
    background: linear-gradient(90deg, #f39c12 0%, #e74c3c 100%);
    color: white;
    font-weight: 700;
    font-size: 0.90rem;
    cursor: pointer;
    margin-bottom: 0;
    transition: background 0.3s;
    min-width: 120px;
  }
  button.whatsapp {
    background: linear-gradient(90deg, #25d366 0%, #128c7e 100%);
  }
  button:hover {
    background: linear-gradient(90deg, #e67e22 0%, #c0392b 100%);
  }
  button.whatsapp:hover {
    background: linear-gradient(90deg, #128c7e 0%, #25d366 100%);
  }
  .hidden {
    display: none !important;
  }
  #estimatedPriceRange {
    color: #f39c12;
    font-weight: 600;
    font-size: 1rem;
    min-height: 24px;
    margin-bottom: 8px;
    white-space: pre-line;
    text-align: center;
  }
  #averagePriceRange {
    color: #aaa;
    font-weight: 400;
    font-size: 0.9rem;
    margin-bottom: 16px;
    text-align: center;
    font-style: italic;
  }
  .slider-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
    justify-content: center;
  }
  .slider-row label {
    margin: 0 0 0 0;
    font-size: 0.9em;
    color: #bbb;
    font-weight: 400;
  }
  input[type="range"] {
    width: 140px;
    accent-color: #f39c12;
    height: 3px;
    background: linear-gradient(90deg, #f39c12 0%, #e74c3c 100%);
    border-radius: 2px;
    outline: none;
    margin: 0;
    -webkit-appearance: none;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #f39c12;
    box-shadow: 0 2px 8px #0002;
    cursor: pointer;
    transition: background 0.2s;
  }
  input[type="range"]:focus::-webkit-slider-thumb {
    background: #f39c12;
    border-color: #e67e22;
  }
  input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #f39c12;
    box-shadow: 0 2px 8px #0002;
    cursor: pointer;
    transition: background 0.2s;
  }
  input[type="range"]:focus::-moz-range-thumb {
    background: #f39c12;
    border-color: #e67e22;
  }
  input[type="range"]::-ms-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #f39c12;
    box-shadow: 0 2px 8px #0002;
    cursor: pointer;
    transition: background 0.2s;
  }
  .centered-checkboxes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    font-size: 0.85em;
    margin-bottom: 6px;
  }
  #quotePreviewSection {
    background: #fff;
    color: #222;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 0 20px #f39c12;
    margin-top: 25px;
    font-family: "Inter", Arial, sans-serif;
    font-size: 13px;
    max-width: 500px;
    position: relative;
    overflow-x: auto;
  }
  #quotePreviewContent {
    max-width: 100%;
    margin: auto;
    text-align: left;
    word-wrap: break-word;
    position: relative;
    z-index: 2;
  }
  .watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-30deg);
    font-size: 5vw;
    color: rgba(243, 156, 18, 0.09);
    user-select: none;
    pointer-events: none;
    font-weight: 900;
    letter-spacing: 10px;
    white-space: nowrap;
    z-index: 1;
  }
  .quotation-header {
    display: flex;
    align-items: center;
    gap: 14px;
    border-bottom: 2px solid #f39c12;
    padding-bottom: 6px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }
  .quotation-header img {
    height: 50px;
    width: auto;
    border-radius: 8px;
    background: #fff;
    padding: 4px;
    flex-shrink: 0;
  }
  .quotation-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 11px;
  }
  .quotation-section-title {
    color: #f39c12;
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 6px;
    font-weight: 600;
  }
  .quotation-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
    font-size: 13px;
  }
  .quotation-table th,
  .quotation-table td {
    border: 1px solid #ccc;
    padding: 6px 10px;
    text-align: left;
    font-size: 13px;
    font-weight: 400;
  }
  .quotation-table th {
    background: #f39c12;
    color: #fff;
    font-weight: 600;
    text-align: center;
  }
  .quotation-table td {
    text-align: center;
  }
  .quotation-table td.left {
    text-align: left;
  }
  .quotation-terms {
    font-size: 11px;
    color: #444;
    background: #f7f7f7;
    padding: 10px;
    border-radius: 6px;
    max-height: 120px;
    overflow-y: auto;
  }
  .quotation-sign {
    margin-top: 16px;
    font-size: 12px;
  }
  .qr-section {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .qr-section img {
    width: 70px;
    height: 70px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: #fff;
    padding: 2px;
  }
  .qr-section .website-link {
    font-size: 13px;
    color: #1d6fa5;
    font-weight: 600;
    text-decoration: underline;
    word-break: break-word;
  }
  /* Popup form styles */
  #popupFormOverlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.85);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  #popupFormOverlay.show {
    display: flex;
  }
  #popupForm {
    background: #222;
    padding: 20px 25px;
    border-radius: 15px;
    max-width: 400px;
    width: 90%;
    box-sizing: border-box;
    box-shadow: 0 0 15px #f39c12;
  }
  #popupForm h3 {
    color: #f39c12;
    margin-top: 0;
    margin-bottom: 15px;
    font-weight: 400;
    text-align: center;
  }
  #popupForm label {
    color: #ccc;
    font-size: 13px;
    margin-bottom: 4px;
    display: block;
  }
  #popupForm input {
    width: 100%;
    padding: 8px 14px;
    border-radius: 20px;
    border: 2px solid #f39c12;
    background: #111;
    color: #fff;
    font-size: 14px;
    margin-bottom: 14px;
    outline: none;
    transition: border-color 0.3s;
    text-align: left;
  }
  #popupForm input:focus {
    border-color: #e67e22;
  }
  #popupForm .button-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  #popupForm button {
    flex: 1;
    padding: 10px 0;
    border: none;
    border-radius: 25px;
    background: linear-gradient(90deg, #f39c12 0%, #e74c3c 100%);
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.3s;
  }
  #popupForm button:hover {
    background: linear-gradient(90deg, #e67e22 0%, #c0392b 100%);
  }
</style>


  <div id="calculatorContainer" role="main" aria-label="Quotation Estimator">
    <h2>AfterResult Quotation Estimator</h2>
    <label for="serviceSelect">Select a Service</label>
    <select id="serviceSelect" aria-label="Select a service">
      <option value="" disabled="" selected="">-- Choose a service --</option>
      <option value="Logo Design">Logo Design</option>
      <option value="Basic Website">Basic Website</option>
      <option value="Advanced Website">Advanced Website</option>
      <option value="Social Media Management">Social Media Management</option>
      <option value="SEO Services">SEO Services</option>
      <option value="App Development">App Development</option>
      <option value="Content Writing">Content Writing</option>
      <option value="eCommerce Store">eCommerce Store</option>
      <option value="Marketplace Management">Marketplace Management</option>
      <option value="Digital Marketing">Digital Marketing</option>
      <option value="Branding Services">Branding Services</option>
      <option value="Instagram Followers">Instagram Followers</option>
      <option value="Meta and Google Ads">Meta Ads and Google Ads</option>
      <option value="Other">Other (Request Quote)</option>
    </select>

    <div id="complexityWrapper" class="hidden">
      <label for="complexitySelect">Select Project Complexity</label>
      <select id="complexitySelect" aria-label="Select project complexity">
        <option value="" disabled="" selected="">-- Choose complexity --</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>

    <div id="durationSliderWrapper" class="hidden slider-row" aria-label="Select project duration">
      <label for="durationSlider" style="margin-bottom: 2px">Duration:</label>
      <span style="font-size: 0.85em; color: #aaa">1</span>
      <input type="range" id="durationSlider" min="1" max="36" value="1" aria-valuemin="1" aria-valuemax="36" aria-valuenow="1" aria-label="Duration in months">
      <span id="durationSliderValue" style="font-size: 0.9em; color: #f39c12; font-weight: 600">1</span>
      <span style="font-size: 0.85em; color: #aaa">36 months</span>
    </div>

    <div id="budgetWrapper" class="hidden">
      <label for="budgetInput">Enter Your Marketing Budget (₹)</label>
      <input type="number" id="budgetInput" min="1000" placeholder="Enter amount">
    </div>

    <div id="productCountWrapper" class="hidden">
      <label for="productCount">Number of Products</label>
      <input type="number" id="productCount" min="1" max="10000" value="10">
    </div>

    <div id="marketplaceWrapper" class="hidden">
      <label for="marketplaceSelect">Marketplace</label>
      <select id="marketplaceSelect" aria-label="Select marketplace">
        <option value="" disabled="" selected="">-- Choose marketplace --</option>
        <option value="Amazon">Amazon</option>
        <option value="Flipkart">Flipkart</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div id="smmPlatformsWrapper" class="hidden checkboxGroup" aria-label="Select social media platforms">
      <label>Select Platforms</label><br>
      <label><input type="checkbox" class="smmPlatform" value="Instagram"> Instagram</label>
      <label><input type="checkbox" class="smmPlatform" value="Facebook"> Facebook</label>
      <label><input type="checkbox" class="smmPlatform" value="LinkedIn"> LinkedIn</label>
      <label><input type="checkbox" class="smmPlatform" value="Twitter"> Twitter</label>
      <label><input type="checkbox" class="smmPlatform" value="YouTube"> YouTube</label>
    </div>

    <div id="brandingMediumWrapper" class="hidden">
      <label for="brandingMediumSelect">Select Branding Medium</label>
      <select id="brandingMediumSelect" aria-label="Select branding medium">
        <option value="" disabled="" selected="">-- Choose medium --</option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
        <option value="both">Both Online &amp; Offline</option>
      </select>
    </div>

    <div id="followersWrapper" class="hidden">
      <label for="followersCount">Instagram Followers (multiples of 50)</label>
      <input type="number" id="followersCount" min="50" step="50" value="50">
    </div>

    <div id="estimatedPriceRange" aria-live="polite"></div>
    <div id="averagePriceRange" aria-live="polite"></div>

    <div class="button-row">
      <button id="previewQuotationBtn" type="button">Preview Quotation</button>
      <button id="whatsappQuotationBtn" type="button" class="whatsapp">Request Quotation via WhatsApp</button>
    </div>

    <div id="quotePreviewSection" class="hidden" aria-live="polite" aria-label="Quotation Preview">
      <div class="watermark">AfterResult</div>
      <div id="quotePreviewContent"></div>
      <button id="downloadQuoteBtn" type="button" style="margin-top: 10px; background: #222; color: #f39c12; border: none; padding: 8px 14px; border-radius: 20px; font-size: 12px; cursor: pointer; width: 100%;">Download Quotation as PDF</button>
      <button id="closePreviewBtn" type="button" style="margin-top: 10px; background: #222; color: #f39c12; border: none; padding: 8px 14px; border-radius: 20px; font-size: 12px; cursor: pointer; width: 100%;">Cancel / Back</button>
    </div>
  </div>

  
  <div id="popupFormOverlay" role="dialog" aria-modal="true" aria-labelledby="popupFormTitle" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.85); display: none; justify-content: center; align-items: center; z-index: 9999;">
    <form id="popupForm" novalidate="" style="background: #222; padding: 20px 25px; border-radius: 15px; max-width: 400px; width: 90%; box-sizing: border-box; box-shadow: 0 0 15px #f39c12;">
      <h3 id="popupFormTitle" style="color:#f39c12; margin-top:0; margin-bottom:15px; font-weight:400; text-align:center;">Please Enter Your Details</h3>
      <label for="userName">Name *</label>
      <input type="text" id="userName" name="userName" required="" autocomplete="name">
      <label for="userPhone">Phone Number *</label>
      <input type="tel" id="userPhone" name="userPhone" pattern="^\+?\d{7,15}$" placeholder="+919999999999" required="" autocomplete="tel">
      <label for="userEmail">Email *</label>
      <input type="email" id="userEmail" name="userEmail" required="" autocomplete="email">
      <label for="userCompany">Company Name</label>
      <input type="text" id="userCompany" name="userCompany" autocomplete="organization">
      <div class="button-row" style="margin-top: 10px;">
        <button type="submit" id="popupSubmitBtn">Submit</button>
        <button type="button" id="popupCancelBtn" style="background:#555;">Cancel</button>
      </div>
    </form>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js"></script>

  <script>
    (() => {
      const COMPANY = {
        name: "AfterResult",
        address: "1438, Sector 2, 25th D Cross, HSR Layout, BDA Layout, HSR Layout, Bengaluru 560102",
        email: "contact@afterresult.com",
        phone: "+91 9599169901",
        logo: "https://www.afterresult.com/web/image/website/1/logo/AfterResult?unique=db83986",
        executive: "Suraj Pratap Singh",
        designation: "Business Development Executive",
        homepage: "https://www.afterresult.com",
      };

      const TERMS = [
        "Payment Terms: 70% advance, 20% on milestone completion, and 10% on final project completion.",
        "Project Timeline: 3-5 working days for setup and enablement after onboarding.",
        "Any additional services requested will be charged separately.",
        "Minor variations may occur in real-time due to market dynamics.",
        "Pricing excludes ad campaign budgets, third-party subscriptions (domain, hosting, marketplace fees), and GST.",
        "Campaign and tool expenses are billed directly to the client on actuals.",
        "The proposal is valid for 15 days from the date of issuance.",
        "Client agrees to terms and conditions upon acceptance of this quotation.",
        "GST (18%) is applicable on the total invoice value.",
        "Discounts are applied only on subtotal before GST.",
        "For Instagram Followers, delivery time is 1-3 days per 1000 followers.",
        "For any queries, contact us at contact@afterresult.com or WhatsApp +91 9599169901.",
        "All disputes subject to Bengaluru jurisdiction.",
        "This quotation is computer generated and does not require signature.",
      ];

      const pricingData = {
        "Logo Design": { base: 3000, average: 4000 },
        "Basic Website": { base: 15000, average: 20000 },
        "Advanced Website": { base: 40000, average: 45000 },
        "Social Media Management": { base: 8000, average: 12000 },
        "SEO Services": { base: 12000, average: 18000 },
        "App Development": { base: 60000, average: 75000 },
        "Content Writing": { base: 1000, average: 1500 },
        "eCommerce Store": { base: 35000, average: 40000 },
        "Marketplace Management": { base: 10000, average: 15000 },
        "Digital Marketing": { base: 10000, average: 15000 },
        "Branding Services": { base: 7000, average: 9000 },
        "Instagram Followers": { base: 500, average: 700 },
        "Meta and Google Ads": { base: 10000, average: 15000 },
        "Other": { base: 0, average: 0 },
      };

      const complexityMultipliers = { small: 1, medium: 1.5, large: 2.2 };

      const smmPlatformPrices = {
        Instagram: 3000,
        Facebook: 2500,
        LinkedIn: 2800,
        Twitter: 2200,
        YouTube: 3500,
      };

      const marketplacePrices = { Amazon: 1.0, Flipkart: 1.2, Other: 1.1 };

      // Elements
      const serviceSelect = document.getElementById("serviceSelect");
      const complexityWrapper = document.getElementById("complexityWrapper");
      const complexitySelect = document.getElementById("complexitySelect");
      const durationSliderWrapper = document.getElementById("durationSliderWrapper");
      const durationSlider = document.getElementById("durationSlider");
      const durationSliderValue = document.getElementById("durationSliderValue");
      const budgetWrapper = document.getElementById("budgetWrapper");
      const budgetInput = document.getElementById("budgetInput");
      const productCountWrapper = document.getElementById("productCountWrapper");
      const productCountInput = document.getElementById("productCount");
      const marketplaceWrapper = document.getElementById("marketplaceWrapper");
      const marketplaceSelect = document.getElementById("marketplaceSelect");
      const smmPlatformsWrapper = document.getElementById("smmPlatformsWrapper");
      const smmPlatformCheckboxes = document.querySelectorAll(".smmPlatform");
      const followersWrapper = document.getElementById("followersWrapper");
      const followersCountInput = document.getElementById("followersCount");
      const estimatedPriceRange = document.getElementById("estimatedPriceRange");
      const averagePriceRange = document.getElementById("averagePriceRange");
      const previewQuotationBtn = document.getElementById("previewQuotationBtn");
      const whatsappQuotationBtn = document.getElementById("whatsappQuotationBtn");
      const quotePreviewSection = document.getElementById("quotePreviewSection");
      const quotePreviewContent = document.getElementById("quotePreviewContent");
      const closePreviewBtn = document.getElementById("closePreviewBtn");
      const downloadQuoteBtn = document.getElementById("downloadQuoteBtn");

      const popupFormOverlay = document.getElementById("popupFormOverlay");
      const popupForm = document.getElementById("popupForm");
      const popupCancelBtn = document.getElementById("popupCancelBtn");

      let clientDetails = null;
      let lastAction = null;

      function hideAllOptionals() {
        complexityWrapper.classList.add("hidden");
        durationSliderWrapper.classList.add("hidden");
        budgetWrapper.classList.add("hidden");
        productCountWrapper.classList.add("hidden");
        marketplaceWrapper.classList.add("hidden");
        smmPlatformsWrapper.classList.add("hidden");
        followersWrapper.classList.add("hidden");
      }

      function updateOptionals() {
        hideAllOptionals();
        const service = serviceSelect.value;
        quotePreviewSection.classList.add("hidden"); // Hide preview on service change

        if (
          [
            "Logo Design",
            "Basic Website",
            "Advanced Website",
            "App Development",
            "eCommerce Store",
            "Social Media Management",
          ].includes(service)
        ) {
          complexityWrapper.classList.remove("hidden");
        }
        if (
          ["Social Media Management", "SEO Services", "Digital Marketing"].includes(
            service
          )
        ) {
          durationSliderWrapper.classList.remove("hidden");
        }
        if (service === "Digital Marketing") budgetWrapper.classList.remove("hidden");
        if (service === "eCommerce Store") productCountWrapper.classList.remove("hidden");
        if (service === "Marketplace Management") marketplaceWrapper.classList.remove("hidden");
        if (service === "Social Media Management") smmPlatformsWrapper.classList.remove("hidden");
        if (service === "Instagram Followers") followersWrapper.classList.remove("hidden");
      }

      function calculatePrice() {
        const service = serviceSelect.value;
        if (!service) return { finalPrice: 0, discount: 0, price: 0, averagePrice: 0 };

        let price = pricingData[service]?.base || 0;
        let averagePrice = pricingData[service]?.average || 0;

        if (!complexityWrapper.classList.contains("hidden")) {
          const complexity = complexitySelect.value;
          if (complexity) {
            price *= complexityMultipliers[complexity];
            averagePrice *= complexityMultipliers[complexity];
          }
        }

        if (!durationSliderWrapper.classList.contains("hidden")) {
          const months = Number(durationSlider.value);
          price *= months;
          averagePrice *= months;
        }

        if (!budgetWrapper.classList.contains("hidden")) {
          const budget = Number(budgetInput.value);
          if (budget > 0) {
            price = budget;
            averagePrice = budget;
          }
        }

        if (!productCountWrapper.classList.contains("hidden")) {
          const count = Number(productCountInput.value);
          if (count > 0) {
            price += count * 100;
            averagePrice += count * 120;
          }
        }

        if (!followersWrapper.classList.contains("hidden")) {
          const followers = Number(followersCountInput.value);
          if (followers >= 50) {
            const units = Math.floor(followers / 50);
            price = units * pricingData["Instagram Followers"].base;
            averagePrice = units * pricingData["Instagram Followers"].average;
          }
        }

        if (!smmPlatformsWrapper.classList.contains("hidden")) {
          const selectedPlatforms = Array.from(smmPlatformCheckboxes).filter(cb => cb.checked);
          if (selectedPlatforms.length === 0) {
            price = 0;
            averagePrice = 0;
          } else {
            let platformSum = 0;
            selectedPlatforms.forEach(cb => platformSum += smmPlatformPrices[cb.value] || 0);
            const complexityMult = complexityMultipliers[complexitySelect.value] || 1;
            const months = Number(durationSlider.value) || 1;
            price = platformSum * complexityMult * months;
            averagePrice = platformSum * 1.3 * complexityMult * months;
          }
        }

        if (!marketplaceWrapper.classList.contains("hidden")) {
          const marketplace = marketplaceSelect.value;
          if (!marketplace) {
            price = 0;
            averagePrice = 0;
          } else {
            const mult = marketplacePrices[marketplace] || 1;
            price *= mult;
            averagePrice *= mult;
          }
        }

        let discount = 0;
        if (price > 25000) discount = price * 0.05;
        const finalPrice = price - discount;

        return { finalPrice, discount, price, averagePrice };
      }

      function updatePriceDisplay() {
        const service = serviceSelect.value;
        if (!service) {
          estimatedPriceRange.textContent = "";
          averagePriceRange.textContent = "";
          return;
        }
        const { finalPrice, discount, price, averagePrice } = calculatePrice();

        if (price === 0) {
          estimatedPriceRange.textContent = "Please select platform(s) to see price";
          averagePriceRange.textContent = "";
          return;
        }

        let priceText = `Estimated Price: ₹${finalPrice.toLocaleString()}`;
        if (discount > 0) priceText += ` (5% discount applied, ₹${discount.toFixed(0)} off)`;
        estimatedPriceRange.textContent = priceText;
        averagePriceRange.textContent = `Average Market Price: ₹${averagePrice.toLocaleString()}`;
      }

      function escapeHtml(text) {
        if (!text) return "";
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                   .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      }

      function showQuotationPreview() {
        const service = serviceSelect.value;
        const complexity = complexitySelect.value || "-";
        const duration = durationSliderWrapper.classList.contains("hidden") ? "-" : durationSlider.value + " month(s)";
        const { finalPrice, discount } = calculatePrice();

        let html = `<div class="quotation-header">
          <img src="${COMPANY.logo}" alt="Logo" />
          <div>
            <div><b>${COMPANY.name}</b></div>
            <div style="font-size:12px">${COMPANY.address}</div>
            <div style="font-size:12px">Email: ${COMPANY.email}, Phone: ${COMPANY.phone}</div>
          </div>
        </div>`;

        html += `<div class="quotation-meta">
          <div><b>Client Name:</b> ${escapeHtml(clientDetails.name)}</div>
          <div><b>Phone:</b> ${escapeHtml(clientDetails.phone)}</div>
          <div><b>Email:</b> ${escapeHtml(clientDetails.email)}</div>
          <div><b>Company:</b> ${escapeHtml(clientDetails.company || "-")}</div>
        </div>`;

        html += `<div class="quotation-meta">
          <div><b>Service:</b> ${service}</div>
          <div><b>Complexity:</b> ${complexity}</div>
          <div><b>Duration:</b> ${duration}</div>
        </div>`;

        html += `<div class="quotation-section-title">Estimated Price</div>
          <table class="quotation-table">
            <tr>
              <th>Service</th>
              <th>Complexity</th>
              <th>Duration</th>
              <th>Amount (₹)</th>
            </tr>
            <tr>
              <td class="left">${service}</td>
              <td>${complexity}</td>
              <td>${duration}</td>
              <td>${finalPrice.toLocaleString()}</td>
            </tr>
          </table>`;

        if (discount > 0) {
          html += `<div style="color:#27ae60; font-weight:600; margin-bottom:10px;">
            5% discount applied: ₹${discount.toFixed(0)}
          </div>`;
        }

        html += `<div class="quotation-section-title">Terms & Conditions</div>
          <div class="quotation-terms">${TERMS.map(t => `<div>• ${escapeHtml(t)}</div>`).join("")}</div>
          <div class="quotation-sign">Regards,<br>${COMPANY.executive}<br>${COMPANY.designation}<br>${COMPANY.name}</div>
          <div class="qr-section">
            <canvas id="qrCodeCanvas"></canvas>
            <div>
              <div>Visit us:</div>
              <a href="${COMPANY.homepage}" class="website-link" target="_blank">${COMPANY.homepage}</a>
            </div>
          </div>`;

        quotePreviewContent.innerHTML = html;

        setTimeout(() => {
          if (window.QRious) {
            new QRious({
              element: document.getElementById("qrCodeCanvas"),
              value: COMPANY.homepage,
              size: 70,
              background: "#fff",
            });
          }
        }, 50);

        quotePreviewSection.classList.remove("hidden");
        window.scrollTo({ top: quotePreviewSection.offsetTop, behavior: "smooth" });
      }

      function sendWhatsappQuotation() {
        const service = serviceSelect.value;
        const complexity = complexitySelect.value || "-";
        const duration = durationSliderWrapper.classList.contains("hidden") ? "-" : durationSlider.value + " months";
        const { finalPrice } = calculatePrice();

        let msg = `Quotation Request from AfterResult Estimator:%0A`;
        msg += `Name: ${encodeURIComponent(clientDetails.name)}%0A`;
        msg += `Phone: ${encodeURIComponent(clientDetails.phone)}%0A`;
        msg += `Email: ${encodeURIComponent(clientDetails.email)}%0A`;
        msg += `Company: ${encodeURIComponent(clientDetails.company || "-")}%0A`;
        msg += `Service: ${service}%0A`;
        msg += `Complexity: ${complexity}%0A`;
        msg += `Duration: ${duration}%0A`;
        msg += `Estimated Price: ₹${finalPrice.toLocaleString()}%0A`;
        window.open(`https://wa.me/919599169901?text=${msg}`, "_blank");
      }

      function openPopupForm() {
        popupFormOverlay.style.display = "flex";
        popupForm.reset();
        if (clientDetails) {
          popupForm.userName.value = clientDetails.name;
          popupForm.userPhone.value = clientDetails.phone;
          popupForm.userEmail.value = clientDetails.email;
          popupForm.userCompany.value = clientDetails.company;
        }
        popupForm.userName.focus();
      }

      function closePopupForm() {
        popupFormOverlay.style.display = "none";
      }

      serviceSelect.addEventListener("change", () => {
        updateOptionals();
        updatePriceDisplay();
      });

      complexitySelect.addEventListener("change", updatePriceDisplay);
      durationSlider.addEventListener("input", () => {
        durationSliderValue.textContent = durationSlider.value;
        updatePriceDisplay();
      });
      budgetInput.addEventListener("input", updatePriceDisplay);
      productCountInput.addEventListener("input", updatePriceDisplay);
      followersCountInput.addEventListener("input", updatePriceDisplay);
      marketplaceSelect.addEventListener("change", updatePriceDisplay);
      smmPlatformCheckboxes.forEach(cb => cb.addEventListener("change", updatePriceDisplay));

      previewQuotationBtn.addEventListener("click", () => {
        if (!serviceSelect.value) {
          alert("Please select a service first.");
          return;
        }
        lastAction = "preview";
        if (!clientDetails) openPopupForm();
        else showQuotationPreview();
      });

      whatsappQuotationBtn.addEventListener("click", () => {
        if (!serviceSelect.value) {
          alert("Please select a service first.");
          return;
        }
        lastAction = "whatsapp";
        if (!clientDetails) openPopupForm();
        else sendWhatsappQuotation();
      });

      popupCancelBtn.addEventListener("click", e => {
        e.preventDefault();
        closePopupForm();
      });

      popupForm.addEventListener("submit", e => {
        e.preventDefault();
        if (!popupForm.checkValidity()) {
          popupForm.reportValidity();
          return;
        }
        clientDetails = {
          name: popupForm.userName.value.trim(),
          phone: popupForm.userPhone.value.trim(),
          email: popupForm.userEmail.value.trim(),
          company: popupForm.userCompany.value.trim(),
        };
        closePopupForm();
        if (lastAction === "preview") showQuotationPreview();
        else if (lastAction === "whatsapp") sendWhatsappQuotation();
      });

      closePreviewBtn.addEventListener("click", () => {
        quotePreviewSection.classList.add("hidden");
      });

      downloadQuoteBtn.addEventListener("click", () => {
        html2canvas(quotePreviewSection, { backgroundColor: "#fff", scale: 2 }).then(canvas => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new window.jspdf.jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [quotePreviewSection.offsetWidth, quotePreviewSection.offsetHeight + 40],
          });
          pdf.addImage(imgData, "PNG", 0, 0, quotePreviewSection.offsetWidth, quotePreviewSection.offsetHeight);
          pdf.save("AfterResult_Quotation.pdf");
        });
      });

      // Initialize
      updateOptionals();
      updatePriceDisplay();
    })();
  </script>
