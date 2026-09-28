import { useState, useRef, useEffect } from 'react';
import './index.css';

const generateThemes = () => {
    const themes = [];

    // 10 Visual Pattern Types for maximum variety
    const patternTypes = [
        // 0: Diagonal gradient (top-left to bottom-right)
        (c1, c2, c3) => `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`,
        // 1: Radial burst from center
        (c1, c2, c3) => `radial-gradient(ellipse at center, ${c1} 0%, ${c2} 55%, ${c3} 100%)`,
        // 2: Top-right spotlight
        (c1, c2, c3) => `radial-gradient(circle at top right, ${c1} 0%, ${c2} 40%, ${c3} 100%)`,
        // 3: Horizontal sweep
        (c1, c2, c3) => `linear-gradient(90deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`,
        // 4: Vertical sweep
        (c1, c2, c3) => `linear-gradient(180deg, ${c1} 0%, ${c2} 60%, ${c3} 100%)`,
        // 5: Bottom-left spotlight
        (c1, c2, c3) => `radial-gradient(circle at bottom left, ${c1} 0%, ${c2} 50%, ${c3} 100%)`,
        // 6: Double diagonal
        (c1, c2, c3) => `linear-gradient(45deg, ${c1} 0%, ${c2} 40%, ${c3} 100%)`,
        // 7: Diamond burst
        (c1, c2, c3) => `radial-gradient(ellipse at 20% 80%, ${c3} 0%, transparent 60%), linear-gradient(135deg, ${c1}, ${c2})`,
        // 8: Top spotlight
        (c1, c2, c3) => `radial-gradient(ellipse at top, ${c1} 0%, ${c2} 60%, ${c3} 100%)`,
        // 9: Multi-stop sweep
        (c1, c2, c3) => `linear-gradient(160deg, ${c1} 0%, ${c2} 35%, ${c3} 65%, ${c1} 100%)`,
    ];

    const styleTypes = ['glass', 'pop', 'neon', 'minimal'];

    // Named color palettes for more professional look
    const palettes = [
        // Vibrant combos
        { h: [0,30,60],    sat: [85,90,80], lit: [60,65,70] },    // Fire: Red-Orange-Yellow
        { h: [200,220,240], sat: [80,85,90], lit: [55,60,65] },   // Ocean: Blue tones
        { h: [120,150,180], sat: [70,80,75], lit: [55,60,65] },   // Forest: Green-Teal-Cyan
        { h: [270,290,310], sat: [80,85,90], lit: [55,60,65] },   // Royal: Purple-Violet-Pink
        { h: [30,50,70],    sat: [90,85,80], lit: [60,65,70] },   // Sunrise: Orange-Yellow-Green
        { h: [180,200,220], sat: [75,80,85], lit: [60,65,70] },   // Arctic: Cyan-Blue tones
        { h: [300,320,340], sat: [80,85,90], lit: [55,60,65] },   // Candy: Pink-Magenta-Red
        { h: [60,90,120],   sat: [75,80,85], lit: [60,65,70] },   // Lush: Yellow-Lime-Green
        { h: [240,260,280], sat: [80,85,90], lit: [55,60,65] },   // Twilight: Blue-Purple tones
        { h: [10,20,40],    sat: [85,90,80], lit: [60,65,70] },   // Ember: Red-Orange tones
        // Dark combos
        { h: [0,30,60],    sat: [80,85,75], lit: [20,25,30] },    // Dark Fire
        { h: [200,220,240], sat: [75,80,85], lit: [15,20,25] },   // Dark Ocean
        { h: [120,150,180], sat: [70,75,80], lit: [15,20,25] },   // Dark Forest
        { h: [270,290,310], sat: [75,80,85], lit: [15,20,25] },   // Dark Royal
        { h: [180,200,220], sat: [70,75,80], lit: [12,18,22] },   // Dark Arctic
    ];

    let themeIdx = 1;

    palettes.forEach((palette, pi) => {
        const isDark = pi >= 10;
        const textColor = isDark ? '#ffffff' : '#1e293b';
        const textShadow = isDark ? '0 1px 4px rgba(0,0,0,0.7)' : 'none';
        const optionBg = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.55)';
        const optionBorder = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';

        // Generate multiple themes per palette with brightness/hue variations
        for (let v = 0; v < 34; v++) {
            const hShift = (v * 11) % 60 - 30;  // hue variation ±30
            const sShift = (v * 5) % 20 - 10;   // saturation variation ±10
            const lShift = (v * 7) % 20 - 10;   // lightness variation ±10

            const h1 = (palette.h[0] + hShift + 360) % 360;
            const h2 = (palette.h[1] + hShift + 360) % 360;
            const h3 = (palette.h[2] + hShift + 360) % 360;

            const s1 = Math.min(100, Math.max(30, palette.sat[0] + sShift));
            const s2 = Math.min(100, Math.max(30, palette.sat[1] + sShift));
            const s3 = Math.min(100, Math.max(30, palette.sat[2] + sShift));

            const l1 = Math.min(85, Math.max(12, palette.lit[0] + lShift));
            const l2 = Math.min(85, Math.max(12, palette.lit[1] + lShift));
            const l3 = Math.min(85, Math.max(12, palette.lit[2] + lShift));

            const c1 = `hsl(${h1},${s1}%,${l1}%)`;
            const c2 = `hsl(${h2},${s2}%,${l2}%)`;
            const c3 = `hsl(${h3},${s3}%,${l3}%)`;

            const patternFn = patternTypes[v % patternTypes.length];
            const bgCss = patternFn(c1, c2, c3);
            const style = styleTypes[themeIdx % styleTypes.length];

            const paletteNames = ['Fire','Ocean','Forest','Royal','Sunrise','Arctic','Candy','Lush','Twilight','Ember','Dark Fire','Dark Ocean','Dark Forest','Dark Royal','Dark Arctic'];
            const name = `${paletteNames[pi]} ${themeIdx}`;

            themes.push({
                id: `theme_${themeIdx}`,
                name,
                bg: [c1, c2, c3],
                bgCss,
                style,
                textColor,
                textShadow,
                optionBg,
                optionBorder,
                isDark
            });

            themeIdx++;
        }
    });

    // Fill to 500 with extra creative themes
    const extraPalettes = [
        [340,10,40],   // Rose-Red-Orange
        [160,190,220], // Mint-Sky-Blue
        [40,70,100],   // Gold-Lime-Teal
        [260,280,300], // Indigo-Purple-Pink
        [0,180,360],   // Red-Cyan-Red (contrast)
    ];

    for (let ep = 0; themes.length < 500; ep++) {
        const hues = extraPalettes[ep % extraPalettes.length];
        const isDark = ep % 3 === 0;
        const lit = isDark ? [18, 24, 30] : [68, 74, 80];
        const sat = [82, 88, 78];
        const hShift = (ep * 13) % 40;

        const c1 = `hsl(${(hues[0] + hShift) % 360},${sat[0]}%,${lit[0]}%)`;
        const c2 = `hsl(${(hues[1] + hShift) % 360},${sat[1]}%,${lit[1]}%)`;
        const c3 = `hsl(${(hues[2] + hShift) % 360},${sat[2]}%,${lit[2]}%)`;
        const patternFn = patternTypes[ep % patternTypes.length];
        const bgCss = patternFn(c1, c2, c3);
        const style = styleTypes[ep % styleTypes.length];
        const textColor = isDark ? '#ffffff' : '#1e293b';

        themes.push({
            id: `theme_${themeIdx}`,
            name: `Special ${themeIdx}`,
            bg: [c1, c2, c3],
            bgCss,
            style,
            textColor,
            textShadow: isDark ? '0 1px 4px rgba(0,0,0,0.7)' : 'none',
            optionBg: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.55)',
            optionBorder: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
            isDark
        });
        themeIdx++;
    }

    return themes;
};
const THEMES = generateThemes();

function App() {
  const [showAiModal, setShowAiModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [resolution, setResolution] = useState('1080p');
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Real State for Questions
  const [questions, setQuestions] = useState([]);
  const [rawText, setRawText] = useState('');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [themeFilter, setThemeFilter] = useState('All');

  // AI State
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [aiTopic, setAiTopic] = useState('');
  const [aiCount, setAiCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Advanced AI States
  const [aiSourceType, setAiSourceType] = useState('topic'); // 'topic', 'text', 'file'
  const [aiSourceText, setAiSourceText] = useState('');
  const [aiFile, setAiFile] = useState(null);
  const [aiInstructions, setAiInstructions] = useState('');
  
  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState('');

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const parseAllQuestions = (text) => {
    // Split by double newline to separate questions
    const blocks = text.split(/\n\s*\n/).filter(b => b.trim().length > 10);
    const result = [];
    
    blocks.forEach(block => {
      const lines = block.split('\n').filter(l => l.trim() !== '');
      let q = '', a = '', b = '', c = '', d = '', correct = 'A';
      
      // Assume first line that doesn't start with A,B,C,D is question
      if (lines.length > 0) q = lines[0].replace(/^\d+[\.\)]\s*/, ''); // remove numbering
      
      lines.forEach(line => {
        const upperLine = line.toUpperCase().trim();
        if (upperLine.startsWith('A.') || upperLine.startsWith('A)')) a = line.substring(2).trim();
        else if (upperLine.startsWith('B.') || upperLine.startsWith('B)')) b = line.substring(2).trim();
        else if (upperLine.startsWith('C.') || upperLine.startsWith('C)')) c = line.substring(2).trim();
        else if (upperLine.startsWith('D.') || upperLine.startsWith('D)')) d = line.substring(2).trim();
        else if (upperLine.startsWith('ANS') || upperLine.startsWith('CORRECT') || upperLine.startsWith('జవాబు') || upperLine.startsWith('జ')) {
          let extracted = line.split(/[:=-]/)[1]?.trim().toUpperCase() || 'A';
          if (extracted.startsWith('A') || extracted.startsWith('1') || extracted.startsWith('అ') || extracted.startsWith('ఎ')) correct = 'A';
          else if (extracted.startsWith('B') || extracted.startsWith('2') || extracted.startsWith('ఆ') || extracted.startsWith('బ') || extracted.startsWith('బి')) correct = 'B';
          else if (extracted.startsWith('C') || extracted.startsWith('3') || extracted.startsWith('ఇ') || extracted.startsWith('స') || extracted.startsWith('సి')) correct = 'C';
          else if (extracted.startsWith('D') || extracted.startsWith('4') || extracted.startsWith('ఈ') || extracted.startsWith('డ') || extracted.startsWith('డి')) correct = 'D';
          else {
              let opts = [a, b, c, d];
              let matchIdx = opts.findIndex(o => o && o.toUpperCase().includes(extracted));
              if (matchIdx !== -1) correct = ['A','B','C','D'][matchIdx];
          }
        }
      });
      if(q) result.push({ questionText: q, optA: a, optB: b, optC: c, optD: d, correct });
    });
    
    return result;
  };

  const allParsed = parseAllQuestions(rawText);
  // For live preview, just show the first parsed question
  const parsedQ = allParsed.length > 0 ? allParsed[0] : {
    questionText: 'మీ ప్రశ్న ఇక్కడ ప్లే అవుతుంది...',
    optA: '', optB: '', optC: '', optD: '', correct: 'A'
  };

  const canvasRef = useRef(null);

  const handleAddQuestion = () => {
    if (!rawText.trim()) {
      alert("దయచేసి కనీసం ప్రశ్న అయినా రాయండి!");
      return;
    }
    const newQs = parseAllQuestions(rawText);
    if(newQs.length === 0) return;
    
    setQuestions([...questions, ...newQs]);
    alert(`${newQs.length} Question(s) Added Successfully! ✅`);
    
    setRawText('');
  };

  const handleGenerateAI = async () => {
    if (!apiKey) {
      alert("Please configure API Key in settings first!");
      return;
    }

    setIsGenerating(true);
    try {
      let promptText = `Generate ${aiCount} multiple choice questions in Telugu language. 
Format EACH question EXACTLY like this (no markdown, no bold, no asterisks):

[Question Text]
A. [Option 1]
B. [Option 2]
C. [Option 3]
D. [Option 4]
Ans: [A/B/C/D]

Separate each question with a blank line. Do not write anything else.`;

      if (aiInstructions.trim()) {
        promptText += `\n\nAdditional Instructions from user: ${aiInstructions}`;
      }

      let parts = [{ text: promptText }];

      if (aiSourceType === 'topic') {
        if (!aiTopic.trim()) throw new Error("Please enter a topic!");
        parts.push({ text: `\n\nTopic to generate from: ${aiTopic}` });
      } else if (aiSourceType === 'text') {
        if (!aiSourceText.trim()) throw new Error("Please paste some text/notes!");
        parts.push({ text: `\n\nSource Text to generate from:\n"""\n${aiSourceText}\n"""` });
      } else if (aiSourceType === 'file') {
        if (!aiFile) throw new Error("Please select a PDF or Text file!");
        
        const base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(aiFile);
          reader.onload = () => {
             const result = reader.result;
             resolve(result.includes(',') ? result.split(',')[1] : result);
          };
          reader.onerror = error => reject(error);
        });

        parts.push({
          inlineData: {
            mimeType: aiFile.type || 'application/pdf',
            data: base64Data
          }
        });
        parts.push({ text: `\n\nPlease generate the questions based on the attached document.` });
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }]
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const generatedText = data.candidates[0].content.parts[0].text;
      
      setRawText(generatedText);
      setShowAiModal(false);
      
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAutoAlign = () => {
    if (!rawText.trim()) return;

    // Force known patterns onto new lines for cleaner processing
    let textToProcess = rawText
        .replace(/(?:^|\s)([A-Dఅ-ఈa-d1-4][\.\)])/g, '\n$1 ') 
        .replace(/(?:^|\s)(Ans|జవాబు|జ|Answer)[\:\.\-]/gi, '\nAns:')
        .replace(/\n+/g, '\n'); 
        
    const lines = textToProcess.split('\n').map(l => l.trim()).filter(l => l !== '');
    
    let formattedText = '';
    let currentQ = '';
    let options = [];
    let answer = 'A';
    
    // Helper to see if a line is explicitly a question (starts with number or ends with ?)
    const isQuestionLine = (text) => {
        return /^\d+[\.\)\-]/.test(text) || /\?$/.test(text);
    };

    const appendQuestion = () => {
        if (!currentQ) return;
        while(options.length < 4) options.push('');
        
        // Remove trailing or leading prefixes from options to keep it clean
        const cleanOpts = options.map(o => o.replace(/^([A-Dఅ-ఈa-d1-4][\.\)])\s*/i, '').trim());
        
        formattedText += `${currentQ}\nA. ${cleanOpts[0]}\nB. ${cleanOpts[1]}\nC. ${cleanOpts[2]}\nD. ${cleanOpts[3]}\nAns: ${answer}\n\n`;
        currentQ = '';
        options = [];
        answer = 'A';
    };

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        let isOptionPrefix = line.match(/^([A-Dఅ-ఈa-d1-4][\.\)])\s*(.*)/i);
        let isAnswer = line.match(/^(Ans|జవాబు|జ|Answer)[\:\.\-]?\s*(.*)/i);
        
        if (isAnswer) {
            let extracted = isAnswer[2].trim().toUpperCase();
            if (extracted.startsWith('A') || extracted.startsWith('1') || extracted.startsWith('అ') || extracted.startsWith('ఎ')) answer = 'A';
            else if (extracted.startsWith('B') || extracted.startsWith('2') || extracted.startsWith('ఆ') || extracted.startsWith('బ') || extracted.startsWith('బి')) answer = 'B';
            else if (extracted.startsWith('C') || extracted.startsWith('3') || extracted.startsWith('ఇ') || extracted.startsWith('స') || extracted.startsWith('సి')) answer = 'C';
            else if (extracted.startsWith('D') || extracted.startsWith('4') || extracted.startsWith('ఈ') || extracted.startsWith('డ') || extracted.startsWith('డి')) answer = 'D';
            else {
                let matchIdx = options.findIndex(o => o && o.toUpperCase().includes(extracted));
                if (matchIdx !== -1) answer = ['A','B','C','D'][matchIdx];
            }
        } else if (isQuestionLine(line)) {
            // If it's a clear question, force a new block
            appendQuestion();
            currentQ = line.replace(/^\d+[\.\)\-]\s*/, '');
        } else if (isOptionPrefix) {
            if (options.length < 4) options.push(isOptionPrefix[2].trim());
        } else {
            // It's either a continuation of a question or a raw option
            if (!currentQ) {
                currentQ = line.replace(/^\d+[\.\)\-]\s*/, '');
            } else if (options.length < 4) {
                options.push(line);
            } else {
                appendQuestion();
                currentQ = line.replace(/^\d+[\.\)\-]\s*/, '');
            }
        }
    }
    appendQuestion();
    
    setRawText(formattedText.trim());
  };

  // Draw on Canvas whenever the current question changes
  useEffect(() => {
    if (isRecording) return; 
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.save();
    // Base resolution logic for logical coordinates
    const baseW = aspectRatio === '9:16' ? 400 : 711;
    const baseH = aspectRatio === '9:16' ? 711 : 400;
    
    // Scale everything to match the actual canvas rendering resolution (1080p/4k)
    ctx.scale(canvas.width / baseW, canvas.height / baseH);
    
    drawFrame(ctx, parsedQ, 0, baseW, baseH, aspectRatio, selectedTheme);
    ctx.restore();
  }, [parsedQ, aspectRatio, isRecording, selectedTheme, resolution]);

  const drawTimer = (ctx, x, y, timeLeft, style) => {
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, 2 * Math.PI);
      
      if (style === 'neon') {
          ctx.fillStyle = '#0f172a';
          ctx.fill();
          ctx.strokeStyle = '#0ea5e9';
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.fillStyle = '#0ea5e9';
      } else if (style === 'pop') {
          ctx.fillStyle = '#fff';
          ctx.fill();
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 5;
          ctx.stroke();
          ctx.fillStyle = '#f43f5e';
      } else {
          ctx.fillStyle = 'rgba(0,0,0,0.4)';
          ctx.fill();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.fillStyle = '#f59e0b';
      }
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 24px Inter';
      ctx.fillText(timeLeft.toString(), x, y);
  };

  const drawFrame = (ctx, q, frame, width, height, aspect, theme) => {
    const isPortrait = aspect === '9:16';
    
    // Smooth Animated Background
    const animOffset = Math.sin(frame * 0.03) * 200; 
    const gradient = ctx.createLinearGradient(0, animOffset, width, height - animOffset);
    gradient.addColorStop(0, theme.bg[0]);
    gradient.addColorStop(0.5, theme.bg[1]);
    gradient.addColorStop(1, theme.bg[2] || theme.bg[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Floating Particles Animation
    ctx.fillStyle = theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
    for(let p=0; p<15; p++) {
        const px = (p * 50 + frame * 0.5) % width;
        const py = height - ((p * 70 + frame) % (height + 20));
        ctx.beginPath();
        ctx.arc(px, py, (p%4)+2, 0, Math.PI*2);
        ctx.fill();
    }

    if (theme.style === 'neon') {
      ctx.strokeStyle = theme.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      for (let i=0; i<width; i+=40) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,height); ctx.stroke(); }
      for (let i=0; i<height; i+=40) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(width,i); ctx.stroke(); }
    }
    
    // Question Text Animation & Distinct Styling
    ctx.globalAlpha = Math.min(1, frame / 15);
    
    // Distinct bold color for question text based on theme
    ctx.fillStyle = theme.isDark ? '#fde047' : '#1e3a8a'; // Bright Yellow for dark, Deep Blue for light
    if (theme.style === 'pop') {
        ctx.fillStyle = theme.isDark ? '#fff' : '#000';
    }
    
    ctx.shadowBlur = theme.isDark ? 8 : 0;
    ctx.shadowColor = theme.isDark ? 'rgba(0,0,0,0.8)' : 'transparent';
    
    ctx.font = '900 36px "Mandali", Inter, sans-serif'; // Extra bold and slightly larger
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const qText = q.questionText || 'మీ ప్రశ్న ఇక్కడ ప్లే అవుతుంది...';
    const slideInY = Math.max(0, 20 - frame); // Slide down animation
    
    // Text Wrapping Logic
    const wrapText = (text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;
        for(let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                ctx.fillText(line, x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, currentY);
        return currentY;
    };

    let textBottomY = 0;
    if(isPortrait) {
      textBottomY = wrapText(qText, width / 2, 100 + slideInY, width - 60, 42);
    } else {
      textBottomY = wrapText(qText, width / 2, 70 + slideInY, width - 120, 42);
    }
    
    ctx.shadowBlur = 0; // reset
    ctx.textBaseline = 'alphabetic'; // reset

    // Timer Logic 
    let timeLeft = 5;
    if (frame > 30) {
       timeLeft = Math.ceil(5 - ((frame - 30) / 30));
       if (timeLeft < 0) timeLeft = 0;
    }
    const showAnswer = frame > 180; // after 6 seconds

    const drawOptionBox = (x, y, w, text, prefix, isCorrect, index) => {
        // Option stagger animation
        const appearFrame = 15 + (index * 10);
        if (frame < appearFrame) return; // Don't draw yet
        
        ctx.globalAlpha = Math.min(1, (frame - appearFrame) / 10);
        const slideX = Math.max(0, 30 - (frame - appearFrame)*2);
        
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x + slideX, y, w, 60, theme.style === 'pop' ? 30 : 15);
        else ctx.rect(x + slideX, y, w, 60);

        if (theme.style === 'neon') {
            if (showAnswer && isCorrect) {
                ctx.fillStyle = '#064e3b';
                ctx.strokeStyle = '#34d399';
                ctx.shadowColor = '#34d399';
                ctx.shadowBlur = 15;
            } else {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
                ctx.strokeStyle = '#0ea5e9';
                ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = (showAnswer && isCorrect) ? '#34d399' : '#fff';
        } else if (theme.style === 'pop') {
            if (showAnswer && isCorrect) ctx.fillStyle = '#22c55e';
            else ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.fillStyle = (showAnswer && isCorrect) ? '#fff' : '#1e293b';
        } else {
            if (showAnswer && isCorrect) ctx.fillStyle = '#10b981';
            else ctx.fillStyle = theme.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0,0,0,0.05)';
            ctx.fill();
            ctx.fillStyle = theme.textColor;
            if (theme.style === 'glass') {
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
        ctx.shadowBlur = 0; // reset
        ctx.font = 'bold 24px "Mandali", Inter, sans-serif';
        ctx.textAlign = 'left';
        
        let optText = prefix + " " + (text || '');
        if (ctx.measureText(optText).width > w - 40) {
            while(ctx.measureText(optText + '...').width > w - 40 && optText.length > 0) {
                optText = optText.slice(0, -1);
            }
            optText += '...';
        }
        ctx.fillText(optText, x + 20 + slideX, y + 38);
    };

    if (isPortrait) {
      let startY = Math.max(250, textBottomY + 50);
      drawOptionBox(20, startY, 360, q.optA, 'A.', q.correct === 'A', 0);
      drawOptionBox(20, startY + 80, 360, q.optB, 'B.', q.correct === 'B', 1);
      drawOptionBox(20, startY + 160, 360, q.optC, 'C.', q.correct === 'C', 2);
      drawOptionBox(20, startY + 240, 360, q.optD, 'D.', q.correct === 'D', 3);

      if (!showAnswer && frame > 60) {
        ctx.globalAlpha = Math.min(1, (frame - 60) / 15);
        drawTimer(ctx, width / 2, startY + 340, timeLeft, theme.style);
      }
    } else {
      let startY = Math.max(170, textBottomY + 50);
      const colW = 305;
      drawOptionBox(40, startY, colW, q.optA, 'A.', q.correct === 'A', 0);
      drawOptionBox(365, startY, colW, q.optB, 'B.', q.correct === 'B', 1);
      drawOptionBox(40, startY + 80, colW, q.optC, 'C.', q.correct === 'C', 2);
      drawOptionBox(365, startY + 80, colW, q.optD, 'D.', q.correct === 'D', 3);

      if (!showAnswer && frame > 60) {
        ctx.globalAlpha = Math.min(1, (frame - 60) / 15);
        drawTimer(ctx, width / 2, startY + 170, timeLeft, theme.style);
      }
    }
    ctx.globalAlpha = 1.0;
  };

  const handleRecord = async (targetRes) => {
    if (questions.length === 0) {
      alert("దయచేసి కనీసం ఒక ప్రశ్న యాడ్ చేయండి!");
      return;
    }
    
    setIsRecording(true);
    setRecordingProgress('Starting capture...');
    setVideoBlobUrl(null);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const stream = canvas.captureStream(30);
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
    const mediaRecorder = new MediaRecorder(stream, { mimeType: mimeType });
    const chunks = [];
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      setVideoBlobUrl(url);
      setIsRecording(false);
      setRecordingProgress('');
    };
    
    mediaRecorder.start(500); // Output chunks every 500ms to reduce memory pressure
    
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      setRecordingProgress(`Recording Q ${i + 1} of ${questions.length}...`);
      
      const frames = 30 * 8; // 8 seconds per question
      for (let frame = 0; frame <= frames; frame++) {
        await new Promise(r => requestAnimationFrame(r));
        ctx.save();
        const baseW = aspectRatio === '9:16' ? 400 : 711;
        const baseH = aspectRatio === '9:16' ? 711 : 400;
        ctx.scale(canvas.width / baseW, canvas.height / baseH);
        drawFrame(ctx, q, frame, baseW, baseH, aspectRatio, selectedTheme);
        ctx.restore();
      }
      
      // Awesome Transition Animation to the Next Question
      if (i < questions.length - 1) {
          const nextQ = questions[i+1];
          const transFrames = 30; // 1 second transition
          const effectType = Math.floor(Math.random() * 3); // 0: Swipe, 1: Fade, 2: Zoom-out
          
          for (let f = 0; f <= transFrames; f++) {
              await new Promise(r => requestAnimationFrame(r));
              ctx.save();
              const baseW = aspectRatio === '9:16' ? 400 : 711;
              const baseH = aspectRatio === '9:16' ? 711 : 400;
              ctx.scale(canvas.width / baseW, canvas.height / baseH);
              
              const progress = f / transFrames;
              const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2; // easeInOutQuad
              
              if (effectType === 0) { // Swipe Left
                  ctx.translate(-easeProgress * baseW, 0);
                  drawFrame(ctx, q, frames, baseW, baseH, aspectRatio, selectedTheme);
                  ctx.translate(baseW, 0);
                  drawFrame(ctx, nextQ, 0, baseW, baseH, aspectRatio, selectedTheme);
              } else if (effectType === 1) { // Cross Fade
                  ctx.globalAlpha = 1 - progress;
                  drawFrame(ctx, q, frames, baseW, baseH, aspectRatio, selectedTheme);
                  ctx.globalAlpha = progress;
                  drawFrame(ctx, nextQ, 0, baseW, baseH, aspectRatio, selectedTheme);
              } else { // Zoom Out
                  ctx.translate(baseW/2, baseH/2);
                  ctx.scale(1 - easeProgress, 1 - easeProgress);
                  ctx.translate(-baseW/2, -baseH/2);
                  ctx.globalAlpha = 1 - progress;
                  drawFrame(ctx, q, frames, baseW, baseH, aspectRatio, selectedTheme);
              }
              
              ctx.restore();
          }
      }
    }
    
    mediaRecorder.stop();
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} style={{ position: 'relative', overflow: 'visible' }}>
        <button 
           onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
           title="Toggle Sidebar"
           style={{
             position: 'absolute',
             right: '-20px',
             top: '40px',
             background: '#1e293b',
             color: '#ffffff',
             border: '4px solid #f1f5f9',
             borderRadius: '50%',
             width: '40px',
             height: '40px',
             cursor: 'pointer',
             boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             fontSize: '1.2rem',
             fontWeight: 'bold',
             zIndex: 50,
             transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
           }}
        >
          {isSidebarOpen ? '◀' : '▶'}
        </button>

        <div className="logo">
          <h2>✨ AI QuizGen</h2>
        </div>
        <nav>
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')} style={{cursor:'pointer'}}>📝 Dashboard</li>
            <li className={activeTab === 'themes' ? 'active' : ''} onClick={() => setActiveTab('themes')} style={{cursor:'pointer'}}>🎨 Colorful Themes</li>
            <li onClick={() => setShowSettingsModal(true)} style={{cursor:'pointer'}}>⚙️ API Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '15px 25px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#1e293b' }}>Quiz Creator Studio</h1>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Create stunning AI quizzes for YouTube & Shorts</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="ai-btn" onClick={() => setShowAiModal(true)}>
              ✨ Generate with AI
            </button>
            <button className="ai-btn" onClick={() => setShowSettingsModal(true)} style={{ background: '#334155' }}>
              ⚙️ API Settings
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' ? (
        <section className="editor-section">
          {/* Left Panel (Form & List) */}
          <div className="left-panel">
            <div className="question-form">
              <div className="form-group-flex">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{fontWeight: 'bold', color: '#1e293b', margin: 0}}>Paste your Question & Options here</label>
                  <button 
                    onClick={handleAutoAlign}
                    style={{ background: 'none', border: '1px solid #3b82f6', color: '#3b82f6', padding: '4px 10px', borderRadius: '15px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', transition: 'all 0.2s' }}>
                    ✨ Auto Align
                  </button>
                </div>
                <textarea 
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder={`సూర్యుడికి అతి దగ్గరగా ఉన్న గ్రహం ఏది?\nA. బుధుడు\nB. శుక్రుడు\nC. భూమి\nD. అంగారకుడు\nAns: A`}
                  style={{ flex: 1, minHeight: '350px', fontSize: '1.2rem', lineHeight: '1.6', resize: 'none', fontFamily: '"Mandali", sans-serif' }}>
                </textarea>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px', marginBottom: '10px' }}>
                  <b>Format:</b> First line is question. Start options with A., B., C., D. Add "Ans: A" at the end.
                </p>
              </div>

              <button className="primary-btn" onClick={handleAddQuestion} style={{ marginTop: 'auto', padding: '1rem', fontSize: '1.1rem' }}>
                ➕ Add Question to Video
              </button>
            </div>

            {/* Added Questions List */}
            {questions.length > 0 && (
              <div className="questions-list" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem', position: 'sticky', top: 0, background: '#f8fafc', paddingBottom: '10px', zIndex: 10 }}>📚 Added Questions ({questions.length})</h3>
                {questions.map((q, i) => (
                  <div key={i} className="q-item" style={{ 
                      background: '#ffffff', 
                      borderRadius: '12px', 
                      padding: '15px', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      border: '1px solid #e2e8f0',
                      animation: 'slideDown 0.3s ease-out'
                  }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#0f172a', lineHeight: '1.6', fontFamily: '"Mandali", sans-serif' }}>
                      <span style={{ color: '#3b82f6', marginRight: '5px' }}>{i+1}.</span> {q.questionText}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: '"Mandali", sans-serif' }}>
                      {['A', 'B', 'C', 'D'].map((optKey) => {
                        const isCorrect = q.correct === optKey;
                        const optText = optKey === 'A' ? q.optA : optKey === 'B' ? q.optB : optKey === 'C' ? q.optC : q.optD;
                        return (
                          <div key={optKey} style={{ 
                            background: isCorrect ? '#ecfdf5' : '#f8fafc', 
                            border: isCorrect ? '1px solid #10b981' : '1px solid #e2e8f0',
                            padding: '10px 15px', 
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            color: isCorrect ? '#047857' : '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: isCorrect ? 'bold' : 'normal',
                            transition: 'all 0.2s',
                            boxShadow: isCorrect ? '0 2px 5px rgba(16, 185, 129, 0.1)' : 'none'
                          }}>
                            <span style={{ width: '25px', display: 'inline-block', fontWeight: 'bold' }}>{optKey}.</span>
                            <span>{optText}</span>
                            {isCorrect && <span style={{ marginLeft: 'auto' }}>✅</span>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
                <style>{`
                  @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                  .questions-list::-webkit-scrollbar { width: 6px; }
                  .questions-list::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
                  .questions-list::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                  .questions-list::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
                `}</style>
              </div>
            )}
          </div>

          {/* Preview Area */}
          <div className="preview-area">
            <h3 style={{ margin: 0 }}>Live Video Canvas</h3>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '15px' }}>
              <button 
                onClick={() => setAspectRatio('9:16')}
                style={{ padding: '8px 15px', borderRadius: '20px', border: '2px solid #3b82f6', background: aspectRatio === '9:16' ? '#3b82f6' : 'white', color: aspectRatio === '9:16' ? 'white' : '#3b82f6', cursor: 'pointer', fontWeight: 'bold' }}>
                📱 9:16 (Shorts)
              </button>
              <button 
                onClick={() => setAspectRatio('16:9')}
                style={{ padding: '8px 15px', borderRadius: '20px', border: '2px solid #3b82f6', background: aspectRatio === '16:9' ? '#3b82f6' : 'white', color: aspectRatio === '16:9' ? 'white' : '#3b82f6', cursor: 'pointer', fontWeight: 'bold' }}>
                🖥️ 16:9 (YouTube)
              </button>
            </div>
            



            <div className="canvas-container" style={{ 
              width: aspectRatio === '9:16' ? '250px' : '444px', 
              height: aspectRatio === '9:16' ? '444px' : '250px',
              border: '4px solid #e2e8f0',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <canvas ref={canvasRef} 
                width={aspectRatio === '9:16' ? (resolution === '4k' ? 2160 : 1080) : (resolution === '4k' ? 3840 : 1920)} 
                height={aspectRatio === '9:16' ? (resolution === '4k' ? 3840 : 1920) : (resolution === '4k' ? 2160 : 1080)}
                style={{ width: '100%', height: '100%' }}>
              </canvas>
            </div>
            
            <div className="export-controls" style={{ marginTop: '15px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
              {!isRecording && !videoBlobUrl && (
                <button 
                  className="export-btn" 
                  onClick={() => setShowExportModal(true)}
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}
                >
                  🎥 Record Video
                </button>
              )}
              {isRecording && (
                <button 
                  className="export-btn" 
                  disabled
                  style={{ background: '#94a3b8', cursor: 'not-allowed' }}
                >
                  ⏺ {recordingProgress}
                </button>
              )}
              {videoBlobUrl && !isRecording && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="export-btn" 
                    onClick={() => {
                        const a = document.createElement('a');
                        a.href = videoBlobUrl;
                        a.download = `Quiz_Video_${resolution}.mp4`;
                        a.click();
                    }}
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', flex: 1 }}
                  >
                    💾 Download {resolution.toUpperCase()} Video
                  </button>
                  <button 
                    onClick={() => setVideoBlobUrl(null)}
                    style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '12px', padding: '0 20px', cursor: 'pointer', fontWeight: 'bold' }}
                    title="Delete and Record Again"
                  >
                    ✖
                  </button>
                </div>
              )}
              <p style={{fontSize: '0.8rem', color: '#64748b', textAlign: 'center', margin: 0}}>
                {videoBlobUrl ? "Your video is ready to download!" : "Click Record to start rendering."}
              </p>
            </div>
          </div>
        </section>
        ) : (
        <section className="themes-page" style={{ padding: '0 20px 20px', overflowY: 'auto', flex: 1 }}>
          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, #1e3a8a, #7c3aed)', 
            borderRadius: '20px', 
            padding: '30px', 
            marginBottom: '25px',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '900' }}>🎨 Theme Gallery</h2>
              <p style={{ margin: '6px 0 0', opacity: 0.85, fontSize: '1.05rem' }}>500 unique themes — Fire, Ocean, Forest, Royal & more!</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '16px', padding: '14px 22px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '900' }}>500</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Themes</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {['All', 'Fire', 'Ocean', 'Forest', 'Royal', 'Sunrise', 'Arctic', 'Candy', 'Lush', 'Twilight', 'Ember', 'Special', 'Dark Fire', 'Dark Ocean', 'Dark Forest', 'Dark Royal'].map(cat => (
              <button key={cat} onClick={() => setThemeFilter(cat)}
                style={{
                  padding: '8px 18px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem',
                  background: themeFilter === cat 
                    ? 'linear-gradient(135deg, #3b82f6, #7c3aed)' 
                    : '#f1f5f9',
                  color: themeFilter === cat ? '#fff' : '#475569',
                  boxShadow: themeFilter === cat ? '0 4px 15px rgba(59,130,246,0.4)' : 'none',
                  transition: 'all 0.2s'
                }}
              >{cat}</button>
            ))}
          </div>

          {/* Theme Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '16px' }}>
             {THEMES.filter(t => themeFilter === 'All' || t.name.startsWith(themeFilter)).map(theme => (
                 <div 
                   key={theme.id} 
                   onClick={() => { setSelectedTheme(theme); setActiveTab('dashboard'); }}
                   style={{ 
                       background: theme.bgCss, 
                       height: '160px', 
                       borderRadius: '18px', 
                       border: selectedTheme?.id === theme.id ? '4px solid #10b981' : '2px solid rgba(255,255,255,0.1)',
                       cursor: 'pointer',
                       boxShadow: selectedTheme?.id === theme.id 
                         ? '0 0 0 4px rgba(16,185,129,0.3), 0 15px 35px rgba(0,0,0,0.2)' 
                         : '0 6px 20px rgba(0,0,0,0.12)',
                       display: 'flex',
                       flexDirection: 'column',
                       justifyContent: 'flex-end',
                       padding: '12px',
                       position: 'relative',
                       overflow: 'hidden',
                       transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                       transform: selectedTheme?.id === theme.id ? 'scale(1.04)' : 'scale(1)'
                   }}>
                   {/* Selected checkmark */}
                   {selectedTheme?.id === theme.id && (
                     <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#10b981', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>✓</span>
                   )}
                   {/* Style badge */}
                   <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', borderRadius: '12px', padding: '3px 8px', fontSize: '0.72rem', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                     {theme.style}
                   </span>
                   {/* Dark/light overlay for name readability */}
                   <div style={{ background: theme.isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)', backdropFilter: 'blur(2px)', borderRadius: '10px', padding: '8px 10px' }}>
                     <span style={{ color: theme.textColor, fontSize: '0.88rem', fontWeight: 'bold', display: 'block', textShadow: theme.isDark ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)' }}>{theme.name}</span>
                     <span style={{ color: theme.textColor, opacity: 0.8, fontSize: '0.75rem', marginTop: '2px', display: 'block' }}>{theme.isDark ? '🌙 Dark' : '☀️ Light'}</span>
                   </div>
                 </div>
             ))}
          </div>
        </section>
        )}
      </main>

      {/* AI Modal */}
      {showAiModal && (
        <div className="modal" style={{ alignItems: 'center', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-content" style={{ 
            width: '800px', 
            maxWidth: '95%', 
            maxHeight: '90vh', 
            overflowY: 'auto',
            background: '#ffffff',
            borderRadius: '24px',
            padding: '35px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ margin: 0, fontSize: '1.8rem', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ✨ Magic AI Generator
              </h3>
              <button onClick={() => setShowAiModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}>✖</button>
            </div>
            
            <p style={{ color: '#64748b', marginBottom: '12px', fontWeight: '500' }}>Select your content source:</p>
            
            {/* Premium Segmented Control */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '25px', background: '#f1f5f9', padding: '6px', borderRadius: '14px' }}>
              {['topic', 'text', 'file'].map(type => (
                <button
                  key={type}
                  onClick={() => setAiSourceType(type)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1.05rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    background: aiSourceType === type ? '#ffffff' : 'transparent',
                    color: aiSourceType === type ? '#3b82f6' : '#64748b',
                    boxShadow: aiSourceType === type ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {type === 'topic' ? '💡 Simple Topic' : type === 'text' ? '📝 Paste Notes' : '📄 Upload PDF'}
                </button>
              ))}
            </div>

            {/* Dynamic Content Area */}
            <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '16px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
              {aiSourceType === 'topic' && (
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '1.05rem', color: '#1e293b', fontWeight: 'bold' }}>What is the topic?</label>
                  <input type="text" value={aiTopic} onChange={(e) => setAiTopic(e.target.value)} placeholder="E.g., Solar System, Indian History, Sci-Fi Movies..." style={{ padding: '15px', fontSize: '1.1rem', borderRadius: '10px', marginTop: '12px', border: '2px solid #cbd5e1' }} />
                </div>
              )}

              {aiSourceType === 'text' && (
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '1.05rem', color: '#1e293b', fontWeight: 'bold' }}>Paste your article or notes</label>
                  <textarea 
                    value={aiSourceText} onChange={(e) => setAiSourceText(e.target.value)} 
                    placeholder="Paste a Wikipedia article, news, or your own study notes here. The AI will read it and create a quiz..." 
                    style={{ minHeight: '160px', resize: 'vertical', padding: '15px', fontSize: '1rem', borderRadius: '10px', marginTop: '12px', lineHeight: '1.6', border: '2px solid #cbd5e1' }} />
                </div>
              )}

              {aiSourceType === 'file' && (
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '1.05rem', color: '#1e293b', fontWeight: 'bold' }}>Upload Document (PDF or TXT)</label>
                  <input 
                    type="file" 
                    accept=".pdf,.txt"
                    onChange={(e) => setAiFile(e.target.files[0])} 
                    style={{ padding: '20px', border: '2px dashed #94a3b8', background: '#ffffff', width: '100%', borderRadius: '10px', marginTop: '12px', cursor: 'pointer', fontSize: '1rem' }} />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
              <div className="form-group" style={{ flex: 2 }}>
                <label style={{ fontWeight: 'bold', color: '#475569' }}>Custom Instructions (Optional)</label>
                <input 
                  type="text" 
                  value={aiInstructions}
                  onChange={(e) => setAiInstructions(e.target.value)}
                  placeholder="E.g., Make questions very hard, focus on dates..." 
                  style={{ padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ fontWeight: 'bold', color: '#475569' }}>Questions Count</label>
                <input 
                  type="number" 
                  value={aiCount}
                  onChange={(e) => setAiCount(Number(e.target.value))}
                  min="1" max="50" 
                  style={{ padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}
                />
              </div>
            </div>

            <button 
              className="ai-btn" 
              onClick={handleGenerateAI}
              disabled={isGenerating}
              style={{ 
                width: '100%', 
                padding: '18px', 
                fontSize: '1.25rem', 
                fontWeight: 'bold',
                borderRadius: '14px',
                marginTop: '15px',
                background: isGenerating ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                boxShadow: isGenerating ? 'none' : '0 10px 20px -5px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s ease',
                color: '#fff',
                border: 'none',
                cursor: isGenerating ? 'not-allowed' : 'pointer'
              }}>
              {isGenerating ? '⏳ Generating your Quiz...' : '✨ Generate Awesome Quiz'}
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>⚙️ API Settings</h3>
            <div className="form-group">
              <label>Gemini API Key</label>
              <input 
                type="password" 
                value={apiKey} 
                onChange={(e) => saveApiKey(e.target.value)} 
                placeholder="Paste your Gemini API Key here..." 
                style={{ border: apiKey ? '2px solid #10b981' : '2px solid #f43f5e' }}
              />
              <p style={{fontSize:'0.85rem', color:'#64748b', marginTop:'8px', lineHeight: '1.4'}}>
                This key is saved securely in your browser's local storage. It is required to power the <b>Magic AI Generator</b> and the <b>Smart Auto-Align</b> features.
              </p>
            </div>
            <button 
              className="ai-btn" 
              onClick={() => setShowSettingsModal(false)} 
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', background: '#10b981' }}>
              Save & Close
            </button>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="modal" style={{ alignItems: 'center', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-content" style={{ width: '450px', maxWidth: '90%', background: '#ffffff', borderRadius: '24px', padding: '30px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', color: '#1e293b' }}>Select Video Quality</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button 
                onClick={() => { setResolution('1080p'); setShowExportModal(false); setTimeout(() => handleRecord('1080p'), 500); }}
                style={{ padding: '15px', borderRadius: '12px', border: '2px solid #10b981', background: '#ecfdf5', color: '#047857', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                HD 1080p (Standard)
              </button>
              <button 
                onClick={() => { setResolution('4k'); setShowExportModal(false); setTimeout(() => handleRecord('4k'), 500); }}
                style={{ padding: '15px', borderRadius: '12px', border: '2px solid #8b5cf6', background: '#f5f3ff', color: '#6d28d9', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Ultra 4K (High Quality)
              </button>
            </div>
            <button onClick={() => setShowExportModal(false)} style={{ marginTop: '20px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
