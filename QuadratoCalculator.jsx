import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

export default function QuadratoCalculator() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [nameInitials, setNameInitials] = useState('');
  const [surnameInitials, setSurnameInitials] = useState('');
  const [showSquare, setShowSquare] = useState(false);

  // Letter to number mapping
  const letterToNumber = (letter) => {
    const mappings = {
      A: 1, I: 1, Q: 1, Y: 1, J: 1,
      B: 2, R: 2, K: 2,
      C: 3, G: 3, L: 3, S: 3,
      D: 4, M: 4, T: 4,
      E: 5, H: 5, N: 5, X: 5,
      U: 6, V: 6, W: 6,
      O: 7, Z: 7,
      F: 8, P: 8,
    };
    return mappings[letter.toUpperCase()] || 0;
  };

  // Convert multiple letters to sum
  const initialsToNumber = (initials) => {
    if (!initials) return 0;
    return initials.split('').reduce((sum, letter) => sum + letterToNumber(letter), 0);
  };

  // Reduce to single digit numerologically
  const reduceNumeric = (num) => {
    while (num >= 10) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  // Calculate all variables and grid
  const quadrato = useMemo(() => {
    if (!day || !month || !year || !nameInitials || !surnameInitials) {
      return null;
    }

    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);

    if (isNaN(d) || isNaN(m) || isNaN(y) || d < 1 || d > 31 || m < 1 || m > 12) {
      return null;
    }

    // Variables
    const x = initialsToNumber(nameInitials) + initialsToNumber(surnameInitials);
    
    // y (approx) = sum of all individual digits
    const yApprox = d + m + (y % 100) + Math.floor(y / 100);
    
    // Y (entire) = sum using year split into two parts
    const yearFirst2 = Math.floor(y / 100);
    const yearLast2 = y % 100;
    const Y = d + m + yearFirst2 + yearLast2;

    const c = 1; // Cuore
    const h = 2; // Materia
    const t = 3; // Trinità

    // Column D calculations
    const D4 = 1;
    const D1 = d + D4;
    const D7 = D1 + D4;
    const D6 = initialsToNumber(surnameInitials);
    const D5 = initialsToNumber(nameInitials);
    const D3 = reduceNumeric(D7 + D6 + D4);
    const D2 = reduceNumeric(D7 + D4);

    // Identity (Identità Animica)
    const A = reduceNumeric(D1 + D2 + D3 + D4 + D5 + D6 + D7);

    // Helper function for calculations with reduction
    const calc = (formula) => reduceNumeric(formula);

    // Column A & G (symmetrical)
    const colA = [
      reduceNumeric(yearFirst2 + yearLast2),  // A1 = Giorno
      m,                                        // A2 = Mese
      yearFirst2,                              // A3 = Millennio e Centenario
      1,                                       // A4 = Cuore
      D5,                                      // A5 = Nome
      D6,                                      // A6 = Cognome
      yearLast2                                // A7 = Decennio e Anno
    ];

    const colG = [
      yearLast2,
      D6,
      D5,
      1,
      D5,
      m,
      yearFirst2
    ];

    // Column B
    const colB = [
      calc(yApprox + A + D6 + D5 + D4 + D3 + 2*h + 2*t),  // B1
      calc(A + D5 + D3 + D1 + D2 + 2*h + t),              // B2
      calc(A + D5 + D3 + t),                              // B3
      calc(Y + 2*A),                                      // B4
      calc(A + D5 + D3 + t),                              // B5
      calc(A + D5 + D3 + D1 + D2 + 2*h + t),              // B6
      calc(yApprox + A + D6 + D5 + D4 + D3 + 2*h + 2*t)   // B7
    ];

    // Column C
    const colC = [
      calc(3*t + x + h + D4 + D2),                        // C1
      calc(4*t + x + h + D7 + D4 + D1),                   // C2
      calc(4*t + x + 2*h + D7 + D4 + D1),                 // C3
      calc(x + 3*t + h + D3 + D2 + D1),                   // C4
      calc(2*x + 3*t + D3 + D4),                          // C5
      calc(3*x + 3*h + D1),                               // C6
      calc(Y + A + 2*x + 3*h)                             // C7
    ];

    // Column D
    const colD = [D1, D2, D3, D4, D5, D6, D7];

    // Column E
    const colE = [
      Math.abs(calc(yApprox - 3*t - 3*h - c)),            // E1
      calc(yApprox - 3*t),                                // E2
      calc(yApprox + 2*(D7 + D4 + D1) + 2*h),             // E3
      calc(x + 3*h + t + D1 + D2 + D3),                   // E4
      calc(2*x + 3*h + t + D1 + D3 + D5 + D6 + D7),       // E5
      calc(3*x + 3*h + D1),                               // E6
      calc(Y + 2*A + 2*x + h + t)                         // E7
    ];

    // Column F
    const colF = [
      calc(2*A + h),                                      // F1
      calc(yApprox + A + x + t),                          // F2
      calc(2*A + x + 2*h),                                // F3
      calc(Y + 2*A + x + t),                              // F4
      calc(2*A + x + 2*h),                                // F5
      calc(yApprox + A + x + t),                          // F6
      calc(2*A + h)                                       // F7
    ];

    const grid = [colA, colB, colC, colD, colE, colF, colG];

    return {
      grid,
      variables: { x, yApprox, Y, A, D1, D2, D3, D4, D5, D6, D7 },
      inputs: { day: d, month: m, year: y },
      initials: { name: nameInitials, surname: surnameInitials }
    };
  }, [day, month, year, nameInitials, surnameInitials]);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (quadrato) {
      setShowSquare(true);
    }
  };

  const handleReset = () => {
    setDay('');
    setMonth('');
    setYear('');
    setNameInitials('');
    setSurnameInitials('');
    setShowSquare(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="pt-8 pb-6 px-4 text-center border-b border-purple-500/20">
          <div className="inline-block mb-2">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 p-0.5">
              <div className="w-full h-full rounded-lg bg-slate-950 flex items-center justify-center">
                <span className="text-2xl">◈</span>
              </div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 mb-2">
            QUADRATO DELL'ASCESI
          </h1>
          <p className="text-purple-300/60 text-xs sm:text-sm tracking-wide">Non-Duale Numerologico</p>
        </div>

        {/* Main Container */}
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          {!showSquare ? (
            // Input Form
            <div className="space-y-6">
              <form onSubmit={handleCalculate} className="space-y-6">
                {/* Date Section */}
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
                  <label className="block text-purple-200 text-sm font-semibold tracking-wide mb-6 uppercase">
                    Data di Nascita
                  </label>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-purple-300/70 text-xs mb-2 uppercase tracking-wide">Giorno</label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        placeholder="01"
                        className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-3 py-2 text-purple-100 placeholder-purple-500/30 focus:outline-none focus:border-purple-400 focus:bg-slate-900/70 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-purple-300/70 text-xs mb-2 uppercase tracking-wide">Mese</label>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        placeholder="01"
                        className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-3 py-2 text-purple-100 placeholder-purple-500/30 focus:outline-none focus:border-purple-400 focus:bg-slate-900/70 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-purple-300/70 text-xs mb-2 uppercase tracking-wide">Anno</label>
                      <input
                        type="number"
                        min="1900"
                        max="2099"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="1997"
                        className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-3 py-2 text-purple-100 placeholder-purple-500/30 focus:outline-none focus:border-purple-400 focus:bg-slate-900/70 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Initials Section */}
                <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
                  <label className="block text-blue-200 text-sm font-semibold tracking-wide mb-6 uppercase">
                    Iniziali Nome e Cognome
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-blue-300/70 text-xs mb-2 uppercase tracking-wide">
                        Iniziali Nome/i
                      </label>
                      <input
                        type="text"
                        value={nameInitials}
                        onChange={(e) => setNameInitials(e.target.value.toUpperCase())}
                        placeholder="Es: MB"
                        maxLength="3"
                        className="w-full bg-slate-900/50 border border-blue-500/30 rounded-lg px-3 py-2 text-blue-100 placeholder-blue-500/30 focus:outline-none focus:border-blue-400 focus:bg-slate-900/70 transition uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-300/70 text-xs mb-2 uppercase tracking-wide">
                        Iniziali Cognome/i
                      </label>
                      <input
                        type="text"
                        value={surnameInitials}
                        onChange={(e) => setSurnameInitials(e.target.value.toUpperCase())}
                        placeholder="Es: R"
                        maxLength="3"
                        className="w-full bg-slate-900/50 border border-blue-500/30 rounded-lg px-3 py-2 text-blue-100 placeholder-blue-500/30 focus:outline-none focus:border-blue-400 focus:bg-slate-900/70 transition uppercase"
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                    <p className="text-blue-300/60 text-xs leading-relaxed">
                      <span className="font-semibold text-blue-300">Mappa numerica:</span> A,I,Q,Y,J=1 • B,R,K=2 • C,G,L,S=3 • D,M,T=4 • E,H,N,X=5 • U,V,W=6 • O,Z=7 • F,P=8
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={!quadrato}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-purple-900 disabled:to-blue-900 disabled:opacity-50 text-white font-semibold rounded-lg transition duration-300 uppercase text-sm tracking-wide"
                  >
                    Calcola il Quadrato
                  </button>
                </div>
              </form>

              {/* Letter Reference */}
              <div className="mt-8 p-4 bg-slate-900/50 border border-purple-500/20 rounded-lg">
                <p className="text-purple-300/60 text-xs">
                  <span className="text-purple-300 font-semibold">Nota:</span> Inserisci solo le lettere iniziali. Se hai più nomi, somma i loro valori numerici.
                </p>
              </div>
            </div>
          ) : quadrato ? (
            // Square Display
            <div className="space-y-8">
              {/* Results Header */}
              <div className="text-center">
                <h2 className="text-lg sm:text-xl font-light tracking-widest text-purple-200 mb-2">
                  {quadrato.initials.name} {quadrato.initials.surname}
                </h2>
                <p className="text-sm text-purple-400/60">
                  {quadrato.inputs.day}/{quadrato.inputs.month}/{quadrato.inputs.year}
                </p>
              </div>

              {/* Variables Display */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-purple-500/20 rounded-xl p-4 sm:p-6">
                {Object.entries(quadrato.variables).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="text-purple-400/60 text-xs uppercase tracking-wide mb-1">{key}</p>
                    <p className="text-xl sm:text-2xl font-light text-purple-100">{value}</p>
                  </div>
                ))}
              </div>

              {/* The 7x7 Grid */}
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full bg-gradient-to-br from-purple-950/50 to-blue-950/50 border border-purple-500/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                  <table className="border-collapse">
                    <thead>
                      <tr>
                        <th className="w-8 h-8 sm:w-10 sm:h-10"></th>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((col) => (
                          <th key={col} className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 text-xs sm:text-sm font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5, 6, 7].map((row) => (
                        <tr key={row}>
                          <td className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 text-xs sm:text-sm font-semibold text-center">
                            {row}
                          </td>
                          {quadrato.grid.map((col, colIndex) => {
                            const value = col[row - 1];
                            const isCenter = row === 4 && colIndex === 3;
                            return (
                              <td
                                key={`${colIndex}-${row}`}
                                className={`
                                  w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-light
                                  border border-purple-500/30
                                  flex items-center justify-center
                                  transition duration-200
                                  ${isCenter 
                                    ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400/50 text-yellow-100 font-semibold' 
                                    : 'bg-slate-900/30 text-purple-200 hover:bg-purple-900/30'
                                  }
                                `}
                              >
                                {value}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Legend */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-4">
                  <p className="text-yellow-400/80 text-xs font-semibold mb-2 uppercase tracking-wide">Centro (D4)</p>
                  <p className="text-purple-300/70 text-sm">Il Cuore - Punto di equilibrio divino</p>
                </div>
                <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-4">
                  <p className="text-purple-300/80 text-xs font-semibold mb-2 uppercase tracking-wide">Identità Animica (A)</p>
                  <p className="text-purple-300/70 text-sm">{quadrato.variables.A}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-purple-500/30 text-purple-200 font-semibold rounded-lg transition duration-300 uppercase text-sm tracking-wide"
                >
                  Nuovo Calcolo
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition duration-300 uppercase text-sm tracking-wide"
                >
                  Stampa
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @media print {
          body { background: white; }
          * { background: transparent !important; border-color: black !important; color: black !important; }
        }
      `}</style>
    </div>
  );
}
