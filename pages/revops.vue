import React, { useState } from 'react';
import { ChevronDown, Settings, Zap, Database, BarChart3, Target, RefreshCw, Shield, GitBranch, Users, FileText, TrendingUp, BookOpen, Phone, X, Calendar } from 'lucide-react';

export default function RevOpsPage() {
  const [expandedService, setExpandedService] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    date: '',
    time: ''
  });

  const services = [
    { icon: Settings, title: 'CRM Administration', desc: 'Platform configuration, custom object creation, field management, user permissions, and ongoing system maintenance' },
    { icon: Zap, title: 'Workflow Development', desc: 'Custom automation build-out, trigger logic design, multi-step sequences, and conditional branching' },
    { icon: GitBranch, title: 'Integration Management', desc: 'API connections, data mapping, sync monitoring, error handling, and integration troubleshooting' },
    { icon: Database, title: 'Data Operations', desc: 'Database hygiene, duplicate management, enrichment workflows, import/export processes, and migration support' },
    { icon: BarChart3, title: 'Reporting & Analytics', desc: 'Dashboard creation, custom report building, metric tracking, forecasting models, and data visualization' },
    { icon: Target, title: 'Lead Management', desc: 'Lead scoring models, routing rules, qualification frameworks, and conversion optimization' },
    { icon: TrendingUp, title: 'Sales Enablement', desc: 'Territory planning, quota management, sales process documentation, and performance tracking' },
    { icon: BookOpen, title: 'Training & Support', desc: 'Team onboarding, process documentation, best practices training, and ongoing technical support' }
  ];

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.position || !formData.company || !formData.date || !formData.time) {
      alert('Please fill in all fields');
      return;
    }
    const message = `Hello! I would like to schedule a call for RevOps services.%0A%0AName: ${formData.name}%0APosition: ${formData.position}%0ACompany: ${formData.company}%0APreferred Date: ${formData.date}%0APreferred Time: ${formData.time}%0A%0APlease schedule a call for me.`;
    window.open(`https://wa.me/919991183530?text=${message}`, '_blank');
    setShowPopup(false);
    setFormData({ name: '', position: '', company: '', date: '', time: '' });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-500 text-white px-4 py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        </div>
        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">Revenue Operations Services</h1>
          <p className="text-base md:text-xl mb-8 md:mb-10 opacity-95 px-2">Scale your revenue engine with strategic automation, seamless integrations, and data-driven operations</p>
          <button 
            onClick={() => setShowPopup(true)}
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 md:px-12 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-50 transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl"
          >
            <Phone className="w-5 h-5" />
            Schedule a Consultation
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-4 py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4 text-gray-900">The Problem</h2>
          <p className="text-sm md:text-lg text-center text-gray-600 mb-10 md:mb-16 max-w-3xl mx-auto px-2">Most growing companies struggle with operational inefficiencies that directly impact revenue growth</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: 'Disconnected Systems', desc: 'Sales, marketing, and customer success teams operate in silos with fragmented data across multiple platforms, leading to inconsistent customer experiences and missed opportunities.' },
              { title: 'Manual Workflows', desc: 'Revenue teams spend countless hours on repetitive administrative tasks instead of focusing on strategic initiatives that drive growth and customer value.' },
              { title: 'Poor Data Quality', desc: 'Incomplete, inconsistent, or outdated data makes it impossible to forecast accurately, measure performance, or make informed decisions about resource allocation.' },
              { title: 'Lack of Visibility', desc: 'Leadership lacks real-time insights into pipeline health, revenue metrics, and team performance, making it difficult to identify problems and opportunities quickly.' }
            ].map((problem, idx) => (
              <div key={idx} className="bg-white p-5 md:p-9 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all hover:-translate-y-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">{problem.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4 text-gray-900">Our Approach</h2>
          <p className="text-sm m
