<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Revenue Operations Services</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.1; }
      50% { opacity: 0.2; }
    }
    .animate-pulse-slow {
      animation: pulse-slow 3s ease-in-out infinite;
    }
    .service-card-expanded {
      max-height: 300px;
    }
    .service-card-collapsed {
      max-height: 0;
    }
    * {
      scroll-behavior: smooth;
    }
  </style>
</head>
<body class="font-sans">
  <div id="app">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-900 to-blue-500 text-white px-4 py-24 md:py-32 text-center overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        <div class="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      <div class="relative max-w-4xl mx-auto z-10">
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">Revenue Operations Services</h1>
        <p class="text-base md:text-xl mb-8 md:mb-10 opacity-95 px-2">Scale your revenue engine with strategic automation, seamless integrations, and data-driven operations</p>
        <button 
          onclick="document.getElementById('schedulePopup').classList.remove('hidden')"
          class="inline-flex items-center gap-2 bg-white text-blue-900 px-8 md:px-12 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-50 transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          Schedule a Consultation
        </button>
      </div>
    </section>

    <!-- Problem Section -->
    <section class="px-4 py-16 md:py-24 bg-slate-50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4 text-gray-900">The Problem</h2>
        <p class="text-sm md:text-lg text-center text-gray-600 mb-10 md:mb-16 max-w-3xl mx-auto px-2">Most growing companies struggle with operational inefficiencies that directly impact revenue growth</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div class="bg-white p-5 md:p-9 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all hover:-translate-y-1">
            <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">Disconnected Systems</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">Sales, marketing, and customer success teams operate in silos with fragmented data across multiple platforms, leading to inconsistent customer experiences and missed opportunities.</p>
          </div>
          <div class="bg-white p-5 md:p-9 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all hover:-translate-y-1">
            <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">Manual Workflows</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">Revenue teams spend countless hours on repetitive administrative tasks instead of focusing on strategic initiatives that drive growth and customer value.</p>
          </div>
          <div class="bg-white p-5 md:p-9 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all hover:-translate-y-1">
            <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">Poor Data Quality</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">Incomplete, inconsistent, or outdated data makes it impossible to forecast accurately, measure performance, or make informed decisions about resource allocation.</p>
          </div>
          <div class="bg-white p-5 md:p-9 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all hover:-translate-y-1">
            <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">Lack of Visibility</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">Leadership lacks real-time insights into pipeline health, revenue metrics, and team performance, making it difficult to identify problems and opportunities quickly.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution Section -->
    <section class="px-4 py-16 md:py-24 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4 text-gray-900">Our Approach</h2>
        <p class="text-sm md:text-lg text-center text-gray-600 mb-10 md:mb-16 max-w-3xl mx-auto px-2">We build and optimize revenue operations infrastructure that scales with your business</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <div class="bg-white p-5 md:p-10 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="inline-block bg-blue-50 text-blue-800 px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-bold mb-3 md:mb-5">01</div>
            <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">Revenue Audit & Strategy</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">Comprehensive assessment of your current tech stack, processes, and workflows. We identify bottlenecks, inefficiencies, and high-impact opportunities.</p>
          </div>
          <div class="bg-white p-5 md:p-10 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="inline-block bg-blue-50 text-blue-800 px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-bold mb-3 md:mb-5">02</div>
            <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">Tech Stack Integration</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">Connect your CRM, marketing automation, analytics, and business intelligence tools into a unified ecosystem with seamless data flow.</p>
          </div>
          <div class="bg-white p-5 md:p-10 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="inline-block bg-blue-50 text-blue-800 px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-bold mb-3 md:mb-5">03</div>
            <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">Process Automation</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">Design and implement intelligent workflows that automate repetitive tasks including lead routing, data enrichment, and follow-up sequences.</p>
          </div>
          <div class="bg-white p-5 md:p-10 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="inline-block bg-blue-50 text-blue-800 px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-bold mb-3 md:mb-5">04</div>
            <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">Data Infrastructure</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">Build robust data architecture with proper field mapping, validation rules, and governance policies for all revenue metrics.</p>
          </div>
          <div class="bg-white p-5 md:p-10 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="inline-block bg-blue-50 text-blue-800 px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-bold mb-3 md:mb-5">05</div>
            <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">Analytics & Reporting</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">Create custom dashboards and automated reports that provide real-time visibility into key metrics and team performance.</p>
          </div>
          <div class="bg-white p-5 md:p-10 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="inline-block bg-blue-50 text-blue-800 px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-bold mb-3 md:mb-5">06</div>
            <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">Continuous Optimization</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">Ongoing monitoring, testing, and refinement of systems and processes as your business evolves with performance data.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section with Collapsible Cards -->
    <section class="px-4 py-16 md:py-24 bg-slate-50 border-t border-gray-200">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4 text-gray-900">What's Included</h2>
        <p class="text-sm md:text-lg text-center text-gray-600 mb-10 md:mb-16 max-w-3xl mx-auto px-2">Comprehensive revenue operations support on a monthly retainer basis</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <!-- Service 1 -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <button onclick="toggleService(0)" class="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3 md:gap-4 flex-1">
                <div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 class="text-base md:text-lg font-semibold text-gray-900">CRM Administration</h3>
              </div>
              <svg id="chevron-0" class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="content-0" class="service-card-collapsed transition-all duration-300 ease-in-out overflow-hidden">
              <div class="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">Platform configuration, custom object creation, field management, user permissions, and ongoing system maintenance</p>
              </div>
            </div>
          </div>

          <!-- Service 2 -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <button onclick="toggleService(1)" class="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3 md:gap-4 flex-1">
                <div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 class="text-base md:text-lg font-semibold text-gray-900">Workflow Development</h3>
              </div>
              <svg id="chevron-1" class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="content-1" class="service-card-collapsed transition-all duration-300 ease-in-out overflow-hidden">
              <div class="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">Custom automation build-out, trigger logic design, multi-step sequences, and conditional branching</p>
              </div>
            </div>
          </div>

          <!-- Service 3 -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <button onclick="toggleService(2)" class="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3 md:gap-4 flex-1">
                <div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </div>
                <h3 class="text-base md:text-lg font-semibold text-gray-900">Integration Management</h3>
              </div>
              <svg id="chevron-2" class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="content-2" class="service-card-collapsed transition-all duration-300 ease-in-out overflow-hidden">
              <div class="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">API connections, data mapping, sync monitoring, error handling, and integration troubleshooting</p>
              </div>
            </div>
          </div>

          <!-- Service 4 -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <button onclick="toggleService(3)" class="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3 md:gap-4 flex-1">
                <div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
                  </svg>
                </div>
                <h3 class="text-base md:text-lg font-semibold text-gray-900">Data Operations</h3>
              </div>
              <svg id="chevron-3" class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="content-3" class="service-card-collapsed transition-all duration-300 ease-in-out overflow-hidden">
              <div class="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">Database hygiene, duplicate management, enrichment workflows, import/export processes, and migration support</p>
              </div>
            </div>
          </div>

          <!-- Service 5 -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <button onclick="toggleService(4)" class="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3 md:gap-4 flex-1">
                <div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h3 class="text-base md:text-lg font-semibold text-gray-900">Reporting & Analytics</h3>
              </div>
              <svg id="chevron-4" class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="content-4" class="service-card-collapsed transition-all duration-300 ease-in-out overflow-hidden">
              <div class="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">Dashboard creation, custom report building, metric tracking, forecasting models, and data visualization</p>
              </div>
            </div>
          </div>

          <!-- Service 6 -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <button onclick="toggleService(5)" class="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3 md:gap-4 flex-1">
                <div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                  </svg>
                </div>
                <h3 class="text-base md:text-lg font-semibold text-gray-900">Lead Management</h3>
              </div>
              <svg id="chevron-5" class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="content-5" class="service-card-collapsed transition-all duration-300 ease-in-out overflow-hidden">
              <div class="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">Lead scoring models, routing rules, qualification frameworks, and conversion optimization</p>
              </div>
            </div>
          </div>

          <!-- Service 7 -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <button onclick="toggleService(6)" class="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3 md:gap-4 flex-1">
                <div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
                <h3 class="text-base md:text-lg font-semibold text-gray-900">Sales Enablement</h3>
              </div>
              <svg id="chevron-6" class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="content-6" class="service-card-collapsed transition-all duration-300 ease-in-out overflow-hidden">
              <div class="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">Territory planning, quota management, sales process documentation, and performance tracking</p>
              </div>
            </div>
          </div>

          <!-- Service 8 -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <button onclick="toggleService(7)" class="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3 md:gap-4 flex-1">
                <div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3 class="text-base md:text-lg font-semibold text-gray-900">Training & Support</h3>
              </div>
              <svg id="chevron-7" class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="content-7" class="service-card-collapsed transition-all duration-300 ease-in-out overflow-hidden">
              <div class="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">Team onboarding, process documentation, best practices training, and ongoing technical support</p>
              </div>
            </div>
          </div
