import sys, asyncio
from playwright.async_api import async_playwright
async def main():
    routes = sys.argv[1].split(','); w = int(sys.argv[2]); sel = sys.argv[3] if len(sys.argv) > 3 else None
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': w, 'height': 1000})
        await pg.route('**/fonts.g*/**', lambda r: r.abort())
        await pg.goto('file:///home/claude/ui-encyclopedia/dist/index.html')
        for r in routes:
            await pg.evaluate(f"location.hash='{r}'"); await pg.wait_for_timeout(350)
            await pg.evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'))")
            if sel:
                el = await pg.query_selector(sel)
                if el:
                    await el.scroll_into_view_if_needed(); await pg.wait_for_timeout(200)
                    await el.screenshot(path=f"shots/{r.strip('#')}_{w}_demo.png")
                    print('ok', r); continue
            await pg.screenshot(path=f"shots/{r.strip('#')}_{w}.png")
        await b.close()
asyncio.run(main())
