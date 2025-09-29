
<script>
const kb = require('./knowledge-base.js');

export default {
  name: 'ChatbotPage',
  data() {
    return {
      query: "",
      showMenu: false,
      messages: [],
      isDarkMode: false,
      chatHistory: [],
      currentChatId: null
    }
  },
  methods: {
    async handleSearch() {
      if (!this.query.trim()) return;
      
      if (!this.currentChatId) {
        this.currentChatId = Date.now();
      }
      
      this.messages.push({
        type: 'user',
        text: this.query,
        timestamp: new Date()
      });
      
      this.query = "";
      
      await this.$nextTick();
      this.scrollToBottom();
      
      setTimeout(() => {
        // Using the knowledge base
        const response = kb.getTestMessage();
        
        this.messages.push({
          type: 'bot',
          text: response,
          timestamp: new Date(),
          hasButton: false
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
      this.messages = [];
      this.query = "";
      this.currentChatId = null;
    },

    loadChat(chat) {
      this.messages = [...chat.messages];
      this.currentChatId = chat.id;
      this.showMenu = false;
      this.scrollToBottom();
    },

    copyMessage(text) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
      }
    },

    likeMessage(index) {
      console.log('Liked:', index);
    },

    dislikeMessage(index) {
      console.log('Disliked:', index);
    },

    regenerateResponse(index) {
      console.log('Regenerate:', index);
    },

    shareMessage(text) {
      if (navigator.share) {
        navigator.share({ text: text });
      }
    }
  }
}
</script>
