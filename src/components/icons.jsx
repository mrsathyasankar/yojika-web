/* Yojika — inline SVG icons. Clean 1.6px stroke, currentColor. */
const Svg = ({ children, size = 24, className = '', sw = 1.6, fill = 'none', vb = '0 0 24 24', ...rest }) => (
  <svg width={size} height={size} viewBox={vb} fill={fill} stroke="currentColor"
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
       className={className} aria-hidden="true" {...rest}>{children}</svg>
);

/* Brand "Y" mark — used inside the logo's rounded square (renders in currentColor,
   i.e. white on the brand square). The two-tone red/coral version lives in
   public/favicon.svg and the brand kit. */
const LeafGlyph = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
    <path d="M27 24 L50 53 L50 80" stroke="currentColor" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M73 24 L52 50.5" stroke="currentColor" strokeWidth="13" strokeLinecap="round"/>
  </svg>
);

const Bolt = (p) => <Svg {...p}><path d="M13 2 4.5 13.2h6.2L10 22l8.8-11.4h-6.4L13 2Z"/></Svg>;
const WifiOff = (p) => <Svg {...p}><path d="M3 3l18 18M8.5 16.4a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 3.4-2.2M19 12.9a10 10 0 0 0-7.3-2.9M2 9.3A15 15 0 0 1 7 6.3M22 9.3a15 15 0 0 0-6-3.1"/><path d="M12 20h.01"/></Svg>;
const Receipt = (p) => <Svg {...p}><path d="M6 2.5h12v19l-2.2-1.4-2.2 1.4-2.2-1.4-2.2 1.4L7 21.5 6 22V2.5Z"/><path d="M9 7h6M9 11h6M9 15h4"/></Svg>;
const Languages = (p) => <Svg {...p}><path d="M3 5h9M7.5 3v2M10 5c-.7 4.5-3 7.7-6.5 9.5M5 9c.7 2.4 2.6 4.4 5 5.5"/><path d="M13.5 20l3.5-9 3.5 9M14.7 17h4.6"/></Svg>;
const Box = (p) => <Svg {...p}><path d="M12 2.6 21 7v10l-9 4.4L3 17V7l9-4.4Z"/><path d="M3 7l9 4.4L21 7M12 11.4V21.4"/></Svg>;
const Users = (p) => <Svg {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M16 5.4a3.2 3.2 0 0 1 0 6.2M17.5 14.2a5.5 5.5 0 0 1 3 5.3"/></Svg>;
const Wallet = (p) => <Svg {...p}><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H17v3"/><path d="M3 7.5V18a2.5 2.5 0 0 0 2.5 2.5H19a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5.5A2.5 2.5 0 0 1 3 7.5Z"/><circle cx="16.5" cy="13" r="1.3" fill="currentColor" stroke="none"/></Svg>;
const Printer = (p) => <Svg {...p}><path d="M7 9V3h10v6M7 18H5.5A1.5 1.5 0 0 1 4 16.5v-4A1.5 1.5 0 0 1 5.5 11h13A1.5 1.5 0 0 1 20 12.5v4A1.5 1.5 0 0 1 18.5 18H17"/><rect x="7" y="15" width="10" height="6" rx="1"/></Svg>;
const Shield = (p) => <Svg {...p}><path d="M12 2.5 5 5v6c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V5l-7-2.5Z"/><path d="M9 12l2 2 4-4"/></Svg>;
const ReturnArrow = (p) => <Svg {...p}><path d="M9 7 4.5 11.5 9 16M4.5 11.5H15a4.5 4.5 0 0 1 0 9h-2.5"/></Svg>;
const Check = (p) => <Svg {...p}><path d="M5 12.5 10 17.5 19.5 6.5"/></Svg>;
const CheckCircle = (p) => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M8 12.2l2.6 2.6L16 9"/></Svg>;
const ArrowRight = (p) => <Svg {...p}><path d="M4 12h15M13 6l6 6-6 6"/></Svg>;
const ArrowDown = (p) => <Svg {...p}><path d="M12 4v15M6 13l6 6 6-6"/></Svg>;
const ChevronDown = (p) => <Svg {...p}><path d="M5 9l7 7 7-7"/></Svg>;
const Menu = (p) => <Svg {...p}><path d="M3 6h18M3 12h18M3 18h18"/></Svg>;
const Close = (p) => <Svg {...p}><path d="M5 5l14 14M19 5 5 19"/></Svg>;
const Plus = (p) => <Svg {...p}><path d="M12 5v14M5 12h14"/></Svg>;
const Minus = (p) => <Svg {...p}><path d="M5 12h14"/></Svg>;
const Download = (p) => <Svg {...p}><path d="M12 3v12M7.5 10.5 12 15l4.5-4.5"/><path d="M4 19.5h16"/></Svg>;
const Windows = (p) => <Svg {...p} fill="currentColor" sw="0"><path d="M3 5.4 10.6 4.3v7.3H3V5.4ZM11.6 4.15 21 2.8v8.8h-9.4V4.15ZM3 12.6h7.6v7.1L3 18.6v-6ZM11.6 12.6H21v8.6l-9.4-1.35V12.6Z"/></Svg>;
const Keyboard = (p) => <Svg {...p}><rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 9.5h.01M9.5 9.5h.01M13 9.5h.01M16.5 9.5h.01M6 13h.01M18 9.5h.01M8 16h8M9.5 13h.01M13 13h.01M16.5 13h.01"/></Svg>;
const Lock = (p) => <Svg {...p}><rect x="4.5" y="10" width="15" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v2.5"/></Svg>;
const Rupee = (p) => <Svg {...p}><path d="M7 4.5h10M7 8.5h10M16.5 8.5C16.5 12 13.8 13 10.5 13H8.5l7 6.5"/><path d="M7 13h3.5"/></Svg>;
const Chart = (p) => <Svg {...p}><path d="M4 4v16h16"/><path d="M8 15l3.2-3.6 2.6 2.2L20 8"/></Svg>;
const Database = (p) => <Svg {...p}><ellipse cx="12" cy="5.5" rx="7.5" ry="3"/><path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6"/></Svg>;
const Sparkles = (p) => <Svg {...p}><path d="M12 3.5 13.6 9 19 10.6 13.6 12.2 12 17.6 10.4 12.2 5 10.6 10.4 9 12 3.5ZM18.5 15l.7 2.2L21.5 18l-2.3.8-.7 2.2-.7-2.2L15.5 18l2.3-.8.7-2.2Z"/></Svg>;
const Clock = (p) => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></Svg>;
const Mail = (p) => <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 5.5L20 7"/></Svg>;
const Tag = (p) => <Svg {...p}><path d="M3 12.5V5a2 2 0 0 1 2-2h7.5L21 11.5a2 2 0 0 1 0 2.8l-6.7 6.7a2 2 0 0 1-2.8 0L3 12.5Z"/><circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none"/></Svg>;
const Heart = (p) => <Svg {...p}><path d="M12 20s-7-4.4-9.2-9C1.4 8 3 4.8 6.2 4.8c2 0 3.2 1.2 3.8 2.4.6-1.2 1.8-2.4 3.8-2.4 3.2 0 4.8 3.2 3.4 6.2C19 15.6 12 20 12 20Z"/></Svg>;
const ScalesGlyph = (p) => <Svg {...p}><path d="M12 3v18M7 21h10M5 7h14M5 7l-2.5 6a3 3 0 0 0 5 0L5 7ZM19 7l-2.5 6a3 3 0 0 0 5 0L19 7ZM9 5l3-1.5L15 5"/></Svg>;

export {
  Svg, LeafGlyph, Bolt, WifiOff, Receipt, Languages, Box, Users, Wallet, Printer,
  Shield, ReturnArrow, Check, CheckCircle, ArrowRight, ArrowDown, ChevronDown, Menu,
  Close, Plus, Minus, Download, Windows, Keyboard, Lock, Rupee, Chart, Database,
  Sparkles, Clock, Mail, Tag, Heart, ScalesGlyph,
};
