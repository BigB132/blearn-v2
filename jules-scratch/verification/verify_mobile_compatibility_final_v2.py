
from playwright.sync_api import sync_playwright
import time
from pymongo import MongoClient

def run(playwright: sync_playwright):
    # Connect to the database
    client = MongoClient("mongodb+srv://BigB132:Bofe2011@cluster.zzvjfkv.mongodb.net/?retryWrites=true&tls=true&w=majority&appName=Cluster")
    db = client.test
    users = db.userdatas

    # Create a new user for the test session
    user = {
        "userName": f"testuser_{int(time.time())}",
        "email": f"test_{int(time.time())}@example.com",
        "password": "password",
        "mailtoken": 0,  # Mark as verified
        "unlockedTime": time.time() * 1000 + 1000 * 60 * 60 * 72
    }

    # Insert the new user into the database
    users.insert_one(user)

    # Set up browser
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Clear localStorage before navigating to the login page
    page.goto("http://localhost:3000")
    page.evaluate("() => localStorage.clear()")


    # Log in via UI
    page.goto("http://localhost:3000/login")
    page.fill("#username", user["userName"])
    page.fill("#password", user["password"])
    page.click("#loginBtn")
    page.wait_for_url("http://localhost:3000/dashboard")

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
            if page.url != url:
                page.goto(url)
            page.screenshot(path=f"jules-scratch/verification/{page_name}-{name}.png")

    browser.close()
    client.close()

with sync_playwright() as playwright:
    run(playwright)
