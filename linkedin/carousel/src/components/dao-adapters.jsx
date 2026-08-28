import React from 'react'

export function Badge({ className = '', children, ...props }) {
  return <span className={className} {...props}>{children}</span>
}

export function Button({ className = '', children, ...props }) {
  return <button type="button" className={className} {...props}>{children}</button>
}

export function Card({ className = '', children, ...props }) {
  return <section className={className} {...props}>{children}</section>
}

export function CardContent({ className = '', children, ...props }) {
  return <div className={className} {...props}>{children}</div>
}

export function Separator({ className = '', ...props }) {
  return <div role="separator" className={className} {...props} />
}

function Icon({ children, className = '' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">{children}</svg>
}

export function ArrowRight(props) { return <Icon {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Icon> }
export function BookOpen(props) { return <Icon {...props}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5zM4 5.5v16" /></Icon> }
export function ShieldCheck(props) { return <Icon {...props}><path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6zM8.5 12l2.2 2.2 4.8-4.8" /></Icon> }
