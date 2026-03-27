# Quadrato dell'Ascesi Non-Duale

A beautiful, responsive React application for calculating the "Quadrato dell'Ascesi Non-Duale" (Non-Dual Ascesis Square) - a numerological tool for personal spiritual analysis.

## Features

✨ **Mobile-First Design** - Fully responsive from mobile phones to desktop displays  
🎨 **Beautiful UI** - Mystical, elegant interface with animated backgrounds  
⚡ **Real-time Calculations** - Instant numerological square computation  
📊 **Interactive 7x7 Grid** - Visual representation of the ascesis square  
🖨️ **Print Support** - Clean print-friendly layout  
🔢 **Complex Numerology** - Implements all formulas from the original program  

## Project Structure

```
quadrato-ascesi/
├── src/
│   ├── components/
│   │   └── QuadratoCalculator.jsx     # Main calculator component
│   ├── main.jsx                        # App entry point
│   └── index.css                       # Tailwind styles
├── index.html                          # HTML template
├── package.json                        # Dependencies
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind CSS config
├── postcss.config.js                   # PostCSS config
└── README.md                           # This file
```

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Setup Steps

1. **Clone/Extract the project**
   ```bash
   cd quadrato-ascesi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

The app will open automatically at `http://localhost:3000`

## Usage

### Input Data

1. **Birth Date** - Enter day (1-31), month (1-12), and year (4 digits)
2. **Name Initials** - Enter first name initial(s) (up to 3 letters)
3. **Surname Initials** - Enter surname initial(s) (up to 3 letters)

### Letter-to-Number Mapping

The application uses this mapping for name initials:
- **1**: A, I, Q, Y, J
- **2**: B, R, K
- **3**: C, G, L, S
- **4**: D, M, T
- **5**: E, H, N, X
- **6**: U, V, W
- **7**: O, Z
- **8**: F, P

*If you have multiple names, their values are summed.*

### Calculated Values

The calculator derives:
- **x** (NomeCognome) - Sum of name and surname initials
- **y** (Data Approssimata) - Sum of date digits
- **Y** (Data Intera) - Sum using year split into two parts
- **A** (Identità Animica) - Soul identity (sum of column D)
- **D1-D7** - Central column values
- **c, h, t** - Constants: Cuore (1), Materia (2), Trinità (3)

### The 7x7 Grid

The output is a complete 7x7 numerical table with:
- **Columns A & G** - Symmetrical birth date and name information
- **Column D (Center)** - The spiritual heart (D4 = 1, the divine point)
- **Columns B, C, E, F** - Complex calculated values using all variables

The center cell (D4) is highlighted as the spiritual heart of the square.

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory. Deploy this folder to your web server.

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **PostCSS & Autoprefixer** - CSS processing

## Responsive Design

The application is optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (640px+)
- 💻 Desktop (1024px+)

Grid layout automatically adjusts based on screen size with appropriate padding and font sizing.

## Print Support

Click "Stampa" (Print) to print the calculated square. The print layout automatically optimizes for paper output with:
- Adjusted colors for readability
- Removed backgrounds and shadows
- Black text on white background
- Optimized spacing

## Customization

### Changing Colors

Edit the Tailwind classes in `src/components/QuadratoCalculator.jsx`:
- `bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900` - Main background
- `from-purple-600 to-blue-600` - Button colors
- `text-purple-200` - Text colors

### Adjusting Animations

Modify the `@keyframes blob` animation in the component's `<style>` tag to change the background animation speed and intensity.

### Changing Fonts

Update the font in `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Your Font Name', 'sans-serif'],
}
```

## Algorithm Details

The application implements the complete numerological calculation system:

1. **Letter Conversion** - Maps initials to numbers (1-8)
2. **Date Processing** - Splits year into millennia/centennial and decade/year
3. **Variable Calculation** - Computes x, y, Y, A and intermediate D values
4. **Numeric Reduction** - Reduces multi-digit numbers to single digits (e.g., 23 → 5)
5. **Grid Population** - Fills all 49 cells using complex formulas
6. **Symmetry** - Maintains symmetry between columns A and G

## Notes

- All numeric reductions follow numerological practice (repeated digit summing until single digit)
- Negative values are converted to their positive equivalent
- The center cell (D4) always equals 1, representing the divine unity
- The square maintains sacred geometric properties through its symmetries

## License

This project implements the "Il Quadrato dell'Ascesi Non-Duale" methodology.

## Support

For issues or questions, check:
1. That all input fields are filled correctly
2. Birth date is valid (day 1-31, month 1-12)
3. Browser supports ES6+ JavaScript

## Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages

Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/quadrato-ascesi/',
  // ... rest of config
})
```

Then build and push to GitHub.

---

**Created with ✨ for spiritual seekers exploring non-dual consciousness**
