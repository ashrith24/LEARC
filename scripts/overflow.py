import asyncio
from playwright.async_api import async_playwright
JS = """() => { const W = innerWidth; const out = [];
  for (const el of document.querySelectorAll('main *')) {
    const r = el.getBoundingClientRect(); if (r.width === 0 || r.right <= W + 1) continue;
    let p = el.parentElement, clipped = false;
    while (p && p !== document.body) { const cs = getComputedStyle(p); if (['auto','scroll','hidden','clip'].includes(cs.overflowX) && p.getBoundingClientRect().right <= W + 1) { clipped = true; break; } p = p.parentElement; }
    if (!clipped) out.push((el.className && el.className.baseVal === undefined ? el.className : el.tagName) + ' ' + Math.round(r.right)); }
  return out.slice(0, 5); }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': 360, 'height': 800})
        await pg.route('**/fonts.g*/**', lambda r: r.abort())
        await pg.goto('file:///home/claude/ui-encyclopedia/dist/index.html')
        await pg.evaluate("location.hash='#ui'"); await pg.wait_for_timeout(300)
        ids = await pg.evaluate("[...document.querySelectorAll('.tlist a')].map(a=>a.getAttribute('href'))")
        ids += ['#home', '#ui', '#glossary', '#compare', '#paths', '#ux', '#path-beginner'] + ['#c-' + c for c in ['foundations','color','shapes','typography','icons','layout','surfaces','elements','forms','content','navigation','feedback','landing','app-patterns','page-layouts','styles','design-systems','motion','responsive-a11y']]
        ids += ['#cmp-' + c for c in ['modal-drawer-sheet','tooltip-popover-hovercard','card-panel-container','button-vs-link','tabs-vs-segmented','checkbox-radio-switch','select-combobox-autocomplete','toast-alert-snackbar','navbar-sidebar-rail','accordion-vs-dropdown','hero-vs-banner','badge-tag-chip','skeleton-spinner-progress']]
        bad = 0
        for r in ids:
            await pg.evaluate(f"location.hash='{r}'"); await pg.wait_for_timeout(100)
            o = await pg.evaluate(JS)
            if o: bad += 1; print(r, o)
        print('pages with overflow:', bad, 'of', len(ids))
        await b.close()
asyncio.run(main())
