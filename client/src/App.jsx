import React, { useEffect, useState } from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';
import { useRef } from 'react';


function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultRef = useRef();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [result]);

  const nodes = [
    {
      id: '1',
      position: isMobile
        ? { x: 50, y: 50 }     // mobile
        : { x: 350, y: 100 },  // desktop

      style: {
        borderRadius: '10px',
        border: '1px solid #cbd5f5',
        background: 'white',
        width: isMobile ? 200 : 240
      },

      data: {
        label: (
          <div className="p-[10px]">
            <p className="font-bold text-sm sm:text-base">Input</p>

            <textarea
              className="w-full h-[80px] sm:h-[100px] resize-none p-[5px] text-sm sm:text-base"
              placeholder="Type prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        )
      }
    },

    {
      id: '2',
      position: isMobile
        ? { x: 50, y: 220 }
        : { x: 750, y: 100 },

      style: {
        borderRadius: '10px',
        border: '1px solid #cbd5f5',
        padding: 5,
        background: 'white',
        width: isMobile ? 200 : 240
      },

      data: {
        label: (
          <div className="p-[10px] w-full h-[140px] sm:h-[150px] box-border">

            <p className="font-bold text-sm sm:text-base mb-[10px]">Output</p>

            <div
              ref={resultRef}
              onWheel={(e) => e.stopPropagation()}
              className="w-full max-h-[100px] sm:max-h-[120px] overflow-y-auto overflow-x-hidden break-words whitespace-pre-wrap text-[12px] sm:text-[14px]"
            >
              {loading
                ? <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                : result || "Result will appear here"}
            </div>

          </div>
        )
      }
    }
  ];

  const edges = [
    { id: 'e1-2', source: '1', target: '2' }
  ];

  // Run Flow
  const runFlow = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await axios.post('http://localhost:5000/api/ask-ai', {
        prompt
      });

      setResult(res.data.response);

    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Save
  const saveData = async () => {
    try {
      await axios.post('http://localhost:5000/api/save', {
        prompt,
        response: result
      });

      alert("Saved successfully!");
    } catch {
      alert("Save failed");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#b6d5fd] to-[#6e9cd8] text-slate-900">

      {/* Title */}
      <h2 className="text-center py-4 sm:py-5 text-lg sm:text-xl md:text-2xl font-semibold">
        AI Flow Builder
      </h2>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2.5 px-2">

        <button
          onClick={runFlow}
          disabled={loading}
          className={`w-full sm:w-auto px-4 sm:px-[18px] py-2.5 sm:py-[10px] rounded-[10px] text-white font-bold transition
        ${loading
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
            }`}
        >
          {loading ? "Running..." : "Run Flow"}
        </button>

        <button
          onClick={saveData}
          disabled={!result}
          className={`w-full sm:w-auto px-4 sm:px-[18px] py-2.5 sm:py-[10px] rounded-[10px] text-white font-bold transition
        ${!result
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-600 cursor-pointer'
            }`}
        >
          Save
        </button>

      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center text-sm sm:text-base px-2">
          {error}
        </p>
      )}

      {/* Flow Container */}
      <div className="flex-1 min-h-0">
        <ReactFlow
          key={isMobile ? "mobile" : "desktop"}
          nodes={nodes}
          edges={edges}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll={false}
          panOnDrag={true}
          fitView
        />
      </div>

    </div>
  );
}

export default App;