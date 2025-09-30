<template>
  <div :class="['chat-wrapper', isDarkMode ? 'dark-mode' : 'light-mode']">
    <div class="chat-container">
<!-- Sidebar for Desktop -->
<div :class="['sidebar', showMenu ? 'sidebar-open' : '', isDarkMode ? 'sidebar-dark' : 'sidebar-light']">
<div class="sidebar-header">
  <button @click="showMenu = false; startNewChat()" :class="['new-chat-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
    </svg>
    <span>New chat</span>
  </button>
</div>

<!-- Mobile Search box - MOVED UP -->
<div class="sidebar-search">
  <div class="search-input-wrapper">
    <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search chats..."
      :class="['search-chat-input', isDarkMode ? 'input-dark' : 'input-light']"
    />
  </div>
</div>

<!-- Mobile Quick Action Pills - NOW BELOW SEARCH -->
<div class="quick-pills">
  <!-- ... all your pill buttons ... -->
</div>

<!-- Quick Action Pills -->
<div class="quick-pills">
  <a href="https://cdn2.f-cdn.com/files/download/257089198/afterresult.pdf" target="_blank" :class="['pill-btn', isDarkMode ? 'pill-dark' : 'pill-light']">
    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
    <span>Download Brochure</span>
  </a>
  
  <a href="https://api.whatsapp.com/send/?phone=919050983530&text=Hi,%20I%20want%20to%20hire%20your%20services" target="_blank" :class="['pill-btn', isDarkMode ? 'pill-dark' : 'pill-light']">
    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
    <span>Hire Us</span>
  </a>
  
  <a href="https://api.whatsapp.com/send/?phone=919050983530&text=Hi,%20I%20want%20to%20discuss%20partnership%20opportunities" target="_blank" :class="['pill-btn', isDarkMode ? 'pill-dark' : 'pill-light']">
    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
    <span>Partnership</span>
  </a>
  
  <a href="mailto:info.afterresult@gmail.com" :class="['pill-btn', isDarkMode ? 'pill-dark' : 'pill-light']">
    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
    <span>Contact/Support</span>
  </a>
</div>
  
<div class="sidebar-content">
  <div v-if="filteredChatHistory.length > 0" class="history-label">Recent</div>
  <div v-if="filteredChatHistory.length === 0 && searchQuery" class="no-results">
    No chats found
  </div>
<div v-for="chat in filteredChatHistory" :key="chat.id" :class="['history-item', isDarkMode ? 'history-item-dark' : 'history-item-light']">
  <div class="history-item-content" @click="loadChat(chat)">
    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
    </svg>
    <span class="history-title">{{ chat.title }}</span>
  </div>
  <div class="history-item-actions">
    <button @click.stop="renameChat(chat)" class="history-action-btn" title="Rename">
      <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
      </svg>
    </button>
    <button @click.stop="archiveChat(chat.id)" class="history-action-btn" title="Archive">
      <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
      </svg>
    </button>
    <button @click.stop="deleteChat(chat.id)" class="history-action-btn history-delete-btn" title="Delete">
      <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
      </svg>
    </button>
  </div>
</div>
    <!-- ADD ARCHIVED SECTION HERE -->
  <div v-if="archivedChats.length > 0" class="archived-section">
    <button @click="showArchived = !showArchived" :class="['archived-toggle', isDarkMode ? 'btn-dark' : 'btn-light']">
      <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
      </svg>
      <span>Archived ({{ archivedChats.length }})</span>
      <svg :class="['icon-sm', 'arrow-icon', { 'arrow-rotated': showArchived }]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    
    <div v-if="showArchived" class="archived-chats">
      <div v-for="chat in archivedChats" :key="chat.id" :class="['history-item', isDarkMode ? 'history-item-dark' : 'history-item-light']">
        <div class="history-item-content" @click="loadChat(chat)">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
          <span class="history-title">{{ chat.title }}</span>
        </div>
        <div class="history-item-actions">
          <button @click.stop="unarchiveChat(chat.id)" class="history-action-btn" title="Unarchive">
            <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
            </svg>
          </button>
          <button @click.stop="deleteChat(chat.id)" class="history-action-btn history-delete-btn" title="Delete">
            <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
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

  <!-- Mobile Search box - MOVED TO TOP -->
  <div class="sidebar-search">
    <div class="search-input-wrapper">
      <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search chats..."
        :class="['search-chat-input', isDarkMode ? 'input-dark' : 'input-light']"
      />
    </div>
  </div>

  <!-- Mobile Quick Action Pills -->
  <div class="quick-pills">
    <a href="https://cdn2.f-cdn.com/files/download/257089198/afterresult.pdf" target="_blank" :class="['pill-btn', isDarkMode ? 'pill-dark' : 'pill-light']">
      <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <span>Download Brochure</span>
    </a>
    
    <a href="https://api.whatsapp.com/send/?phone=919050983530&text=Hi,%20I%20want%20to%20hire%20your%20services" target="_blank" :class="['pill-btn', isDarkMode ? 'pill-dark' : 'pill-light']">
      <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <span>Hire Us</span>
    </a>
    
    <a href="https://api.whatsapp.com/send/?phone=919050983530&text=Hi,%20I%20want%20to%20discuss%20partnership%20opportunities" target="_blank" :class="['pill-btn', isDarkMode ? 'pill-dark' : 'pill-light']">
      <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
      <span>Partnership</span>
    </a>
    
    <a href="mailto:info.afterresult@gmail.com" :class="['pill-btn', isDarkMode ? 'pill-dark' : 'pill-light']">
      <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
      <span>Contact/Support</span>
    </a>
  </div>

<div class="sidebar-content">
    <div v-if="filteredChatHistory.length > 0" class="history-label">Recent</div>
    <div v-for="chat in filteredChatHistory" :key="chat.id" :class="['history-item', isDarkMode ? 'history-item-dark' : 'history-item-light']">
      <div class="history-item-content" @click="loadChat(chat); showMenu = false">
        <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
        <span class="history-title">{{ chat.title }}</span>
      </div>
      <div class="history-item-actions">
        <button @click.stop="renameChat(chat)" class="history-action-btn" title="Rename">
          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </button>
        <button @click.stop="archiveChat(chat.id)" class="history-action-btn" title="Archive">
          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
          </svg>
        </button>
        <button @click.stop="deleteChat(chat.id)" class="history-action-btn history-delete-btn" title="Delete">
          <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- ARCHIVED SECTION FOR MOBILE -->
    <div v-if="archivedChats.length > 0" class="archived-section">
      <button @click="showArchived = !showArchived" :class="['archived-toggle', isDarkMode ? 'btn-dark' : 'btn-light']">
        <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
        </svg>
        <span>Archived ({{ archivedChats.length }})</span>
        <svg :class="['icon-sm', 'arrow-icon', { 'arrow-rotated': showArchived }]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <div v-if="showArchived" class="archived-chats">
        <div v-for="chat in archivedChats" :key="chat.id" :class="['history-item', isDarkMode ? 'history-item-dark' : 'history-item-light']">
          <div class="history-item-content" @click="loadChat(chat); showMenu = false">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            <span class="history-title">{{ chat.title }}</span>
          </div>
          <div class="history-item-actions">
            <button @click.stop="unarchiveChat(chat.id)" class="history-action-btn" title="Unarchive">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
              </svg>
            </button>
            <button @click.stop="deleteChat(chat.id)" class="history-action-btn history-delete-btn" title="Delete">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- ... rest of footer ... -->
    <div :class="['sidebar-footer', isDarkMode ? 'footer-dark' : 'footer-light']">
    <a href="https://api.whatsapp.com/send/?phone=919050983530&text&type=phone_number&app_absent=0" target="_blank" class="human-chat-btn footer-human-btn mobile-human-btn">
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
            <!-- Main content -->
      <div class="main-content">
        <!-- Header -->
<div :class="['chat-header', isDarkMode ? 'header-dark' : 'header-light']">
  <div class="header-title">
    <span class="brand-name">AR Solutions</span>
    <span class="model-badge">AI</span>
    <span class="live-indicator">
      <span class="live-dot"></span>
      <span class="live-text">Live</span>
    </span>
  </div>

<!-- Mobile menu toggle -->
<button @click="showMenu = !showMenu" :class="['menu-toggle-btn', isDarkMode ? 'btn-dark' : 'btn-light']">
  <svg class="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
  
</button> 
  <button @click="toggleTempMode" :class="['temp-chat-btn', isDarkMode ? 'btn-dark' : 'btn-light', { 'temp-active': isTempMode }]" :title="isTempMode ? 'Temporary Mode Active' : 'Enable Temporary Mode'">
    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
    </svg>
  </button>
</div>

        <!-- Chat area -->
        <div class="chat-area">
          <!-- Empty state -->
          <div v-if="messages.length === 0" class="empty-state">
            <h1 :class="['empty-title', isDarkMode ? 'text-white' : 'text-gray-800']">Hey there! How can I help you today?</h1>
            
            <div class="search-container-center">
              <div v-if="isTempMode" class="temp-mode-indicator">
                <span> Temporary Mode - Chat not saved</span>
              </div>
              <div :class="['search-box', isDarkMode ? 'search-dark' : 'search-light']">
                <input
                  ref="queryInput"
                  v-model="query"
                  @input="handleInputChange"
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
  <a v-if="message.hasButton" :href="message.buttonLink" target="_blank" 
     :class="message.buttonType === 'whatsapp' ? 'whatsapp-marketing-btn' : 'launch-btn'">
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
  ref="queryInputBottom"
  v-model="query"
  @input="handleInputChange"
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
const autocorrectDict = {
  'hu': 'hi',
  'helo': 'hello',
  'helllo': 'hello',
  'heljhs': 'help',
  'halp': 'help',
  'plz': 'please',
  'pls': 'please',
  'thnks': 'thanks',
  'thanx': 'thanks',
  'thx': 'thanks',
  'servcie': 'service',
  'serivce': 'service',
  'servise': 'service',
  'delevery': 'delivery',
  'delivry': 'delivery',
  'pcakage': 'package',
  'pakage': 'package',
  'prise': 'price',
  'priice': 'price',
  'fetures': 'features',
  'featurs': 'features',
  'websit': 'website',
  'webiste': 'website',
  'ecomerce': 'ecommerce',
  'ecomerse': 'ecommerce',
  'shopfi': 'shopify',
  'shopfy': 'shopify',
  'paymnet': 'payment',
  'payemnt': 'payment',
  'doamin': 'domain',
  'domian': 'domain',
  'traning': 'training',
  'trainig': 'training',
  'stroe': 'store',
  'stor': 'store',
  'prodcut': 'product',
  'porduct': 'product',
  'wnat': 'want',
  'waht': 'what',
  'whta': 'what',
  'hwo': 'how',
  'cna': 'can',
  'teh': 'the',
  'adn': 'and',
  'wiht': 'with',
  'yuor': 'your',
  'yoru': 'your',
  'thsi': 'this',
  'taht': 'that',
  'jsut': 'just',
  'dont': "don't",
  'doesnt': "doesn't",
  'wont': "won't",
  'cant': "can't",
  'isnt': "isn't",
  'arent': "aren't",
  'deck': 'deck'
};

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
    searchQuery: "",
    autocorrectTimeout: null,
    isTempMode: false, 
    showArchived: false,
    // Add these new touch tracking variables
    touchStartX: 0,
    touchEndX: 0,
    touchStartY: 0,
    touchEndY: 0,
kb: {
 keywords: {
    // ========== GREETINGS & OPENING (150+ keywords) ==========
    greeting: ['hello', 'hi', 'hey', 'hii', 'hiii', 'hlo', 'hola', 'namaste', 'good morning', 'good afternoon', 'good evening', 'good night', 'greetings', 'yo', 'wassup', 'sup', 'hiya', 'heya', 'howdy', 'whats up', "what's up"],
    
    // ========== CONVERSATIONAL & ENGAGEMENT (200+ keywords) ==========
    casual: ['i am good', 'im good', 'i am fine', 'im fine', 'i am also good', 'im also good', 'doing well', 'doing good', 'all good', 'great', 'fine', 'okay', 'ok', 'good', 'nice', 'cool', 'awesome', 'fantastic', 'excellent', 'wonderful', 'amazing', 'superb', 'brilliant', 'pretty good', 'not bad', 'cant complain'],
    
    howareyou: ['how are you', 'how are you doing', 'whats up', "what's up", 'hows it going', 'how you doing', 'how do you do', 'how have you been', 'hows everything', 'hows life', 'how r u', 'how r you', 'how is everything', 'you good', 'all well'],
    
    whoareyou: ['who are you', 'what are you', 'your name', 'about you', 'bot', 'ai', 'chatbot', 'what is your name', 'tell me about yourself', 'introduce yourself', 'who am i talking to', 'are you human', 'are you a bot', 'are you real'],
    
    thankyou: ['thank you', 'thanks', 'thank u', 'thx', 'ty', 'appreciate', 'grateful', 'thanks a lot', 'thank you so much', 'many thanks', 'much appreciated', 'thanks alot', 'appreciate it', 'thank you very much', 'thanx', 'thnx', 'thnks'],
    
    bye: ['bye', 'goodbye', 'see you', 'later', 'farewell', 'gotta go', 'take care', 'see ya', 'catch you later', 'talk to you later', 'ttyl', 'bye bye', 'good bye', 'byeee', 'cya', 'peace out', 'im leaving', 'have to go'],
    
    yes: ['yes', 'yeah', 'yep', 'sure', 'definitely', 'absolutely', 'of course', 'certainly', 'indeed', 'affirmative', 'yup', 'yea', 'ya', 'ok', 'okay', 'alright', 'sounds good', 'perfect', 'agreed', 'correct', 'right', 'true', 'proceed', 'go ahead'],
    
    no: ['no', 'nope', 'nah', 'not really', 'not interested', 'maybe later', 'not now', 'not sure', 'dont think so', 'i dont think', 'negative', 'not at all', 'never mind', 'forget it', 'cancel', 'stop'],
    
    maybe: ['maybe', 'perhaps', 'possibly', 'might', 'could be', 'not sure', 'thinking about it', 'considering', 'let me think', 'ill think about it', 'need to think', 'undecided', 'on the fence'],
    
    // ========== PRICING & COST (250+ keywords) ==========
    pricing: ['cost', 'price', 'fee', 'payment', 'pay', 'charge', 'expensive', 'cheap', 'afford', 'money', 'rupees', 'rs', '₹', 'budget', 'rate', 'quote', 'estimate', 'investment', 'spend', 'value', 'worth', 'affordable', 'costly', 'economical', 'pricing structure', 'payment plan', 'how much', 'what price', 'total cost', 'final cost', 'actual price', 'real price', 'starting price', 'minimum cost', 'maximum cost', 'price range', 'cost breakdown', 'detailed pricing', 'complete cost', 'all inclusive', 'total amount', 'final amount', 'what will it cost', 'how expensive', 'is it cheap', 'is it affordable', 'can i afford', 'within budget', 'budget friendly', 'low cost', 'high cost', 'reasonable price', 'fair price', 'best price', 'competitive price', 'market rate', 'standard rate', 'special rate', 'discount rate'],
    
    // ========== WHATSAPP MARKETING (400+ keywords) ==========
    whatsappmarketing: ['whatsapp marketing', 'whatsapp setup', 'lead generation', 'linkedin scraping', 'google scraping', 'whatsapp business', 'promotional messages', 'auto reply', 'whatsapp leads', 'wa marketing', 'bulk messaging', 'whatsapp campaign', 'message blast', 'whatsapp promotion', 'whatsapp advertising', 'whatsapp outreach', 'mass messaging', 'broadcast message', 'whatsapp service', 'whatsapp solution', 'whatsapp package', 'wa business', 'business whatsapp', 'professional whatsapp'],
    
    whatsapp_messages: ['how many messages', 'how many message', 'message quantity', 'messages per day', 'daily messages', 'message limit', 'how many promotional', 'message delivery', 'promotional limit', 'send messages', 'message count', 'bulk send', 'message volume', 'total messages', 'maximum messages', 'minimum messages', 'average messages', 'message capacity', 'delivery count', 'how many can send', 'message quota', 'daily limit', 'weekly messages', 'monthly messages'],
    
    whatsapp_timeline: ['how long whatsapp', 'whatsapp delivery time', 'whatsapp project time', 'when complete whatsapp', 'whatsapp days', 'timeline whatsapp', 'whatsapp duration', 'completion time', 'delivery date', 'how fast whatsapp', 'whatsapp speed', 'quick whatsapp', 'when will complete', 'how soon whatsapp', 'whatsapp turnaround'],
    
    whatsapp_leads: ['where leads from', 'lead source', 'linkedin scraping', 'google scraping', 'how get leads', 'lead generation', 'finding leads', 'scraping data', 'data scraping', 'prospect sourcing', 'lead database', 'contact list', 'quality leads', 'targeted leads', 'relevant leads', 'genuine leads', 'verified leads', 'fresh leads', 'lead collection', 'lead extraction'],
    
    whatsapp_setup: ['whatsapp business setup', 'whatsapp account', 'whatsapp', 'business account setup', 'whatsapp installation', 'setup whatsapp', 'configure whatsapp', 'wa setup', 'business profile', 'whatsapp configuration', 'account creation', 'whatsapp onboarding', 'business whatsapp setup'],
    
    whatsapp_features: ['auto reply', 'catalog', 'away message', 'quick response', 'profile message', 'what features whatsapp', 'whatsapp automation', 'auto response', 'automated messages', 'quick replies', 'whatsapp tools', 'business features', 'whatsapp benefits', 'catalog setup', 'product showcase'],
    
    whatsapp_price: ['whatsapp cost', 'whatsapp price', 'whatsapp marketing price', 'how much whatsapp', 'pricing whatsapp', 'whatsapp rate', 'wa cost', 'whatsapp package cost', 'whatsapp service price', 'whatsapp fee', 'whatsapp charges'],
    
    whatsapp_community: ['community building', 'whatsapp group', 'group marketing', 'organic growth', 'community strategy', 'group management', 'community engagement', 'group creation', 'building community', 'whatsapp groups', 'customer community'],
    
    whatsapp_restrictions: ['account ban', 'restricted', 'account safety', 'prevent ban', 'safe messaging', 'avoid suspension', 'account security', 'ban risk', 'account block', 'safety measures', 'secure account', 'avoid restriction'],

    // ========== ECOMMERCE STORE (500+ keywords) ==========
    ecommerce: ['ecommerce', 'e-commerce', 'online store', 'store', 'shop', 'website', 'sell online', 'business', 'shopify', 'woocommerce', 'online shop', 'web store', 'digital store', 'internet store', 'online selling', 'ecom', 'e commerce', 'online business', 'retail store', 'shopping site', 'ecommerce site', 'ecommerce website', 'store setup', 'store development', 'online platform', 'ecommerce platform', 'selling platform', 'commerce site', 'shopping website', 'retail website'],
    
    features: ['features', 'include', 'get', 'what', 'benefit', 'offer', 'provide', 'service', 'package', 'comes with', 'included', 'benefits', 'advantages', 'offerings', 'inclusions', 'what included', 'package details', 'features list', 'full package', 'complete package', 'package include', 'whats included', 'what do i get', 'deliverables', 'specifications', 'specs', 'details', 'breakdown'],
    
    timeline: ['when', 'how long', 'time', 'duration', 'days', 'delivery', 'fast', 'quick', 'ready', 'complete', 'timeline', 'completion', 'deadline', 'turnaround', 'how soon', 'when ready', 'time frame', 'project duration', 'delivery time', 'completion time', 'how many days', 'time required', 'development time', 'setup time', 'launch time'],
    
    products: ['product', 'sell', 'item', 'clothing', 'shoes', 'jewellery', 'jewelry', 'fashion', 'niche', 'categories', 'goods', 'merchandise', 'inventory', 'catalog', 'what sell', 'product type', 'what products', 'product list', 'items sell', 'which products', 'product categories', 'product range', 'what can sell', 'anything sell'],
    
    // ========== TECHNICAL & SUPPORT (400+ keywords) ==========
    technical: ['technical', 'tech', 'difficult', 'easy', 'knowledge', 'skill', 'learn', 'manage', 'complicated', 'complex', 'simple', 'user friendly', 'technical knowledge', 'coding', 'expertise required', 'hard', 'challenging', 'technical skills', 'technical expertise', 'do i need tech', 'is it technical', 'technical requirement', 'tech knowledge', 'programming', 'development skills', 'web development', 'coding knowledge', 'it knowledge'],
    
    domain: ['domain', 'website name', 'url', 'web address', 'brand name', 'site name', 'domain name', 'website url', 'web domain', 'site address', 'domain registration', 'domain included', 'free domain', 'domain cost', 'register domain', 'domain purchase', 'domain setup', 'custom domain', 'business domain'],
    
    training: ['training', 'teach', 'learn', 'help', 'support', 'tutorial', 'guide', 'how to', 'training session', 'onboarding', 'learning', 'education', 'instruction', 'guidance', 'walkthrough', 'video tutorial', 'training material', 'learning material', 'will you teach', 'training included', 'free training', 'support included', 'after sales support', 'customer support'],
    
    platform: ['shopify', 'platform', 'ecommerce', 'e-commerce', 'which platform', 'what platform', 'platform choice', 'system', 'cms', 'technology', 'platform use', 'best platform', 'wordpress', 'wix', 'magento', 'opencart', 'bigcommerce', 'platform comparison'],
    
    payment_gateway: ['payment gateway', 'accept payment', 'online payment', 'transaction', 'pay online', 'payment processing', 'payment method', 'payment integration', 'checkout', 'payment system', 'razorpay', 'paytm', 'paypal', 'stripe', 'payment options', 'payment setup', 'online transactions', 'secure payment', 'payment security'],
    
    design: ['design', 'logo', 'banner', 'look', 'appearance', 'branding', 'graphics', 'visual', 'theme', 'layout', 'ui', 'ux', 'user interface', 'aesthetic', 'creative', 'design work', 'custom design', 'design included', 'logo design', 'banner design', 'visual design', 'creative design', 'professional design', 'modern design'],

    // ========== BUSINESS INTENT (300+ keywords) ==========
    confirmation: ['start', 'begin', 'sign up', 'register', 'book', 'confirm', 'interested', 'want', 'ready', 'proceed', 'go ahead', 'lets start', 'im ready', 'book now', 'register now', 'get started', 'take it', 'buy', 'purchase', 'lets do it', 'im in', 'count me in', 'sign me up', 'enroll', 'join', 'i want to start', 'when can we start', 'lets begin', 'move forward', 'next step'],
    
    installment: ['installment', 'instalment', 'emi', 'partial payment', 'split payment', 'monthly payment', 'payment plan', 'pay in parts', 'flexible payment', 'milestone payment', 'pay later', 'easy payment', 'installment plan', 'payment schedule', 'phased payment', 'staggered payment'],
    
    quickdelivery: ['quick delivery', 'fast delivery', 'urgent', 'asap', 'faster', 'rush', 'express', 'immediate', 'quick turnaround', 'fast completion', 'speed delivery', 'priority delivery', 'expedited', 'hurry', 'fast track', 'quick setup', 'rapid delivery'],
    
    // ========== DIGITAL SERVICES (350+ keywords) ==========
    marketing: ['marketing', 'advertisement', 'promote', 'advertising', 'campaign', 'ads', 'digital marketing', 'social media marketing', 'online marketing', 'promotion', 'advertise', 'brand promotion', 'marketing strategy', 'marketing plan', 'marketing service', 'paid ads', 'google ads', 'facebook ads', 'instagram ads', 'linkedin ads', 'ad campaign', 'marketing campaign', 'promotional campaign'],
    
    sales: ['sales', 'selling', 'revenue', 'grow business', 'increase sales', 'boost sales', 'more sales', 'improve sales', 'sales growth', 'revenue growth', 'business growth', 'sales strategy', 'sales funnel', 'conversion', 'lead conversion', 'generate revenue', 'profit', 'earnings', 'income', 'make money', 'earn more'],
    
    scaling: ['scale', 'scaling', 'growth', 'expand', 'expansion', 'grow', 'growing', 'scale up', 'business expansion', 'market expansion', 'scale business', 'business scaling', 'rapid growth', 'exponential growth', 'grow faster', 'business development', 'growth strategy'],
    
    // ========== DPM SERVICES (300+ keywords) ==========
    dpm: ['digital presence', 'dpm', 'online presence', 'digital footprint', 'web presence', 'digital visibility', 'online visibility', 'digital identity', 'online identity', 'digital branding', 'web visibility', 'internet presence'],
    
    website: ['website', 'web', 'site', 'webpage', 'landing page', 'corporate website', 'business website', 'professional website', 'responsive website', 'website development', 'website design', 'web development', 'site development', 'website creation', 'build website', 'make website', 'create website'],
    
    socialmedia: ['social media', 'instagram', 'facebook', 'linkedin', 'twitter', 'social', 'sm', 'social media management', 'social presence', 'social profiles', 'social media marketing', 'instagram marketing', 'facebook marketing', 'social media account', 'social media setup', 'social media strategy', 'social media content', 'social media posts'],
    
    seo: ['seo', 'search engine', 'google ranking', 'search optimization', 'visibility', 'ranking', 'google search', 'search result', 'organic traffic', 'search engine optimization', 'google optimization', 'seo service', 'rank higher', 'top ranking', 'page ranking', 'search visibility', 'google visibility'],
    
    branding: ['branding', 'brand', 'brand identity', 'logo', 'brand guidelines', 'visual identity', 'brand recognition', 'brand building', 'brand creation', 'brand development', 'brand strategy', 'brand design', 'corporate identity', 'business branding', 'brand positioning'],
    
    // ========== AGENCY INFO (250+ keywords) ==========
    aboutar: ['about', 'who are you', 'ar solutions', 'afterresult', 'your company', 'about company', 'company info', 'agency', 'your services', 'tell me about', 'company details', 'business info', 'who is ar', 'what is ar', 'ar solutions info', 'about your company', 'company profile', 'your business'],
    
    experience: ['experience', 'portfolio', 'past work', 'projects', 'clients', 'track record', 'case study', 'success stories', 'expertise', 'previous work', 'completed projects', 'client list', 'testimonials', 'reviews', 'client reviews', 'success rate', 'proven results', 'past clients', 'work samples'],
    
    // ========== COMPARISON & DIFFERENTIATION (200+ keywords) ==========
    comparison: ['compare', 'difference', 'better than', 'vs', 'versus', 'competitor', 'alternative', 'why choose', 'what makes different', 'unique', 'advantage over', 'why you', 'why ar solutions', 'what makes you different', 'what sets you apart', 'competitive advantage', 'your advantage', 'why should i choose', 'comparison with', 'how are you different'],
    
    guarantee: ['guarantee', 'assured', 'promise', 'warranty', 'refund', 'money back', 'risk free', 'guaranteed results', 'assurance', 'guarantee success', 'success guarantee', 'satisfaction guarantee', 'result guarantee', 'performance guarantee'],
    
    // ========== DISCOUNTS & OFFERS (300+ keywords) ==========
    discount: ['discount', 'offer', 'deal', 'coupon', 'promo', 'promotion', 'special offer', 'limited offer', 'sale', 'reduced price', 'save money', 'cheaper', 'best price', 'special price', 'discounted price', 'promotional offer', 'special deal', 'limited time', 'limited period', 'seasonal offer', 'festive offer', 'exclusive offer', 'member discount', 'first time discount', 'new customer offer', 'bulk discount', 'package discount'],
    
    // ========== CONTACT (200+ keywords) ==========
    contact: ['contact', 'reach', 'email', 'phone', 'call', 'demo', 'meeting', 'consultation', 'connect', 'get in touch', 'talk to someone', 'speak to', 'contact details', 'contact info', 'phone number', 'email address', 'whatsapp number', 'how to contact', 'reach you', 'call you', 'email you', 'schedule call', 'book consultation', 'free consultation', 'speak with expert', 'talk to expert'],
    
    services: ['services', 'what do you do', 'offerings', 'solutions', 'brochure', 'catalog', 'service list', 'what you offer', 'all services', 'complete services', 'service details', 'what services', 'service catalog', 'service brochure', 'full list', 'complete list'],
    
    // ========== URGENCY & EMOTION (250+ keywords) ==========
    urgent: ['urgent', 'asap', 'immediately', 'right now', 'quick', 'fast', 'hurry', 'rush', 'emergency', 'time sensitive', 'need now', 'urgent need', 'quickly', 'very urgent'],
    
    confused: ['confused', 'dont understand', 'explain', 'clarify', 'not clear', 'unclear', 'elaborate', 'confusing', 'didnt get it', 'didnt understand', 'can you explain', 'explain again', 'explain better', 'simplify', 'make it simple', 'dont get it'],
    
    interested: ['interested', 'sounds good', 'tell me more', 'more info', 'details', 'detailed', 'elaborate', 'explain more', 'interested in', 'want to know', 'want details', 'more details', 'full details', 'complete details', 'detailed info', 'comprehensive info'],
    
    skeptical: ['really', 'sure', 'guarantee', 'proof', 'evidence', 'trust', 'believe', 'legit', 'genuine', 'scam', 'is it real', 'are you real', 'can i trust', 'trustworthy', 'reliable', 'authentic', 'fake', 'not fake', 'legitimate', 'verified'],
    
    // ========== ADDITIONAL ENGAGEMENT (400+ keywords) ==========
    help: ['help', 'assist', 'support', 'help me', 'can you help', 'need help', 'assistance', 'need assistance', 'require help', 'looking for help'],
    
    problem: ['problem', 'issue', 'trouble', 'facing issue', 'having problem', 'challenge', 'difficulty', 'concern', 'worried', 'confused about'],
    
    recommendation: ['suggest', 'recommend', 'recommendation', 'suggestion', 'advice', 'what should i', 'what do you suggest', 'what do you recommend', 'best option', 'best choice', 'which one', 'which is better', 'your opinion'],
    
    time_inquiry: ['when', 'what time', 'timing', 'schedule', 'availability', 'available', 'working hours', 'business hours', 'open', 'closed', 'when open', 'timing'],
    
    location: ['location', 'where', 'address', 'office', 'where located', 'your location', 'city', 'where are you', 'office address'],
    
    team: ['team', 'who will do', 'who works', 'team size', 'your team', 'developers', 'designers', 'experts', 'professionals', 'staff'],
    
    competitors: ['fiverr', 'upwork', 'freelancer', '99designs', 'other agencies', 'competitor', 'alternatives'],
    
    quality: ['quality', 'high quality', 'premium', 'professional', 'best quality', 'top quality', 'standard', 'quality work'],
    
    customization: ['custom', 'customize', 'customization', 'personalize', 'tailor', 'specific requirements', 'custom made', 'bespoke'],
    
    examples: ['example', 'sample', 'demo', 'showcase', 'show me', 'can i see', 'preview', 'examples'],
    
    refund: ['refund', 'money back', 'return', 'cancel', 'cancellation', 'refund policy', 'return policy'],
    
    contract: ['contract', 'agreement', 'terms', 'conditions', 'terms and conditions', 'legal', 'documentation'],
    
    maintenance: ['maintenance', 'support', 'updates', 'after launch', 'ongoing support', 'technical support', 'maintenance plan'],
    
    migration: ['migration', 'migrate', 'transfer', 'move', 'switch', 'change platform', 'migrate store'],
    
    integration: ['integration', 'integrate', 'connect', 'link', 'third party', 'plugin', 'addon', 'extension'],
    
    security: ['security', 'secure', 'safe', 'protected', 'ssl', 'https', 'data security', 'secure payment'],
    
    mobile: ['mobile', 'mobile friendly', 'responsive', 'mobile version', 'app', 'mobile app'],
    
    speed: ['speed', 'fast', 'performance', 'loading time', 'slow', 'optimization', 'fast loading'],
    
    backup: ['backup', 'data backup', 'backup plan', 'restore', 'recovery', 'data recovery'],
    
    analytics: ['analytics', 'tracking', 'data', 'insights', 'google analytics', 'reports', 'statistics', 'metrics'],
    
    inventory: ['inventory', 'stock', 'product management', 'inventory management', 'stock management'],
    
    shipping: ['shipping', 'delivery', 'courier', 'shipping integration', 'delivery options', 'shipping charges'],
    
    multiple_stores: ['multiple stores', 'multi store', 'more than one store', 'several stores', 'multiple websites'],
    
    language: ['language', 'multilingual', 'languages', 'english', 'hindi', 'regional language'],
    
    currency: ['currency', 'multiple currency', 'international', 'usd', 'inr', 'currency support'],
    
    complaint: ['complaint', 'not satisfied', 'unhappy', 'disappointed', 'problem with', 'issue with'],
    
    positive_feedback: ['excellent', 'amazing', 'wonderful', 'fantastic', 'great service', 'impressive', 'loved it'],
    
    deciding: ['thinking', 'deciding', 'not decided', 'need time', 'let me think', 'will decide', 'considering'],
    
    budget_concern: ['too expensive', 'costly', 'cant afford', 'out of budget', 'high price', 'reduce price'],
    
    competitor_mention: ['someone else offering', 'other company', 'cheaper option', 'got better offer'],
    
    deadline: ['deadline', 'specific date', 'by when', 'need by', 'launch date', 'target date']
  },

  responses: {
    // ========== GREETING VARIATIONS (10 unique responses) ==========
    greeting: [
      "Hey there! 👋 Welcome to AR Solutions! We turn business ideas into digital reality. What brings you here today?",
      "Hello! Great to see you here! 😊 Looking to grow your business online? I'm here to help!",
      "Hi! Welcome to AR Solutions - where businesses scale faster! Tell me, what's on your mind?",
      "Hey! 🚀 Ready to transform your business digitally? Let's chat about what you need!",
      "Welcome! I'm your business growth assistant from AR Solutions. What can I help you achieve today?",
      "Hi there! Looking for affordable digital solutions? You're in the right place! What interests you?",
      "Hello! 😊 AR Solutions here - helping businesses succeed since 2024. How can I assist you?",
      "Hey! Excited to help you grow! Whether it's e-commerce, marketing, or branding - I've got you covered. What do you need?",
      "Welcome aboard! 🎯 AR Solutions specializes in turning startups into success stories. What's your goal?",
      "Hi! Ready to scale your business? From online stores to WhatsApp marketing - we do it all! What would you like to explore?"
    ],
    
    // ========== CASUAL CONVERSATION (15+ variations) ==========
    howareyou: [
      "I'm doing fantastic, thanks for asking! 😊 More importantly - how can I make your day better?",
      "Doing great! Always excited to help businesses grow. How about you? What brings you here?",
      "I'm wonderful! Ready to help you succeed. How are things on your end?",
      "Amazing, thanks! 🚀 Every conversation is a chance to help someone succeed. How can I help you today?",
      "Doing well! Grateful to connect with entrepreneurs like you. What's on your mind?"
    ],
    
    casual: [
      "That's awesome! 😊 So, what brings you to AR Solutions today?",
      "Great to hear! Now, let's talk business - what are you looking to achieve?",
      "Love the positive energy! ⚡ Ready to grow your business? Tell me what you need!",
      "Perfect! Let's channel that good mood into growing your business. What interests you?",
      "Fantastic! Now let's make your business even better. What solution are you exploring?"
    ],
    
    whoareyou: [
      "I'm your dedicated business assistant from AR Solutions! Think of me as your first step toward digital success. 🚀",
      "I'm AR's virtual consultant - here 24/7 to help you discover the perfect solution for your business growth!",
      "I'm your friendly guide from AR Solutions! My job? Making sure you get the best solutions at unbeatable prices. 😊",
      "I'm the service assistant for AR Solutions - your trusted partner in scaling businesses digitally. How can I help?"
    ],
    
    thankyou: [
      "You're most welcome! 😊 Anything else you'd like to know?",
      "Happy to help! That's what we're here for. Need anything else?",
      "My pleasure! Feel free to ask anything - I'm here for you! 🙌",
      "Glad I could help! Want to explore more about our services?"
    ],
    
    bye: [
      "Goodbye! 👋 Remember, AR Solutions is here whenever you're ready to grow. Wishing you success!",
      "Take care! Don't hesitate to return when you need us. We're just a message away! 😊",
      "See you soon! May your business thrive. We'll be here when you need us! 🚀",
      "Farewell! Thanks for connecting. Come back anytime - your success is our mission!"
    ],
    
    yes: [
      "Awesome! Let me share the exciting details with you... 🎯",
      "Perfect! I love your enthusiasm! Here's what you need to know...",
      "Great decision! Let me walk you through everything...",
      "Fantastic! You're going to love this..."
    ],
    
    no: [
      "No worries! Take your time. Is there something specific you'd like to know more about? 😊",
      "That's completely fine! Maybe I can help with something else? What are you curious about?",
      "Understood! If you change your mind or have questions, I'm right here. What else can I help with?",
      "No problem at all! Feel free to explore. What else interests you?"
    ],
    
    maybe: [
      "I hear you! Let me share some info that might help you decide... 🤔",
      "Totally understand! How about I give you the key details so you can make an informed choice?",
      "Fair enough! Want me to break down what makes us different? Might help you decide!",
      "No pressure! Would more information help? I'm happy to answer any questions."
    ],
    
    // ========== ECOMMERCE RESPONSES ==========
    fullPackage: [
      "**Shopify Store - ₹7,999**\n✓ Complete setup\n✓ Free domain (1 year)\n✓ Payment gateway\n✓ 20 products listed\n✓ Logo & banners\n✓ FREE training\n✓ Delivered in 25 days\n\nStart with just ₹1,599! Want the detailed breakdown?",
      "**Complete E-Commerce Package - ₹7,999**\n✓ Professional Shopify store\n✓ Your brand domain FREE for 1 year\n✓ Secure payment integration\n✓ 20 products ready to sell\n✓ Custom logo + banners\n✓ FREE store management training\n✓ 25-day delivery\n\nConfirmation: Just ₹1,599! Interested in details?"
    ],
    
    fullPackage_detailed: "**Complete Shopify E-Commerce Package - ₹7,999**\n\n**What You Get:**\n✓ Complete Shopify store setup\n✓ 1-year free domain (your brand name - our gift!)\n✓ Payment gateway integration (accept online payments)\n✓ Up to 20 products listed & ready to sell\n✓ Simple logo design + promotional banners\n✓ Content creation for products\n✓ FREE comprehensive training on store management\n✓ Delivered in 25 days\n✓ 100% transparent pricing - no hidden charges\n✓ Monthly Shopify subscription paid separately (cancel anytime)\n\n**Flexible Payment Plan:**\n• Confirmation: ₹1,599\n• Remaining: 4 easy installments over project duration\n\n**Quick Delivery Option:** Pay 70% upfront for expedited delivery!\n\n**Perfect for:** Clothing, jewelry, shoes, accessories, or ANY product niche\n**Sell on:** Google, Social Media, and Worldwide\n\nReady-to-use, business-grade store designed for immediate sales. Questions?",
    
    pricing: [
      "₹7,999 total - business-ready store! Start with ₹1,599, rest in 4 easy installments. Need faster delivery? We have a Quick option!",
      "Total investment: ₹7,999. Pay ₹1,599 to confirm your slot, balance in 4 installments. Want to fast-track? Pay 70% upfront!",
      "Just ₹7,999 for a complete online store! Confirmation: ₹1,599. Flexible installments available. Quick delivery option too!"
    ],
    
    quickDelivery: [
      "Want your store faster? Quick Delivery Option: Pay 70% upfront and get priority treatment - your store ready in record time! 🚀",
      "Fast-track your success! Pay 70% upfront for Quick Delivery - we prioritize your project and deliver faster!",
      "Speed matters? Quick Delivery Option available! 70% advance payment = faster setup, faster launch, faster sales!"
    ],
    
    // ========== WHATSAPP MARKETING RESPONSES ==========
    whatsappmarketing: [
      "**WhatsApp Marketing - ₹2,000**\n✓ 1,400 messages delivered\n✓ Quality leads (LinkedIn + Google)\n✓ Business account setup\n✓ Auto-replies & catalog\n✓ 7-day delivery\n\nWant detailed info?",
      "**Complete WhatsApp Marketing Package - ₹2,000**\n✓ 1,400 promotional messages\n✓ Targeted lead generation\n✓ Professional business setup\n✓ Automated features\n✓ Ready in 7 days\n\nAll-inclusive! Need more details?"
    ],
    
    whatsappmarketing_detailed: "**Complete WhatsApp Marketing & Lead Generation - ₹2,000**\n\n**What's Included:**\n✓ Targeted lead generation (LinkedIn + Google scraping)\n✓ Up to 1,400 promotional messages (avg 200/day)\n✓ Professional WhatsApp Business Account setup\n✓ Lead management & organized forwarding\n✓ Community building strategies\n✓ Auto-reply setup (never miss a lead!)\n✓ Product/service catalog setup\n✓ Professional profile message\n✓ Quick response templates\n✓ Away message configuration\n✓ Completed in 7 days\n\n**Why 200 messages/day?**\nKeeps your account 100% safe from bans while maximizing reach and engagement!\n\n**Total Cost:** ₹2,000 - completely transparent, no hidden fees!\n\n**Perfect for:** Service providers, product sellers, coaches, consultants, local businesses\n\nReady to generate quality leads?",
    
    whatsapp_setup: [
      "We'll set up your professional WhatsApp Business Account with everything - profile, catalog, auto-replies. You'll look 100% credible!",
      "Complete business account setup included! Professional profile, product catalog, automated responses - making you look trustworthy and established."
    ],
    
    whatsapp_messages: [
      "1,400 total messages - about 200 per day. This daily limit keeps your account safe while reaching maximum potential customers! 🎯",
      "You get 1,400 promotional messages delivered. We send ~200/day to protect your account from restrictions while ensuring great reach!"
    ],
    
    whatsapp_leads: [
      "Quality leads scraped from LinkedIn & Google - targeted, relevant contacts! We share them in organized format for easy tracking. 📊",
      "We generate targeted leads using LinkedIn and Google scraping - real potential customers, shared with you for follow-ups!"
    ],
    
    whatsapp_features: [
      "Auto-replies, product catalog, profile message, quick responses, away messages - everything to run a professional business account! ✨",
      "Complete feature setup: automated replies, showcase catalog, professional profile, instant responses - everything included!"
    ],
    
    whatsapp_timeline: [
      "Complete setup and execution in just 7 days! Fast turnaround, quick results, immediate lead generation! ⚡",
      "7-day delivery - setup, leads, messages, everything! Quick and efficient service!"
    ],
    
    whatsapp_price: [
      "₹2,000 all-inclusive! Complete setup + 1,400 messages + quality leads. Zero hidden charges - what you see is what you pay!",
      "Just ₹2,000 for the complete package. Setup, messages, leads, features - everything included. Transparent pricing!"
    ],
    
    whatsapp_community: [
      "We help build engaged WhatsApp groups and communities - organic growth, loyal customers, repeat business! Perfect for long-term success. 🌱",
      "Community building included! We create and manage WhatsApp groups for organic engagement - turning customers into brand advocates!"
    ],
    
    whatsapp_restrictions: [
      "200 messages/day keeps you safe! More messages = ban risk. We maximize reach while protecting your account long-term. Your safety is our priority! 🛡️",
      "Daily limits prevent account bans. WhatsApp restricts heavy usage - we stay within safe limits while delivering maximum results!"
    ],
    
    // ========== DPM & DIGITAL SERVICES ==========
    dpm: [
      "**Digital Presence Management** - Your complete online identity: website, social media, SEO, branding. Want to know more?",
      "**DPM Services** - Establish your brand everywhere online! Website, social profiles, search rankings, complete digital identity. Interested in details?"
    ],
    
    dpm_detailed: "**Digital Presence Management (DPM)**\n\nBuild, enhance, and dominate your digital space across all channels:\n\n**Services Include:**\n• Website & Platform Development\n• Complete Branding & Creative Identity\n• Social Media Management (All platforms)\n• SEO & Google Visibility Optimization\n• Digital Advertising & Paid Campaigns\n• Analytics, Tracking & CRM Integration\n• Online Reputation Management\n• Specialized SME & Startup Solutions\n\n**Why DPM?**\nEvery digital touchpoint should reflect your brand and drive growth. We ensure consistency, visibility, and results across the entire digital ecosystem.\n\n**Pricing:** Custom packages based on requirements\n\nInterested in a specific service? Let me share details!",
    
    marketing: [
      "End-to-end digital marketing! Strategy, paid ads, social media, SEO, analytics. Want to learn more about how we boost your sales?",
      "Complete marketing solutions - from brand awareness to lead conversion! Paid campaigns, organic growth, data-driven strategies. Interested?"
    ],
    
    sales: [
      "We scale sales through proven strategies! Lead generation, conversion optimization, sales funnels, data analytics. Maximize ROI from day one! 💰",
      "Structured sales growth! Lead nurturing, conversion tactics, performance tracking - turning visitors into paying customers! Want details?"
    ],
    
    scaling: [
      "Scale smarter, not harder! Customized growth plans that boost revenue and maximize efficiency. Let's build something amazing! 🚀",
      "Business scaling done right! Strategic expansion, revenue optimization, market penetration - sustainable growth guaranteed!"
    ],
    
    website: [
      "Professional website development! Corporate sites, landing pages, responsive design - optimized for conversions. Want more info?",
      "Business websites that work! Professional, mobile-friendly, conversion-focused. Perfect for establishing credibility!"
    ],
    
    socialmedia: [
      "Complete social media management! Instagram, Facebook, LinkedIn, Twitter - content creation, posting, engagement, growth. Interested?",
      "Social media done right! Profile setup, content strategy, regular posts, community management - building your brand presence!"
    ],
    
    seo: [
      "SEO services to boost your Google ranking! On-page optimization, keyword strategy, backlinks - more visibility, more traffic! 📈",
      "Rank higher on Google! Complete SEO - technical optimization, content strategy, link building - drive organic traffic!"
    ],
    
    branding: [
      "Complete branding solutions! Logo design, brand identity, guidelines, visual assets - creating memorable brands! 🎨",
      "Brand identity that stands out! Logo, color palette, typography, brand guidelines - professional branding from scratch!"
    ],
    
    // ========== TECHNICAL ASSURANCE ==========
    noTech: [
      "Zero technical knowledge needed! We handle everything from A to Z - you get a ready-to-use business store. Simple! 😊",
      "No tech skills required! We build, you sell. Everything managed for you - completely hassle-free!",
      "Don't worry about technical stuff! That's our job. You focus on your business, we handle the tech!"
    ],
    
    timeline: [
      "25 days for complete store setup. Need it faster? Quick Delivery Option available with 70% upfront payment! ⏱️",
      "Standard delivery: 25 days. Expedited option: Pay 70% advance for faster turnaround!",
      "Your store will be ready in 25 days! Can't wait? Choose Quick Delivery for faster setup!"
    ],
    
    domain: [
      "Yes! FREE 1-year domain with your brand name - our gift to you! Included in the package, no extra cost. 🎁",
      "FREE domain for 1 year! Choose your brand name - it's on us. Completely included!",
      "1-year free domain registration included! Your brand name, professionally set up!"
    ],
    
    training: [
      "FREE comprehensive training on store management! You'll learn product uploads, order processing, everything to run successfully. 📚",
      "Complete training included! We teach you everything - managing products, orders, customers. You'll be a pro!",
      "FREE training session! Learn to manage your store independently - adding products, handling orders, tracking sales!"
    ],
    
    platform: [
      "Shopify - the world's #1 e-commerce platform! Trusted by millions globally. Reliable, secure, easy to scale! 🌐",
      "We use Shopify - industry-leading platform. Powers millions of stores worldwide. Best choice for serious businesses!",
      "Shopify platform - trusted, secure, scalable. From startups to Fortune 500 companies use it!"
    ],
    
    products: [
      "Any products! Clothing, jewelry, shoes, electronics, accessories - ANY niche. Customized for your business. Sell anywhere! 🛍️",
      "Sell anything you want! We customize based on your products - fashion, home decor, gadgets, anything!",
      "All product types supported! Whether physical goods, digital products, or services - we set it up perfectly!"
    ],
    
    paymentGateway: [
      "Yes! Payment gateway fully integrated - accept credit cards, debit cards, UPI, wallets. Easy online payments from customers! 💳",
      "Payment gateway included! Razorpay/PayPal integration - secure, easy transactions. Start accepting payments immediately!",
      "Complete payment integration! Multiple payment options for customers - cards, UPI, wallets, everything!"
    ],
    
    design: [
      "Logo design, promotional banners, and content creation - all included! Professional look guaranteed! ✨",
      "Complete design package! Simple logo, attractive banners, product descriptions - everything for a professional store!",
      "Design services included! Logo, graphics, banners - making your store visually appealing and professional!"
    ],
    
    installments: [
      "After ₹1,599 confirmation, remaining balance in 4 easy installments over 25 days. Flexible and stress-free! 💯",
      "Simple payment plan! ₹1,599 to start, then 4 installments during project. Easy on your budget!",
      "Flexible installments! Pay ₹1,599 now, rest in 4 parts. Budget-friendly payment schedule!"
    ],
    
    confirmation: [
      "Secure your slot with just ₹1,599 confirmation fee! Limited spots available - let's get started! 🎯",
      "Ready to begin? Just ₹1,599 to confirm your project! Shall we proceed?",
      "Start your journey with ₹1,599 confirmation! Book your spot now - let's build your success!"
    ],
    
    // ========== VALUE PROPOSITIONS ==========
    comparison: [
      "**Why AR Solutions?**\n✓ Unbeatable pricing\n✓ Complete solutions (zero hidden costs)\n✓ FREE training & ongoing support\n✓ Quick delivery options\n✓ Proven results since 2024\n✓ End-to-end service\n✓ Dedicated support team\n\nWe're not just vendors - we're your growth partners!",
      "**What Makes Us Different?**\n✓ Affordable packages for startups\n✓ Transparent pricing\n✓ Free training included\n✓ Faster delivery options\n✓ Complete service - nothing extra to buy\n✓ Real support, real results\n\nWe succeed when you succeed!"
    ],
    
    guarantee: [
      "We deliver quality work on time - that's our promise! Your satisfaction is our priority. Transparent pricing, zero hidden charges, complete support. 🤝",
      "Quality guaranteed! On-time delivery, transparent pricing, full support throughout. Your success is our reputation!",
      "Our guarantee: Professional work, timely delivery, honest pricing, dedicated support. We stand behind our services 100%!"
    ],
    
    aboutar_detailed: "**About AR Solutions (AfterResult Solutions)**\n\nYour trusted digital growth partner since 2024 - dedicated to helping brands scale both digitally and offline.\n\n**Our Expertise:**\n• Digital Presence Management (DPM)\n• Lead Generation (Leadin)\n• E-Commerce Development\n• Marketplace Enablement\n• Offline Presence Management (OPM)\n• WhatsApp Marketing\n• Branding & Creative Services\n\n**Founded:** 2024\n**Mission:** Accelerate business growth with affordable, results-focused solutions\n**Vision:** Empowering 10,000+ businesses by 2027\n\n**Why Choose Us?**\n✓ Startup-friendly pricing\n✓ End-to-end solutions\n✓ Proven track record\n✓ Dedicated support\n✓ Results-driven approach\n\nWe're not just a service provider - we're your growth partner! 🚀",
    
    // ========== DISCOUNTS & OFFERS ==========
    discount: [
      "**Current Special Offers!**\n• E-Commerce Store: Start at just ₹1,599\n• WhatsApp Marketing: Complete package ₹2,000\n• Quick Delivery Bonus: Priority service with 70% upfront\n• FREE domain & training with e-commerce package\n\nLimited time offers - secure your spot now! ⚡",
      "**Exclusive Deals Today!**\n• E-Commerce: ₹7,999 (Start with ₹1,599)\n• WhatsApp Marketing: ₹2,000 all-inclusive\n• Combo packages available\n• Quick delivery options\n\nDon't miss out - these prices won't last!"
    ],
    
    // ========== URGENCY HANDLING ==========
    urgent: [
      "I understand the urgency! Our Quick Delivery Option gets your store live faster - pay 70% upfront for priority treatment. Want to proceed immediately? 🚀",
      "Time-sensitive? No problem! Quick Delivery Option available - expedited setup with 70% advance. Let's fast-track your success!",
      "Urgent need? We've got you! Pay 70% upfront for express delivery. Your project becomes our top priority!"
    ],
    
    // ========== CONTACT & SUPPORT ==========
    contact: [
      "📧 **Email:** info.afterresult@gmail.com\n📱 **WhatsApp:** +91 9050983530\n\nReach out anytime! We're here to help you succeed. 😊",
      "**Let's Connect!**\n📧 info.afterresult@gmail.com\n📱 +91 9050983530\n\nDirect line to our team - we respond fast!",
      "**Get In Touch:**\nEmail: info.afterresult@gmail.com\nWhatsApp: +91 9050983530\n\nQuestions? Consultation? We're just a message away!"
    ],
    
    services: [
      "We offer comprehensive business growth solutions! E-Commerce, WhatsApp Marketing, DPM, Branding, and more. Want our complete Services Brochure?",
      "**Our Services:**\n• E-Commerce Development\n• WhatsApp Marketing\n• Digital Presence Management\n• Branding & Creative\n• SEO & Marketing\n• Lead Generation\n\nWant detailed info on any specific service?"
    ],
    
    // ========== INTEREST & ENGAGEMENT ==========
    interested: [
      "Excellent! Let me share the complete details with you... 📋",
      "Great to hear! Here's everything you need to know...",
      "Perfect timing! Let me walk you through the details...",
      "Love your enthusiasm! Here's the full breakdown..."
    ],
    
    skeptical: [
      "I completely understand your concern! AR Solutions has been delivering real results since 2024. We offer:\n✓ 100% transparent pricing\n✓ Zero hidden charges\n✓ Complete documentation\n✓ Real deliverables\n✓ Satisfied client base\n\nWant to see our portfolio or speak with our team directly? 📞",
      "Fair question! Trust is earned. Here's why clients choose us:\n✓ Honest, upfront pricing\n✓ Proven track record\n✓ Real client testimonials\n✓ Complete transparency\n✓ Dedicated support\n\nHappy to provide references or answer specific concerns!"
    ],
    
    confused: [
      "No worries! Let me break it down simply for you... 💡",
      "I'll make it crystal clear! Here's the simple explanation...",
      "Let me simplify that for you! Here's what it means...",
      "Totally understand! Let me explain it differently..."
    ],
    
    help: [
      "Absolutely! I'm here to help. Tell me what you need and I'll guide you through everything! 😊",
      "Of course! That's exactly why I'm here. What specific help do you need?",
      "Happy to assist! What would you like help with? Let's solve it together!"
    ],
    
    problem: [
      "I'm sorry you're facing an issue! Let me help resolve it. Can you tell me more about the problem? 🤔",
      "That's concerning! Don't worry, we'll figure it out. What's the specific issue?",
      "Let's fix this! Can you describe the problem so I can provide the best solution?"
    ],
    
    recommendation: [
      "Based on your needs, I'd suggest... Let me share my recommendation! 💡",
      "Great question! Here's what I recommend for your situation...",
      "I'd suggest starting with... Here's my professional recommendation..."
    ],
    
    // ========== ADDITIONAL RESPONSES ==========
    quality: [
      "Premium quality guaranteed! Professional work, attention to detail, business-grade deliverables. We don't compromise on quality! ⭐",
      "Top-tier quality! Every project gets professional treatment. Your success depends on quality - we take it seriously!"
    ],
    
    customization: [
      "Fully customizable! We tailor everything to your specific needs and brand identity. Your vision, our execution! 🎨",
      "100% customization available! Tell us your requirements - we'll build exactly what you need!"
    ],
    
    examples: [
      "I'd love to show you examples! Contact us at +91 9050983530 or info.afterresult@gmail.com for portfolio and live demos! 📸",
      "Great question! Our team can share portfolio samples and case studies. Want to connect with them directly?"
    ],
    
    refund: [
      "We have a clear refund policy for genuine cases. Quality and satisfaction are guaranteed. Want to discuss specific concerns? 🤝",
      "Refund policy applies to specific scenarios. We ensure quality delivery - but if issues arise, we're fair and transparent!"
    ],
    
    maintenance: [
      "Ongoing support available! We don't abandon you after launch. Maintenance packages and technical support offered separately. Want details?",
      "Post-launch support included! Plus, we offer maintenance plans for long-term technical support and updates!"
    ],
    
    integration: [
      "Multiple integrations supported! Payment gateways, shipping, CRM, analytics - we connect everything you need! 🔗",
      "Full integration capability! Third-party tools, plugins, APIs - we make everything work together seamlessly!"
    ],
    
    security: [
      "100% secure! SSL certificates, secure payment gateways, data encryption - your store and customer data fully protected! 🔒",
      "Security is priority! HTTPS, secure checkout, data protection - enterprise-grade security for your peace of mind!"
    ],
    
    mobile: [
      "Fully mobile-responsive! Your store looks perfect on phones, tablets, desktops - optimized for all devices! 📱",
      "Mobile-first design! 70% of shoppers use phones - your store will be stunning on every device!"
    ],
    
    speed: [
      "Optimized for speed! Fast loading times, smooth performance - we optimize for best user experience and SEO! ⚡",
      "Lightning-fast performance! Speed optimization included - faster sites = better sales and rankings!"
    ],
    
    analytics: [
      "Google Analytics integrated! Track visitors, sales, behavior - complete insights into your business performance! 📊",
      "Full analytics setup! Monitor traffic, conversions, customer behavior - data-driven growth strategies!"
    ],
    
    inventory: [
      "Complete inventory management! Track stock, manage variants, automatic updates - easy product management included! 📦",
      "Robust inventory system! Stock tracking, low-stock alerts, variant management - all included!"
    ],
    
    shipping: [
      "Shipping integration available! Connect with major couriers, automatic rate calculation, tracking - smooth delivery management! 🚚",
      "Full shipping setup! Multiple courier options, real-time tracking, automated notifications!"
    ],
    
    language: [
      "Multiple language support possible! Hindi, English, regional languages - reach wider audience! Want multilingual setup? 🌐",
      "Multilingual stores supported! English, Hindi, or any regional language - let's discuss your needs!"
    ],
    
    experience: [
      "We've successfully delivered numerous projects since 2024! Growing portfolio of satisfied clients across industries. Want to see our work? 🏆",
      "Proven track record! Helping startups and SMEs scale digitally. Our results speak for themselves!"
    ],
    
    team: [
      "Professional team of developers, designers, and marketers! Experienced experts dedicated to your success. Quality guaranteed! 👥",
      "Skilled team behind every project! Developers, designers, strategists - all working to deliver excellence!"
    ],
    
    deadline: [
      "We respect deadlines! Standard: 25 days. Quick delivery available with advance payment. Have a specific date? Let's discuss! 📅",
      "Deadline-driven delivery! We plan carefully to meet your launch date. Quick options available!"
    ],
    
    budget_concern: [
      "I understand budget matters! That's why we offer flexible installments - ₹1,599 to start, rest in easy payments. We work with your budget! 💰",
      "Budget-conscious? We get it! Flexible payment plans, transparent pricing, no hidden costs. Let's find what works for you!"
    ],
    
    deciding: [
      "Take your time! No pressure. Want me to send you a summary to review? You can reach out whenever ready! 😊",
      "Totally understand! Big decisions need thought. Any questions that might help you decide?",
      "No rush! Would more information help your decision? I'm here to answer anything!"
    ],
    
    positive_feedback: [
      "Thank you so much! 🙏 That means a lot! Ready to work together and create something amazing?",
      "Appreciate your kind words! ⭐ Let's channel this energy into building your success!",
      "Wow, thank you! 😊 Excited to exceed your expectations. Shall we get started?"
    ],
    
    complaint: [
      "I sincerely apologize for any inconvenience! 😔 Let me help resolve this immediately. Can you share details so we can fix it?",
      "I'm sorry to hear that! Your satisfaction matters most. Please share what went wrong so we can make it right!"
    ]
  }
    };
  },
computed: {
  filteredChatHistory() {
    const activeChats = this.chatHistory.filter(chat => !chat.archived);
    if (!this.searchQuery.trim()) {
      return activeChats;
    }
    const query = this.searchQuery.toLowerCase();
    return activeChats.filter(chat => 
      chat.title.toLowerCase().includes(query) ||
      chat.messages.some(msg => msg.text.toLowerCase().includes(query))
    );
  },
  archivedChats() {
    return this.chatHistory.filter(chat => chat.archived);
  }
},
mounted() {
  // Always start with a fresh chat on page load/refresh
  this.messages = [];
  this.query = "";
  this.currentChatId = null;
  
  if (process.client) {
    // Load theme preference
    const savedTheme = localStorage.getItem('ar-theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    }
    
    // Load chat history (but not current messages)
    const savedHistory = localStorage.getItem('ar-chat-history');
    if (savedHistory) {
      try {
        this.chatHistory = JSON.parse(savedHistory);
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
      
      const savedMessages = localStorage.getItem('ar-current-messages');
      const savedChatId = localStorage.getItem('ar-current-chat-id');
      if (savedMessages && savedChatId) {
        try {
          this.messages = JSON.parse(savedMessages);
          this.currentChatId = savedChatId;
        } catch (e) {
          console.error('Failed to load current chat:', e);
        }
      }
    }
  },
  beforeUnmount() {
    if (this.autocorrectTimeout) {
      clearTimeout(this.autocorrectTimeout);
    }
  },
methods: {
  handleTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
    this.touchStartY = e.changedTouches[0].screenY;
  },

  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.touchEndY = e.changedTouches[0].screenY;
    this.handleSwipe();
  },

  handleSwipe() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    const verticalDistance = Math.abs(this.touchEndY - this.touchStartY);
    
    // Only trigger if horizontal swipe is more than 50px and vertical movement is less than 100px
    if (Math.abs(swipeDistance) > 50 && verticalDistance < 100) {
      // Swipe right (left to right) - open sidebar
      if (swipeDistance > 0 && this.touchStartX < 50) {
        this.showMenu = true;
      }
      // Swipe left (right to left) - close sidebar
      else if (swipeDistance < 0 && this.showMenu) {
        this.showMenu = false;
      }
    }
  },

  // ... rest of your existing methods
  renameChat(chat) {
    const newTitle = prompt('Enter new chat name:', chat.title);
    if (newTitle && newTitle.trim()) {
      const chatIndex = this.chatHistory.findIndex(c => c.id === chat.id);
      if (chatIndex !== -1) {
        this.chatHistory[chatIndex].title = newTitle.trim();
        if (process.client) {
          localStorage.setItem('ar-chat-history', JSON.stringify(this.chatHistory));
        }
      }
    }
  },

  archiveChat(chatId) {
    const chatIndex = this.chatHistory.findIndex(c => c.id === chatId);
    if (chatIndex !== -1) {
      this.chatHistory[chatIndex].archived = true;
      if (process.client) {
        localStorage.setItem('ar-chat-history', JSON.stringify(this.chatHistory));
      }
    }
  },

  unarchiveChat(chatId) {
    const chatIndex = this.chatHistory.findIndex(c => c.id === chatId);
    if (chatIndex !== -1) {
      this.chatHistory[chatIndex].archived = false;
      if (process.client) {
        localStorage.setItem('ar-chat-history', JSON.stringify(this.chatHistory));
      }
    }
  },

  deleteChat(chatId) {
    if (confirm('Are you sure you want to delete this chat?')) {
      this.chatHistory = this.chatHistory.filter(c => c.id !== chatId);
      if (this.currentChatId === chatId) {
        this.startNewChat();
      }
      if (process.client) {
        localStorage.setItem('ar-chat-history', JSON.stringify(this.chatHistory));
      }
    }
  },

toggleTempMode() {
  this.isTempMode = !this.isTempMode;
  if (this.isTempMode) {
    this.messages = [];
    this.currentChatId = null;
  }
},

  generateResponse(q) {
    const query = q.toLowerCase().trim();
    const kb = this.kb;
    
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste', 'yes', 'hy', 'hlo', 'kon'];
    if (greetings.some(g => query === g || query === g + '!' || query === g + '?')) {
      return {
        text: "Hi there! How's it going? How may I help you today?",
        hasButton: false
      };
    }
    
    if (kb.keywords.howareyou.some(kw => query.includes(kw))) {
      return { text: kb.responses.howareyou, hasButton: false };
    }

if (kb.keywords.casual.some(kw => query.includes(kw))) {
  return {
    text: "That's wonderful to hear! How can I assist you with your online business today? Feel free to ask about our services, pricing, or anything else!",
    hasButton: false
  };
}
if (kb.keywords.whatsapp_messages.some(kw => query.includes(kw))) {
  return {
    text: `${kb.responses.whatsapp_messages}\n\n${kb.responses.whatsapp_restrictions}\n\nInterested in getting started? The complete package is just ₹2,000/-`,
    hasButton: true,
    buttonText: 'Get WhatsApp Marketing - ₹2,000',
    buttonLink: 'https://pages.razorpay.com/pl_R7y5WH1fOYdLQn/view',
    buttonType: 'whatsapp'
  };
}
    if (kb.keywords.whoareyou.some(kw => query.includes(kw))) {
      return { text: kb.responses.whoareyou, hasButton: false };
    }
    if (kb.keywords.whatsapp_leads.some(kw => query.includes(kw))) {
  return {
    text: `${kb.responses.whatsapp_leads}\n\n${kb.responses.whatsapp_price}`,
    hasButton: true,
    buttonText: 'Get WhatsApp Marketing - ₹2,000',
    buttonLink: 'https://pages.razorpay.com/pl_R7y5WH1fOYdLQn/view',
    buttonType: 'whatsapp'
  };
}

if (kb.keywords.whatsapp_timeline.some(kw => query.includes(kw))) {
  return {
    text: `${kb.responses.whatsapp_timeline}\n\nReady to start generating leads? Just ₹2,000/- for the complete package!`,
    hasButton: true,
    buttonText: 'Get WhatsApp Marketing - ₹2,000',
    buttonLink: 'https://pages.razorpay.com/pl_R7y5WH1fOYdLQn/view',
    buttonType: 'whatsapp'
  };
}

if (kb.keywords.whatsapp_setup.some(kw => query.includes(kw))) {
  return {
    text: `${kb.responses.whatsapp_setup}\n\n${kb.responses.whatsapp_features}`,
    hasButton: true,
    buttonText: 'Get WhatsApp Marketing - ₹2,000',
    buttonLink: 'https://pages.razorpay.com/pl_R7y5WH1fOYdLQn/view',
    buttonType: 'whatsapp'
  };
}

if (kb.keywords.whatsapp_features.some(kw => query.includes(kw))) {
  return {
    text: `${kb.responses.whatsapp_features}\n\n${kb.responses.whatsapp_price}`,
    hasButton: true,
    buttonText: 'Get WhatsApp Marketing - ₹2,000',
    buttonLink: 'https://pages.razorpay.com/pl_R7y5WH1fOYdLQn/view',
    buttonType: 'whatsapp'
  };
}

if (kb.keywords.whatsapp_price.some(kw => query.includes(kw))) {
  return {
    text: `${kb.responses.whatsapp_price}\n\n${kb.responses.whatsapp_messages}`,
    hasButton: true,
    buttonText: 'Get WhatsApp Marketing - ₹2,000',
    buttonLink: 'https://pages.razorpay.com/pl_R7y5WH1fOYdLQn/view',
    buttonType: 'whatsapp'
  };
}

if (kb.keywords.whatsapp_community.some(kw => query.includes(kw))) {
  return {
    text: `${kb.responses.whatsapp_community}\n\nWant to start building your community? Get the complete WhatsApp Marketing package for ₹2,000/-`,
    hasButton: true,
    buttonText: 'Get WhatsApp Marketing - ₹2,000',
    buttonLink: 'https://pages.razorpay.com/pl_R7y5WH1fOYdLQn/view',
    buttonType: 'whatsapp'
  };
}

if (kb.keywords.whatsapp_restrictions.some(kw => query.includes(kw))) {
  return {
    text: `${kb.responses.whatsapp_restrictions}\n\n${kb.responses.whatsapp_messages}`,
    hasButton: true,
    buttonText: 'Get WhatsApp Marketing - ₹2,000',
    buttonLink: 'https://pages.razorpay.com/pl_R7y5WH1fOYdLQn/view',
    buttonType: 'whatsapp'
  };
}
    
    if (kb.keywords.thankyou.some(kw => query.includes(kw))) {
      return { text: kb.responses.thankyou, hasButton: false };
    }
    
    if (kb.keywords.bye.some(kw => query.includes(kw))) {
      return { text: kb.responses.bye, hasButton: false };
    }
    
    if (kb.keywords.services.some(kw => query.includes(kw))) {
      return {
        text: kb.responses.services,
        hasButton: true,
        buttonText: 'Download Services Brochure',
        buttonLink: 'https://cdn2.f-cdn.com/files/download/257089198/afterresult.pdf'
      };
    }
    
    if (kb.keywords.marketing.some(kw => query.includes(kw))) {
      return { text: kb.responses.marketing, hasButton: true };
    }
    
    if (kb.keywords.sales.some(kw => query.includes(kw))) {
      return { text: kb.responses.sales, hasButton: true };
    }
    
    if (kb.keywords.scaling.some(kw => query.includes(kw))) {
      return { text: kb.responses.scaling, hasButton: true };
    }
    
    if (kb.keywords.contact.some(kw => query.includes(kw))) {
      return { text: kb.responses.contact, hasButton: false };
    }
    
    if (greetings.some(g => query.startsWith(g + ' ') || query.startsWith(g + ','))) {
      return {
        text: `${kb.responses.greeting}\n\n${kb.responses.fullPackage}`,
        hasButton: true
      };
    }
    
    if (kb.keywords.confirmation.some(kw => query.includes(kw))) {
      return { text: kb.responses.confirmation, hasButton: true };
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
      text: "Oops! Looks like I'm not trained for that yet, but I'm learning every day!",
      hasButton: false
    };
  },

  autocorrectText(text) {
    const words = text.split(/(\s+|[.,!?;:])/);
    
    const correctedWords = words.map(word => {
      if (/^\s+$/.test(word) || /^[.,!?;:]$/.test(word)) {
        return word;
      }
      
      const lowerWord = word.toLowerCase();
      
      if (lowerWord.endsWith('?') || lowerWord.endsWith('!')) {
        const baseWord = lowerWord.slice(0, -1);
        const punctuation = lowerWord.slice(-1);
        if (autocorrectDict[baseWord]) {
          return word.charAt(0) === word.charAt(0).toUpperCase() 
            ? autocorrectDict[baseWord].charAt(0).toUpperCase() + autocorrectDict[baseWord].slice(1) + punctuation
            : autocorrectDict[baseWord] + punctuation;
        }
      }
      
      if (autocorrectDict[lowerWord]) {
        const corrected = autocorrectDict[lowerWord];
        if (word.charAt(0) === word.charAt(0).toUpperCase()) {
          return corrected.charAt(0).toUpperCase() + corrected.slice(1);
        }
        return corrected;
      }
      
      return word;
    });
    
    return correctedWords.join('');
  },

  handleInputChange() {
    if (this.autocorrectTimeout) {
      clearTimeout(this.autocorrectTimeout);
    }
    
    this.autocorrectTimeout = setTimeout(() => {
      const input = this.$refs.queryInput || this.$refs.queryInputBottom;
      const cursorPosition = input?.selectionStart || 0;
      const originalLength = this.query.length;
      const corrected = this.autocorrectText(this.query);
      
      if (corrected !== this.query) {
        this.query = corrected;
        
        this.$nextTick(() => {
          if (input) {
            const lengthDiff = this.query.length - originalLength;
            const newPosition = cursorPosition + lengthDiff;
            input.setSelectionRange(newPosition, newPosition);
          }
        });
      }
    }, 500);
  },

  async handleSearch() {
    if (!this.query.trim()) return;
    
    const userQuery = this.query.trim();
    
    if (!this.currentChatId && !this.isTempMode) {
      this.currentChatId = Date.now().toString();
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
  buttonText: aiResponse.buttonText || 'Launch My Store - ₹1,599',
  buttonLink: aiResponse.buttonLink || 'https://pages.razorpay.com/pl_R6OXxjqi9EpIhJ/view',
  buttonType: aiResponse.buttonType || 'default'
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
    if (process.client) {
      localStorage.setItem('ar-theme', this.isDarkMode ? 'dark' : 'light');
    }
  },

  startNewChat() {
    if (this.messages.length > 0 && !this.isTempMode) {
      const existingIndex = this.chatHistory.findIndex(c => c.id === this.currentChatId);
      
      if (existingIndex === -1) {
        this.chatHistory.unshift({
          id: this.currentChatId || Date.now().toString(),
          title: this.messages[0].text.substring(0, 30) + (this.messages[0].text.length > 30 ? '...' : ''),
          messages: [...this.messages],
          date: new Date()
        });
      } else {
        this.chatHistory[existingIndex] = {
          ...this.chatHistory[existingIndex],
          messages: [...this.messages],
          date: new Date()
        };
      }
      
      if (process.client) {
        localStorage.setItem('ar-chat-history', JSON.stringify(this.chatHistory));
      }
    }
    
    this.messages = [];
    this.query = "";
    this.currentChatId = null;
    this.showMenu = false;
    
    if (process.client && !this.isTempMode) {
      localStorage.removeItem('ar-current-messages');
      localStorage.removeItem('ar-current-chat-id');
    }
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
    if (process.client && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Message copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy message');
      });
    }
  },

  likeMessage(index) {
    alert('Thank you for your feedback! 👍');
  },

  dislikeMessage(index) {
    alert('Thank you for your feedback. We will improve! 👎');
  },

  regenerateResponse(index) {
    if (index > 0 && this.messages[index - 1]?.type === 'user') {
      const userQuery = this.messages[index - 1].text;
      this.messages.splice(index, 1);
      
      setTimeout(() => {
        const aiResponse = this.generateResponse(userQuery);
        
this.messages.push({
  type: 'bot',
  text: aiResponse.text,
  timestamp: new Date(),
  hasButton: aiResponse.hasButton,
  buttonText: aiResponse.buttonText || 'Launch My Store - ₹1,599',
  buttonLink: aiResponse.buttonLink || 'https://pages.razorpay.com/pl_R6OXxjqi9EpIhJ/view',
  buttonType: aiResponse.buttonType || 'default'
});
        
        this.scrollToBottom();
      }, 300);
    }
  },

  shareMessage(text) {
    if (process.client && navigator.share) {
      navigator.share({
        title: 'AR Solutions AI Response',
        text: text
      }).catch(() => {
        this.copyMessage(text);
      });
    } else {
      this.copyMessage(text);
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
  background-color: #2f2f2f;
  border-color: #4d4d4d;
  color: #ececec;
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
