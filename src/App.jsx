import { useEffect, useState } from 'react';
import { useRoute, href } from './router';
import { topics, catById, comparisons, paths } from './content';
import { Header, Sidebar, Footer } from './components/Chrome';
import { SearchPalette } from './components/SearchPalette';
import { TopicPage } from './components/TopicPage';
import { Home } from './components/Home';
import { UIIndex, CategoryPage, CompareIndex, ComparePage, DesignTrends, Glossary, PathsIndex, PathPage, UXPage, NotFound } from './components/Pages';
export function App() {
    const route = useRoute();
    const [pal, setPal] = useState({ open: false, q: '' });
    const [side, setSide] = useState(false);
    const openSearch = (q = '') => setPal({ open: true, q });
    useEffect(() => {
        const k = (e) => {
            const tag = e.target?.tagName;
            const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target?.isContentEditable;
            if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setPal(p => ({ open: !p.open, q: '' }));
            }
            else if (e.key === '/' && !typing && !pal.open) {
                e.preventDefault();
                openSearch();
            }
        };
        window.addEventListener('keydown', k);
        return () => window.removeEventListener('keydown', k);
    }, [pal.open]);
    useEffect(() => setSide(false), [route]);
    const valid = (route.name === 'topic' && !topics[route.id]) || (route.name === 'cat' && !catById[route.id]) ||
        (route.name === 'cmp' && !comparisons.some(c => c.id === route.id)) || (route.name === 'path' && !paths.some(p => p.id === route.id))
        ? { name: 'notfound', hash: route.id } : route;
    const doc = valid.name === 'topic' || valid.name === 'cat' || valid.name === 'ui';
    let page;
    switch (valid.name) {
        case 'home':
            page = <Home onSearch={openSearch}/>;
            break;
        case 'ui':
            page = <UIIndex />;
            break;
        case 'cat':
            page = <CategoryPage id={valid.id}/>;
            break;
        case 'topic':
            page = <TopicPage id={valid.id}/>;
            break;
        case 'compare':
            page = <CompareIndex />;
            break;
        case 'cmp':
            page = <ComparePage id={valid.id}/>;
            break;
        case 'trends':
            page = <DesignTrends />;
            break;
        case 'glossary':
            page = <Glossary />;
            break;
        case 'paths':
            page = <PathsIndex />;
            break;
        case 'path':
            page = <PathPage id={valid.id}/>;
            break;
        case 'ux':
            page = <UXPage />;
            break;
        default: page = <NotFound hash={valid.hash}/>;
    }
    const key = location.hash || '#home';
    return (<>
      <a className="skip" href="#main" data-native onClick={e => { e.preventDefault(); const m = document.getElementById('main'); m?.focus(); m?.scrollIntoView(); }}>Skip to content</a>
      <Header route={valid} onSearch={() => openSearch()} onMenu={() => setSide(true)} sidebar={doc}/>
      {doc ? (<div className="shell">
          <Sidebar route={valid} open={side} onClose={() => setSide(false)}/>
          <main id="main" tabIndex={-1} className="main"><div className="route" key={key}>{page}</div></main>
        </div>) : (<main id="main" tabIndex={-1} className={valid.name === 'home' ? '' : 'full-main'}><div className="route" key={key}>{page}</div></main>)}
      <Footer />
      <SearchPalette open={pal.open} initial={pal.q} onClose={() => setPal({ open: false, q: '' })}/>
    </>);
}
export { href };
