'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from './AuthProvider'

export default function MobileNav({ onPostClick }) {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root {
          --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
          --gold: #b8924a; --gold-pale: #f5ecd8; --border: #e8e0d0;
          --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
        }
        .mob-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.5rem;
          background: rgba(250,248,243,0.96); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .mob-logo { font-family: var(--serif); font-size: 1.3rem; font-weight: 600; color: var(--ink); text-decoration: none; }
        .mob-logo span { color: var(--gold); }
        .mob-right { display: flex; align-items: center; gap: 0.75rem; }
        .mob-post-btn {
          font-family: var(--sans); font-size: 11px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          background: var(--ink); color: var(--cream);
          border: none; padding: 8px 14px; border-radius: 2px; cursor: pointer;
          text-decoration: none; display: inline-block;
        }
        .mob-hamburger {
          background: none; border: none; cursor: pointer;
          padding: 4px; display: flex; flex-direction: column;
          gap: 5px; width: 28px;
        }
        .mob-hamburger span {
          display: block; height: 1.5px; background: var(--ink);
          transition: all 0.25s; transform-origin: center;
        }
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
        }
        .mob-drawer.open { transform: translateX(0); }
        .mob-menu-link {
          font-family: var(--serif); font-size: 2rem; font-weight: 300;
          color: var(--ink); text-decoration: none; padding: 0.75rem 0;
          border-bottom: 1px solid var(--border); display: block;
          transition: color 0.15s;
        }
        .mob-menu-link:hover { color: var(--gold); }
        .mob-menu-link em { font-style: italic; color: var(--gold); }
        .mob-menu-cta {
          margin-top: 2rem;
          font-family: var(--sans); font-size: 13px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          background: var(--ink); color: var(--cream);
          border: none; padding: 14px 24px; border-radius: 2px;
          cursor: pointer; text-align: center; width: 100%;
          text-decoration: none; display: block;
        }
        .mob-menu-account {
          margin-top: 0.75rem;
          font-family: var(--sans); font-size: 13px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--gold); background: var(--gold-pale);
          border: 1px solid var(--gold); padding: 14px 24px; border-radius: 2px;
          cursor: pointer; text-align: center; width: 100%;
          text-decoration: none; display: block;
        }
        .mob-signout {
          margin-top: 0.75rem;
          font-family: var(--sans); font-size: 13px;
          color: var(--ink-light); background: none;
          border: 1px solid var(--border); padding: 14px 24px; border-radius: 2px;
          cursor: pointer; text-align: center; width: 100%;
        }
        @media (min-width: 769px) {
          .mob-nav { display: none; }
          .mob-drawer { display: none; }
        }
      `}</style>

      <nav className="mob-nav">
        <a href="/" className="mob-logo">Prop<span>Match</span></a>
        <div className="mob-right">
          {user ? (
            <Link href="/account" className="mob-post-btn">Account</Link>
          ) : (
            <button className="mob-post-btn" onClick={onPostClick}>Post</button>
          )}
          <button
            className={`mob-hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mob-drawer ${open ? 'open' : ''}`}>
        <Link href="/" className="mob-menu-link" onClick={() => setOpen(false)}>Home</Link>
        <Link href="/marketplace" className="mob-menu-link" onClick={() => setOpen(false)}>Marketplace</Link>
        <Link href="/services" className="mob-menu-link" onClick={() => setOpen(false)}>Services</Link>
        <Link href="/pricing" className="mob-menu-link" onClick={() => setOpen(false)}>Pricing</Link>
        <Link href="/about" className="mob-menu-link" onClick={() => setOpen(false)}>About</Link>
        <Link href="/contact" className="mob-menu-link" onClick={() => setOpen(false)}>Contact</Link>

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