import { useEffect } from 'react';
import { categories, topics, topicsIn, order, comparisons, paths, glossary } from '../content';
import { href, go } from '../router';
import { Icon } from './Icon';
import { useReveal, modKey } from './Chrome';
import { suggestions } from '../search';
const featured = ['visual-hierarchy', 'color-tokens', 'buttons', 'modals-dialogs', 'grid-systems', 'glassmorphism'];
const recentlyUpdated = ['wcag-basics', 'touch-targets', 'design-tokens', 'select-menus', 'tables-data-grids', 'system-states', 'hero-sections', 'rail-bottom-nav'];
export function Home({ onSearch }) {
    useEffect(() => { document.title = 'The Complete UI/UX Encyclopedia — Volume 1: UI'; }, []);
    useReveal('home');
    return (<div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true"/>
        <div className="hero-glow" aria-hidden="true"/>
        <div className="horizon" aria-hidden="true"/>
        <div className="hero-meta" aria-hidden="true">
          <span>Vol. <b>01</b> — User Interface</span><span><b>19</b> subjects · <b>{order.length}</b> entries</span><span><b>{comparisons.length}</b> comparisons · <b>{glossary.length}</b> terms</span><span>Edition <b>2026.11</b></span>
        </div>
        <div className="hero-body">
          <span className="hero-index"><b>§ 01</b> An encyclopedia of interface design</span>
          <span className="annot a1">fig. 01 — the anatomy of an interface</span>
                    <h1 className="hero-title" id="hero-title">
            <span className="l l1">Every</span>
            <span className="l l2"><span className="ital">interface,</span></span>
            <span className="l l3">explained.</span>
          </h1>
          <div className="hero-aside">
            <p>A complete, searchable reference for <b>interface design</b> — what every concept is, why it exists, how it looks, when to use it and how it differs from its neighbours. Written for beginners, precise enough for teams.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => go(href.ui)}>Get started <Icon n="arrow"/></button>
              <button className="btn" onClick={() => onSearch()}><Icon n="search"/>Search <kbd style={{ marginLeft: 4 }}>{modKey} K</kbd></button>
            </div>
          </div>
        </div>
        <nav className="hero-foot" aria-label="Domains">
          {[['Foundations', 'foundations', '01–07'], ['Elements & Components', 'elements', '08–12'], ['Patterns & Pages', 'landing', '13–15'], ['Styles & Systems', 'styles', '16–19']].map(([n, c, r]) => <a key={c} href={href.cat(c)}><span className="n">{r}</span><b>{n}</b></a>)}
        </nav>
      </section>

      <section className="hsec" aria-labelledby="h-search">
        <div className="hsec-head reveal"><span className="sn">§ 02 — Find</span><h2 id="h-search">Search by name, alias or problem.</h2><p>Search covers titles, alternative names (“CTA”, “dark mode”, “toast”), tags and definitions — plus comparisons, learning paths and the glossary.</p></div>
        <div className="search-hero reveal">
          <button className="big" onClick={() => onSearch()}><Icon n="search" s={20}/><span>What are you trying to understand?</span><kbd>{modKey} K</kbd></button>
          <div className="sugg">{suggestions.slice(0, 7).map(s => <button key={s} className="chip" onClick={() => onSearch(s)}>{s}</button>)}</div>
        </div>
      </section>

      <section className="hsec" aria-labelledby="h-subjects">
        <div className="hsec-head reveal"><span className="sn">§ 03 — Index</span><h2 id="h-subjects">Nineteen subjects, one hierarchy.</h2><p>Domain → subject → topic → type → variant. Foundations first, then elements, patterns, pages, styles and systems.</p></div>
        <ol className="subjects reveal">
          {categories.map(c => <li key={c.id}><a href={href.cat(c.id)}><span className="n" aria-hidden="true">{c.num}</span><b>{c.title}</b><span className="d">{c.intro.split('.')[0]}.</span><span className="c">{topicsIn(c.id).length} entries</span></a></li>)}
        </ol>
      </section>

      <section className="hsec" aria-labelledby="h-learn">
        <div className="hsec-head reveal"><span className="sn">§ 04 — Learn</span><h2 id="h-learn">Routes, comparisons, featured concepts.</h2><p>Follow a path from foundations to complete pages, or settle a specific question with a side-by-side comparison.</p></div>
        <div className="home-split reveal">
          <a className="fcard" href={href.path('beginner')}>
            <span className="vis" aria-hidden="true"><svg viewBox="0 0 240 110" width="100%" height="100%"><path d="M20 90 C70 90 70 30 120 30 S170 70 220 20" fill="none" stroke="#2BA6FF" strokeWidth="2"/>{[20, 70, 120, 170, 220].map((x, i) => <circle key={x} cx={x} cy={[90, 64, 30, 52, 20][i]} r="6" fill={i < 2 ? '#2BA6FF' : '#1E2430'} stroke="#2BA6FF"/>)}</svg></span>
            <span className="label">Learning path · Beginner</span><b>Foundations → complete pages</b><p>{paths[0].steps.length} steps from “What UI design is” to a full landing page.</p>
          </a>
          <a className="fcard" href={href.cmp('modal-drawer-sheet')}>
            <span className="vis" aria-hidden="true"><svg viewBox="0 0 240 110" width="100%" height="100%"><rect x="14" y="14" width="64" height="82" rx="6" fill="#10141C" stroke="#323B4B"/><rect x="26" y="40" width="40" height="30" rx="4" fill="#2BA6FF"/><rect x="88" y="14" width="64" height="82" rx="6" fill="#10141C" stroke="#323B4B"/><rect x="118" y="14" width="34" height="82" rx="4" fill="#1E2430" stroke="#7FBCF6"/><rect x="162" y="14" width="64" height="82" rx="6" fill="#10141C" stroke="#323B4B"/><rect x="162" y="62" width="64" height="34" rx="8" fill="#1E2430" stroke="#7FBCF6"/></svg></span>
            <span className="label">Comparison</span><b>Modal vs drawer vs bottom sheet</b><p>{comparisons.length} comparisons settle the most commonly confused patterns.</p>
          </a>
          <a className="fcard" href={href.glossary}>
            <span className="vis" aria-hidden="true" style={{ fontFamily: 'var(--f-display)', fontSize: 64, fontWeight: 800, letterSpacing: '-.05em' }}>A–Z</span>
            <span className="label">Glossary</span><b>{glossary.length} terms, plainly defined</b><p>From “affordance” to “z-index”, each linked to its full entry.</p>
          </a>
        </div>
        <div className="home-split reveal" style={{ marginTop: 16 }}>
          {featured.slice(0, 6).map(id => {
            const t = topics[id];
            return (<a key={id} className="fcard" href={href.topic(id)} style={{ minHeight: 0 }}>
              <span className="label">Featured · {t.type}</span><b>{t.title}</b><p>{t.summary}</p>
            </a>);
        })}
        </div>
      </section>

      <section className="hsec" aria-labelledby="h-recent">
        <div className="hsec-head reveal"><span className="sn">§ 05 — Updated</span><h2 id="h-recent">Recently reviewed.</h2><p>Every entry carries a review date; real-world examples carry the date their source was checked.</p></div>
        <ul className="recent reveal">{recentlyUpdated.map(id => <li key={id}><a href={href.topic(id)}><b>{topics[id].title}</b><small>{topics[id].lastReviewed}</small></a></li>)}</ul>
      </section>

      <section className="hsec" aria-labelledby="h-ux">
        <div className="ux-note reveal">
          <span className="big" aria-hidden="true">UX</span>
          <div><h2 id="h-ux" style={{ fontSize: 22, marginBottom: 6 }}>The UX Encyclopedia is the final planned release.</h2><p>Volume 1 covers user interface design only. Research, journeys, information architecture, usability and UX laws arrive after the UI volume is complete.</p></div>
          <a className="btn" href={href.ux}>See the roadmap <Icon n="arrow"/></a>
        </div>
      </section>
    </div>);
}
