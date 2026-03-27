# 🚀 Quick Start Guide

Get the Quadrato calculator running in 2 minutes.

## 1️⃣ Install Node.js (if needed)

Download from https://nodejs.org/ (LTS version recommended)

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Start Development Server

```bash
npm run dev
```

Your browser will open automatically to `http://localhost:3000`

## 4️⃣ Start Calculating!

1. Enter your birth date (day/month/year)
2. Enter your name initials
3. Enter your surname initials  
4. Click "Calcola il Quadrato" (Calculate the Square)
5. View your numerological square!

## 📱 Features Included

✅ Mobile-responsive design  
✅ Real-time calculations  
✅ Beautiful cosmic aesthetic  
✅ Print support  
✅ No external API calls needed  

## 🛠️ Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 📦 Production Build

```bash
npm run build
```

Output files go to `dist/` folder. Upload to your web host.

## 🎨 Customization Tips

- **Colors**: Edit Tailwind classes in `src/components/QuadratoCalculator.jsx`
- **Animations**: Adjust the `@keyframes blob` in the style section
- **Fonts**: Change in `tailwind.config.js`

## ❓ Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- --port 3001
```

### Module not found?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Slow on mobile?
The app is optimized for mobile. Try:
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Close other browser tabs
- Check internet speed

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

**Enjoy exploring your numerological profile! ✨**
