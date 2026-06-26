"use client";
import { useEffect, useRef } from "react";

const CSS = `
  :root {
    --bg: #04050b;
    --bg-2: #080a16;
    --surface: #0b0e1d;
    --surface-2: #10142a;
    --line: rgba(255,255,255,0.07);
    --line-2: rgba(255,255,255,0.13);
    --ink: #f5f6fc;
    --mut: #99a1c2;
    --mut-2: #5e6788;
    --indigo: #7c5cff;
    --violet: #b14dff;
    --cyan: #1fd5f0;
    --pink: #ff4d9d;
    --emerald: #2ee6a8;
    --grad: linear-gradient(110deg, #7c5cff 0%, #b14dff 45%, #1fd5f0 100%);
    --grad-2: linear-gradient(120deg, #ff4d9d, #b14dff, #7c5cff);
    --display: 'Clash Display', 'Space Grotesk', sans-serif;
    --body: 'General Sans', 'Inter', system-ui, sans-serif;
    --maxw: 1240px;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }
  .m2 * { margin: 0; padding: 0; box-sizing: border-box; }
  .m2 { font-family: var(--body); background: var(--bg); color: var(--ink); line-height: 1.6; overflow-x: hidden; -webkit-font-smoothing: antialiased; min-height: 100vh; }
  .m2.custom-cursor, .m2.custom-cursor * { cursor: none; }
  .m2 h1, .m2 h2, .m2 h3, .m2 h4, .m2 .display { font-family: var(--display); font-weight: 600; letter-spacing: -0.02em; line-height: 1.04; }
  .m2 a { color: inherit; text-decoration: none; }
  .m2 img { max-width: 100%; display: block; }
  .m2 ::selection { background: rgba(124,92,255,0.4); color: #fff; }
  .m2 .wrap { max-width: var(--maxw); margin: 0 auto; padding: 0 28px; }
  .m2 .grad-text { background: var(--grad); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }

  /* PRELOADER */
  .m2 #preloader { position: fixed; inset: 0; z-index: 9999; background: var(--bg); display: grid; place-items: center; transition: opacity 0.6s ease, visibility 0.6s ease; }
  .m2 #preloader.done { opacity: 0; visibility: hidden; pointer-events: none; }
  .m2 .pre-inner { text-align: center; width: 240px; }
  .m2 .pre-mark { width: 72px; height: 72px; margin: 0 auto 26px; border-radius: 20px; background: var(--grad); display: grid; place-items: center; font-family: var(--display); font-weight: 700; font-size: 28px; color: #fff; box-shadow: 0 20px 60px -15px rgba(124,92,255,0.9); animation: m2-preFloat 2s var(--ease) infinite; }
  @keyframes m2-preFloat { 0%,100%{ transform: translateY(0) rotate(0); } 50%{ transform: translateY(-10px) rotate(4deg); } }
  .m2 .pre-bar { height: 3px; border-radius: 3px; background: rgba(255,255,255,0.08); overflow: hidden; }
  .m2 .pre-bar i { display: block; height: 100%; width: 0; background: var(--grad); border-radius: 3px; transition: width 0.3s ease; }
  .m2 .pre-pct { margin-top: 14px; font-size: 13px; color: var(--mut-2); font-variant-numeric: tabular-nums; letter-spacing: 0.1em; }

  /* CURSOR */
  .m2 .cursor-dot, .m2 .cursor-ring { position: fixed; top: 0; left: 0; z-index: 9998; pointer-events: none; border-radius: 50%; mix-blend-mode: difference; will-change: transform; }
  .m2 .cursor-dot { width: 7px; height: 7px; background: #fff; transform: translate(-50%, -50%); }
  .m2 .cursor-ring { width: 38px; height: 38px; border: 1.5px solid #fff; transform: translate(-50%, -50%); transition: width 0.25s, height 0.25s, background 0.25s, opacity 0.25s; }
  .m2 .cursor-ring.hover { width: 64px; height: 64px; background: rgba(255,255,255,0.12); border-color: transparent; }

  /* PROGRESS */
  .m2 #progress { position: fixed; top: 0; left: 0; height: 3px; width: 0; z-index: 200; background: var(--grad); box-shadow: 0 0 14px rgba(124,92,255,0.8); }

  /* GRAIN + AURORA */
  .m2 .grain { position: fixed; inset: -50%; z-index: 1; pointer-events: none; opacity: 0.045; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    animation: m2-grainShift 8s steps(6) infinite; }
  @keyframes m2-grainShift { 0%{transform:translate(0,0)} 100%{transform:translate(-8%,6%)} }
  .m2 .aurora { position: fixed; border-radius: 50%; filter: blur(130px); z-index: 0; pointer-events: none; opacity: 0.55; will-change: transform; }
  .m2 .au-1 { top: -240px; left: -160px; width: 620px; height: 620px; background: radial-gradient(circle, rgba(124,92,255,0.7), transparent 68%); }
  .m2 .au-2 { top: 380px; right: -260px; width: 700px; height: 700px; background: radial-gradient(circle, rgba(31,213,240,0.42), transparent 68%); }
  .m2 .au-3 { top: 1700px; left: -180px; width: 640px; height: 640px; background: radial-gradient(circle, rgba(177,77,255,0.5), transparent 68%); }
  .m2 .au-4 { top: 3000px; right: -160px; width: 560px; height: 560px; background: radial-gradient(circle, rgba(255,77,157,0.34), transparent 68%); }
  .m2 main, .m2 header, .m2 footer { position: relative; z-index: 2; }

  /* NAV */
  .m2 header { position: fixed; top: 0; left: 0; right: 0; z-index: 150; transition: transform 0.4s var(--ease); }
  .m2 header.hide { transform: translateY(-130%); }
  .m2 nav { display: flex; align-items: center; justify-content: space-between; max-width: var(--maxw); margin: 18px auto; padding: 13px 16px 13px 22px;
    border: 1px solid var(--line); border-radius: 100px; background: rgba(8,10,22,0.55); backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%); transition: all 0.4s var(--ease); }
  .m2 header.scrolled nav { background: rgba(6,8,18,0.86); border-color: var(--line-2); box-shadow: 0 24px 70px -28px rgba(0,0,0,0.9); }
  .m2 .logo { display: flex; align-items: center; gap: 12px; }
  .m2 .logo-mark { width: 40px; height: 40px; border-radius: 12px; background: var(--grad); display: grid; place-items: center; font-family: var(--display); font-weight: 700; font-size: 16px; color: #fff; box-shadow: 0 10px 28px -8px rgba(124,92,255,0.85); position: relative; overflow: hidden; }
  .m2 .logo-mark::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%); transform: translateX(-120%); animation: m2-shine 4s ease-in-out infinite; }
  @keyframes m2-shine { 0%,60%{ transform: translateX(-120%);} 80%,100%{ transform: translateX(120%);} }
  .m2 .logo-text { font-family: var(--display); font-weight: 600; font-size: 19px; }
  .m2 .logo-text span { color: var(--cyan); }
  .m2 .nav-links { display: flex; align-items: center; gap: 4px; }
  .m2 .nav-links > a { font-size: 14px; font-weight: 500; color: var(--mut); padding: 9px 15px; border-radius: 100px; transition: all 0.2s; }
  .m2 .nav-links > a:hover { color: var(--ink); background: rgba(255,255,255,0.06); }
  .m2 .nav-cta { display: flex; align-items: center; gap: 10px; }
  .m2 .btn { font-family: var(--body); font-weight: 600; font-size: 14px; padding: 12px 22px; border-radius: 100px; cursor: pointer; border: 1px solid transparent; transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), background 0.3s; display: inline-flex; align-items: center; gap: 9px; white-space: nowrap; position: relative; }
  .m2 .btn-ghost { color: var(--ink); border-color: var(--line-2); background: rgba(255,255,255,0.03); }
  .m2 .btn-ghost:hover { background: rgba(255,255,255,0.09); }
  .m2 .btn-primary { color: #fff; background: var(--grad); box-shadow: 0 12px 34px -12px rgba(124,92,255,0.85); background-size: 160% 160%; animation: m2-gradMove 6s ease infinite; }
  @keyframes m2-gradMove { 0%,100%{ background-position: 0% 50%;} 50%{ background-position: 100% 50%;} }
  .m2 .btn-primary:hover { box-shadow: 0 18px 46px -12px rgba(124,92,255,1); }
  .m2 .btn-lg { padding: 16px 30px; font-size: 15px; }
  .m2 .magnetic { will-change: transform; }
  .m2 .menu-toggle { display: none; background: none; border: none; color: var(--ink); cursor: pointer; padding: 6px; }
  .m2 .menu-toggle .ic-close { display: none; }
  .m2 nav.open .menu-toggle .ic-open { display: none; }
  .m2 nav.open .menu-toggle .ic-close { display: block; }
  .m2 .nav-links-cta { display: none; }

  /* HERO */
  .m2 .hero { position: relative; padding: 210px 0 120px; overflow: hidden; }
  .m2 #neural { position: absolute; inset: 0; z-index: 0; opacity: 0.9; }
  .m2 .hero .wrap { position: relative; z-index: 2; }
  .m2 .hero-grid { display: grid; grid-template-columns: 1.08fr 0.92fr; gap: 56px; align-items: center; }
  .m2 .badge { display: inline-flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--ink); padding: 8px 16px; border: 1px solid var(--line-2); border-radius: 100px; background: linear-gradient(120deg, rgba(124,92,255,0.16), rgba(31,213,240,0.12)); margin-bottom: 28px; }
  .m2 .badge .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--emerald); box-shadow: 0 0 12px var(--emerald); animation: m2-blink 1.6s infinite; }
  @keyframes m2-blink { 0%,100%{ opacity: 1;} 50%{ opacity: 0.35;} }
  .m2 .hero h1 { font-size: clamp(44px, 6vw, 80px); font-weight: 600; margin-bottom: 26px; }
  .m2 .hero h1 .kinetic { background: linear-gradient(110deg, #7c5cff, #b14dff, #1fd5f0, #7c5cff); background-size: 250% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: m2-flow 6s linear infinite; }
  @keyframes m2-flow { to { background-position: 250% center; } }
  .m2 .hero .lead { font-size: clamp(17px, 1.4vw, 20px); color: var(--mut); max-width: 540px; margin-bottom: 38px; }
  .m2 .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 42px; }
  .m2 .mini-stats { display: flex; gap: 34px; flex-wrap: wrap; }
  .m2 .mini-stat .v { font-family: var(--display); font-weight: 600; font-size: 30px; line-height: 1; }
  .m2 .mini-stat .l { font-size: 13px; color: var(--mut-2); margin-top: 6px; }
  .m2 .hero-visual { perspective: 1400px; }
  .m2 .dashboard { position: relative; background: linear-gradient(165deg, rgba(16,20,42,0.95), rgba(8,10,22,0.95)); border: 1px solid var(--line-2); border-radius: 26px; padding: 22px; box-shadow: 0 50px 110px -40px rgba(0,0,0,0.95); transform-style: preserve-3d; will-change: transform; }
  .m2 .dash-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .m2 .dash-title { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
  .m2 .live { font-size: 11px; color: var(--emerald); display: flex; align-items: center; gap: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
  .m2 .live .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--emerald); animation: m2-blink 1.4s infinite; }
  .m2 .dash-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .m2 .dcard { background: rgba(16,20,42,0.8); border: 1px solid var(--line); border-radius: 15px; padding: 16px; }
  .m2 .dcard .lab { font-size: 12px; color: var(--mut-2); display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .m2 .dcard .num { font-family: var(--display); font-size: 27px; font-weight: 600; }
  .m2 .dcard .delta { font-size: 11.5px; color: var(--emerald); font-weight: 600; margin-top: 3px; }
  .m2 .ic { width: 26px; height: 26px; border-radius: 8px; display: grid; place-items: center; flex-shrink: 0; }
  .m2 .ic-1 { background: rgba(124,92,255,0.18); color: var(--indigo); }
  .m2 .ic-2 { background: rgba(31,213,240,0.18); color: var(--cyan); }
  .m2 .ic-3 { background: rgba(46,230,168,0.18); color: var(--emerald); }
  .m2 .ic-4 { background: rgba(255,77,157,0.18); color: var(--pink); }
  .m2 .dash-chart { background: rgba(16,20,42,0.8); border: 1px solid var(--line); border-radius: 15px; padding: 16px; }
  .m2 .chart-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; font-size: 12.5px; color: var(--mut); }
  .m2 .bars { display: flex; align-items: flex-end; gap: 9px; height: 76px; }
  .m2 .bar { flex: 1; border-radius: 5px 5px 0 0; background: var(--grad); opacity: 0.9; transform-origin: bottom; }
  .m2 .float { position: absolute; background: rgba(11,14,29,0.94); backdrop-filter: blur(14px); border: 1px solid var(--line-2); border-radius: 15px; padding: 13px 17px; box-shadow: 0 30px 60px -25px rgba(0,0,0,0.9); display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 600; will-change: transform; }
  .m2 .float .av { width: 32px; height: 32px; border-radius: 9px; background: var(--grad); display: grid; place-items: center; color: #fff; }
  .m2 .float-1 { bottom: -26px; left: -40px; }
  .m2 .float-2 { top: -24px; right: -28px; }
  .m2 .scroll-cue { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--mut-2); }
  .m2 .scroll-cue .mouse { width: 24px; height: 38px; border: 1.5px solid var(--line-2); border-radius: 14px; position: relative; }
  .m2 .scroll-cue .mouse::after { content: ''; position: absolute; top: 7px; left: 50%; transform: translateX(-50%); width: 4px; height: 7px; border-radius: 4px; background: var(--ink); animation: m2-wheel 1.8s var(--ease) infinite; }
  @keyframes m2-wheel { 0%{ opacity: 0; transform: translate(-50%,0);} 40%{ opacity: 1;} 80%,100%{ opacity: 0; transform: translate(-50%,12px);} }

  /* MARQUEE */
  .m2 .marquee { position: relative; padding: 26px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); overflow: hidden; background: rgba(8,10,22,0.5); }
  .m2 .marquee-track { display: flex; gap: 56px; width: max-content; animation: m2-scrollX 28s linear infinite; }
  .m2 .marquee:hover .marquee-track { animation-play-state: paused; }
  @keyframes m2-scrollX { to { transform: translateX(-50%); } }
  .m2 .marquee-item { display: flex; align-items: center; gap: 14px; font-family: var(--display); font-weight: 500; font-size: 22px; color: var(--mut); white-space: nowrap; }
  .m2 .marquee-item .star { color: var(--indigo); }

  /* SECTIONS */
  .m2 .section { padding: 120px 0; position: relative; }
  .m2 .eyebrow { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.16em; background: var(--grad); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; display: inline-flex; align-items: center; gap: 10px; margin-bottom: 18px; }
  .m2 .eyebrow::before { content: ''; width: 30px; height: 1px; background: var(--indigo); }
  .m2 .sec-head { max-width: 720px; margin: 0 auto 70px; text-align: center; }
  .m2 .sec-head .eyebrow { justify-content: center; }
  .m2 .sec-head h2 { font-size: clamp(34px, 4.6vw, 56px); margin-bottom: 18px; }
  .m2 .sec-head p { font-size: 18px; color: var(--mut); }

  /* PROBLEM CARDS */
  .m2 .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .m2 .tilt { transform-style: preserve-3d; will-change: transform; }
  .m2 .card { background: linear-gradient(165deg, rgba(11,14,29,0.9), rgba(8,10,22,0.9)); border: 1px solid var(--line); border-radius: 22px; padding: 32px; transition: border-color 0.3s, box-shadow 0.3s; position: relative; overflow: hidden; }
  .m2 .card::before { content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.4s; background: radial-gradient(400px circle at var(--mx,50%) var(--my,0%), rgba(124,92,255,0.14), transparent 70%); pointer-events: none; }
  .m2 .card:hover::before { opacity: 1; }
  .m2 .card:hover { border-color: var(--line-2); }
  .m2 .card .cic { width: 54px; height: 54px; border-radius: 15px; display: grid; place-items: center; margin-bottom: 20px; background: linear-gradient(135deg, rgba(124,92,255,0.16), rgba(31,213,240,0.12)); border: 1px solid var(--line-2); }
  .m2 .card h3 { font-size: 20px; margin-bottom: 10px; }
  .m2 .card p { font-size: 15px; color: var(--mut); }
  .m2 .problem .card .cic { color: #ff6b6b; background: rgba(255,107,107,0.12); border-color: rgba(255,107,107,0.24); }
  .m2 .card .idx { position: absolute; top: 26px; right: 30px; font-family: var(--display); font-size: 14px; color: var(--mut-2); }

  /* MANIFESTO */
  .m2 .manifesto { text-align: center; max-width: 1000px; margin: 0 auto; }
  .m2 .manifesto .q { font-family: var(--display); font-size: clamp(30px, 4.4vw, 58px); font-weight: 500; line-height: 1.18; }
  .m2 .manifesto .word { display: inline-block; opacity: 0.12; transform: translateY(8px); transition: opacity 0.5s var(--ease), transform 0.5s var(--ease); }
  .m2 .manifesto.in .word { opacity: 1; transform: none; }
  .m2 .manifesto .sub { margin-top: 32px; color: var(--mut); font-size: 18px; max-width: 600px; margin-left: auto; margin-right: auto; }

  /* BENTO */
  .m2 .bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 215px; gap: 20px; }
  .m2 .bento .b { background: linear-gradient(165deg, rgba(11,14,29,0.92), rgba(8,10,22,0.92)); border: 1px solid var(--line); border-radius: 24px; padding: 30px; position: relative; overflow: hidden; transition: border-color 0.3s, transform 0.4s var(--ease); display: flex; flex-direction: column; justify-content: flex-end; }
  .m2 .bento .b:hover { border-color: var(--line-2); transform: translateY(-4px); }
  .m2 .bento .b .glow { position: absolute; width: 220px; height: 220px; border-radius: 50%; filter: blur(70px); opacity: 0.5; top: -60px; right: -60px; z-index: 0; }
  .m2 .bento .b > * { position: relative; z-index: 1; }
  .m2 .b-ai { grid-column: span 2; grid-row: span 2; }
  .m2 .b-web { grid-column: span 2; }
  .m2 .b-rdv { grid-column: span 1; }
  .m2 .b-google { grid-column: span 1; }
  .m2 .b-form { grid-column: span 2; }
  .m2 .b .bic { width: 50px; height: 50px; border-radius: 14px; display: grid; place-items: center; margin-bottom: auto; background: rgba(124,92,255,0.14); border: 1px solid var(--line-2); color: var(--cyan); }
  .m2 .b h3 { font-size: 21px; margin: 22px 0 8px; }
  .m2 .b-ai h3 { font-size: 30px; }
  .m2 .b p { font-size: 14.5px; color: var(--mut); }
  .m2 .b .tag { position: absolute; top: 26px; right: 26px; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 100px; background: rgba(177,77,255,0.16); color: #d8a9ff; z-index: 2; }
  .m2 .ai-orb { position: absolute; top: 26px; right: 28px; width: 86px; height: 86px; border-radius: 50%; background: var(--grad); filter: blur(2px); opacity: 0.9; animation: m2-orb 5s ease-in-out infinite; box-shadow: 0 0 60px rgba(124,92,255,0.7); }
  @keyframes m2-orb { 0%,100%{ transform: scale(1) translateY(0);} 50%{ transform: scale(1.12) translateY(-10px);} }
  .m2 .ai-bubbles { display: flex; flex-direction: column; gap: 8px; margin: 20px 0 0; max-width: 300px; }
  .m2 .bub { font-size: 13px; padding: 9px 14px; border-radius: 14px; width: fit-content; opacity: 0; transform: translateY(8px); }
  .m2 .bub.u { background: rgba(124,92,255,0.18); border: 1px solid var(--line-2); align-self: flex-end; border-bottom-right-radius: 4px; }
  .m2 .bub.a { background: rgba(255,255,255,0.05); border: 1px solid var(--line); border-bottom-left-radius: 4px; }
  .m2 .bento.in .bub { animation: m2-bubIn 0.5s var(--ease) forwards; }
  .m2 .bento.in .bub:nth-child(1){ animation-delay: 0.2s; }
  .m2 .bento.in .bub:nth-child(2){ animation-delay: 0.7s; }
  .m2 .bento.in .bub:nth-child(3){ animation-delay: 1.2s; }
  @keyframes m2-bubIn { to { opacity: 1; transform: none; } }

  /* SPLIT */
  .m2 .split { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 70px; align-items: center; }
  .m2 .feat { display: flex; gap: 18px; margin-bottom: 30px; }
  .m2 .feat .n { width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0; background: var(--grad); display: grid; place-items: center; font-family: var(--display); font-weight: 700; color: #fff; font-size: 17px; box-shadow: 0 12px 30px -10px rgba(124,92,255,0.7); }
  .m2 .feat h4 { font-size: 19px; margin-bottom: 6px; }
  .m2 .feat p { font-size: 15px; color: var(--mut); }
  .m2 .visual-frame { position: relative; border-radius: 26px; overflow: hidden; border: 1px solid var(--line-2); box-shadow: 0 50px 100px -40px rgba(0,0,0,0.9); aspect-ratio: 4/5; background: linear-gradient(135deg, #1a1340, #0a1430); display: flex; align-items: flex-end; }
  .m2 .visual-frame .ov { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(4,5,11,0.85)); }
  .m2 .visual-frame .stat-chip { position: absolute; left: 24px; bottom: 24px; right: 24px; display: flex; gap: 14px; }
  .m2 .visual-frame .chip { flex: 1; background: rgba(11,14,29,0.8); backdrop-filter: blur(12px); border: 1px solid var(--line-2); border-radius: 16px; padding: 16px; }
  .m2 .visual-frame .chip .v { font-family: var(--display); font-weight: 600; font-size: 26px; }
  .m2 .visual-frame .chip .l { font-size: 12px; color: var(--mut); margin-top: 2px; }

  /* PROCESS */
  .m2 .process { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; align-items: start; }
  .m2 .process-sticky { position: sticky; top: 130px; }
  .m2 .steps { display: flex; flex-direction: column; gap: 18px; }
  .m2 .step { display: flex; gap: 22px; padding: 28px; border: 1px solid var(--line); border-radius: 22px; background: rgba(11,14,29,0.6); transition: border-color 0.3s, background 0.3s; }
  .m2 .step:hover { border-color: var(--line-2); background: rgba(16,20,42,0.7); }
  .m2 .step .sn { font-family: var(--display); font-size: 40px; font-weight: 600; line-height: 1; background: var(--grad); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; flex-shrink: 0; width: 64px; }
  .m2 .step h4 { font-size: 21px; margin-bottom: 8px; }
  .m2 .step p { font-size: 15px; color: var(--mut); }

  /* TESTIMONIALS */
  .m2 .tgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .m2 .tcard { background: linear-gradient(165deg, rgba(11,14,29,0.92), rgba(8,10,22,0.92)); border: 1px solid var(--line); border-radius: 24px; padding: 32px; transition: border-color 0.3s, transform 0.4s var(--ease); }
  .m2 .tcard:hover { border-color: var(--line-2); transform: translateY(-4px); }
  .m2 .stars { display: flex; gap: 3px; margin-bottom: 18px; color: var(--violet); }
  .m2 .tcard .quote { font-size: 16px; color: var(--ink); line-height: 1.6; margin-bottom: 26px; }
  .m2 .tperson { display: flex; align-items: center; gap: 14px; }
  .m2 .tav { width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center; font-family: var(--display); font-weight: 600; font-size: 17px; color: #fff; flex-shrink: 0; border: 1px solid var(--line-2); }
  .m2 .tav-1 { background: linear-gradient(135deg, #7c5cff, #b14dff); }
  .m2 .tav-2 { background: linear-gradient(135deg, #b14dff, #ff4d9d); }
  .m2 .tav-3 { background: linear-gradient(135deg, #1fd5f0, #7c5cff); }
  .m2 .tperson .nm { font-weight: 600; font-size: 15px; }
  .m2 .tperson .rl { font-size: 13px; color: var(--mut-2); }

  /* AUDIENCE */
  .m2 .aud-rows { display: flex; flex-direction: column; gap: 16px; }
  .m2 .aud-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
  .m2 .aud-track { display: flex; gap: 14px; width: max-content; }
  .m2 .aud-track.l { animation: m2-scrollX 32s linear infinite; }
  .m2 .aud-track.r { animation: m2-scrollXr 32s linear infinite; }
  @keyframes m2-scrollXr { from { transform: translateX(-50%);} to { transform: translateX(0);} }
  .m2 .pill { padding: 15px 26px; border: 1px solid var(--line); border-radius: 100px; background: rgba(11,14,29,0.7); font-size: 15.5px; font-weight: 500; color: var(--mut); display: flex; align-items: center; gap: 11px; white-space: nowrap; transition: all 0.25s; }
  .m2 .pill:hover { color: var(--ink); border-color: var(--indigo); }
  .m2 .pill .e { font-size: 18px; }

  /* PRICING */
  .m2 .pcat { margin-top: 56px; }
  .m2 .pcat-head { display: flex; align-items: center; gap: 18px; margin-bottom: 26px; }
  .m2 .pcat-tag { font-family: var(--display); font-weight: 600; font-size: 22px; white-space: nowrap; }
  .m2 .pcat-line { flex: 1; height: 1px; background: linear-gradient(90deg, var(--line-2), transparent); }
  .m2 .pgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; align-items: stretch; }
  .m2 .pgrid-2 { grid-template-columns: repeat(2, 1fr); max-width: 820px; }
  .m2 .pcard { background: linear-gradient(165deg, rgba(11,14,29,0.92), rgba(8,10,22,0.92)); border: 1px solid var(--line); border-radius: 26px; padding: 34px 30px; display: flex; flex-direction: column; position: relative; transition: transform 0.4s var(--ease), border-color 0.3s; }
  .m2 .pcard:hover { transform: translateY(-6px); border-color: var(--line-2); }
  .m2 .pcard.feat { border-color: rgba(124,92,255,0.6); background: linear-gradient(170deg, rgba(124,92,255,0.16), rgba(8,10,22,0.95)); box-shadow: 0 40px 90px -40px rgba(124,92,255,0.6); }
  .m2 .pcard.feat::before { content: 'Le plus choisi'; position: absolute; top: 0; left: 50%; transform: translate(-50%,-50%); font-size: 11.5px; font-weight: 700; color: #fff; background: var(--grad); padding: 7px 18px; border-radius: 100px; box-shadow: 0 10px 24px -8px rgba(124,92,255,0.9); white-space: nowrap; }
  .m2 .pname { font-family: var(--display); font-size: 19px; font-weight: 600; margin-bottom: 14px; }
  .m2 .pval { font-family: var(--display); font-weight: 600; font-size: 42px; line-height: 1; }
  .m2 .pval small { font-size: 14px; color: var(--mut-2); font-weight: 500; }
  .m2 .psetup { font-size: 13px; color: var(--mut-2); margin-top: 8px; }
  .m2 .pdesc { font-size: 14px; color: var(--mut); margin: 16px 0 22px; min-height: 40px; }
  .m2 .pcard ul { list-style: none; margin-bottom: 28px; flex: 1; }
  .m2 .pcard ul li { font-size: 14px; color: var(--mut); display: flex; align-items: flex-start; gap: 11px; padding: 7px 0; }
  .m2 .pcard ul li::before { content: '✓'; color: var(--emerald); font-weight: 700; flex-shrink: 0; line-height: 1.5; }
  .m2 .psur { margin-top: 40px; display: flex; align-items: center; justify-content: space-between; gap: 28px; flex-wrap: wrap; padding: 32px 38px; border: 1px solid var(--line-2); border-radius: 26px; background: linear-gradient(120deg, rgba(124,92,255,0.1), rgba(31,213,240,0.06)); }
  .m2 .trust-row { display: flex; gap: 26px; flex-wrap: wrap; }
  .m2 .trust-row span { display: inline-flex; align-items: center; gap: 9px; font-size: 14px; color: var(--mut); }
  .m2 .trust-row svg { color: var(--emerald); flex-shrink: 0; }
  .m2 .diff-card { height: 100%; }
  .m2 .diff-card .n { width: 48px; height: 48px; border-radius: 14px; background: var(--grad); display: grid; place-items: center; font-family: var(--display); font-weight: 700; color: #fff; font-size: 17px; box-shadow: 0 12px 30px -10px rgba(124,92,255,0.7); margin-bottom: 20px; }
  .m2 .diff-card h3 { font-size: 20px; margin-bottom: 10px; }
  .m2 .diff-card p { font-size: 15px; color: var(--mut); }

  /* FINAL CTA */
  .m2 .final { position: relative; border-radius: 36px; padding: 90px 50px; text-align: center; overflow: hidden; border: 1px solid var(--line-2); background: linear-gradient(135deg, rgba(124,92,255,0.22), rgba(31,213,240,0.12)); }
  .m2 .final::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(177,77,255,0.4), transparent 60%); }
  .m2 .final > * { position: relative; z-index: 1; }
  .m2 .final h2 { font-size: clamp(36px, 5.4vw, 68px); margin-bottom: 20px; }
  .m2 .final p { font-size: 19px; color: var(--mut); max-width: 560px; margin: 0 auto 36px; }

  /* FOOTER */
  .m2 footer { border-top: 1px solid var(--line); padding: 80px 0 40px; margin-top: 130px; position: relative; }
  .m2 .foot-cta-word { font-family: var(--display); font-weight: 600; font-size: clamp(60px, 13vw, 200px); text-align: center; line-height: 0.9; letter-spacing: -0.03em; background: linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 70px; user-select: none; }
  .m2 .foot-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 44px; margin-bottom: 50px; }
  .m2 .foot-grid h5 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--mut-2); margin-bottom: 20px; font-weight: 600; }
  .m2 .foot-grid a { display: block; font-size: 14.5px; color: var(--mut); padding: 7px 0; transition: color 0.2s; }
  .m2 .foot-grid a:hover { color: var(--ink); }
  .m2 .foot-about p { font-size: 14.5px; color: var(--mut); margin: 18px 0 20px; max-width: 300px; }
  .m2 .socials { display: flex; gap: 11px; }
  .m2 .socials a { width: 40px; height: 40px; border-radius: 11px; border: 1px solid var(--line); display: grid; place-items: center; color: var(--mut); transition: all 0.25s; }
  .m2 .socials a:hover { color: var(--ink); border-color: var(--indigo); background: rgba(124,92,255,0.1); }
  .m2 .foot-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 30px; border-top: 1px solid var(--line); font-size: 13.5px; color: var(--mut-2); flex-wrap: wrap; gap: 14px; }

  /* REVEAL */
  .m2 .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
  .m2 .reveal.in { opacity: 1; transform: none; }
  .m2 .reveal[data-d="1"]{ transition-delay: 0.1s; } .m2 .reveal[data-d="2"]{ transition-delay: 0.2s; } .m2 .reveal[data-d="3"]{ transition-delay: 0.3s; }

  /* RESPONSIVE */
  @media (max-width: 1040px) {
    .m2 .hero-grid, .m2 .split { grid-template-columns: 1fr; gap: 50px; }
    .m2 .process { grid-template-columns: 1fr; gap: 36px; }
    .m2 .process-sticky { position: static; }
    .m2 .bento { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; }
    .m2 .b-ai { grid-column: span 2; grid-row: span 2; }
    .m2 .b-web, .m2 .b-form { grid-column: span 2; }
    .m2 .b-rdv, .m2 .b-google { grid-column: span 1; }
    .m2 .grid-3, .m2 .tgrid, .m2 .pgrid { grid-template-columns: 1fr 1fr; }
    .m2 .foot-grid { grid-template-columns: 1fr 1fr; }
    .m2 .nav-links { display: none; }
    .m2 .menu-toggle { display: grid; }
    .m2 .nav-cta .desktop-only { display: none; }
    .m2 nav { flex-wrap: wrap; }
    .m2 nav.open { border-radius: 24px; }
    .m2 nav.open .nav-links { display: flex; flex-direction: column; align-items: stretch; width: 100%; gap: 2px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--line); }
    .m2 nav.open .nav-links > a { padding: 13px 14px; font-size: 15px; }
    .m2 nav.open .nav-links-cta { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
    .m2 nav.open .nav-links-cta .btn { justify-content: center; }
  }
  @media (max-width: 680px) {
    .m2 .grid-3, .m2 .tgrid, .m2 .pgrid, .m2 .bento { grid-template-columns: 1fr; }
    .m2 .bento .b, .m2 .b-ai, .m2 .b-web, .m2 .b-form, .m2 .b-rdv, .m2 .b-google { grid-column: span 1 !important; grid-row: auto !important; }
    .m2 .bento { grid-auto-rows: auto; }
    .m2 .bento .b { min-height: 210px; }
    .m2 .pcard.feat { transform: none; }
    .m2 .section { padding: 84px 0; }
    .m2 .final { padding: 56px 26px; }
    .m2 .float-1 { left: 0; } .m2 .float-2 { right: 0; }
    .m2 .hero { padding-top: 150px; }
  }
`;

export default function Model2Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    // Preloader
    const pre = root.querySelector('#preloader') as HTMLElement;
    const fill = root.querySelector('#preFill') as HTMLElement;
    const pct = root.querySelector('#prePct') as HTMLElement;
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) { p = 100; clearInterval(tick); setTimeout(() => pre?.classList.add('done'), 350); }
      if (fill) fill.style.width = p + '%';
      if (pct) pct.textContent = String(Math.round(p));
    }, 140);

    // Custom cursor
    if (fine) {
      root.classList.add('custom-cursor');
      const dot = root.querySelector('.cursor-dot') as HTMLElement;
      const ring = root.querySelector('.cursor-ring') as HTMLElement;
      let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY;
        if (dot) dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      };
      window.addEventListener('mousemove', onMove);
      let rafId: number;
      const loop = () => { rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18); if (ring) ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; rafId = requestAnimationFrame(loop); };
      rafId = requestAnimationFrame(loop);
      root.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => ring?.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring?.classList.remove('hover'));
      });
    }

    // Scroll progress + nav
    const header = root.querySelector('#header') as HTMLElement;
    const progress = root.querySelector('#progress') as HTMLElement;
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.width = (h > 0 ? (y / h * 100) : 0) + '%';
      header?.classList.toggle('scrolled', y > 20);
      header?.classList.toggle('hide', y > lastY && y > 400);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Magnetic buttons
    if (fine && !reduce) {
      root.querySelectorAll('.magnetic').forEach(el => {
        const e = el as HTMLElement;
        const str = 0.4;
        e.addEventListener('mousemove', ev => {
          const r = e.getBoundingClientRect();
          const x = (ev as MouseEvent).clientX - r.left - r.width / 2;
          const y = (ev as MouseEvent).clientY - r.top - r.height / 2;
          e.style.transform = `translate(${x * str}px, ${y * str}px)`;
        });
        e.addEventListener('mouseleave', () => e.style.transform = '');
      });
    }

    // 3D tilt cards
    if (fine && !reduce) {
      root.querySelectorAll('.tilt').forEach(t => {
        const card = t.querySelector('.card') as HTMLElement;
        if (!card) return;
        t.addEventListener('mousemove', ev => {
          const r = t.getBoundingClientRect();
          const px = ((ev as MouseEvent).clientX - r.left) / r.width;
          const py = ((ev as MouseEvent).clientY - r.top) / r.height;
          card.style.transform = `rotateY(${(px - 0.5) * 12}deg) rotateX(${(0.5 - py) * 12}deg)`;
          card.style.setProperty('--mx', (px * 100) + '%');
          card.style.setProperty('--my', (py * 100) + '%');
        });
        t.addEventListener('mouseleave', () => card.style.transform = '');
      });
    }

    // Dashboard parallax
    const dash = root.querySelector('#dash') as HTMLElement;
    if (dash && fine && !reduce) {
      const hero = root.querySelector('#accueil') as HTMLElement;
      hero?.addEventListener('mousemove', ev => {
        const r = hero.getBoundingClientRect();
        const px = ((ev as MouseEvent).clientX - r.left) / r.width - 0.5;
        const py = ((ev as MouseEvent).clientY - r.top) / r.height - 0.5;
        dash.style.transform = `rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateZ(0)`;
      });
      hero?.addEventListener('mouseleave', () => dash.style.transform = '');
    }

    // Reveal observer
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.14 });
    root.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Bars + bento
    const bIo = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          if ((e.target as HTMLElement).classList.contains('bars')) {
            e.target.querySelectorAll('.bar').forEach((b, i) => {
              const bar = b as HTMLElement;
              const h = bar.style.height; bar.style.height = '0';
              setTimeout(() => { bar.style.transition = 'height 0.8s cubic-bezier(0.16,1,0.3,1)'; bar.style.height = h; }, i * 70);
            });
          } else { e.target.classList.add('in'); }
          bIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    const bars = root.querySelector('.bars'); if (bars) bIo.observe(bars);
    const bento = root.querySelector('#bento'); if (bento) bIo.observe(bento);

    // Manifesto word reveal
    const man = root.querySelector('#manifesto');
    if (man) {
      const q = man.querySelector('.q') as HTMLElement;
      if (q) {
        const html = q.innerHTML;
        q.innerHTML = html.replace(/(<span[^>]*>.*?<\/span>|[^\s<]+)(\s*)/g, (m: string, w: string, sp: string) => `<span class="word">${w}</span>${sp}`);
        q.querySelectorAll('.word').forEach((w, i) => { (w as HTMLElement).style.transitionDelay = (i * 0.035) + 's'; });
        const mIo = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) { man.classList.add('in'); mIo.unobserve(man); } }); }, { threshold: 0.4 });
        mIo.observe(man);
      }
    }

    // Duplicate marquees
    ['mq', 'audL', 'audR'].forEach(id => {
      const t = root.querySelector(`#${id}`);
      if (t) t.innerHTML += t.innerHTML;
    });

    // Mobile menu
    const nav = root.querySelector('#nav') as HTMLElement;
    const toggle = nav?.querySelector('.menu-toggle') as HTMLElement;
    toggle?.addEventListener('click', () => {
      const o = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(o));
    });
    nav?.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }));

    // Aurora parallax
    if (!reduce) {
      const auroras = root.querySelectorAll('.aurora');
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        auroras.forEach((a, i) => { (a as HTMLElement).style.transform = `translateY(${y * (0.04 + i * 0.015)}px)`; });
      }, { passive: true });
    }

    // Neural network canvas
    const canvas = canvasRef.current;
    if (canvas && !reduce) {
      const ctx = canvas.getContext('2d')!;
      let w = 0, h = 0, dpr = 1;
      let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
      const mouse = { x: -999, y: -999 };
      const size = () => {
        dpr = Math.min(devicePixelRatio || 1, 2);
        const hero = canvas.parentElement!;
        w = hero.offsetWidth; h = hero.offsetHeight;
        canvas.width = w * dpr; canvas.height = h * dpr;
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      const build = () => {
        const count = Math.min(Math.floor(w / 16), 90);
        nodes = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 }));
      };
      size(); build();
      window.addEventListener('resize', () => { size(); build(); });
      const hero = canvas.parentElement!;
      hero.addEventListener('mousemove', (e: Event) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = (e as MouseEvent).clientX - r.left;
        mouse.y = (e as MouseEvent).clientY - r.top;
      });
      hero.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });
      const DIST = 140;
      let canvasRaf: number;
      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (const n of nodes) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          const dxm = n.x - mouse.x, dym = n.y - mouse.y, dm = Math.hypot(dxm, dym);
          if (dm < 120) { n.x += dxm / dm * 1.2; n.y += dym / dm * 1.2; }
        }
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < DIST) {
              const o = (1 - d / DIST) * 0.5;
              ctx.strokeStyle = `rgba(124,92,255,${o})`; ctx.lineWidth = 0.7;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
        for (const n of nodes) {
          const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          const near = dm < 120;
          ctx.fillStyle = near ? 'rgba(31,213,240,0.95)' : 'rgba(177,123,255,0.7)';
          ctx.beginPath(); ctx.arc(n.x, n.y, near ? 2.6 : 1.6, 0, Math.PI * 2); ctx.fill();
        }
        canvasRaf = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => {
      clearInterval(tick);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="m2" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* PRELOADER */}
      <div id="preloader">
        <div className="pre-inner">
          <div className="pre-mark">OL</div>
          <div className="pre-bar"><i id="preFill"></i></div>
          <div className="pre-pct"><span id="prePct">0</span>%</div>
        </div>
      </div>

      {/* CURSOR / PROGRESS / FX */}
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
      <div id="progress"></div>
      <div className="grain"></div>
      <div className="aurora au-1"></div>
      <div className="aurora au-2"></div>
      <div className="aurora au-3"></div>
      <div className="aurora au-4"></div>

      {/* NAV */}
      <header id="header">
        <nav className="wrap" id="nav">
          <a href="#accueil" className="logo" data-cursor="">
            <span className="logo-mark">OL</span>
            <span className="logo-text">Optimal<span>Logic</span></span>
          </a>
          <div className="nav-links">
            <a href="#accueil" data-cursor="">Accueil</a>
            <a href="#solutions" data-cursor="">Solutions</a>
            <a href="#process" data-cursor="">Méthode</a>
            <a href="#tarifs" data-cursor="">Tarifs</a>
            <a href="#contact" data-cursor="">Contact</a>
            <div className="nav-links-cta">
              <a href="/espace-client" className="btn btn-ghost">Connexion</a>
              <a href="/prise-de-rdv" className="btn btn-primary">Prendre RDV</a>
            </div>
          </div>
          <div className="nav-cta">
            <a href="/espace-client" className="btn btn-ghost desktop-only" data-cursor="">Connexion</a>
            <a href="/prise-de-rdv" className="btn btn-primary desktop-only magnetic" data-cursor="">Prendre RDV
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <button className="menu-toggle" aria-label="Menu" aria-expanded="false">
              <svg className="ic-open" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
              <svg className="ic-close" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="accueil">
          <canvas id="neural" ref={canvasRef}></canvas>
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="badge reveal in"><span className="dot"></span> Propulsé par l'intelligence artificielle</div>
                <h1 className="reveal in" data-d="1">Votre présence en ligne,<br/>devenue <span className="kinetic">moteur d'acquisition</span>.</h1>
                <p className="lead reveal in" data-d="2">La bonne approche digitale n'est pas la plus complexe — c'est celle qui pousse vos clients à vous choisir. On diagnostique, on active les bons leviers, vous récoltez les résultats.</p>
                <div className="hero-actions reveal in" data-d="3">
                  <a href="/prise-de-rdv" className="btn btn-primary btn-lg magnetic" data-cursor="">Diagnostic gratuit
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </a>
                  <a href="#solutions" className="btn btn-ghost btn-lg magnetic" data-cursor="">Voir les solutions</a>
                </div>
                <div className="trust-row reveal in" data-d="3">
                  <span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg> Sans engagement</span>
                  <span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg> Diagnostic gratuit</span>
                  <span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg> Solutions sur-mesure</span>
                </div>
              </div>
              <div className="hero-visual reveal in" data-d="2">
                <div className="dashboard" id="dash">
                  <div className="dash-top">
                    <div className="dash-title"><span className="logo-mark" style={{width:30,height:30,fontSize:12,borderRadius:9}}>OL</span> Tableau de bord</div>
                    <div className="live"><span className="dot"></span> En direct</div>
                  </div>
                  <div className="dash-stats">
                    <div className="dcard"><div className="lab"><span className="ic ic-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span> Demandes</div><div className="num">147</div><div className="delta">↑ 32% ce mois</div></div>
                    <div className="dcard"><div className="lab"><span className="ic ic-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span> RDV pris</div><div className="num">68</div><div className="delta">↑ 18% ce mois</div></div>
                    <div className="dcard"><div className="lab"><span className="ic ic-3"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></span> Prospects</div><div className="num">312</div><div className="delta">↑ 24% ce mois</div></div>
                    <div className="dcard"><div className="lab"><span className="ic ic-4"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span> Valeur est.</div><div className="num">38k€</div><div className="delta">↑ 41% ce mois</div></div>
                  </div>
                  <div className="dash-chart">
                    <div className="chart-head"><span>Acquisition · 7 jours</span><span className="grad-text" style={{fontWeight:700}}>+27%</span></div>
                    <div className="bars">
                      <div className="bar" style={{height:"38%"}}></div><div className="bar" style={{height:"55%"}}></div><div className="bar" style={{height:"42%"}}></div><div className="bar" style={{height:"70%"}}></div><div className="bar" style={{height:"60%"}}></div><div className="bar" style={{height:"85%"}}></div><div className="bar" style={{height:"100%"}}></div>
                    </div>
                  </div>
                  <div className="float float-1"><div className="av"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg></div> Réponse IA · 24/7</div>
                  <div className="float float-2"><div className="av" style={{background:"rgba(46,230,168,0.22)",color:"var(--emerald)"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg></div> Nouveau RDV</div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-cue"><div className="mouse"></div> Scroll</div>
        </section>

        {/* MARQUEE */}
        <div className="marquee">
          <div className="marquee-track" id="mq">
            <span className="marquee-item"><span className="star">✦</span> Sites web</span>
            <span className="marquee-item"><span className="star">✦</span> Assistant IA</span>
            <span className="marquee-item"><span className="star">✦</span> Google Business</span>
            <span className="marquee-item"><span className="star">✦</span> Prise de RDV</span>
            <span className="marquee-item"><span className="star">✦</span> Acquisition client</span>
            <span className="marquee-item"><span className="star">✦</span> Automatisation</span>
          </div>
        </div>

        {/* PROBLEM */}
        <section className="section problem">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="eyebrow">Le vrai problème</div>
              <h2>Pourquoi vos clients<br/>ne vous trouvent pas</h2>
              <p>Ce ne sont pas vos compétences. Ce sont ces failles digitales invisibles qui vous coûtent des clients, chaque jour.</p>
            </div>
            <div className="grid-3">
              <div className="tilt reveal"><div className="card"><div className="idx">01</div><div className="cic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg></div><h3>Introuvable sur Google</h3><p>Une fiche incomplète et vos prospects atterrissent directement chez le concurrent d'à côté.</p></div></div>
              <div className="tilt reveal" data-d="1"><div className="card"><div className="idx">02</div><div className="cic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div><h3>Un site sans confiance</h3><p>Lent, daté, peu clair : en quelques secondes le visiteur repart sans jamais vous contacter.</p></div></div>
              <div className="tilt reveal" data-d="2"><div className="card"><div className="idx">03</div><div className="cic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.94.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.87.33 1.81.57 2.81.7A2 2 0 0 1 22 16.92z"/><line x1="2" y1="2" x2="22" y2="22"/></svg></div><h3>Des demandes ignorées</h3><p>Hors horaires, débordé : chaque message sans réponse est un client qui file ailleurs.</p></div></div>
              <div className="tilt reveal"><div className="card"><div className="idx">04</div><div className="cic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div><h3>Aucune prise de RDV</h3><p>Trop de friction pour réserver, et le client motivé abandonne avant même de confirmer.</p></div></div>
              <div className="tilt reveal" data-d="1"><div className="card"><div className="idx">05</div><div className="cic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-6 0v4M5 9h14l1 12H4z"/></svg></div><h3>Des prospects perdus</h3><p>Pas de suivi, pas de relance : les contacts intéressés se diluent et ne reviennent jamais.</p></div></div>
              <div className="tilt reveal" data-d="2"><div className="card"><div className="idx">06</div><div className="cic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg></div><h3>Zéro visibilité</h3><p>Sans données, impossible de savoir ce qui marche. Vous avancez à l'aveugle.</p></div></div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="section">
          <div className="wrap">
            <div className="manifesto" id="manifesto">
              <p className="q">La bonne approche digitale n'est pas la plus complexe. C'est celle qui aide vos clients à <span className="grad-text">vous choisir</span>.</p>
              <p className="sub">On part toujours de votre activité, jamais de la technologie. On diagnostique le besoin réel, puis on active uniquement les leviers qui génèrent des clients.</p>
            </div>
          </div>
        </section>

        {/* SOLUTIONS BENTO */}
        <section className="section" id="solutions">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="eyebrow">Nos solutions</div>
              <h2>Tout ce qu'il faut<br/>pour être choisi</h2>
              <p>Six leviers complémentaires, activés selon votre besoin réel — pour capter, convaincre et convertir.</p>
            </div>
            <div className="bento" id="bento">
              <div className="b b-ai reveal">
                <span className="tag">IA · 24/7</span>
                <div className="ai-orb"></div>
                <h3>Assistant IA</h3>
                <p>Il répond automatiquement à vos clients, jour et nuit, et ne laisse jamais filer un prospect.</p>
                <div className="ai-bubbles">
                  <div className="bub u">Vous êtes ouverts dimanche ?</div>
                  <div className="bub a">Oui ! De 9h à 13h. Je vous réserve un créneau ?</div>
                  <div className="bub u">Parfait, à 10h 🙌</div>
                </div>
              </div>
              <div className="b b-web reveal" data-d="1">
                <div className="glow" style={{background:"var(--indigo)"}}></div>
                <div className="bic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
                <h3>Site web professionnel</h3>
                <p>Moderne, rapide et clair — un site qui inspire confiance et pousse à vous contacter.</p>
              </div>
              <div className="b b-rdv reveal" data-d="2">
                <div className="glow" style={{background:"var(--cyan)"}}></div>
                <div className="bic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>
                <h3>Prise de RDV</h3>
                <p>Réservation sans friction, 24h/24.</p>
              </div>
              <div className="b b-google reveal" data-d="1">
                <div className="glow" style={{background:"var(--pink)"}}></div>
                <div className="bic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <h3>Google Business</h3>
                <p>Trouvé et choisi localement.</p>
              </div>
              <div className="b b-form reveal" data-d="2">
                <div className="glow" style={{background:"var(--violet)"}}></div>
                <div className="bic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg></div>
                <h3>Formulaires & suivi des prospects</h3>
                <p>Capture qualifiée et base centralisée pour relancer et convertir chaque contact en client.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DIFFERENCE */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="eyebrow">Notre différence</div>
              <h2>Une approche qui part de votre<br/>activité, pas de la technologie</h2>
              <p>On part toujours de votre métier et de vos clients. La technologie n'est qu'un moyen — jamais une fin.</p>
            </div>
            <div className="grid-3 diff-grid">
              <div className="reveal"><div className="card diff-card"><div className="n">1</div><h3>Diagnostic avant solution</h3><p>On comprend votre métier et vos clients avant de proposer quoi que ce soit.</p></div></div>
              <div className="reveal" data-d="1"><div className="card diff-card"><div className="n">2</div><h3>Juste ce qu'il faut</h3><p>Des solutions proportionnées à votre besoin réel, sans complexité ni gadget inutile.</p></div></div>
              <div className="reveal" data-d="2"><div className="card diff-card"><div className="n">3</div><h3>Des résultats mesurables</h3><p>Un tableau de bord clair : demandes, RDV et valeur générée, en temps réel.</p></div></div>
            </div>
            <div className="reveal" style={{textAlign:"center",marginTop:46}}>
              <a href="/prise-de-rdv" className="btn btn-primary btn-lg magnetic" data-cursor="">Parlons de votre activité
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section" id="process">
          <div className="wrap">
            <div className="process">
              <div className="process-sticky reveal">
                <div className="eyebrow">La méthode</div>
                <h2 style={{fontSize:"clamp(32px,4.4vw,52px)",marginBottom:18}}>De l'audit aux<br/>résultats, en 4 temps</h2>
                <p style={{color:"var(--mut)",fontSize:17}}>Un cadre simple et transparent. Vous savez toujours où vous en êtes — et ce que ça rapporte.</p>
              </div>
              <div className="steps">
                <div className="step reveal"><div className="sn">01</div><div><h4>Diagnostic</h4><p>On analyse votre présence en ligne, votre marché local et vos points de friction. Gratuit, sans engagement.</p></div></div>
                <div className="step reveal" data-d="1"><div className="sn">02</div><div><h4>Stratégie</h4><p>On définit ensemble les leviers prioritaires — ceux qui auront le plus d'impact sur vos clients.</p></div></div>
                <div className="step reveal" data-d="2"><div className="sn">03</div><div><h4>Activation</h4><p>On déploie site, IA, RDV et suivi. Rapide, propre, pensé pour convertir dès le premier jour.</p></div></div>
                <div className="step reveal" data-d="3"><div className="sn">04</div><div><h4>Croissance</h4><p>On mesure, on optimise, on relance. Vos résultats progressent mois après mois.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="eyebrow">Ils témoignent</div>
              <h2>Des résultats concrets,<br/>racontés par eux</h2>
            </div>
            <div className="tgrid">
              <div className="tcard reveal">
                <div className="stars">★★★★★</div>
                <p className="quote">« En deux mois, on a doublé les réservations. Le système de RDV et l'assistant IA tournent tout seuls — je me concentre enfin sur mon métier. »</p>
                <div className="tperson"><div className="tav tav-1">CL</div><div><div className="nm">Camille L.</div><div className="rl">Salon de coiffure · Lyon</div></div></div>
              </div>
              <div className="tcard reveal" data-d="1">
                <div className="stars">★★★★★</div>
                <p className="quote">« Notre fiche Google est enfin au top et le site inspire confiance. Les demandes ont explosé sans qu'on lève le petit doigt. »</p>
                <div className="tperson"><div className="tav tav-2">TR</div><div><div className="nm">Thomas R.</div><div className="rl">Restaurant · Bordeaux</div></div></div>
              </div>
              <div className="tcard reveal" data-d="2">
                <div className="stars">★★★★★</div>
                <p className="quote">« Approche claire, zéro jargon. Ils ont activé exactement ce dont j'avais besoin. Le suivi des prospects a changé ma façon de travailler. »</p>
                <div className="tperson"><div className="tav tav-3">SB</div><div><div className="nm">Sofiane B.</div><div className="rl">Artisan · Marseille</div></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="section" style={{padding:"90px 0"}}>
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="eyebrow">Activités accompagnées</div>
              <h2>Pensé pour ceux qui<br/>font tourner le quotidien</h2>
            </div>
          </div>
          <div className="aud-rows">
            <div className="aud-marquee"><div className="aud-track l" id="audL">
              <div className="pill"><span className="e">🛍️</span> Commerces de proximité</div><div className="pill"><span className="e">🍽️</span> Restaurants & hôtellerie</div><div className="pill"><span className="e">💇</span> Salons & bien-être</div><div className="pill"><span className="e">🔧</span> Artisans & métiers</div><div className="pill"><span className="e">⚖️</span> Professions libérales</div>
            </div></div>
            <div className="aud-marquee"><div className="aud-track r" id="audR">
              <div className="pill"><span className="e">🩺</span> Cabinets médicaux</div><div className="pill"><span className="e">🚀</span> PME & startups</div><div className="pill"><span className="e">🎯</span> Coachs & formateurs</div><div className="pill"><span className="e">💼</span> Indépendants</div><div className="pill"><span className="e">🏡</span> Immobilier & services</div>
            </div></div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="tarifs">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="eyebrow">Tarifs</div>
              <h2>Des offres claires,<br/>pensées par profil</h2>
              <p>Une mise en place unique, puis un abonnement mensuel. Prix HT, sans surcoût caché.</p>
            </div>
            <div className="pcat">
              <div className="pcat-head reveal"><span className="pcat-tag">Commerce local</span><span className="pcat-line"></span></div>
              <div className="pgrid pgrid-2">
                <div className="pcard reveal">
                  <div className="pname">Commerce Intelligent</div>
                  <div className="pval">129€<small>HT / mois</small></div>
                  <div className="psetup">+ 590€ HT de mise en place</div>
                  <div className="pdesc">Être mieux trouvé, répondre plus vite, obtenir plus d'avis.</div>
                  <ul><li>Audit & optimisation Google Business</li><li>Amélioration des photos</li><li>Messagerie IA & scénarios de conversation</li><li>Gestion des avis (modèles)</li><li>Suivi de performance + rapport mensuel</li></ul>
                  <a href="/prise-de-rdv" className="btn btn-ghost btn-lg magnetic" data-cursor="" style={{justifyContent:"center"}}>Choisir cette offre</a>
                </div>
                <div className="pcard reveal" data-d="1">
                  <div className="pname">Commerce Premium</div>
                  <div className="pval">249€<small>HT / mois</small></div>
                  <div className="psetup">+ 990€ HT de mise en place</div>
                  <div className="pdesc">Organiser les demandes clients et réduire les opportunités perdues.</div>
                  <ul><li>Tout Commerce Intelligent, plus :</li><li>Tableau de bord des demandes</li><li>Classification des demandes</li><li>Modèles de réponse & coordination d'équipe</li><li>Analytics détaillés + reporting complet</li></ul>
                  <a href="/prise-de-rdv" className="btn btn-ghost btn-lg magnetic" data-cursor="" style={{justifyContent:"center"}}>Choisir cette offre</a>
                </div>
              </div>
            </div>
            <div className="pcat">
              <div className="pcat-head reveal"><span className="pcat-tag">TPE & PME</span><span className="pcat-line"></span></div>
              <div className="pgrid">
                <div className="pcard reveal">
                  <div className="pname">Présence Pro</div>
                  <div className="pval">99€<small>HT / mois</small></div>
                  <div className="psetup">+ 890€ HT de mise en place</div>
                  <div className="pdesc">Une image professionnelle et un site clair.</div>
                  <ul><li>Optimisation Google Business</li><li>Site web professionnel + pages services</li><li>Formulaire de contact</li><li>Chatbot</li><li>Maintenance légère + reporting simple</li></ul>
                  <a href="/prise-de-rdv" className="btn btn-ghost btn-lg magnetic" data-cursor="" style={{justifyContent:"center"}}>Choisir cette offre</a>
                </div>
                <div className="pcard feat reveal" data-d="1">
                  <div className="pname">Croissance</div>
                  <div className="pval">179€<small>HT / mois</small></div>
                  <div className="psetup">+ 1 490€ HT de mise en place</div>
                  <div className="pdesc">Générer et suivre des prospects sérieusement.</div>
                  <ul><li>Pages services détaillées + formulaires avancés</li><li>Prise de RDV en ligne</li><li>Chatbot de qualification</li><li>Tableau de bord prospects + automatisations</li><li>Notifications de leads + reporting mensuel</li></ul>
                  <a href="/prise-de-rdv" className="btn btn-primary btn-lg magnetic" data-cursor="" style={{justifyContent:"center"}}>Choisir cette offre</a>
                </div>
                <div className="pcard reveal" data-d="2">
                  <div className="pname">Performance</div>
                  <div className="pval">349€<small>HT / mois</small></div>
                  <div className="psetup">+ 2 490€ HT de mise en place</div>
                  <div className="pdesc">Structurer l'acquisition et le suivi commercial.</div>
                  <ul><li>Tout Croissance, plus :</li><li>CRM avancé</li><li>Séquences de relance automatisées</li><li>Segmentation des prospects</li><li>Optimisation des conversions + recommandations</li></ul>
                  <a href="/prise-de-rdv" className="btn btn-ghost btn-lg magnetic" data-cursor="" style={{justifyContent:"center"}}>Choisir cette offre</a>
                </div>
              </div>
            </div>
            <div className="pcat">
              <div className="pcat-head reveal"><span className="pcat-tag">Startups</span><span className="pcat-line"></span></div>
              <div className="pgrid">
                <div className="pcard reveal">
                  <div className="pname">Validation</div>
                  <div className="pval">99€<small>HT / mois</small></div>
                  <div className="psetup">+ 790€ HT de mise en place</div>
                  <div className="pdesc">Tester une idée rapidement et mesurer l'intérêt du marché.</div>
                  <ul><li>Clarification de la proposition de valeur</li><li>Landing page simple</li><li>Formulaire d'inscription + liste d'attente</li><li>Email de confirmation automatique</li><li>Analytics de base + suivi des inscriptions</li></ul>
                  <a href="/prise-de-rdv" className="btn btn-ghost btn-lg magnetic" data-cursor="" style={{justifyContent:"center"}}>Choisir cette offre</a>
                </div>
                <div className="pcard reveal" data-d="1">
                  <div className="pname">Launch</div>
                  <div className="pval">199€<small>HT / mois</small></div>
                  <div className="psetup">+ 1 490€ HT de mise en place</div>
                  <div className="pdesc">Lancer une bêta, générer des démos, suivre les leads.</div>
                  <ul><li>Tout Validation, plus :</li><li>Landing page complète + waitlist avancée</li><li>Demandes de démo + prise de RDV</li><li>Chatbot de qualification IA</li><li>CRM simple + emails automatisés + tableau de bord traction</li></ul>
                  <a href="/prise-de-rdv" className="btn btn-ghost btn-lg magnetic" data-cursor="" style={{justifyContent:"center"}}>Choisir cette offre</a>
                </div>
                <div className="pcard reveal" data-d="2">
                  <div className="pname">Growth</div>
                  <div className="pval">399€<small>HT / mois</small></div>
                  <div className="psetup">+ 2 990€ HT de mise en place</div>
                  <div className="pdesc">Optimiser l'acquisition et améliorer les conversions.</div>
                  <ul><li>Tout Launch, plus :</li><li>A/B testing + segmentation</li><li>Séquences email + pitch digital</li><li>Pages cas d'usage + tableau de bord avancé</li><li>Optimisation du tunnel + recommandations</li></ul>
                  <a href="/prise-de-rdv" className="btn btn-ghost btn-lg magnetic" data-cursor="" style={{justifyContent:"center"}}>Choisir cette offre</a>
                </div>
              </div>
            </div>
            <div className="psur reveal">
              <div>
                <div className="pname" style={{marginBottom:6}}>Sur mesure</div>
                <p style={{color:"var(--mut)",fontSize:15,maxWidth:520}}>Un besoin spécifique ou plus complexe ? On construit une offre adaptée à votre situation.</p>
              </div>
              <a href="/prise-de-rdv" className="btn btn-primary btn-lg magnetic" data-cursor="">Demander une proposition</a>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section" id="rdv">
          <div className="wrap">
            <div className="final reveal">
              <div className="badge" style={{marginBottom:24}}><span className="dot"></span> Premier pas · 100% gratuit</div>
              <h2>Parlons de votre activité,<br/>pas de technologie.</h2>
              <p>30 minutes pour identifier vos vrais leviers de croissance. Sans engagement, sans jargon.</p>
              <div className="hero-actions" style={{justifyContent:"center"}}>
                <a href="/prise-de-rdv" className="btn btn-primary btn-lg magnetic" data-cursor="">Réserver mon diagnostic
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </a>
                <a href="#contact" className="btn btn-ghost btn-lg magnetic" data-cursor="">Nous contacter</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact">
        <div className="wrap">
          <div className="foot-cta-word">OptimalLogic</div>
          <div className="foot-grid">
            <div className="foot-about">
              <a href="#" className="logo"><span className="logo-mark">OL</span><span className="logo-text">Optimal<span>Logic</span></span></a>
              <p>Digital, IA & acquisition client. On transforme votre présence en ligne en moteur d'acquisition — sans complexité inutile.</p>
              <div className="socials">
                <a href="#" aria-label="LinkedIn" data-cursor=""><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v1.5a6 6 0 0 1 2-1.5zM6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg></a>
                <a href="#" aria-label="Instagram" data-cursor=""><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
                <a href="mailto:contact@optimal-logic.com" aria-label="Email" data-cursor=""><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg></a>
              </div>
            </div>
            <div><h5>Solutions</h5><a href="#solutions">Google Business</a><a href="#solutions">Site web</a><a href="#solutions">Prise de RDV</a><a href="#solutions">Assistant IA</a><a href="#solutions">Suivi prospects</a></div>
            <div><h5>Entreprise</h5><a href="#accueil">Accueil</a><a href="#process">Méthode</a><a href="#tarifs">Tarifs</a><a href="/prise-de-rdv">Prise de RDV</a><a href="/espace-client">Espace client</a></div>
            <div><h5>Contact</h5><a href="mailto:contact@optimal-logic.com">contact@optimal-logic.com</a><a href="#">France · à distance</a><a href="/prise-de-rdv">Diagnostic gratuit</a></div>
          </div>
          <div className="foot-bottom"><span>© 2026 OptimalLogic. Tous droits réservés.</span><span>Mentions légales · Confidentialité · CGV</span></div>
        </div>
      </footer>
    </div>
  );
}
