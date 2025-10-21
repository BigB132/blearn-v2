
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Navigate to the login page
    page.goto("http://localhost:3000/login")
    page.screenshot(path="jules-scratch/verification/login-page.png")

    # Navigate to the register page
    page.goto("http://localhost:3000/register")
    page.screenshot(path="jules-scratch/verification/register-page.png")

    # Navigate to the forgot password page
    page.goto("http://localhost:3000/forgotpassword")
    page.screenshot(path="jules-scratch/verification/forgot-password-page.png")

    # Navigate to the verify page
    page.goto("http://localhost:3000/verify")
    page.screenshot(path="jules-scratch/verification/verify-page.png")

    # Navigate to the dashboard page
    page.goto("http://localhost:3000/")
    page.screenshot(path="jules-scratch/verification/dashboard-page.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
