# VIP AI Symphony v7.0 - Quick Start Guide

**Version**: 7.0.0 (Modernization Release)  
**Last Updated**: January 26, 2026

---

## 🚀 5-Minute Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm 9+ (comes with Node.js)
- Git (optional)

### Installation

```bash
# 1. Navigate to project directory
cd "vip-adv-assistant"

# 2. Install dependencies (first time only)
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start development server
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 📝 Essential Commands

### Development
```bash
npm run dev          # Start dev server (hot reload)
npm start            # Alias for dev
```

### Testing
```bash
npm test             # Run all tests
npm run test:watch   # Watch mode
npm run test:e2e     # E2E tests
```

### Code Quality
```bash
npm run lint         # Check code
npm run lint:fix     # Fix issues
npm run format       # Format code
```

### Building
```bash
npm run build        # Production build
npm run preview      # Preview build
```

---

## 🔧 Configuration

### 1. Environment Variables

Edit `.env` file:

```env
# Required
VITE_OPENAI_API_KEY=your_api_key_here

# Optional
VITE_OPENAI_MODEL=gpt-4o-mini
VITE_ENABLE_FACE_RECOGNITION=true
VITE_ENABLE_VOICE_ACCESS=true
```

### 2. API Key Setup

Get your OpenAI API key:
1. Go to [platform.openai.com](https://platform.openai.com/)
2. Create account / Sign in
3. Navigate to API Keys
4. Create new key
5. Add to `.env` file

---

## 🎯 First Steps

### 1. Explore the Interface

- **Search**: Press `Ctrl+K` or click 🔍
- **Voice**: Click 🎤 (requires microphone permission)
- **AI Chat**: Press `Ctrl+J` or click 💬
- **Settings**: Click ⚙️

### 2. Try Core Features

**Voice Commands:**
- "What's the weather?"
- "Set a reminder"
- "Open automation"

**AI Chat:**
- Ask questions
- Request function execution
- Get help

**Automation:**
- Create workflows
- Set triggers
- Chain actions

### 3. Customize

- **Theme**: Click theme toggle (🌙/☀️)
- **Shortcuts**: Click ⚙️ → Keyboard Shortcuts
- **Favorites**: Star frequently used functions

---

## 🐳 Docker Quick Start

### Development
```bash
docker-compose --profile dev up dev
```

### Production
```bash
docker-compose up app
```

Access at [http://localhost:8000](http://localhost:8000)

---

## 🧪 Testing Quick Start

### Run Tests
```bash
# All tests
npm test

# With coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y
```

### Write Your First Test

Create `tests/example.test.js`:

```javascript
describe('Example Test', () => {
  test('should pass', () => {
    expect(true).toBe(true);
  });
});
```

Run: `npm test`

---

## 📱 Mobile Testing

### Local Network Access

1. Find your IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Access from mobile:
   ```
   http://YOUR_IP:8000
   ```

### PWA Installation

1. Open in mobile browser
2. Tap "Add to Home Screen"
3. Launch as app

---

## 🔍 Troubleshooting

### Port Already in Use

```bash
# Change port in .env
VITE_DEV_SERVER_PORT=8001
```

### Dependencies Not Installing

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Tests Failing

```bash
npx playwright install --with-deps
npm test
```

### Build Errors

```bash
npm run lint:fix
npm run type-check
npm run build
```

---

## 📚 Learn More

### Documentation
- [`MODERNIZATION_COMPLETE.md`](./MODERNIZATION_COMPLETE.md) - Full modernization details
- [`UPGRADE_GUIDE.md`](./UPGRADE_GUIDE.md) - Upgrade from v6.2
- [`TECHNICAL_DETAILS.md`](./TECHNICAL_DETAILS.md) - Technical docs
- [`README.md`](./README.md) - Project overview

### Key Features
- 75+ automated functions
- Voice control & always-listening
- AI chat with GPT-4
- Face recognition
- Automation builder
- Mobile-first design
- PWA support

---

## 🎨 Customization

### Change Theme
```javascript
// In browser console
localStorage.setItem('theme', 'dark'); // or 'light', 'auto'
location.reload();
```

### Modify Functions
Edit `js/functions.js` to add/modify functions.

### Add Custom Styles
Edit CSS files in `css/` directory.

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

Output in `dist/` directory.

### Deploy with Docker
```bash
docker build -t vip-ai-symphony .
docker run -p 80:80 vip-ai-symphony
```

### Deploy to Hosting
Upload `dist/` contents to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting

---

## 💡 Tips & Tricks

### Keyboard Shortcuts
- `Ctrl+K` - Search
- `Ctrl+J` - AI Chat
- `Ctrl+M` - Voice Access
- `Ctrl+R` - Recent Functions
- `Ctrl+Shift+P` - Command Palette

### Developer Tools
```bash
# Analyze bundle size
npm run analyze

# Check security
npm run security:audit

# Validate everything
npm run validate
```

### Performance
- Enable PWA for offline access
- Use service worker caching
- Lazy load heavy features
- Monitor with Performance tab

---

## 🆘 Getting Help

### Quick Links
- [GitHub Issues](https://github.com/yourusername/vip-ai-symphony/issues)
- [Documentation](./MODERNIZATION_COMPLETE.md)
- [Technical Details](./TECHNICAL_DETAILS.md)

### Common Questions

**Q: How do I add a new function?**  
A: Edit `js/functions.js` and add to the appropriate category.

**Q: Can I use without OpenAI API?**  
A: Yes, most features work without it. AI chat requires API key.

**Q: Is it mobile-friendly?**  
A: Yes! v6.2+ is mobile-first with 48px+ touch targets.

**Q: Can I self-host?**  
A: Yes! Use Docker or deploy `dist/` folder anywhere.

---

## ✅ Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment
3. ✅ Start development server
4. ⏳ Explore features
5. ⏳ Customize to your needs
6. ⏳ Write tests
7. ⏳ Deploy to production

---

## 🎉 You're Ready!

You now have a fully modernized, production-ready AI assistant with:

- ✅ Modern build system
- ✅ Comprehensive testing
- ✅ CI/CD pipeline
- ✅ Docker support
- ✅ Enhanced security
- ✅ Great developer experience

**Happy coding!** 🚀

---

**Need more details?** Check [`MODERNIZATION_COMPLETE.md`](./MODERNIZATION_COMPLETE.md)
