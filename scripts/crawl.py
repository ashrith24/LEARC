import sys, asyncio, json
from playwright.async_api import async_playwright
async def main():
    w = int(sys.argv[1]) if len(sys.argv) > 1 else 1440
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': w, 'height': 900})
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
        pg.on('console', lambda m: errs.append('console: ' + m.text[:300]) if m.type == 'error' and 'net::' not in m.text else None)
        await pg.route('**/fonts.g*/**', lambda r: r.abort())
        await pg.goto('file:///home/claude/ui-encyclopedia/dist/index.html')
        await pg.wait_for_timeout(400)
        routes = await pg.evaluate("""() => { const a = new Set(); document.querySelectorAll('a[href^="#"]').forEach(x => a.add(x.getAttribute('href'))); return [...a]; }""")
        # gather full route list from data via the UI index page links
        await pg.evaluate("location.hash='#ui'"); await pg.wait_for_timeout(300)
        more = await pg.evaluate("""() => [...new Set([...document.querySelectorAll('a[href^="#"]')].map(x=>x.getAttribute('href')))]""")
        await pg.evaluate("location.hash='#compare'"); await pg.wait_for_timeout(300)
        more += await pg.evaluate("""() => [...new Set([...document.querySelectorAll('a[href^="#"]')].map(x=>x.getAttribute('href')))]""")
        await pg.evaluate("location.hash='#paths'"); await pg.wait_for_timeout(300)
        more += await pg.evaluate("""() => [...new Set([...document.querySelectorAll('a[href^="#"]')].map(x=>x.getAttribute('href')))]""")
        allr = sorted(set(routes + more + ['#glossary', '#ux', '#bogus-route']))
        bad = []; broken = []
        for r in allr:
            n0 = len(errs)
            await pg.evaluate(f"location.hash='{r}'")
            await pg.wait_for_timeout(120)
            info = await pg.evaluate("""() => ({ ov: document.documentElement.scrollWidth - document.documentElement.clientWidth, nf: !!document.querySelector('.nf'), h1: document.querySelector('h1')?.textContent || '' })""")
            if info['ov'] > 0: bad.append((r, info['ov']))
            if info['nf'] and r != '#bogus-route': broken.append(r)
            if len(errs) > n0: print('ERR on', r, errs[n0:])
        print('routes', len(allr), 'overflow', bad[:20], 'broken', broken)
        await b.close()
asyncio.run(main())
