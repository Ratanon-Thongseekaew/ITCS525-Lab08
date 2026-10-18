import { useCallback, useEffect, useState } from "react";
import Button from "./components/Button";
import ThemeContext from "./ThemeContext";
import { Moon, Sun } from "lucide-react";

const HISTORY_KEY = "calculator-history";

const readStoredHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
};

export default function App() {
  const [input, setInput] = useState("0");
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState("dark");

  const fetchHistory = useCallback(() => {
    setHistory(readStoredHistory());
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleClick = (value) => {
    if (value === "Clear") {
      setInput("0");
      localStorage.removeItem(HISTORY_KEY);
      fetchHistory();
    } else if (value === "⌫") {
      if (input === "Error") {
        setInput("0");
        return;
      } else{
        setInput(input.length === 1 ? "0" : input.slice(0, -1));
      }

    }
    else if (value === "=") {
      try {
        const expr = input.replaceAll("÷", "/").replaceAll("×", "*").replaceAll("−", "-");
        const result = eval(expr).toString();
        setInput(result);

        const updatedHistory = [
          ...readStoredHistory(),
          { expression: input, result },
        ];
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
        fetchHistory();
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input === "0" ? value : input + value);
    }
  };

  const topRow = ["⌫", "Clear", "%", "÷"];
  const rows = [
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["±", "0", ".", "="],
  ];
  const operators = ["÷", "×", "−", "+", "="];
  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={theme}>
    <div className={`${isDark ? "bg-gray-950" : "bg-gray-100"} min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 p-4 transition-colors`}>
      <div className="fixed right-4 top-4 z-10">
        <Button
          variant="toggle"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          
          {isDark ? 
          <div className="flex items-center gap-2">Light Mode:<Sun /></div> : <div className="flex items-center gap-2">Dark Mode:<Moon /></div>}
        </Button>
      </div>

      <div className={`${isDark ? "bg-black" : "bg-white"} rounded-3xl p-4 shadow-2xl w-80 transition-colors`}>
        {/* Display */}
        <div className={`${isDark ? "text-white" : "text-gray-900"} text-right text-5xl font-light p-4 mb-2`}>
          {input}
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          {topRow.map((label) => (
            <Button
              key={label}
              onClick={() => handleClick(label)}
              variant={label === "÷" ? "operator" : "utility"}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Number/Operator Rows */}
        {rows.map((row) => (
          <div key={row.join("")} className="grid grid-cols-4 gap-3 mb-3">
            {row.map((label) => (
                <Button
                  key={label}
                  onClick={() => handleClick(label)}
                  variant={operators.includes(label) ? "operator" : "number"}
                >
                  {label}
                </Button>
            ))}
          </div>
        ))}
      </div>

      <aside className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} rounded-3xl p-5 shadow-xl w-80 min-h-96 transition-colors`}>
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        {history.length === 0 ? (
          <p className={isDark ? "text-gray-400" : "text-gray-500"}>No calculations yet.</p>
        ) : (
          <ol className="space-y-3">
            {[...history].reverse().map((item, index) => (
              <li
                key={`${item.expression}-${item.result}-${index}`}
                className={`${isDark ? "border-gray-700" : "border-gray-200"} border-b pb-2 text-right`}
              >
                <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{item.expression}</div>
                <div className="text-lg font-medium">= {item.result}</div>
              </li>
            ))}
          </ol>
        )}
      </aside>
    </div>
    </ThemeContext.Provider>
  );
}



// import catLogo from './assets/cat-png-40358.png'
// import './App.css'

// function App() {

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-purple-100 via-white to-white flex flex-col items-center justify-center px-4">

//       {/* Announcement bar */}
//       <div className="mb-6">
//         <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-sm shadow-sm border-purple-400 hover:border-purple-600 hover:shadow-md">
//           Announcing our next round of funding.{" "}
//           <a href="#" className="ml-1 text-blue-600 font-medium hover:underline">
//             Read more →
//           </a>
//         </span>
//       </div>

//       {/* Hero section */}
//       <h1 className="text-4xl sm:text-6xl font-extrabold text-center text-gray-900 max-w-3xl">
//         Kitten to enrich your <br /> online business
//       </h1>

//       <p className="mt-6 text-lg text-gray-600 text-center max-w-2xl">
//         In ancient times cats were worshipped as gods; they have not forgotten this.
//       </p>

//       {/* Buttons */}
//       <div className="mt-8 flex gap-4">
//         <a
//           href="#"
//           className="rounded-md bg-indigo-600 px-6 py-3 text-white font-semibold shadow hover:bg-indigo-700"
//         >
//           Get started
//         </a>
//         <a
//           href="#"
//           className="flex items-center text-gray-800 font-medium hover:text-gray-900"
//         >
//           Learn more →
//         </a>
//       </div>

//       {/* Cat image bottom-right */}
//       <img
//         src={catLogo}
//         alt="Cute cat"
//         className="absolute bottom-4 right-4 md:w-64 md:h-64 sm:w-48 sm:h-48 w-24 h-24 object-contain"
//       />
//     </div>
//   );
// }

// export default App
