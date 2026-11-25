import { useEffect, useState } from 'react';
import { Crumbs } from './Chrome';
import { Icon } from './Icon';
import { href } from '../router';
import { designTrends, componentEvolution } from '../content/design-trends';

const setTitle = () => { document.title = 'Learc — Design Trends'; };

export function DesignTrends() {
    const [year, setYear] = useState(2026);
    const [view, setView] = useState('timeline');
    const selected = designTrends.find(item => item.year === year) || designTrends[0];
    const groups = [...new Set(selected.entries.map(item => item.category))].map(category => ({ category, entries: selected.entries.filter(item => item.category === category) }));
    useEffect(setTitle, []);
    return <div className="wrap trends-page">
      <Crumbs items={[["Home", href.home], ['Design Trends']]}/>
      <header className="page-head trend-page-head">
        <span className="label">2007–2026 · interface evolution</span>
        <h1>Design trends, year by year.</h1>
        <p>Explore documented shifts in visual language, components and interaction. Dates distinguish a product milestone from a style becoming popular.</p>
      </header>
      <div className="trend-view-switch" role="tablist" aria-label="Browse design trends">
        <button type="button" role="tab" aria-selected={view === 'timeline'} className={view === 'timeline' ? 'selected' : ''} onClick={() => setView('timeline')}>By year</button>
        <button type="button" role="tab" aria-selected={view === 'components'} className={view === 'components' ? 'selected' : ''} onClick={() => setView('components')}>By component</button>
      </div>
      {view === 'timeline' ? <>
        <div className="trend-timeline" role="group" aria-label="Select a year">
          {designTrends.map(item => <button key={item.year} type="button" className={item.year === year ? 'selected' : ''} aria-pressed={item.year === year} onClick={() => setYear(item.year)}>{item.year}</button>)}
        </div>
        <header className="trend-year-intro" aria-live="polite">
          <div><span className="label">Selected year</span><h2>{selected.year}</h2></div>
          <p>{selected.intro}</p>
        </header>
        {groups.map(group => <section className="trend-group" key={group.category} aria-labelledby={'trend-group-' + slug(group.category)}>
          <h3 id={'trend-group-' + slug(group.category)}>{group.category}</h3>
          <div className="trend-entries">{group.entries.map((item, i) => <TrendEntry key={item.id} item={item} year={selected.year} index={i + 1}/>)}</div>
        </section>)}
        {selected.entries.length === 0 && <p className="trend-empty-note">No separately dated milestone is listed for this year. The period summary above describes its continued evolution.</p>}
        <nav className="trend-neighbors" aria-label="Browse neighboring years">
          <button type="button" disabled={year === designTrends[0].year} onClick={() => setYear(year - 1)}>← Previous</button>
          <span>{designTrends.indexOf(selected) + 1} of {designTrends.length} years</span>
          <button type="button" disabled={year === designTrends[designTrends.length - 1].year} onClick={() => setYear(year + 1)}>Next →</button>
        </nav>
      </> : <ComponentEvolution/>}
    </div>;
}

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function TrendEntry({ item, year, index }) {
    return <article className="trend-entry">
      <TrendVisual item={item}/>
      <div className="trend-entry-copy">
        <div className="trend-entry-meta"><span className="trend-date-status">{item.dateStatus}</span><span>{year}{item.visualDate ? ` · ${item.visualDate}` : ''}</span></div>
        <h4>{item.title}</h4>
        <p className="trend-relevance">{item.yearRelevance}</p>
        <dl className="trend-facts">
          <div><dt>What changed</dt><dd>{item.change}</dd></div>
          <div><dt>Components affected</dt><dd>{item.components}</dd></div>
          <div><dt>Interaction and states</dt><dd>{item.interaction}</dd></div>
          <div><dt>Why it mattered</dt><dd>{item.why}</dd></div>
          <div><dt>Limitations</dt><dd>{item.limitations}</dd></div>
        </dl>
        <div className="trend-example"><b>Example</b><span>{item.product} · {item.platform}</span></div>
        <div className="trend-sources"><span className="label">Evidence & sources</span>{item.sources.map((ref, i) => <a key={ref.url + i} href={ref.url} target="_blank" rel="noreferrer"><b>{ref.label}</b><small>{ref.grade}</small><span aria-hidden="true">↗</span></a>)}</div>
      </div>
    </article>;
}

function TrendVisual({ item, compact = false }) {
    const v = item.visual;
    let specimen;
    if (v === 'touch-phone' || v === 'app-launcher' || v === 'home-widgets') specimen = <div className="trend-phone"><div className="trend-phone-status"><b>9:41</b><span>● ● ▰</span></div>{v === 'touch-phone' ? <><strong>Calculator</strong><div className="phone-calc">{['AC','±','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','0','.','='].map(x => <i key={x}>{x}</i>)}</div></> : <><strong>{v === 'home-widgets' ? 'Today' : 'Apps'}</strong><div className="phone-apps">{(v === 'home-widgets' ? ['Weather','68°','Calendar','2 events','Music','Play'] : ['Phone','Mail','Photos','Maps','Notes','Music','Clock','Store']).map((x, i) => <i key={x} style={{ '--app-hue': `${(i * 47 + 205) % 360}` }}>{x}</i>)}</div>{v === 'home-widgets' && <nav>Today　Search　Library</nav>}</>}</div>;
    else if (v === 'skeuomorphic-controls') specimen = <div className="skeuo-specimen"><div className="skeuo-notes"><b>Notes</b><div>Ideas for today</div><p>• Call home<br/>• Pick up groceries<br/>• Save this note</p></div><div className="skeuo-dial"><i/><span>AM</span></div></div>;
    else if (v === 'glossy-button' || v === 'neumorphic-controls' || v === 'button-evolution') specimen = <div className="specimen-buttons"><span className="specimen-label">Primary action</span><button className={'specimen-button ' + (v === 'glossy-button' ? 'glossy' : v === 'neumorphic-controls' ? 'neumorphic' : 'flat')}>Continue</button><button className="specimen-button secondary">Cancel</button>{v === 'neumorphic-controls' && <div className="soft-input">Email address</div>}</div>;
    else if (v === 'responsive-layout' || v === 'responsive-framework') specimen = <div className="responsive-specimen"><div className="responsive-desktop"><b>Desktop</b><nav/><section><i/><i/><i/></section></div><div className="responsive-mobile"><b>Mobile</b><nav>☰</nav><section><i/><i/></section></div></div>;
    else if (v === 'metro-tiles') specimen = <div className="metro-board">{[['Mail','2','blue'],['Calendar','24','purple'],['Photos','','orange'],['People','','teal'],['News','Today','red']].map(([a,b,c]) => <div key={a} className={c}><small>{a}</small><b>{b}</b></div>)}</div>;
    else if (v === 'bootstrap-kit' || v === 'form-evolution') specimen = <div className="kit-specimen"><nav>Brand <span>Home　About　Contact</span></nav><div className="kit-grid"><label>Email address<input value="name@example.com" readOnly/></label><button>Submit</button><span className="kit-alert">Your changes are saved.</span></div></div>;
    else if (v === 'material-input') specimen = <div className="material-input"><label>EMAIL ADDRESS<input value="name@example.com" readOnly/></label><label className="filled">Search<input value="Design systems" readOnly/></label><small>Helper text · Error text</small></div>;
    else if (v === 'ios7-controls' || v === 'selection-evolution') specimen = <div className="ios-specimen"><nav>‹ <b>Settings</b> <span>General</span></nav><div className="ios-row">Notifications <i className="ios-switch"/></div><div className="ios-row">Display & Brightness <b>›</b></div><div className="ios-row">Control Center <b>›</b></div></div>;
    else if (v === 'component-tree') specimen = <div className="tree-specimen"><div>App shell</div><i/><section><span>Navigation</span><span>Content</span></section><i/><section><span>Button</span><span>Card</span><span>Form</span></section></div>;
    else if (v === 'material-components' || v === 'card-patterns' || v === 'card-evolution') specimen = <div className="material-specimen"><div className="material-card"><small>FEATURED</small><b>Project overview</b><p>One clear summary with a supporting action.</p><button>Open project</button></div><button className="material-fab">+</button></div>;
    else if (v === 'component-library' || v === 'accessible-states' || v === 'foundations-evolution') specimen = <div className="state-sheet"><div><span>Button states</span><button>Default</button><button className="focus">Focus</button><button className="disabled" disabled>Disabled</button></div><div><span>Field states</span><input value="Valid value" readOnly/><input className="error" value="Check this value" readOnly/></div></div>;
    else if (v === 'fluent-acrylic' || v === 'overlay-evolution' || v === 'liquid-glass-controls' || v === 'glass-panel') specimen = <div className={'glass-scene ' + (v === 'fluent-acrylic' || v === 'overlay-evolution' ? 'acrylic' : '')}><div className="glass-backdrop"><b>Workspace</b><span>Projects　People　Settings</span><i/><i/><i/></div><div className="glass-panel"><b>{v === 'liquid-glass-controls' ? 'Control Center' : 'Quick actions'}</b><button>Share</button><button>Move to folder</button></div><button className="glass-pill">•••</button></div>;
    else if (v === 'darkmode' || v === 'accessible-themes') specimen = <div className="theme-specimen"><div className="theme-light"><b>Light</b><button>Save changes</button><i/></div><div className="theme-dark"><b>Dark</b><button>Save changes</button><i/></div><span className="focus-ring">Keyboard focus</span></div>;
    else if (v === 'material-you') specimen = <div className="material-you"><div className="my-wallpaper"/><div className="my-widget"><small>MONDAY, OCT 18</small><b>Good morning</b><span>68°　Sunny</span></div><div className="my-swatches"><i/><i/><i/><i/></div></div>;
    else if (v === 'clay-style') specimen = <div className="clay-specimen"><div className="clay-orb">3D</div><button className="clay-button">Create project</button><div className="clay-card"><i/><i/><b>Soft surfaces</b></div></div>;
    else if (v === 'modular-dashboard') specimen = <div className="bento-specimen"><div className="bento-head">Overview <span>Today⌄</span></div><div className="bento-grid"><div className="bento-metric"><small>REVENUE</small><b>$24.8k</b><i>↗ 12.4%</i></div><div className="bento-chart"><small>ACTIVITY</small><span>{[22,38,31,55,44,72,61,90,68].map((n,i)=><i key={i} style={{height:n+'%'}}/>)}</span></div><div className="bento-task"><small>UP NEXT</small><b>Review launch plan</b><button>Open task →</button></div></div></div>;
    else if (v === 'glass-tactile-duo') specimen = <div className="duo-specimen"><div><small>LIQUID GLASS · MATERIAL STUDY</small><div className="duo-glass"><b>Control Center</b><button>Display</button><button>Sound</button></div></div><div><small>TACTILE · SEPARATE VISUAL STYLE</small><div className="duo-tactile"><b>Made by hand</b><button>Explore</button><i>✳</i></div></div></div>;
    else if (v === 'chat-composer' || v === 'chat-evolution') specimen = <div className="chat-specimen"><div className="chat-answer"><b>Assistant</b><p>Here are three useful next steps…</p><span>Copy　　Regenerate</span></div><div className="chat-input">Ask anything… <button>↑</button></div><small>Stop generating</small></div>;
    else if (v === 'spatial-panels') specimen = <div className="spatial-scene"><div className="spatial-window back"><b>Photos</b><i/><i/></div><div className="spatial-window front"><b>Workspace</b><button>Open project</button><small>Look · pinch · speak</small></div></div>;
    else if (v === 'multimodal-composer') specimen = <div className="multi-specimen"><div className="multi-result"><b>Image summary</b><p>What would you like to know about this?</p></div><div className="multi-attachment">▧　Photo attached <button>×</button></div><div className="multi-input">Ask with text or voice…<button>◉</button><button>↑</button></div><small>Image · voice · text</small></div>;
    else if (v === 'agent-plan') specimen = <div className="agent-specimen"><b>Plan · Review before sending</b><ol><li><i>✓</i> Find the requested document</li><li><i>✓</i> Draft a reply</li><li className="pending"><i>3</i> Wait for your approval</li></ol><div><button>Approve</button><button className="quiet">Stop task</button></div></div>;
    else if (v === 'ambient-adaptation') specimen = <div className="ambient-specimen"><div><small>BEFORE</small><b>All updates</b><i/><i/><i/></div><span>→</span><div><small>AFTER · YOUR CHOICE</small><b>Priority updates</b><i/><i/></div><button>Personalize feed　⌄</button></div>;
    else if (v === 'transparent-ai') specimen = <div className="evidence-specimen"><span>GENERATED SUMMARY</span><b>Three changes affect your project.</b><p>Based on the latest team updates.</p><a>Sources (3)　⌄</a><div><button>Helpful</button><button>Correct this</button></div></div>;
    else if (v === 'calm-interface') specimen = <div className="calm-specimen"><nav>Studio　　Projects　　Notes</nav><small>MONDAY, 24 NOVEMBER</small><b>Good morning, Alex.</b><p>One thoughtful next step is ready when you are.</p><button>Continue where you left off</button></div>;
    else if (v === 'motion-states' || v === 'motion-evolution') specimen = <div className="motion-specimen"><div><span>DEFAULT</span><button>Save changes</button></div><div><span>IN PROGRESS</span><button className="progress">◌　Saving…</button></div><div><span>COMPLETE</span><button className="complete">✓　Saved</button></div><small>Reduced motion: state changes without movement</small></div>;
    else if (v === 'localized-interface') specimen = <div className="locale-specimen"><nav>दुकान　　खोजें　　खाता</nav><b>आपका ऑर्डर</b><p>डिलीवरी पता</p><div>आरव शर्मा<br/>12 MG Road, Bengaluru 560001</div><strong>कुल　₹1,240.00</strong><small>24 नवम्बर 2026</small></div>;
    else if (v === 'search-evolution') specimen = <div className="search-specimen"><label>⌕　Search projects…</label><div><small>RECENT</small><p>Brand refresh</p><p>Mobile checkout</p><p>Design system</p></div><span>↑↓ Navigate　↵ Open　Esc Close</span></div>;
    else if (v === 'navigation-evolution') specimen = <div className="navigation-specimen"><aside><b>Workspace</b><span>⌂　Home</span><span>▦　Projects</span><span>◷　Activity</span></aside><main><nav>←　Project overview　　•••</nav><section><b>Navigation adapts to task and screen</b><p>Persistent destinations remain distinct from contextual actions.</p></section></main></div>;
    else if (v === 'data-evolution') specimen = <div className="table-specimen"><nav>Orders　　Customers　　Reports</nav><table><thead><tr><th>Order</th><th>Status</th><th>Total</th></tr></thead><tbody><tr><td>#1048</td><td>Paid</td><td>$84.00</td></tr><tr><td>#1047</td><td>Processing</td><td>$32.00</td></tr><tr><td>#1046</td><td>Refunded</td><td>$18.00</td></tr></tbody></table><button>Filter　⌄</button></div>;
    else if (v === 'landing-evolution') specimen = <div className="landing-specimen"><nav>Northstar <span>Product　Company　Sign in</span><button>Get started</button></nav><div><small>WORK, IN FOCUS</small><b>Make room for<br/>your best work.</b><p>A calm workspace for teams that build together.</p><button>Explore the product →</button></div></div>;
    else specimen = <div className="specimen-buttons"><span className="specimen-label">{item.components}</span><button className="specimen-button">Explore pattern</button></div>;
    return <figure className={'trend-visual trend-art-' + v + (compact ? ' trend-visual-compact' : '')} data-trend-id={item.asset?.trendId} aria-label={`${item.title} illustrative component reconstruction`}>
      <div className="trend-visual-top"><span>{item.product}</span><b>{item.platform}</b></div>
      <div className="trend-art-stage" aria-hidden="true" inert={true}>{specimen}</div>
      <figcaption>{item.visualCaption}<b>Illustrative reconstruction · not an original historical screenshot</b></figcaption>
    </figure>;
}

function ComponentEvolution() {
    return <div className="component-evolution">
      <header className="trend-year-intro"><div><span className="label">Component library</span><h2>Interfaces, component by component.</h2></div><p>Compare documented design shifts across the building blocks people use every day. Dates name periods and evidence; an adoption date does not claim invention.</p></header>
      {componentEvolution.map(group => <section className="component-evolution-group" key={group.name}>
        <details className="component-evolution-details">
          <summary className="component-evolution-heading"><div><span className="label">Component evolution · {group.evolutions.length} periods</span><h3>{group.name}</h3></div><p>{group.components}</p><span className="component-evolution-chevron" aria-hidden="true"><Icon n="chevD" s={15}/></span></summary>
          <ol>{group.evolutions.map(([date, name, note, refs]) => {
            const item = { title: name, visual: componentVisual(group.name, name), product: 'Component study', platform: 'Illustrative specimen', visualCaption: note, components: group.components };
            return <li key={date + name}><span className="component-evolution-date">{date}</span><TrendVisual item={item} compact/><div><b>{name}</b><p>{note}</p><div className="trend-source-inline">{refs.map((ref, i) => <a href={ref.url} key={ref.url + i} target="_blank" rel="noreferrer">{ref.label} ↗ <small>{ref.grade}</small></a>)}</div></div></li>;
          })}</ol>
        </details>
      </section>)}
    </div>;
}

function componentVisual(component, period) {
    const p = period.toLowerCase();
    if (component === 'Buttons') return p.includes('glossy') || p.includes('skeuomorphic') ? 'glossy-button' : p.includes('flat') ? 'button-evolution' : p.includes('material') ? 'material-components' : p.includes('soft') ? 'neumorphic-controls' : p.includes('glass') ? 'liquid-glass-controls' : 'agent-plan';
    if (component === 'Inputs & forms') return p.includes('keyboard') ? 'touch-phone' : p.includes('material') ? 'material-input' : p.includes('prompt') ? 'chat-composer' : 'multimodal-composer';
    if (component === 'Selection controls') return p.includes('dynamic') ? 'material-you' : p.includes('translucent') ? 'liquid-glass-controls' : 'ios7-controls';
    if (component === 'Search & command') return p.includes('conversational') ? 'chat-composer' : 'search-evolution';
    if (component === 'Navigation') return p.includes('spatial') ? 'spatial-panels' : p.includes('liquid') ? 'liquid-glass-controls' : p.includes('layered') ? 'fluent-acrylic' : p.includes('responsive') ? 'responsive-layout' : 'ios7-controls';
    if (component === 'Cards & page sections') return p.includes('widget') ? 'home-widgets' : p.includes('evidence') ? 'transparent-ai' : 'material-components';
    if (component === 'Overlays') return p.includes('fluent') ? 'fluent-acrylic' : 'glass-panel';
    if (component === 'Data interfaces') return p.includes('evidence') ? 'transparent-ai' : 'data-evolution';
    if (component === 'Landing pages') return 'landing-evolution';
    if (component === 'Motion & feedback') return 'motion-states';
    return p.includes('dynamic') ? 'material-you' : p.includes('responsive') ? 'responsive-layout' : p.includes('fluent') ? 'fluent-acrylic' : 'accessible-themes';
}
