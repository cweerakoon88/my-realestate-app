'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from './AuthProvider'

const navLinks = [
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function NavBar({ onPostClick }) {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root {
          --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
          --gold: #b8924a; --gold-pale: #f5ecd8; --border: #e8e0d0;
          --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
        }

        /* DESKTOP NAV */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem;
          background: rgba(250,248,243,0.92); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .navbar-logo { font-family: var(--serif); font-size: 1.4rem; font-weight: 600; color: var(--ink); letter-spacing: 0.02em; text-decoration: none; }
        .navbar-logo span { color: var(--gold); }
        .navbar-links { display: flex; align-items: center; gap: 1.75rem; }
        .navbar-link { font-family: var(--sans); font-size: 13px; color: var(--ink-light); text-decoration: none; transition: color 0.2s; }
        .navbar-link:hover { color: var(--gold); }
        .navbar-cta { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink); text-decoration: none; border: 1px solid var(--ink); padding: 8px 20px; border-radius: 2px; transition: all 0.2s; cursor: pointer; background: none; }
        .navbar-cta:hover { background: var(--ink); color: var(--cream); }

        /* MOBILE NAV */
        .mob-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: none;
          align-items: center; justify-content: space-between;
          padding: 1rem 1.5rem;
          background: rgba(250,248,243,0.96); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .mob-logo { font-family: var(--serif); font-size: 1.3rem; font-weight: 600; color: var(--ink); text-decoration: none; }
        .mob-logo span { color: var(--gold); }
        .mob-right { display: flex; align-items: center; gap: 0.75rem; }
        .mob-post-btn { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; background: var(--ink); color: var(--cream); border: none; padding: 8px 14px; border-radius: 2px; cursor: pointer; text-decoration: none; display: inline-block; }
        .mob-hamburger { background: none; border: none; cursor: pointer; padding: 4px; display: flex; flex-direction: column; gap: 5px; width: 28px; }
        .mob-hamburger span { display: block; height: 1.5px; background: var(--ink); transition: all 0.25s; transform-origin: center; }
        .mob-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .mob-hamburger.open span:nth-child(2) { opacity: 0; }
        .mob-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .mob-drawer {
          position: fixed; top: 57px; left: 0; right: 0; bottom: 0;
          background: var(--cream); z-index: 190;
          display: flex; flex-direction: column;
          padding: 2rem 1.5rem;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
        }
        .mob-drawer.open { transform: translateX(0); }
        .mob-menu-link { font-family: var(--serif); font-size: 2rem; font-weight: 300; color: var(--ink); text-decoration: none; padding: 0.75rem 0; border-bottom: 1px solid var(--border); display: block; transition: color 0.15s; }
        .mob-menu-link:hover { color: var(--gold); }
        .mob-menu-cta { margin-top: 2rem; font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; background: var(--ink); color: var(--cream); border: none; padding: 14px 24px; border-radius: 2px; cursor: pointer; text-align: center; width: 100%; text-decoration: none; display: block; }
        .mob-menu-account { margin-top: 0.75rem; font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--gold); background: var(--gold-pale); border: 1px solid var(--gold); padding: 14px 24px; border-radius: 2px; cursor: pointer; text-align: center; width: 100%; text-decoration: none; display: block; }
        .mob-signout { margin-top: 0.75rem; font-family: var(--sans); font-size: 13px; color: var(--ink-light); background: none; border: 1px solid var(--border); padding: 14px 24px; border-radius: 2px; cursor: pointer; text-align: center; width: 100%; }

        @media (max-width: 768px) {
          .navbar { display: none; }
          .mob-nav { display: flex; }
        }
      `}</style>

      {/* DESKTOP */}
      <nav className="navbar">
        <a href="/" className="navbar-logo" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
        <svg width="32" height="32" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r="50" fill="none" stroke="#b8924a" strokeWidth="3"/>
        <circle cx="55" cy="55" r="42" fill="#b8924a" fillOpacity="0.12"/>
        <text x="55" y="73" fontFamily="Georgia,serif" fontSize="52" fontWeight="400" fill="#b8924a" textAnchor="middle">P</text>
        </svg>
  <span style={{ fontFamily:'Georgia,serif', fontSize:'1.4rem', fontWeight:600, color:'#1a1714' }}>Prop<span style={{ color:'#b8924a' }}>Offer</span></span>
</a>
        <div className="navbar-links">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="navbar-link">{link.label}</Link>
          ))}
          {user ? (
            <Link href="/account" className="navbar-cta">My Account</Link>
          ) : (
            <button onClick={onPostClick} className="navbar-cta">Post a Requirement</button>
          )}
        </div>
      </nav>

      {/* MOBILE */}
      <nav className="mob-nav">
        <a href="/" className="navbar-logo" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
        <svg width="32" height="32" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r="50" fill="none" stroke="#b8924a" strokeWidth="3"/>
        <circle cx="55" cy="55" r="42" fill="#b8924a" fillOpacity="0.12"/>
        <text x="55" y="73" fontFamily="Georgia,serif" fontSize="52" fontWeight="400" fill="#b8924a" textAnchor="middle">P</text>
        </svg>
  <span style={{ fontFamily:'Georgia,serif', fontSize:'1.4rem', fontWeight:600, color:'#1a1714' }}>Prop<span style={{ color:'#b8924a' }}>Offer</span></span>
</a>
        <div className="mob-right">
          {user ? (
            <Link href="/account" className="mob-post-btn">Account</Link>
          ) : (
            <button className="mob-post-btn" onClick={onPostClick}>Post</button>
          )}
          <button className={`mob-hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mob-drawer ${open ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} className="mob-menu-link" onClick={() => setOpen(false)}>{link.label}</Link>
        ))}
        {user ? (
          <>
            <Link href="/account" className="mob-menu-account" onClick={() => setOpen(false)}>My Account</Link>
            <button className="mob-signout" onClick={() => { signOut(); setOpen(false) }}>Sign out</button>
          </>
        ) : (
          <button className="mob-menu-cta" onClick={() => { onPostClick?.(); setOpen(false) }}>
            Post a Requirement — Free
          </button>
        )}
      </div>
    </>
  )
}