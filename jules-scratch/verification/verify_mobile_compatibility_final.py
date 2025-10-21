
from playwright.sync_api import sync_playwright, APIRequestContext
import time

def run(playwright: sync_playwright):
    # Create a new user for the test session
    api_context = playwright.request.new_context(base_url="http://localhost:3000")
    user = {
        "username": f"testuser_{int(time.time())}",
        "email": f"test_{int(time.time())}@example.com",
        "password": "password"
    }

    # Register the new user
    api_context.post("/api/auth/register", data=user)

    # Verify the user using the temporary test route
    api_context.post("/api/auth/verify-test-user", data={"userName": user["username"]})

    # Set up browser
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # "Login" by setting localStorage with the new user's credentials
    page.goto("http://localhost:3000/login")
    page.evaluate(f"() => {{ localStorage.setItem('username', '{user['username']}'); }}")
    page.evaluate(f"() => {{ localStorage.setItem('password', '{user['password']}'); }}")

    viewports = {
        "mobile": (375, 667),
        "tablet": (768, 1024),
        "desktop": (1280, 720),
    }

    pages_to_capture = [
        "landing", "login", "register", "forgotpassword", "verify", "dashboard",
        "learn", "createlist", "list", "editlist", "createTable", "table",
        "editTable", "importlist", "timetable", "homework", "privacy"
    ]

    for name, (width, height) in viewports.items():
        page.set_viewport_size({"width": width, "height": height})
        for page_name in pages_to_capture:
            url = f"http://localhost:3000/{page_name if page_name != 'landing' else ''}"
            page.goto(url)
            page.screenshot(path=f"jules-scratch/verification/{page_name}-{name}.png")

    browser.close()
    api_context.dispose()

with sync_playwright() as playwright:
    run(playwright)
