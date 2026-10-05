const paths = {
  truck: <><path d="M2 6h11v10H2zM13 9h4l3 3v4h-7" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="16.5" cy="17.5" r="1.8" /></>,
  shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14c2.5.3 4 2.3 4 5" /></>,
  diamond: <><path d="M6 4h12l4 5-10 12L2 9z" /><path d="M2 9h20M9 4l-2 5 5 12 5-12-2-5" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
  box: <><path d="M12 2l9 5v10l-9 5-9-5V7z" /><path d="M3 7l9 5 9-5M12 12v10" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
  heart: <path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6-8 11-8 11z" />,
  bag: <><path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 016 0v2" /></>,
  arrow: <path d="M4 12h16M14 6l6 6-6 6" />,
  left: <path d="M20 12H4M10 6l-6 6 6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
}
export default function Icon({ name, size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {paths[name]}
    </svg>
  )
}
