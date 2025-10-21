
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    viewports = {
        "mobile": (375, 667),
        "tablet": (768, 1024),
        "desktop": (1280, 720),
    }

    # "Login" by setting localStorage
    page.goto("http://localhost:3000/login")
    page.evaluate("() => { localStorage.setItem('username', 'test'); }")
    page.evaluate("() => { localStorage.setItem('password', 'test'); }")


    pages_to_capture = [
        "landing",
        "login",
        "register",
        "forgotpassword",
        "verify",
        "dashboard",
        "learn",
        "createlist",
        "list",
        "editlist",
        "createTable",
        "table",
        "editTable",
        "importlist",
        "timetable",
        "homework",
        "privacy",
    ]

    for name, (width, height) in viewports.items():
        page.set_viewport_size({"width": width, "height": height})
        for page_name in pages_to_capture:
            url = f"http://localhost:3000/{page_name if page_name != 'landing' else ''}"
            page.goto(url)
            page.screenshot(path=f"jules-scratch/verification/{page_name}-{name}.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
