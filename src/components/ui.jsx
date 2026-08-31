import React from 'react'
export function Button({ className = '', ...props }) { return <button className={`ui-button ${className}`} type="button" {...props} /> }
export function Badge({ className = '', ...props }) { return <span className={`ui-badge ${className}`} {...props} /> }
export function Card({ className = '', ...props }) { return <section className={`ui-card ${className}`} {...props} /> }
