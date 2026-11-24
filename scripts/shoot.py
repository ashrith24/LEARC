import sys, asyncio
from playwright.async_api import async_playwright
routes = sys.argv[1].split(',')
widths = [int(w) for w in (sys.argv[2] if len(sys.argv) > 2 else '1440').split(',')]
full = len(sys.argv) > 3 and sys.argv[3] == 'full'
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        for w in widths:
            pg = await b.new_page(viewport={'width': w, 'height': 900 if w > 700 else 800})
            errs = []
            pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' and 'fonts.g' not in m.text and 'ERR_' not in m.text else None)
            pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e)))
            await pg.route('**/fonts.googleapis.com/**', lambda r: r.abort())
            await pg.goto('file:///home/claude/ui-encyclopedia/dist/index.html')
            for r in routes:
                await pg.evaluate(f"location.hash = '{r}'")
                await pg.wait_for_timeout(500)
                await pg.evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'))")
                await pg.wait_for_timeout(150)
                ov = await pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
                name = f"shots/{r.strip('#') or 'home'}_{w}.png"
                await pg.screenshot(path=name, full_page=full)
                print(name, 'overflowX=', ov)
            if errs: print('ERRORS', w, errs[:10])
        await b.close()
asyncio.run(main())
