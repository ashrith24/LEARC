import asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': 1100, 'height': 900})
        await pg.route('**/fonts.g*/**', lambda r: r.abort())
        await pg.goto('file:///home/claude/ui-encyclopedia/dist/index.html')
        await pg.evaluate("location.hash='#ui'"); await pg.wait_for_timeout(300)
        ids = await pg.evaluate("[...document.querySelectorAll('.tlist a')].map(a=>a.getAttribute('href'))")
        for r in ids:
            await pg.evaluate(f"location.hash='{r}'"); await pg.wait_for_timeout(120)
            el = await pg.query_selector('#s-demo .demo')
            if el:
                await el.scroll_into_view_if_needed()
                await el.screenshot(path=f"shots/all/{r[3:]}.png")
        await b.close()
asyncio.run(main())
