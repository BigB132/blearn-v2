const autologin = `
    document.addEventListener('DOMContentLoaded', async function() {
    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (savedUser && savedPass) {
      try {
        const res = await fetch("/api/auth/checkData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: savedUser, password: savedPass })
        });

        const data = await res.json();

        if (data.state === "success") {
          if(data.verified === "false"){
            window.location.href = "/verify";
            return
          }
          window.location.href = "/dashboard";
          return;
        }
      } catch (err) {
        console.warn("Autologin failed:", err);
      }
    }
});
`;

const autologin2 = `
    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (savedUser && savedPass) {
      try {
        const res = await fetch("/api/auth/checkData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: savedUser, password: savedPass })
        });

        const data = await res.json();

        if (data.state === "success") {
          if(data.verified === "false"){
            window.location.href = "/verify";
            return
          }
          window.location.href = "/dashboard";
          return;
        }
      } catch (err) {
        console.warn("Autologin failed:", err);
      }
    }
`;

const autologin3 = `
const savedUser = localStorage.getItem("username");
const savedPass = localStorage.getItem("password");

if (savedUser && savedPass) {
try {
    const res = await fetch("/api/auth/checkData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: savedUser, password: savedPass })
    });

    const data = await res.json();

    if (data.state === "success") {
    if(data.verified === "false"){
        window.location.href = "/verify";
        return
    }
    }
} catch (err) {
    console.warn("Autologin failed:", err);
}
}
`;

const header = `
    <header class="bg-white dark:bg-gray-800 shadow-md py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center">
    <a href="/dashboard" class="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-400">Blearn</a>
    
    <!-- Profile Dropdown -->
    <div class="relative">
      <button id="profileToggle" class="flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
        <!-- Profile Avatar -->
        <div class="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <!-- Username -->
        <span id="profileName" class="font-medium text-xs sm:text-sm hidden sm:inline">Profile</span>
        <!-- Dropdown Arrow -->
        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80 transition-transform duration-200 group-hover:text-white" id="profileArrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <!-- Dropdown Menu -->
      <div id="profileDropdown" class="absolute top-12 right-0 bg-white dark:bg-gray-800 shadow-xl rounded-lg py-2 min-w-[180px] border dark:border-gray-700 opacity-0 invisible transform scale-95 transition-all duration-200 z-50">
        
        <!-- Menu Items -->
        <button id="profileSettingsBtn" class="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center gap-3 transition-colors duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span class="text-sm">Profile Settings</span>
        </button>
        
        <div class="border-t dark:border-gray-700 my-1"></div>
        
        <button id="logoutBtn" class="w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-3 transition-colors duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span class="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  </header>
  <script>
    class ProfileManager {
      constructor() {
        this.setupEventListeners();
      }

      setupEventListeners() {
        const profileToggle = document.getElementById('profileToggle');
        const profileDropdown = document.getElementById('profileDropdown');
        const profileArrow = document.getElementById('profileArrow');
        const profileSettingsBtn = document.getElementById('profileSettingsBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        profileSettingsBtn.addEventListener('click', (e) => {
            window.location.href = '/settings'
        });

        logoutBtn.addEventListener('click', (e) => {
            window.location.href = '/logout'
        });


        profileToggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const isVisible = !profileDropdown.classList.contains('opacity-0');
          
          if (isVisible) {
            this.closeDropdown();
          } else {
            this.openDropdown();
          }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
          if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
            this.closeDropdown();
          }
        });

        // Profile Settings button
        document.getElementById('profileSettingsBtn').addEventListener('click', () => {
          this.closeDropdown();
          // Add your profile settings navigation logic here
          console.log('Navigate to profile settings');
          // Example: window.location.href = '/profile-settings';
        });
      }

      openDropdown() {
        const dropdown = document.getElementById('profileDropdown');
        const arrow = document.getElementById('profileArrow');
        
        dropdown.classList.remove('opacity-0', 'invisible', 'scale-95');
        dropdown.classList.add('opacity-100', 'visible', 'scale-100');
        arrow.style.transform = 'rotate(180deg)';
      }

      closeDropdown() {
        const dropdown = document.getElementById('profileDropdown');
        const arrow = document.getElementById('profileArrow');
        
        dropdown.classList.add('opacity-0', 'invisible', 'scale-95');
        dropdown.classList.remove('opacity-100', 'visible', 'scale-100');
        arrow.style.transform = 'rotate(0deg)';
      }
    }

    document.addEventListener('DOMContentLoaded', async function() {
        new ProfileManager();


        let username = localStorage.getItem("username");
        const usernameField = document.getElementById('profileName');
        usernameField.innerHTML = username;
    })
</script>
`;

const notificationContainer = `
<div id="notificationContainer" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"></div>
`;

const notificationScript = `
function showNotification(message, type = 'success', duration = 4000) {
    const container = document.getElementById('notificationContainer');
    
    // Create notification element
    const notification = document.createElement('div');
    
    // Set base classes
    const baseClasses = 'p-4 rounded-xl shadow-lg border backdrop-blur-sm transform transition-all duration-300 ease-in-out mb-3';
    
    // Set type-specific classes
    let typeClasses = '';
    if (type === 'success') {
        typeClasses = 'bg-green-50/90 dark:bg-green-900/80 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200';
    } else if (type === 'error') {
        typeClasses = 'bg-red-50/90 dark:bg-red-900/80 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200';
    }
    
    notification.className = \`\${baseClasses} \${typeClasses} translate-y-[-20px] opacity-0\`;
    notification.innerHTML = \`
        <div class="flex items-center justify-between">
            <span class="font-medium">\${message}</span>
            <button onclick="removeNotification(this.parentElement.parentElement)" 
                    class="ml-4 text-current opacity-60 hover:opacity-100 transition-opacity">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    \`;
    
    // Add to container
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.remove('translate-y-[-20px]', 'opacity-0');
        notification.classList.add('translate-y-0', 'opacity-100');
    }, 10);
    
    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }
}

// Helper function to remove notifications
function removeNotification(notification) {
    notification.classList.add('translate-y-[-20px]', 'opacity-0');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}
`;

const footer = `
<footer class="bg-white dark:bg-gray-800 text-center text-sm py-4 border-t dark:border-gray-700 mt-8 text-gray-500 dark:text-gray-400">
    © 2025 Blearn. All rights reserved. <a href="/privacy"><u>Privacy Policy</u></a>
</footer>
`;

const fastInit = `
<script>
    (function() {
        const savedTheme = localStorage.getItem('theme') || 'system';
        const html = document.documentElement;
        
        if (savedTheme === 'system') {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemDark) html.classList.add('dark');
        } else if (savedTheme === 'dark') {
            html.classList.add('dark');
        }
    })();
</script>
`;

const landing = async (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="google-site-verification" content="MOa_upgamZEsDEVLWmlDnDJybC7H1uEyHhDrgCECwWI" />
        <title>Welcome to Blearn</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>

        ${fastInit}

        </head>
        <body class="bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center px-4">

        <div class="w-full max-w-md md:max-w-3xl text-center bg-white dark:bg-gray-800 p-6 md:p-10 rounded-xl shadow-xl border dark:border-gray-700 transition-all duration-300">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 md:mb-6 transition-colors duration-300">
            Welcome to <span class="text-blue-600 dark:text-blue-400">Blearn</span>
            </h1>
            <p class="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 transition-colors duration-300">
            Your all-in-one platform to learn vocabulary! Let's make learning a fun experinence!
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <a href="/register"
                class="px-6 py-3 md:px-8 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
                Register
            </a>
            <a href="/login"
                class="px-6 py-3 md:px-8 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg">
                Login
            </a>
            </div>
            ${footer}
        </div>

        <script>
            class ThemeManager {
                constructor() {
                    this.init();
                    this.setupEventListeners();
                }

                init() {
                    const savedTheme = localStorage.getItem('theme') || 'system';
                    this.applyTheme(savedTheme);
                }

                applyTheme(theme) {
                    const html = document.documentElement;
                
                    if (theme === 'system') {
                        // Use system preference
                        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        html.classList.toggle('dark', systemDark);
                    } else if (theme === 'dark') {
                        html.classList.add('dark');
                    } else {
                        html.classList.remove('dark');
                    }
                }
            }

            // Initialize theme manager when DOM is loaded
            document.addEventListener('DOMContentLoaded', () => {
                new ThemeManager();
            });
        </script>
        </body>
        </html>    
    `);
};

// Express route implementation
const register = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Blearn - Signup</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
                tailwind.config = {
                    darkMode: 'class'
                }
            </script>

            ${fastInit}
        </head>
        <body class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
            <div class="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 transition-colors duration-300">
                <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white transition-colors duration-300">Create an account</h1>
                
                <form id="signupForm" class="space-y-4">
                    <input 
                        id="username" 
                        type="text" 
                        placeholder="Username" 
                        class="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        required>
                    
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="E-Mail Adress" 
                        class="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        required>
                    
                    <div class="relative">
                        <input 
                            id="password" 
                            type="password" 
                            placeholder="Password" 
                            class="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                            required>
                        <button 
                            id="togglePassword" 
                            type="button" 
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
                            👁️
                        </button>
                    </div>
                    
                    <button 
                        type="submit" 
                        class="w-full px-4 py-2 font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        Sign Up
                    </button>
                </form>

                <br>

                <a
                    id="alreadyHaveAccount"
                    href="/login"
                    type="button"
                    class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    Already have an account?
                </a>
                
                <div id="message" class="text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300"></div>
                ${footer}
            </div>


            <script>
                // Dark mode functionality
                function initDarkMode() {
                    const savedTheme = localStorage.getItem('theme') || 'system';
                    applyTheme(savedTheme);
                }

                function applyTheme(theme) {
                    const html = document.documentElement;
                    
                    if (theme === 'system') {
                        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        html.classList.toggle('dark', systemDark);
                    } else if (theme === 'dark') {
                        html.classList.add('dark');
                    } else {
                        html.classList.remove('dark');
                    }
                }

                // Initialize dark mode
                initDarkMode();

                // Simple form state
                let isSubmitting = false;

                // Get elements
                const form = document.getElementById('signupForm');
                const toggleBtn = document.getElementById('togglePassword');
                const passwordInput = document.getElementById('password');
                const message = document.getElementById('message');

                passwordInput.addEventListener("keyup", (event) => {
                    if (event.key === "Enter") {
                        form.querySelector('button[type="submit"]').click();
                    }
                });

                // Toggle password visibility
                toggleBtn.addEventListener('click', () => {
                    const isPassword = passwordInput.type === 'password';
                    passwordInput.type = isPassword ? 'text' : 'password';
                    toggleBtn.textContent = isPassword ? '🙈' : '👁️';
                });

                // Show message helper
                function showMessage(text, isError) {
                    if (isError === undefined) isError = false;
                    
                    message.textContent = text;
                    message.className = \`text-center text-sm transition-colors duration-300 \${isError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}\`;
                }

                // Handle form submission
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    if (isSubmitting) return;
                    isSubmitting = true;

                    const username = document.getElementById('username').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const password = passwordInput.value.trim();

                    // Basic validation
                    if (!username || !email || !password) {
                        showMessage('Please enter a Username, Email and Password.', true);
                        isSubmitting = false;
                        return;
                    }

                    // Update button
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Creating account...';
                    submitBtn.disabled = true;

                    try {
                        const response = await fetch('/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, email, password})
                        });

                        const result = await response.json();

                        if(result.state === "error"){
                            showMessage(result.message);
                        } else {
                            showMessage('Account successfully created!');

                            localStorage.setItem('username', username.toLowerCase());
                            localStorage.setItem('email', email);
                            localStorage.setItem('password', password);
                            
                            setTimeout(() => {
                                window.location.href = '/verify'
                            }, 1000);
                        }

                        console.log('Success:', result);
                    } catch (error) {
                        console.error('Error:', error);
                    } finally {
                        // Reset button
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        isSubmitting = false;
                    }
                });

                ${autologin}
            </script>
        </body>
        </html>
    `);
};

const verify = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Blearn - Email Verification</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
                tailwind.config = {
                    darkMode: 'class'
                }
            </script>

            ${fastInit}
        </head>
        <body class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
            <div class="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 transition-colors duration-300">
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-300">Email Verification</h1>
                    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        We sent you a verification code to your email.
                    </p>
                    <p id="emailDisplay" class="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400"></p>
                </div>
                
                <form id="verifyForm" class="space-y-4">
                    <input 
                        id="verificationCode" 
                        type="text" 
                        placeholder="Enter code" 
                        class="w-full px-4 py-3 text-center text-lg font-mono border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300 tracking-widest"
                        maxlength="6"
                        required>
                    
                    <button 
                        type="submit" 
                        class="w-full px-4 py-2 font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        Verify
                    </button>
                </form>
                
                <div class="text-center space-y-2">
                    <button 
                        id="resendBtn" 
                        type="button" 
                        class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        Resend code
                    </button>
                    <div id="countdown" class="text-xs text-gray-500 dark:text-gray-400"></div>
                </div>
                
                <div id="message" class="text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300"></div>
                ${footer}
                </div>

            <script>
                // Dark mode functionality
                function initDarkMode() {
                    const savedTheme = localStorage.getItem('theme') || 'system';
                    applyTheme(savedTheme);
                }

                function applyTheme(theme) {
                    const html = document.documentElement;
                    
                    if (theme === 'system') {
                        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        html.classList.toggle('dark', systemDark);
                    } else if (theme === 'dark') {
                        html.classList.add('dark');
                    } else {
                        html.classList.remove('dark');
                    }
                }

                // Initialize dark mode
                initDarkMode();

                // State variables
                let isSubmitting = false;
                let resendCountdown = 0;
                let countdownInterval = null;

                // Get elements
                const form = document.getElementById('verifyForm');
                const codeInput = document.getElementById('verificationCode');
                const message = document.getElementById('message');
                const resendBtn = document.getElementById('resendBtn');
                const countdownEl = document.getElementById('countdown');
                const emailDisplay = document.getElementById('emailDisplay');

                // Display user's email
                function displayEmail() {
                    const email = localStorage.getItem('email');
                    if (email) {
                        emailDisplay.textContent = email;
                    } else {
                        // Redirect to signup if no email found
                        window.location.href = '/signup';
                    }
                }

                // Auto-format input (uppercase, numbers/letters only)
                codeInput.addEventListener('input', (e) => {
                    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                    e.target.value = value;
                });

                codeInput.addEventListener("keyup", (event) => {
                    if (event.key === "Enter") {
                        form.querySelector('button[type="submit"]').click();
                    }
                });

                // Show message helper
                function showMessage(text, isError = false) {
                    message.textContent = text;
                    message.className = \`text-center text-sm transition-colors duration-300 \${isError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}\`;
                }

                // Countdown functionality
                function startCountdown(seconds) {
                    resendCountdown = seconds;
                    resendBtn.disabled = true;
                    
                    countdownInterval = setInterval(() => {
                        countdownEl.textContent = \`Resend code in \${resendCountdown}s\`;
                        resendCountdown--;
                        
                        if (resendCountdown < 0) {
                            clearInterval(countdownInterval);
                            resendBtn.disabled = false;
                            countdownEl.textContent = '';
                        }
                    }, 1000);
                }

                // Handle verification form submission
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    if (isSubmitting) return;
                    isSubmitting = true;

                    const code = codeInput.value.trim();
                    const email = localStorage.getItem('email');
                    const username = localStorage.getItem('username');
                    const password = localStorage.getItem('password');

                    // Basic validation
                    if (!code) {
                        showMessage('Please enter the code.', true);
                        isSubmitting = false;
                        return;
                    }

                    if (code.length < 4) {
                        showMessage('The entered code is too short.', true);
                        isSubmitting = false;
                        return;
                    }

                    // Update button
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Verifying...';
                    submitBtn.disabled = true;

                    try {
                        const response = await fetch('/api/auth/verify', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                                email,
                                username: username.toLowerCase(),
                                password,
                                code,
                            })
                        });

                        const result = await response.json();

                        if (result.state === "error") {
                            showMessage(result.message || 'Verification failed.', true);
                        } else {
                            showMessage('E-Mail successully verified!');
                            
                            // Redirect to login or dashboard
                            setTimeout(() => {
                                window.location.href = '/dashboard'; // or wherever you want to redirect
                            }, 1500);
                        }

                        console.log('Verification result:', result);
                    } catch (error) {
                        console.error('Verification error:', error);
                        showMessage('Network error. Please try again.', true);
                    } finally {
                        // Reset button
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        isSubmitting = false;
                    }
                });

                // Handle resend code
                resendBtn.addEventListener('click', async () => {
                    const email = localStorage.getItem('email');
                    
                    if (!email) {
                        showMessage('E-mail adress not found.', true);
                        return;
                    }

                    try {
                        const response = await fetch('/api/auth/resend-code', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ email: email })
                        });

                        const result = await response.json();

                        if (result.state === "error") {
                            showMessage(result.message || 'Error while sending code.', true);
                        } else {
                            showMessage('New verification code sent!');
                            startCountdown(60); // 60 second cooldown
                        }
                    } catch (error) {
                        console.error('Resend error:', error);
                        showMessage('Netword error while sending code.', true);
                    }
                });

                // Initialize page
                displayEmail();
                startCountdown(30); // Initial 30 second cooldown
            </script>
        </body>
        </html>
    `);
};

const login = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Login</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>

        ${fastInit}
        </head>
        <body class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div class="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 transition-colors duration-300">
            <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white transition-colors duration-300">Welcome back!</h1>
            
            <div class="space-y-4">
            <input id="username" type="text" placeholder="Username"
                    class="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300" />

            <div class="relative">
                <input id="password" type="password" placeholder="Password"
                    class="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300" />
                <button id="togglePassword" type="button"
                        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
                👁️
                </button>
            </div>

            <button id="loginBtn"
                    class="w-full px-4 py-2 font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                Login
            </button>

            <p id="responseMessage" class="text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300"></p>
            </div>

            <a
                id="forgotPass"
                href="/forgotpassword"
                type="button"
                class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Forgot password?
            </a>
            <br>
            <a
                id="dontHaveAcc"
                href="/register"
                type="button"
                class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Don't have an account?
            </a>
            ${footer}
        </div>

        <script>
        
            class ThemeManager {
                constructor() {
                    this.init();
                }

                init() {
                    const savedTheme = localStorage.getItem('theme') || 'system';
                    this.applyTheme(savedTheme);
                }

                applyTheme(theme) {
                    const html = document.documentElement;
            
                if (theme === 'system') {
                    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    html.classList.toggle('dark', systemDark);
                } else if (theme === 'dark') {
                    html.classList.add('dark');
                } else {
                    html.classList.remove('dark');
                }

                localStorage.setItem('theme', theme);
            }
        }

        document.addEventListener("DOMContentLoaded", async () => {
            // Initialize theme manager
            new ThemeManager();
            
            const loginBtn = document.getElementById("loginBtn");
            const togglePassword = document.getElementById("togglePassword");
            const passwordInput = document.getElementById("password");
            const message = document.getElementById("responseMessage");

            ${autologin2}

            togglePassword.addEventListener("click", () => {
                const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
                passwordInput.setAttribute("type", type);
                togglePassword.textContent = type === "password" ? "👁️" : "🙈";
            });

            passwordInput.addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                loginBtn.click();
                }
            });

            // Login-Button gedrückt
            loginBtn.addEventListener("click", async () => {
                const userName = document.getElementById("username").value.trim();
                const password = passwordInput.value.trim();

                if (!userName || !password) {
                    message.textContent = "Please enter your username and password.";
                    message.className = "text-center text-red-600 dark:text-red-400 text-sm transition-colors duration-300";
                    return;
                }

            loginBtn.disabled = true;
            loginBtn.textContent = "Logging in...";

            try {
                const res = await fetch("/api/auth/checkData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName: userName.toLowerCase(), password })
                });

                const data = await res.json();

                if (data.state === "success") {
                localStorage.setItem("username", userName.toLowerCase());
                localStorage.setItem("password", password);

                message.textContent = "Login successful!";
                message.className = "text-center text-green-600 dark:text-green-400 text-sm transition-colors duration-300";

                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1000);
                } else {
                message.textContent = data.message || "Login failed.";
                message.className = "text-center text-red-600 dark:text-red-400 text-sm transition-colors duration-300";
                }
            } catch (err) {
                message.textContent = "Server not reachable!";
                message.className = "text-center text-red-600 dark:text-red-400 text-sm transition-colors duration-300";
            }

            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
            });
        });
        </script>
        </body>
        </html>
    `);
};

const forgotpassword = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Reset Password</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>

        ${fastInit}
        </head>
        <body class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div class="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 transition-colors duration-300">
            <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white transition-colors duration-300">Reset password!</h1>
            
            <div class="space-y-4">
            <input id="email" type="text" placeholder="Email"
                    class="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300" />

            <button id="resetBtn"
                    class="w-full px-4 py-2 font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                Reset
            </button>

            <p id="responseMessage" class="text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300"></p>
            </div>
        </div>

        <script>
        
            class ThemeManager {
                constructor() {
                    this.init();
                }

                init() {
                    const savedTheme = localStorage.getItem('theme') || 'system';
                    this.applyTheme(savedTheme);
                }

                applyTheme(theme) {
                    const html = document.documentElement;
            
                if (theme === 'system') {
                    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    html.classList.toggle('dark', systemDark);
                } else if (theme === 'dark') {
                    html.classList.add('dark');
                } else {
                    html.classList.remove('dark');
                }

                localStorage.setItem('theme', theme);
            }
        }

        document.addEventListener("DOMContentLoaded", async () => {
            // Initialize theme manager
            new ThemeManager();
            
            const resetBtn = document.getElementById("resetBtn");
            const message = document.getElementById("responseMessage");
            const emailInput = document.getElementById("email");

            ${autologin2}

            emailInput.addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                    resetBtn.click();
                }
            });

            resetBtn.addEventListener("click", async () => {
                const email = document.getElementById("email").value.trim();

                if (!email) {
                    message.textContent = "Please enter your email.";
                    message.className = "text-center text-red-600 dark:text-red-400 text-sm transition-colors duration-300";
                    return;
                }

            resetBtn.disabled = true;
            resetBtn.textContent = "Sending email...";

            try {
                const res = await fetch("/api/auth/resetpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
                });

                const data = await res.json();

                if (data.state === "success") {

                message.textContent = "We've send you a new password to your email!";
                message.className = "text-center text-green-600 dark:text-green-400 text-sm transition-colors duration-300";

                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000);
                } else {
                message.textContent = data.message || "Something went wrong.";
                message.className = "text-center text-red-600 dark:text-red-400 text-sm transition-colors duration-300";
                }
            } catch (err) {
                message.textContent = "Server not reachable!";
                message.className = "text-center text-red-600 dark:text-red-400 text-sm transition-colors duration-300";
            }

            resetBtn.disabled = false;
            resetBtn.textContent = "Reset Password";
            });
        });
        </script>
        </body>
        </html>
    `);
};

const dashboard = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Dashboard</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>

        ${fastInit}
        </head>
        <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
        
        ${header}

        <!-- Main Content -->
        <main class="flex-1 p-4 sm:p-6">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6" id="header">Welcome back!</h2>
            
            <!-- Quick Actions -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <a href="/learn" class="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 text-white group">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl sm:text-3xl">📚</span>
                        <svg class="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-base sm:text-lg font-semibold">Learn</h3>
                    <p class="text-xs sm:text-sm opacity-90 mt-1">Practice with flashcards</p>
                </a>

                <a href="/timetable" class="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 text-white group">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl sm:text-3xl">📅</span>
                        <svg class="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-base sm:text-lg font-semibold">Timetable</h3>
                    <p class="text-xs sm:text-sm opacity-90 mt-1">Manage your schedule</p>
                </a>

                <a href="/homework" class="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 text-white group">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl sm:text-3xl">📝</span>
                        <svg class="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-base sm:text-lg font-semibold">Homework</h3>
                    <p class="text-xs sm:text-sm opacity-90 mt-1">Add and track tasks</p>
                </a>

                <div class="bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 p-5 sm:p-6 rounded-xl shadow transition-all duration-300 text-white">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl sm:text-3xl">⚡</span>
                    </div>
                    <h3 class="text-base sm:text-lg font-semibold" id="urgentCount">0 Urgent</h3>
                    <p class="text-xs sm:text-sm opacity-90 mt-1">Tasks due soon</p>
                </div>
            </div>

            <!-- Two Column Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left Column: Urgent Homework (2/3 width) -->
                <div class="lg:col-span-2">
                    <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow hover:shadow-lg dark:shadow-gray-900/20 transition-all duration-300 border dark:border-gray-700">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">🔥 Urgent Homework</h3>
                            <a href="/homework" class="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 sm:mt-0">View All →</a>
                        </div>
                        <div id="urgentHomework" class="space-y-3">
                            <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                                Loading homework...
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Today's Schedule (1/3 width) -->
                <div class="lg:col-span-1">
                    <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow hover:shadow-lg dark:shadow-gray-900/20 transition-all duration-300 border dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">📆 Today</h3>
                            <span id="todayDay" class="text-sm text-gray-600 dark:text-gray-400"></span>
                        </div>
                        <div id="todaySchedule" class="space-y-2">
                            <div class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                                Loading schedule...
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Full Week Timetable -->
            <div class="mt-6">
                <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow hover:shadow-lg dark:shadow-gray-900/20 transition-all duration-300 border dark:border-gray-700">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h3 class="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">📋 This Week's Timetable</h3>
                        <a href="/timetable" class="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 sm:mt-0">Edit Timetable →</a>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse min-w-[500px] sm:min-w-[600px]">
                            <thead>
                                <tr class="bg-gray-100 dark:bg-gray-700">
                                    <th class="border dark:border-gray-600 p-1 sm:p-2 text-gray-800 dark:text-white text-xs sm:text-sm">Period</th>
                                    <th class="border dark:border-gray-600 p-1 sm:p-2 text-gray-800 dark:text-white text-xs sm:text-sm">Mon</th>
                                    <th class="border dark:border-gray-600 p-1 sm:p-2 text-gray-800 dark:text-white text-xs sm:text-sm">Tue</th>
                                    <th class="border dark:border-gray-600 p-1 sm:p-2 text-gray-800 dark:text-white text-xs sm:text-sm">Wed</th>
                                    <th class="border dark:border-gray-600 p-1 sm:p-2 text-gray-800 dark:text-white text-xs sm:text-sm">Thu</th>
                                    <th class="border dark:border-gray-600 p-1 sm:p-2 text-gray-800 dark:text-white text-xs sm:text-sm">Fri</th>
                                </tr>
                            </thead>
                            <tbody id="weekTimetable">
                                <tr>
                                    <td colspan="6" class="text-center py-8 text-gray-500 dark:text-gray-400">
                                        Loading timetable...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>

        ${footer}

        <script>
            let subjects = [];
            let homework = [];
            let timetable = [];

            class ThemeManager {
                constructor() {
                    this.init();
                }

                init() {
                    const savedTheme = localStorage.getItem('theme') || 'system';
                    this.applyTheme(savedTheme);
                }

                applyTheme(theme) {
                    const html = document.documentElement;
                    
                    if (theme === 'system') {
                        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        html.classList.toggle('dark', systemDark);
                    } else if (theme === 'dark') {
                        html.classList.add('dark');
                    } else {
                        html.classList.remove('dark');
                    }
                    
                    localStorage.setItem('theme', theme);
                }
            }

            async function loadSubjects() {
                const userName = localStorage.getItem('username');
                const password = localStorage.getItem('password');
                
                try {
                    const res = await fetch('/api/timetable/subjects/get', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: userName, password })
                    });
                    const data = await res.json();
                    if (data.state === 'success') {
                        subjects = data.subjects || [];
                    }
                } catch (err) {
                    console.error('Error loading subjects:', err);
                    subjects = [];
                }
            }

            async function loadHomework() {
                const userName = localStorage.getItem('username');
                const password = localStorage.getItem('password');
                
                try {
                    const res = await fetch('/api/timetable/homework/get', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: userName, password })
                    });
                    const data = await res.json();
                    if (data.state === 'success') {
                        homework = data.homework || [];
                        renderUrgentHomework();
                    } else {
                        throw new Error('Failed to load homework');
                    }
                } catch (err) {
                    console.error('Error loading homework:', err);
                    homework = [];
                    document.getElementById('urgentHomework').innerHTML = \`
                        <div class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                            No homework data available
                        </div>
                    \`;
                }
            }

            async function loadTimetable() {
                const userName = localStorage.getItem('username');
                const password = localStorage.getItem('password');
                
                try {
                    const res = await fetch('/api/timetable/schedule/get', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: userName, password })
                    });
                    const data = await res.json();
                    if (data.state === 'success') {
                        timetable = data.timetable || Array(5).fill(null).map(() => Array(8).fill(null));
                        renderTodaySchedule();
                        renderWeekTimetable();
                    } else {
                        throw new Error('Failed to load timetable');
                    }
                } catch (err) {
                    console.error('Error loading timetable:', err);
                }
            }

            function renderUrgentHomework() {
                const container = document.getElementById('urgentHomework');
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                // Filter homework due in next 3 days and not completed
                const urgent = homework.filter(hw => {
                    if (hw.completed) return false;
                    const dueDate = new Date(hw.dueDate);
                    dueDate.setHours(0, 0, 0, 0);
                    const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                    return daysUntil <= 3 && daysUntil >= -1; // Include overdue by 1 day
                }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

                // Update urgent count
                document.getElementById('urgentCount').textContent = \`\${urgent.length} Urgent\`;

                if (urgent.length === 0) {
                    container.innerHTML = \`
                        <div class="text-center py-8">
                            <span class="text-4xl">✅</span>
                            <p class="text-gray-500 dark:text-gray-400 mt-2">No urgent homework!</p>
                        </div>
                    \`;
                    return;
                }

                container.innerHTML = '';
                urgent.forEach(hw => {
                    const subject = subjects.find(s => s.id === hw.subjectId);
                    const dueDate = new Date(hw.dueDate);
                    const daysUntil = Math.ceil((dueDate.setHours(0, 0, 0, 0) - today) / (1000 * 60 * 60 * 24));
                    
                    let urgencyClass = 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
                    let urgencyText = \`\${daysUntil} day\${daysUntil !== 1 ? 's' : ''}\`;
                    
                    if (daysUntil < 0) {
                        urgencyClass = 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
                        urgencyText = 'Overdue!';
                    } else if (daysUntil === 0) {
                        urgencyClass = 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
                        urgencyText = 'Today!';
                    } else if (daysUntil === 1) {
                        urgencyText = 'Tomorrow';
                    }

                    const card = document.createElement('div');
                    card.className = \`p-4 rounded-lg border-l-4 \${urgencyClass}\`;
                    card.style.borderLeftColor = subject ? subject.color : '#6b7280';
                    card.innerHTML = \`
                        <div class="flex items-start justify-between gap-3">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="font-semibold text-gray-800 dark:text-white text-sm">
                                        \${subject ? subject.name : 'Unknown'}
                                    </span>
                                    <span class="text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                        \${urgencyText}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-700 dark:text-gray-300 truncate">
                                    \${hw.description}
                                </p>
                            </div>
                            <a href="/homework" class="text-blue-600 dark:text-blue-400 hover:underline text-sm whitespace-nowrap">
                                View →
                            </a>
                        </div>
                    \`;
                    container.appendChild(card);
                });
            }

            function renderTodaySchedule() {
                const container = document.getElementById('todaySchedule');
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const today = new Date().getDay();
                
                document.getElementById('todayDay').textContent = days[today];

                // Weekend
                if (today === 0 || today === 6) {
                    container.innerHTML = \`
                        <div class="text-center py-8">
                            <span class="text-4xl">🎉</span>
                            <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">It's the weekend!</p>
                        </div>
                    \`;
                    return;
                }

                // Check if timetable is properly loaded
                if (!Array.isArray(timetable) || timetable.length === 0) {
                    container.innerHTML = \`
                        <div class="text-center py-8">
                            <p class="text-gray-500 dark:text-gray-400 text-sm">No timetable set up yet</p>
                        </div>
                    \`;
                    return;
                }

                const dayIndex = today - 1; // Monday = 0, Friday = 4
                const todayClasses = Object.values(timetable[dayIndex]);
                
                // Check if today's classes exist and is an array
                if (!todayClasses) {
                    container.innerHTML = \`
                        <div class="text-center py-8">
                            <p class="text-gray-500 dark:text-gray-400 text-sm">No classes today</p>
                        </div>
                    \`;
                    return;
                }

                const uniqueSubjects = [...new Set(todayClasses.filter(id => id !== null))];

                if (uniqueSubjects.length === 0) {
                    container.innerHTML = \`
                        <div class="text-center py-8">
                            <p class="text-gray-500 dark:text-gray-400 text-sm">No classes today</p>
                        </div>
                    \`;
                    return;
                }

                container.innerHTML = '';
                uniqueSubjects.forEach(subjectId => {
                    const subject = subjects.find(s => s.id === subjectId);
                    if (!subject) return;

                    const periods = todayClasses.map((id, index) => id === subjectId ? index + 1 : null).filter(p => p !== null);
                    
                    const item = document.createElement('div');
                    item.className = 'flex items-center gap-3 p-3 rounded-lg border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition';
                    item.innerHTML = \`
                        <div class="w-3 h-3 rounded-full flex-shrink-0" style="background-color: \${subject.color}"></div>
                        <div class="flex-1 min-w-0">
                            <div class="font-medium text-gray-800 dark:text-white text-sm">\${subject.name}</div>
                            <div class="text-xs text-gray-600 dark:text-gray-400">Period\${periods.length > 1 ? 's' : ''} \${periods.join(', ')}</div>
                        </div>
                    \`;
                    container.appendChild(item);
                });
            }

            function renderWeekTimetable() {
                const tbody = document.getElementById('weekTimetable');
                
                // Check if timetable is properly loaded
                if (!Array.isArray(timetable)) {
                    tbody.innerHTML = \`
                        <tr>
                            <td colspan="6" class="text-center py-8 text-gray-500 dark:text-gray-400">
                                No timetable set up yet. <a href="/timetable" class="text-blue-600 dark:text-blue-400 hover:underline">Create one →</a>
                            </td>
                        </tr>
                    \`;
                    return;
                }
                
                tbody.innerHTML = '';
                
                for (let period = 0; period < 8; period++) {
                    const row = document.createElement('tr');
                    row.innerHTML = \`<td class="border dark:border-gray-600 p-2 text-center font-semibold text-gray-800 dark:text-white text-sm">\${period + 1}</td>\`;
                    
                    for (let day = 0; day < 5; day++) {
                        const cell = document.createElement('td');
                        cell.className = 'border dark:border-gray-600 p-2 text-center';
                        
                        // Check if day exists and is an array
                        const daySchedule = timetable[day];
                        if (!daySchedule) {
                            cell.innerHTML = '<span class="text-gray-400 dark:text-gray-600 text-xs">Empty</span>';
                            row.appendChild(cell);
                            continue;
                        }
                        
                        const subjectId = daySchedule[period];
                        if (subjectId) {
                            const subject = subjects.find(s => s.id === subjectId);
                            if (subject) {
                                cell.innerHTML = \`
                                    <div class="px-2 py-1 rounded text-white font-medium text-xs truncate" style="background-color: \${subject.color}" title="\${subject.name}">
                                        \${subject.name}
                                    </div>
                                \`;
                            } else {
                                cell.innerHTML = '<span class="text-gray-400 dark:text-gray-600 text-xs">-</span>';
                            }
                        } else {
                            cell.innerHTML = '<span class="text-gray-400 dark:text-gray-600 text-xs">-</span>';
                        }
                        
                        row.appendChild(cell);
                    }
                    tbody.appendChild(row);
                }
            }

            document.addEventListener("DOMContentLoaded", async () => {
                new ThemeManager();
                
                const userName = localStorage.getItem("username");
                const password = localStorage.getItem("password");
            
                if (!userName || !password) {
                    window.location.href = "/login";
                    return;
                }

                try {
                    const res = await fetch("/api/auth/checkData", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userName, password })
                    });
                    
                    const data = await res.json();
                    
                    if (data.state === "error") {
                        localStorage.removeItem("username");
                        localStorage.removeItem("password");
                        window.location.href = "/login";
                    } else if (data.state === "success" && data.sessionExpired === "true") {
                        window.location.href = "/ad";
                    } else if (data.state === "success" && data.verified === "false"){
                        window.location.href = "/verify";
                    } else {
                        console.log("Successful login");
                    }
                } catch (err) {
                    console.error("Error while checking data:", err);
                    window.location.href = "/login";
                }
                
                document.getElementById("header").innerHTML = "Welcome back, " + userName + "!";

                // Load all dashboard data
                await loadSubjects();
                await loadHomework();
                await loadTimetable();
            });
        </script>
        </body>
        </html>
    `);
};

const logout = (req, res) => {
  res.send(`
        <script>
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            window.location.href = "/";
        </script>
    `);
};

const settings = (req, res) => {
  res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Blearn - Settings</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class'
        }
    </script>

    ${fastInit}
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

${header}

    <!-- Main Content -->
    <main class="flex-1 p-6">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Settings</h2>
            
            <!-- Profile Section -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg dark:shadow-gray-900/20 transition-all duration-300 border dark:border-gray-700 mb-6">
                <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">Profile</h3>
                
                <div class="space-y-4">
                    <!-- Username (display only) -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                        <input type="text" id="username" readonly 
                               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-not-allowed transition-colors duration-300"
                               placeholder="Username">
                    </div>
                    
                    <!-- Email (display only) -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-Mail</label>
                        <input type="email" id="email" readonly
                               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                               placeholder="ihre.email@beispiel.de">
                    </div>

                    <!-- Password (editable) -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <div class="relative">
                            <input type="password" id="password" 
                                   class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                   placeholder="Enter new password">
                            <button type="button" id="togglePassword"
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
                                👁️
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Save Profile Button -->
                <div class="mt-6">
                    <button id="savePass" 
                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                        Save Password
                    </button>
                </div>
            </div>
            
            <!-- Appearance Section -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg dark:shadow-gray-900/20 transition-all duration-300 border dark:border-gray-700 mb-6">
                <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">Notifications</h3>

                <div class="space-y-4">
                    <!-- Enable Notifications -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enable Notifications</label>
                        <div class="flex items-center">
                            <input type="checkbox" id="enableNotifications" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            <span id="notificationStatus" class="ml-2 text-sm text-gray-500 dark:text-gray-400"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg dark:shadow-gray-900/20 transition-all duration-300 border dark:border-gray-700 mb-6">
                <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">Appearance</h3>
                
                <div class="space-y-4">
                    <!-- Theme Selection -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                        <div class="flex flex-wrap gap-2">
                            <button id="themeSystem" 
                                    class="theme-btn px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                                System
                            </button>
                            <button id="themeLight" 
                                    class="theme-btn px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                                Light
                            </button>
                            <button id="themeDark" 
                                    class="theme-btn px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                                Dark
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    ${footer}

    <script>
        // Simple theme management
        let currentTheme = 'system';
        
        // Initialize page
        document.addEventListener('DOMContentLoaded', async function() {
            loadSettings();

            ${autologin3}
        });
        
        // Load saved settings
        function loadSettings() {
            // Load username (from your existing localStorage)
            const userName = localStorage.getItem('username');
            if (userName) {
                document.getElementById('username').value = userName;
            }
            
            // Load email
            const email = localStorage.getItem('email') || '';
            document.getElementById('email').value = email;
            
            // Load theme
            const savedTheme = localStorage.getItem('theme') || 'system';
            currentTheme = savedTheme;
            applyTheme(savedTheme);
            updateThemeButtons(savedTheme);
            
        }
        
        // Theme functions
        function applyTheme(theme) {
            const html = document.documentElement;
            
            if (theme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                html.classList.toggle('dark', systemDark);
            } else if (theme === 'dark') {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
            
            localStorage.setItem('theme', theme);
        }
        
        function updateThemeButtons(activeTheme) {
            const buttons = document.querySelectorAll('.theme-btn');
            buttons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('border-gray-300', 'dark:border-gray-600', 'text-gray-700', 'dark:text-gray-300');
            });
            
            const activeBtn = document.getElementById('theme' + activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1));
            if (activeBtn) {
                activeBtn.classList.add('bg-blue-600', 'text-white');
                activeBtn.classList.remove('border-gray-300', 'dark:border-gray-600', 'text-gray-700', 'dark:text-gray-300');
            }
        }
        
        // Event listeners
        document.getElementById('themeSystem').addEventListener('click', () => {
            currentTheme = 'system';
            applyTheme('system');
            updateThemeButtons('system');
        });
        
        document.getElementById('themeLight').addEventListener('click', () => {
            currentTheme = 'light';
            applyTheme('light');
            updateThemeButtons('light');
        });
        
        document.getElementById('themeDark').addEventListener('click', () => {
            currentTheme = 'dark';
            applyTheme('dark');
            updateThemeButtons('dark');
        });
        
        // Password toggle
        document.getElementById('togglePassword').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });

        document.getElementById('password').addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                document.getElementById('savePass').click();
            }
        });
        
        // Save profile
        document.getElementById('savePass').addEventListener('click', async function() {
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            const newpass = document.getElementById('password').value.trim()
            
            
            try {
                const res = await fetch("/api/auth/changePass", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userName, password, newpass })
                    });
                    
                    const data = await res.json();
                    
                    if (data.state === "success") {
                        window.location.href = "/logout"
                }
            } catch {};
            
        });

        const enableNotifications = document.getElementById('enableNotifications');
        const notificationStatus = document.getElementById('notificationStatus');

        function updateNotificationStatus(status) {
            notificationStatus.textContent = status;
        }

        async function subscribeUser() {
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                try {
                    const response = await fetch('/api/notifications/vapid-public-key');
                    const { publicKey } = await response.json();

                    const registration = await navigator.serviceWorker.register('/sw.js');
                    const subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(publicKey),
                    });

                    const username = localStorage.getItem('username');
                    const password = localStorage.getItem('password');

                    await fetch('/api/notifications/subscribe', {
                        method: 'POST',
                        body: JSON.stringify({ subscription, username, password }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    localStorage.setItem('notificationsEnabled', 'true');
                    updateNotificationStatus('Enabled');
                } catch (error) {
                    console.error('Failed to subscribe the user: ', error);
                    enableNotifications.checked = false;
                    updateNotificationStatus('Failed to enable');
                }
            } else {
                console.warn('Push messaging is not supported');
                updateNotificationStatus('Not supported');
            }
        }

        async function unsubscribeUser() {
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    const subscription = await registration.pushManager.getSubscription();
                    if (subscription) {
                        await subscription.unsubscribe();

                        const username = localStorage.getItem('username');
                        const password = localStorage.getItem('password');

                        await fetch('/api/notifications/unsubscribe', {
                            method: 'DELETE',
                            body: JSON.stringify({ endpoint: subscription.endpoint, username, password }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                    }
                }
                localStorage.setItem('notificationsEnabled', 'false');
                updateNotificationStatus('Disabled');
            } catch (error) {
                console.error('Error unsubscribing', error);
                updateNotificationStatus('Error disabling');
            }
        }

        enableNotifications.addEventListener('change', () => {
            if (enableNotifications.checked) {
                Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        subscribeUser();
                    } else {
                        enableNotifications.checked = false;
                        updateNotificationStatus('Permission denied');
                    }
                });
            } else {
                unsubscribeUser();
            }
        });

        function urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

        // Initialize notification state
        if (localStorage.getItem('notificationsEnabled') === 'true') {
            enableNotifications.checked = true;
            updateNotificationStatus('Enabled');
        } else {
            enableNotifications.checked = false;
            updateNotificationStatus('Disabled');
        }
    </script>
</body>
</html>
    `);
};

const learn = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Files</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>

        ${fastInit}

        </head>
        ${notificationContainer}

        <body class="bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col transition-colors duration-300">

        ${header}

        <div id="folderModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-80 transition-colors duration-300">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">📁 Create Folder</h3>
            <input id="folderNameInput" type="text" placeholder="Foldername" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
            <div class="flex justify-end space-x-2">
                <button onclick="closeFolderModal()" class="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">Cancel</button>
                <button onclick="submitFolder()" class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Create</button>
            </div>
            </div>
        </div>
        
        <!-- Kontextmenü -->
        <div id="contextMenu" class="absolute bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-xl shadow-lg hidden z-50 transition-colors duration-300">
            <button onclick="openRenameModal()" class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">Rename</button>
            <button onclick="editList()" class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">Edit</button>
            <button onclick="shareItem()" class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400">Share</button>
            <button onclick="confirmDelete()" class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 dark:text-red-400">Delete</button>
        </div>

        <!-- Umbenennen Modal -->
        <div id="renameModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-80 transition-colors duration-300">
            <h3 class="text-lg font-bold mb-4 text-gray-800 dark:text-white">✏️ Rename</h3>
            <input id="renameInput" type="text" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
            <div class="flex justify-end space-x-2">
                <button onclick="closeRenameModal()" class="px-3 py-2 text-sm text-gray-600 dark:text-gray-400">Cancel</button>
                <button onclick="submitRename()" class="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg">Rename</button>
            </div>
            </div>
        </div>

        <!-- Share Modal -->
        <div id="shareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-96 transition-colors duration-300">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">🔗 Share</h3>
            
            <div id="shareLoader" class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-opacity-50"></div>
                <span class="ml-2 text-gray-600 dark:text-gray-400">ID is being requested...</span>
            </div>
            
            <div id="shareContent" class="hidden">
                <p class="text-gray-600 dark:text-gray-400 mb-4">Share this exercise with others:</p>
                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border dark:border-gray-600 mb-4">
                <label class="text-sm text-gray-500 dark:text-gray-400 block mb-1">Share-ID:</label>
                <div class="flex items-center space-x-2">
                    <input id="shareId" type="text" readonly class="flex-1 bg-transparent border-none focus:outline-none font-mono text-sm text-gray-800 dark:text-gray-200" />
                    <button onclick="copyShareId()" class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">
                    📋 Copy
                    </button>
                </div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Others can access your exercise with this ID.
                </p>
            </div>
            
            <div id="shareError" class="hidden text-center py-4">
                <p class="text-red-500 dark:text-red-400 mb-2">Error while requesting share-ID</p>
                <button onclick="retryFetchId()" class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                Try again
                </button>
            </div>
            
            <div class="flex justify-end space-x-2 mt-4">
                <button onclick="closeShareModal()" class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">Close</button>
            </div>
            </div>
        </div>

        <!-- Main -->
        <main class="flex-1 p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">📂 Your Exercises</h2>
            <div class="flex flex-wrap gap-2 mt-3 sm:mt-0">
                <button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-2 sm:px-4 text-sm sm:text-base rounded-lg shadow" onclick="createFolder()">📁 Create Folder</button>
                
                <!-- Dropdown für Vokabelliste -->
                <div class="relative">
                <button id="vocabDropdownBtn" onclick="toggleVocabDropdown()" class="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 py-2 sm:px-4 text-sm sm:text-base rounded-lg shadow flex items-center space-x-2 transition-all duration-200">
                    <span>➕ New Exercise</span>
                    <svg id="dropdownArrow" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div id="vocabDropdownMenu" class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hidden z-40 overflow-hidden transition-colors duration-300">
                    <div class="py-1">
                    <button onclick="createList()" class="flex items-center w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-150">
                        <span class="mr-3 text-lg">📝</span>
                        <div>
                        <div class="font-medium">Create List</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Create a new vocab list</div>
                        </div>
                    </button>
                    
                    <hr class="border-gray-100 dark:border-gray-600">
                    
                    <button onclick="createTable()" class="flex items-center w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-150">
                        <span class="mr-3 text-lg">📝</span>
                        <div>
                        <div class="font-medium">Create Table</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Create a new vocab table</div>
                        </div>
                    </button>
                    
                    <hr class="border-gray-100 dark:border-gray-600">
                    
                    <button onclick="importList()" class="flex items-center w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-150">
                        <span class="mr-3 text-lg">📥</span>
                        <div>
                        <div class="font-medium">Import</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Import a vocablist or table</div>
                        </div>
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <!-- Breadcrumb -->
            <nav id="breadcrumb" class="text-sm text-blue-600 dark:text-blue-400 mb-4 flex flex-wrap gap-1 items-center"></nav>

            <!-- Loader -->
            <div id="loader" class="flex justify-center items-center h-40">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
            </div>

            <!-- Leere-Nachricht -->
            <p id="emptyMessage" class="hidden text-center text-gray-600 dark:text-gray-400 mt-8">You don't have any Lists, Tables or Folders.</p>

            <!-- List container -->
            <ul id="lessonList" class="space-y-4 hidden"></ul>
        </main>

        ${footer}

        <script>

        ${notificationScript}

        let route;

        // Dark mode functionality - same as dashboard
        class ThemeManager {
            constructor() {
            this.init();
            }

            init() {
            // Get theme from localStorage or default to 'system'
            const savedTheme = localStorage.getItem('theme') || 'system';
            this.applyTheme(savedTheme);
            }

            applyTheme(theme) {
            const html = document.documentElement;
            
            if (theme === 'system') {
                // Use system preference
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                html.classList.toggle('dark', systemDark);
            } else if (theme === 'dark') {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
            
            // Save to localStorage
            localStorage.setItem('theme', theme);
            }
        }

        document.addEventListener("DOMContentLoaded", async () => {
            // Initialize theme manager
            new ThemeManager();

            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            
            if (!userName || !password) {
            window.location.href = "/login";
            return;
            }

            try {
            const res = await fetch('/api/auth/checkData', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
            });

            const data = await res.json();

            if (data.state === "error") {
                try{
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                } catch {}
                window.location.href = "/login";
            } else if (data.state === "success" && data.sessionExpired === "true") {
                window.location.href = "/ad";
            } else if (data.state === "success" && data.verified === "false"){
                window.location.href = "/verify"}
            else {
                console.log("Successful login");
            }
            } catch (err) {
            console.error("Error while checking data:", err);
            try {
                showNotification("Error details: " + JSON.stringify({
                    message: err.message,
                    name: err.name,
                    stack: err.stack
                }), 'error')
            } catch (alertErr) {
                showNotification('Error occurred but cannot display details', 'error')
                console.error("Original error:", err);
                console.error("Alert error:", alertErr);
            }
            window.location.href = "/login";
            }


            const params = new URLSearchParams(window.location.search);
            route = params.get("route") || "/";

            renderBreadcrumb(route);

            try {
                const res = await fetch('/api/data/getlist', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: userName, password, route }),
                });

                if (!res.ok) {
                    throw new Error(\`Server responded with status: \${res.status}\`);
                }

                const data = await res.json();
            
                const loader = document.getElementById("loader");
                const list = document.getElementById("lessonList");
                const emptyMessage = document.getElementById("emptyMessage");
                
                loader.style.display = "none";

                if (!data || !data.lessons) {  
                    console.error("Invalid data:", data);
                    document.getElementById("loader").innerHTML = \`<p class="text-red-500">Invalid data format from server.</p>\`;
                    return;
                }

                if (!Array.isArray(data.lessons) || data.lessons.length === 0) {
                    emptyMessage.classList.remove("hidden");
                    return;
                }

                list.innerHTML = "";

                const sortedLessons = [...data.lessons].sort((a, b) => {
                    if (a.type !== b.type) {
                        return b.type - a.type; // Ordner (1) werden vor Listen (0) angezeigt
                    }
                    return a.name.localeCompare(b.name, 'de', { sensitivity: 'base' });
                });

                sortedLessons.forEach((lesson) => {
                    if (!lesson || typeof lesson !== 'object' || !lesson.name) {
                        console.warn("Invalid lesson object skipped:", lesson);
                        return;
                    }
                
                    const item = document.createElement("li");
                    item.className = "bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700";
                
                    item.onclick = (e) => {
                    try {
                        if (lesson.type === 9) { // Wenn es ein Ordner ist
                        window.location.href = \`/learn?route=\${route}/\${encodeURIComponent(lesson.name)}\`;
                        } else if (lesson.type === 1) {
                        window.location.href = \`/table?route=\${route}&lesson=\${encodeURIComponent(lesson.name)}\`;
                        } else if (lesson.type === 0) { // Wenn es eine Vokabelliste ist
                        window.location.href = \`/list?route=\${encodeURIComponent(route)}&lesson=\${encodeURIComponent(lesson.name)}\`;
                        }
                    } catch (error) {
                        console.error("Error while navigation:", error);
                    }
                };
                
                    
                    let icon = "📁"
                    if(lesson.type === 0) icon = "📗"
                    if(lesson.type === 1) icon = "📑"
                    item.innerHTML = \`
                    <div class="flex justify-between items-center">
                        <span class="text-gray-800 dark:text-gray-200">\${icon} \${lesson.name}</span>
                        <button onclick="openContextMenu(event, '\${lesson.name.replace(/'/g, "\\'")}', \${lesson.type})" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">⋮</button>
                    </div>
                    \`;

                    list.appendChild(item);
                });

                list.classList.remove("hidden");

            } catch (err) {
            console.error("Error while loading lessons:", err);
            document.getElementById("loader").innerHTML = \`
                <div class="text-center">
                <p class="text-red-500 text-lg mb-2">Error while loading data.</p>
                <p class="text-gray-600 dark:text-gray-400 mb-4">\${err.message || 'Connection to server failed'}</p>
                <button onclick="window.location.reload()" class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Reload
                </button>
                </div>
            \`;
            }
        });

        // Dropdown-Funktionen
        function toggleVocabDropdown() {
            const menu = document.getElementById("vocabDropdownMenu");
            const arrow = document.getElementById("dropdownArrow");
            const isHidden = menu.classList.contains("hidden");
            
            if (isHidden) {
            menu.classList.remove("hidden");
            arrow.style.transform = "rotate(180deg)";
            } else {
            menu.classList.add("hidden");
            arrow.style.transform = "rotate(0deg)";
            }
        }

        // Dropdown schließen wenn außerhalb geklickt wird
        document.addEventListener("click", function(event) {
            const dropdown = document.getElementById("vocabDropdownMenu");
            const button = document.getElementById("vocabDropdownBtn");
            const arrow = document.getElementById("dropdownArrow");
            
            if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add("hidden");
            arrow.style.transform = "rotate(0deg)";
            }
        });

        // Pfad-Breadcrumb anzeigen - KORRIGIERT
        function renderBreadcrumb(route) {
            const container = document.getElementById("breadcrumb");
            container.innerHTML = "";

            const parts = route.split("/").filter(p => p !== "");
            let currentPath = "";

            // Root Link - KORRIGIERT
            const rootLink = document.createElement("a");
            rootLink.href = "/learn?route=/"; // Fix: route=/ statt route=//
            rootLink.textContent = "Home";
            rootLink.className = "hover:underline";
            container.appendChild(rootLink);

            if (parts.length > 0) {
            const sep = document.createElement("span");
            sep.textContent = " / ";
            container.appendChild(sep);
            }

            parts.forEach((part, index) => {
            currentPath += "/" + part;

            const link = document.createElement("a");
            link.href = \`/learn?route=\${encodeURIComponent(currentPath)}\`;
            link.textContent = part;
            link.className = "hover:underline";

            container.appendChild(link);

            if (index < parts.length - 1) {
                const sep = document.createElement("span");
                sep.textContent = " / ";
                container.appendChild(sep);
            }
            });
        }

        // Modal-Logik
        function createFolder() {
            document.getElementById("folderModal").classList.remove("hidden");
            setTimeout(() => document.getElementById("folderNameInput").focus(), 100);
        }

        function closeFolderModal() {
            document.getElementById("folderModal").classList.add("hidden");
            document.getElementById("folderNameInput").value = "";
        }

        async function submitFolder() {
            const folderName = document.getElementById("folderNameInput").value.trim();
            if (!folderName) {
            showNotification('Please enter a folder name.', 'error')
            return;
            }

            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");

            try {
            const res = await fetch('/api/data/createFolder', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: userName, password, route, folderName }),
                signal: AbortSignal.timeout(10000)
            });

            if (!res.ok) {
                throw new Error(\`Server responded with status: \${res.status}\`);
            }

            const data = await res.json();

            if (data.state === "success") {
                showNotification('Folder created!', 'success')
                closeFolderModal();
                location.reload();
            } else {
                showNotification(\`Error while creating folder: \${data.message || 'Unknown error'}\`, 'error')
                
            }
            } catch (err) {
            console.error("Error:", err);
            showNotification(\`An error is occured: \${err.message || 'Connection issue'}\`, 'error')
            }
        }
            
        let selectedItem = { name: "", type: 0 };

        function openContextMenu(event, name, type) {
            event.stopPropagation();
            selectedItem = { name, type };

            const menu = document.getElementById("contextMenu");
            
            // Bildschirmgrenze prüfen und Menü positionieren
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const menuWidth = 150; // ungefähre Breite des Menüs
            const menuHeight = 160; // ungefähre Höhe des Menüs (erhöht wegen neuem Button)
            
            let left = event.pageX;
            let top = event.pageY;
            
            // Prüfen ob das Menü rechts über den Bildschirm hinausragt
            if (left + menuWidth > viewportWidth) {
            left = viewportWidth - menuWidth - 10;
            }
            
            // Prüfen ob das Menü unten über den Bildschirm hinausragt
            if (top + menuHeight > viewportHeight) {
            top = viewportHeight - menuHeight - 10;
            }
            
            menu.style.left = \`\${left}px\`;
            menu.style.top = \`\${top}px\`;
            menu.classList.remove("hidden");
        }

        document.addEventListener("click", () => {
            document.getElementById("contextMenu").classList.add("hidden");
        });

        // Umbenennen Modal
        function openRenameModal() {
            document.getElementById("renameInput").value = selectedItem.name;
            document.getElementById("renameModal").classList.remove("hidden");
            setTimeout(() => document.getElementById("renameInput").focus(), 100);
        }

        function closeRenameModal() {
            document.getElementById("renameModal").classList.add("hidden");
        }

        async function submitRename() {
            const newName = document.getElementById("renameInput").value.trim();
            if (!newName) return;

            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");

            try {
            const res = await fetch('/api/data/rename', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                username: userName, 
                password, 
                route,
                oldname: selectedItem.name, 
                newname: newName
                }),
                signal: AbortSignal.timeout(10000)
            });

            if (!res.ok) {
                throw new Error(\`Server responded with status: \${res.status}\`);
            }

            const data = await res.json();
            if (data.state === "success") {
                closeRenameModal();
                location.reload();
            } else {
                showNotification(\`Error while renaming: \${data.message || 'Unknown error'}\`, 'error')
                }
            } catch (err) {
            console.error(err);
            showNotification(\`An error is occured: \${err.message || 'Connection issue'}\`, 'error')
            }
        }

        // NEU: Liste bearbeiten Funktion
        function editList() {
            // Nur für Listen, nicht für Ordner
            if (selectedItem.type === 0) {
            window.location.href = \`/editList?route=\${encodeURIComponent(route)}&lesson=\${encodeURIComponent(selectedItem.name)}\`;
            } else if (selectedItem.type === 1) {
            window.location.href = \`/editTable?route=\${encodeURIComponent(route)}&lesson=\${encodeURIComponent(selectedItem.name)}\`;
            } else {
            showNotification('Only lists and tables can be edited', 'error')
            }
        }

        // NEU: Share-Funktionen
        function shareItem() {
            // Nur für Listen, nicht für Ordner
            if (selectedItem.type === 0 || selectedItem.type === 1) {
            document.getElementById("shareModal").classList.remove("hidden");
            fetchShareId();
            } else {
            showNotification('Only lists and tables can be shared', 'error')
            }
        }

        function closeShareModal() {
            document.getElementById("shareModal").classList.add("hidden");
            // Reset modal state
            document.getElementById("shareLoader").classList.remove("hidden");
            document.getElementById("shareContent").classList.add("hidden");
            document.getElementById("shareError").classList.add("hidden");
        }

        async function fetchShareId() {
            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");

            try {
            const res = await fetch('/api/data/fetchid', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                username: userName, 
                password, 
                route, 
                lesson: selectedItem.name 
                }),
                signal: AbortSignal.timeout(10000)
            });

            if (!res.ok) {
                throw new Error(\`Server responded with status: \${res.status}\`);
            }

            const data = await res.json();
            
            if (data.state === "success" && data.id) {
                document.getElementById("shareLoader").classList.add("hidden");
                document.getElementById("shareContent").classList.remove("hidden");
                
                // Set the share ID and link
                document.getElementById("shareId").value = data.id;
            } else {
                throw new Error(data.message || 'Unknown error');
            }
            } catch (err) {
            console.error("Unknown error while requesting Share-ID:", err);
            document.getElementById("shareLoader").classList.add("hidden");
            document.getElementById("shareError").classList.remove("hidden");
            }
        }

        function retryFetchId() {
            document.getElementById("shareError").classList.add("hidden");
            document.getElementById("shareLoader").classList.remove("hidden");
            fetchShareId();
        }

        function copyShareId() {
            const shareId = document.getElementById("shareId");
            shareId.select();
            shareId.setSelectionRange(0, 99999); // For mobile devices
            
            try {
            document.execCommand('copy');
            // Visual feedback
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '✓ Copied!';
            btn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
            btn.classList.add('bg-green-500');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('bg-green-500');
                btn.classList.add('bg-blue-500', 'hover:bg-blue-600');
            }, 2000);
            } catch (err) {
            console.error('Copying failed:', err);
            showNotification('Copying failed. Please copy it manually.', 'error')
            }
        }

        // Löschen
        async function confirmDelete() {
            if (!confirm(\`Are you sure that you want to delete "\${selectedItem.name}"?\`)) return;

            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");

            try {
            const res = await fetch('/api/data/delete', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                username: userName, 
                password, 
                route, 
                name: selectedItem.name 
                }),
                signal: AbortSignal.timeout(10000)
            });

            if (!res.ok) {
                throw new Error(\`Server responded with status: \${res.status}\`);
            }

            const data = await res.json();
            if (data.state === "success") {
                location.reload();
            } else {
                showNotification(\`Error while deleting: \${data.message || 'Unknown error'}\`, 'error')
            }
            } catch (err) {
            console.error(err);
            showNotification(\`An error is occured: \${err.message || 'Connection issues'}\`, 'error')
            }
        }

        // Event-Listener für Enter-Taste in Modals
        document.getElementById("folderNameInput").addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
            submitFolder();
            }
        });

        document.getElementById("renameInput").addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
            submitRename();
            }
        });
            
        // Dropdown-Aktionen
        function createList() {
            // Dropdown schließen
            document.getElementById("vocabDropdownMenu").classList.add("hidden");
            document.getElementById("dropdownArrow").style.transform = "rotate(0deg)";
            
            window.location.href = \`/createlist?route=\${encodeURIComponent(route)}\`;
        }

        function createTable() {
            // Dropdown schließen
            document.getElementById("vocabDropdownMenu").classList.add("hidden");
            document.getElementById("dropdownArrow").style.transform = "rotate(0deg)";
            
            window.location.href = \`/createtable?route=\${encodeURIComponent(route)}\`;
        }
            
        function importList() {
            // Dropdown schließen
            document.getElementById("vocabDropdownMenu").classList.add("hidden");
            document.getElementById("dropdownArrow").style.transform = "rotate(0deg)";

            window.location.href = \`/importList?route=\${encodeURIComponent(route)}\`;
        }
            
        </script>
        </body>
        </html>
    `);
};

const createlist = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Create Vocablist</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>

        ${fastInit}
        </head>
        <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">

        ${notificationContainer}

        ${header}

        <!-- Main Content -->
        <main class="flex-1 p-4 sm:p-6">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Vocablist creation</h2>
            
            <!-- Listenname -->
            <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md dark:shadow-gray-900/20 mb-4 sm:mb-6 border dark:border-gray-700 transition-all duration-300">
            <input id="listNameInput" type="text" placeholder="Name of the Vocablist" class="w-full border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base" />
            </div>

            <!-- Eingabe -->
            <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md dark:shadow-gray-900/20 mb-4 sm:mb-6 border dark:border-gray-700 transition-all duration-300">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input id="wordInput" type="text" placeholder="Word" class="border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base" />
                <input id="translationInput" type="text" placeholder="Translation" class="border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base" />
            </div>
            <button id="addBtn" class="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300 text-sm sm:text-base">Add</button>
            </div>

            <!-- Liste -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-900/20 border dark:border-gray-700 transition-all duration-300">
            <table class="w-full text-left border-collapse">
                <thead>
                <tr>
                    <th class="pb-2 text-gray-900 dark:text-white transition-colors duration-300">Word</th>
                    <th class="pb-2 text-gray-900 dark:text-white transition-colors duration-300">Translation</th>
                    <th class="pb-2 text-gray-900 dark:text-white transition-colors duration-300">Actions</th>
                </tr>
                </thead>
                <tbody id="vocabList"></tbody>
            </table>
            <button id="saveBtn" class="mt-6 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-all duration-300">Save list</button>
            </div>
        </main>

        ${footer}

        <!-- Script -->
        <script>

        ${notificationScript}

            // Dark mode functionality with localStorage
            class ThemeManager {
                constructor() {
                    this.init();
                }

            init() {
                // Get theme from localStorage or default to 'system'
                const savedTheme = localStorage.getItem('theme') || 'system';
                this.applyTheme(savedTheme);
            }

            applyTheme(theme) {
                const html = document.documentElement;
                
                if (theme === 'system') {
                // Use system preference
                    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    html.classList.toggle('dark', systemDark);
                } else if (theme === 'dark') {
                    html.classList.add('dark');
                } else {
                    html.classList.remove('dark');
                }
                
                // Save to localStorage
                localStorage.setItem('theme', theme);
            }
        }

            document.addEventListener("DOMContentLoaded", async () => {
            // Initialize theme manager
            new ThemeManager();

            const params = new URLSearchParams(window.location.search);
            const route = params.get("route");

            const wordInput = document.getElementById("wordInput");
            const translationInput = document.getElementById("translationInput");
            const addBtn = document.getElementById("addBtn");
            const saveBtn = document.getElementById("saveBtn");
            const vocabList = document.getElementById("vocabList");

            let entries = [];

            function renderList() {
                vocabList.innerHTML = "";
                entries.forEach((entry, index) => {
                vocabList.innerHTML += \`
                    <tr class="border-t dark:border-gray-600">
                    <td><input type="text" class="w-full p-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300" value="\${entry.word}" onchange="updateWord(\${index}, this.value)" /></td>
                    <td><input type="text" class="w-full p-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300" value="\${entry.translation}" onchange="updateTranslation(\${index}, this.value)" /></td>
                    <td>
                        <button onclick="deleteEntry(\${index})" class="text-red-500 dark:text-red-400 hover:underline transition-colors duration-300">Delete</button>
                    </td>
                    </tr>
                \`;
                });
            }

            addBtn.addEventListener("click", () => {
                const word = wordInput.value.trim();
                const translation = translationInput.value.trim();

                if (word && translation) {
                entries.push({ word, translation });
                wordInput.value = "";
                translationInput.value = "";
                renderList();
                }
            });

            saveBtn.addEventListener("click", async () => {
                const userName = localStorage.getItem("username");
                const password = localStorage.getItem("password");
                const listNameInput = document.getElementById("listNameInput");
                const listName = listNameInput.value.trim();

                try {
                const res = await fetch("/api/data/savelist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: userName, password, list: entries, route, name: listName })
                });

                const data = await res.json();
                if (data.state === "success") {
                    showNotification('Successfully saved list!', 'success')
                    window.location.href = \`/learn?route=\${route}\`;
                } else {
                    showNotification(data.message || 'Error while saving', 'error')
                }
                } catch (err) {
                console.error("Error while saving:", err);
                showNotification('Connection to server failed', 'error')
                }
            });

            function deleteEntry(index) {
                entries.splice(index, 1);
                renderList();
            }

            window.deleteEntry = deleteEntry;

            function updateWord(index, value) {
                entries[index].word = value;
            }

            window.updateWord = updateWord;

            function updateTranslation(index, value) {
                entries[index].translation = value;
            }

            window.updateTranslation = updateTranslation;

            // Authentifizierung prüfen
            const verifyUserName = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            

            if (!verifyUserName || !password) {
                window.location.href = "/login";
                return;
            }

            const res = await fetch("/api/auth/checkData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName: verifyUserName, password })
            });

            const data = await res.json();
            if (data.state === "error") {
                localStorage.clear();
                window.location.href = "/login";
            } else if (data.state === "success" && data.sessionExpired === "true") {
                window.location.href = "/ad";
            } else if (data.state === "success" && data.verified === "false"){
                window.location.href = "/verify"
            }
            });
        </script>
        </body>
        </html>
    `);
};

const list = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blearn - List</title>
        <script src="https://cdn.tailwindcss.com"></script>

        ${fastInit}
        </head>
        ${notificationContainer}

        <body class="bg-gray-900 text-white min-h-screen flex flex-col items-center py-6 sm:py-8">
        <div class="w-full max-w-4xl px-4">
            <!-- Header -->
            <header class="mb-6 sm:mb-8 text-center">
            <h1 class="text-2xl sm:text-3xl font-bold mb-2" id="lessonTitle">Vocab list</h1>
            <a href="/learn" class="text-sm sm:text-base text-blue-400 hover:underline">Back to your files</a>
            <div class="mt-4 space-y-2 text-sm sm:text-base">
                <div>
                    <input type="checkbox" id="shuffeling" class="mr-2 h-4 w-4 rounded text-blue-500 focus:ring-blue-500">
                    <label for="shuffeling">Disable shuffeling</label>
                </div>
                <div>
                    <input type="checkbox" id="swapSides" class="mr-2 h-4 w-4 rounded text-blue-500 focus:ring-blue-500">
                    <label for="swapSides">Swap sides</label>
                </div>
            </div>
            </header>

            <!-- Quiz Table -->
            <div class="overflow-x-auto mb-6 sm:mb-8">
            <table class="w-full rounded-lg overflow-hidden">
                <thead class="bg-gray-700">
                <tr>
                    <th class="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm">Word</th>
                    <th class="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm">Translation</th>
                </tr>
                </thead>
                <tbody id="vocabularyTable" class="bg-gray-800 divide-y divide-gray-700">
                <!-- Vocabulary rows will be inserted here by JavaScript -->
                </tbody>
            </table>
            </div>

            <!-- Check Answers Button -->
            <div class="text-center">
            <button onclick="checkAnswers()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                Check answers
            </button>
            </div>
        </div>

        <script>

        ${notificationScript}
            const checkbox = document.getElementById('shuffeling');            
            const lse = localStorage.getItem("lse") || "false";

            const checkbox2 = document.getElementById('swapSides')
            const ss = localStorage.getItem('ss') || "false";

            if(lse === "true"){
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }

            if(ss === "true"){
                checkbox2.checked = true;
            } else {
                checkbox2.checked = false;
            }

            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem("lse", "true");
                    location.reload();
                } else {
                    localStorage.setItem("lse", "false");
                    location.reload();
                }
            });
               
            checkbox2.addEventListener('change', () => {
                if (checkbox2.checked) {
                    localStorage.setItem("ss", "true");
                    location.reload();
                } else {
                    localStorage.setItem("ss", "false");
                    location.reload();
                }
            });

            // Get route and lesson from URL
            const urlParams = new URLSearchParams(window.location.search);
            const route = urlParams.get('route') || '/';
            const lesson = urlParams.get('lesson');
            
            // Correct answers object
            let correctAnswers = {};

            document.addEventListener('DOMContentLoaded', async () => {
            // Set lesson title
            
            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            
            if (!userName || !password) {
                window.location.href = "/login";
                return;
            }

            try {
                const res = await fetch("/api/auth/checkData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
                });
                
                const data = await res.json();
                
                if (data.state === "error") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                window.location.href = "/login";
                } else if (data.state === "success" && data.sessionExpired === "true") {
                window.location.href = "/ad";
                } else if (data.state === "success" && data.verified === "false") {
                    window.location.href = "/verify"
                } else {
                console.log("Successful login");
                }
            } catch (err) {
                console.error("Error while checking data:", err);
                window.location.href = "/login";
            }
            
            if (lesson) {
                document.getElementById('lessonTitle').textContent = lesson;
            }

            // Get vocabulary from server
            try {
                const userName = localStorage.getItem('username');
                const password = localStorage.getItem('password');

                if (!userName || !password) {
                window.location.href = '/login';
                return;
                }

                const res = await fetch("/api/data/getvoclist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: userName, password, route, lesson })
                });

                if (!res.ok) {
                throw new Error('Server responded with error');
                }

                const data = await res.json();
                
                if (!data || !data.list) {
                throw new Error('Invalid data format received');
                }

                // Populate correctAnswers and create table rows
                const tableBody = document.getElementById('vocabularyTable');
                tableBody.innerHTML = '';

                if(ss === "false"){
                data.list.forEach((item, index) => {
                if (!item.german || !item.translation) return;

                const id = \`vocab-\${index}\`;
                correctAnswers[id] = item.translation.toLowerCase();

                const row = document.createElement('tr');
                row.className = 'hover:bg-gray-700';
                row.innerHTML = \`
                    <td class="py-3 px-4">\${item.german}</td>
                    <td class="py-3 px-4">
                    <input type="text" id="\${id}" 
                        class="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span id="\${id}-solution" class="hidden text-red-400 text-sm mt-1 block"></span>
                    </td>
                \`;
                tableBody.appendChild(row);
                });
                } else {
                data.list.forEach((item, index) => {
                if (!item.german || !item.translation) return;

                const id = \`vocab-\${index}\`;
                correctAnswers[id] = item.german.toLowerCase();

                const row = document.createElement('tr');
                row.className = 'hover:bg-gray-700';
                row.innerHTML = \`
                    <td class="py-3 px-4">\${item.translation}</td>
                    <td class="py-3 px-4">
                    <input type="text" id="\${id}" 
                        class="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span id="\${id}-solution" class="hidden text-red-400 text-sm mt-1 block"></span>
                    </td>
                \`;
                tableBody.appendChild(row);
                });
                }

                // Shuffle rows
                shuffleRows();

            } catch (error) {
                showNotification(error, 'error')
                console.error('Error loading vocabulary:', error);
                document.getElementById('vocabularyTable').innerHTML = \`
                <tr>
                    <td colspan="2" class="py-4 text-center text-red-400">
                    Error while loading list. Please try again.
                    </td>
                </tr>
                \`;
            }
            });

            function shuffleRows() {
            const tableBody = document.getElementById('vocabularyTable');
            const rows = Array.from(tableBody.children);
            
            if(lse === "true"){
                rows.forEach(row => tableBody.appendChild(row));
            } else {
                const shuffled = Array.from(rows).sort(() => Math.random() - 0.5);
                shuffled.forEach(row => tableBody.appendChild(row));
            }
            }

            function checkAnswers() {
            for (const id in correctAnswers) {
                const inputField = document.getElementById(id);
                const solutionSpan = document.getElementById(\`\${id}-solution\`);
                const userAnswer = inputField.value.trim().toLowerCase();
                const correctAnswer = correctAnswers[id].toLowerCase();

                // Remove previous styling
                inputField.classList.remove('bg-green-700', 'bg-red-700', 'border-green-500', 'border-red-500');
                
                if (userAnswer === correctAnswer) {
                // Correct answer
                inputField.classList.add('bg-green-700', 'border-green-500');
                if (solutionSpan) solutionSpan.classList.add('hidden');
                } else {
                // Incorrect answer
                inputField.classList.add('bg-red-700', 'border-red-500');
                if (solutionSpan) {
                    solutionSpan.textContent = \`Right answer: \${correctAnswers[id]}\`;
                    solutionSpan.classList.remove('hidden');
                }
                }
            }
            }
        </script>
        </body>
        </html>
    `);
};

const editlist = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Edit Vocablist</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>

        ${fastInit}
        </head>
        <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">

        ${notificationContainer}

        ${header}

        <!-- Main Content -->
        <main class="flex-1 p-4 sm:p-6">
            <!-- Loading Indicator -->
            <div id="loadingIndicator" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 dark:border-blue-400 border-opacity-50"></div>
            </div>

            <div id="mainContent" class="hidden">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
                <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Edit Vocablist</h2>
                <span id="listPath" class="text-blue-600 dark:text-blue-400 text-xs sm:text-sm mt-1 sm:mt-0"></span>
            </div>
            
            <!-- Listenname -->
            <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md mb-4 sm:mb-6 transition-colors duration-300">
                <label for="listNameInput" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name der Liste</label>
                <input id="listNameInput" type="text" placeholder="Name of the list" class="w-full border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" disabled />
            </div>

            <!-- Eingabe -->
            <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md mb-4 sm:mb-6 transition-colors duration-300">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input id="wordInput" type="text" placeholder="Word" class="border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm sm:text-base" />
                <input id="translationInput" type="text" placeholder="Translation" class="border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm sm:text-base" />
                </div>
                <button id="addBtn" class="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition text-sm sm:text-base">Add</button>
            </div>

            <!-- Liste -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors duration-300">
                <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">You can edit the vocab in the list.</div>
                <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                    <tr class="bg-gray-50 dark:bg-gray-700">
                        <th class="px-4 py-2 border-b dark:border-gray-600 text-gray-900 dark:text-white">Word</th>
                        <th class="px-4 py-2 border-b dark:border-gray-600 text-gray-900 dark:text-white">Translation</th>
                        <th class="px-4 py-2 border-b dark:border-gray-600 text-gray-900 dark:text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody id="vocabList"></tbody>
                </table>
                </div>
                <div class="mt-6 flex justify-between">
                <button id="cancelBtn" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">Cancel</button>
                <button id="saveBtn" class="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition">Save changes</button>
                </div>
            </div>
            </div>

            <!-- Error Message -->
            <div id="errorMessage" class="hidden bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 p-4 rounded-lg shadow-md">
            <p class="font-bold">Error</p>
            <p id="errorText"></p>
            <button onclick="window.location.reload()" class="mt-2 px-4 py-1 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition">
                Reload
            </button>
            </div>
        </main>

        ${footer}

        <!-- Script -->
        <script>

        ${notificationScript}


            // Dark mode functionality
            class ThemeManager {
                constructor() {
                    this.init();
                }

                init() {
                    // Get theme from localStorage or default to 'system'
                    const savedTheme = localStorage.getItem('theme') || 'system';
                    this.applyTheme(savedTheme);
                }

                applyTheme(theme) {
                    const html = document.documentElement;
                
                    if (theme === 'system') {
                    // Use system preference
                    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    html.classList.toggle('dark', systemDark);
                    } else if (theme === 'dark') {
                    html.classList.add('dark');
                    } else {
                    html.classList.remove('dark');
                    }
                
                    // Save to localStorage
                    localStorage.setItem('theme', theme);
                }
            }

            document.addEventListener("DOMContentLoaded", async () => {
            // Initialize theme manager
            new ThemeManager();

            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            
            if (!userName || !password) {
                window.location.href = "/login";
                return;
            }

            // Single authentication check
            try {
                const res = await fetch('/api/auth/checkData', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
                });
                
                const data = await res.json();
                
                if (data.state === "error") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                window.location.href = "/login";
                return;
                } else if (data.state === "success" && data.sessionExpired === "true") {
                window.location.href = "/ad";
                return;
                } else if (data.state === "success" && data.verified === "false") {
                    window.location.href = "/verify"
                } else {
                console.log("Successful login");
                }
            } catch (err) {
                console.error("Error while checking data:", err);
                window.location.href = "/login";
                return;
            }
                
            // Query parameters
            const params = new URLSearchParams(window.location.search);
            const route = params.get("route") || "/";
            const lesson = params.get("lesson");
            
            if (!lesson) {
                showError("No vocab list given!");
                return;
            }
            
            // Update breadcrumb/path info
            document.getElementById("listPath").textContent = \`\${route}/\${lesson}\`;
            document.getElementById("listNameInput").value = lesson;

            // DOM Elements
            const wordInput = document.getElementById("wordInput");
            const translationInput = document.getElementById("translationInput");
            const addBtn = document.getElementById("addBtn");
            const saveBtn = document.getElementById("saveBtn");
            const vocabList = document.getElementById("vocabList");
            const cancelBtn = document.getElementById("cancelBtn");

            let entries = [];

            // Function to render the vocabulary list
            function renderList() {
                vocabList.innerHTML = "";
                entries.forEach((entry, index) => {
                vocabList.innerHTML += \`
                    <tr class="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td class="px-4 py-2">
                        <input type="text" class="w-full p-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent" value="\${escapeHTML(entry.german)}" onchange="updateWord(\${index}, this.value)" />
                    </td>
                    <td class="px-4 py-2">
                        <input type="text" class="w-full p-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent" value="\${escapeHTML(entry.translation)}" onchange="updateTranslation(\${index}, this.value)" />
                    </td>
                    <td class="px-4 py-2">
                        <button onclick="deleteEntry(\${index})" class="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        </button>
                    </td>
                    </tr>
                \`;
                });
            }


            
            // Escape HTML to prevent XSS
            function escapeHTML(str) {
                return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
                }
                
            // Add new vocabulary entry
            addBtn.addEventListener("click", () => {
                const word = wordInput.value.trim();
                const translation = translationInput.value.trim();

                if (word && translation) {
                entries.push({ german: word, translation });
                wordInput.value = "";
                translationInput.value = "";
                renderList();
                wordInput.focus();
                } else {
                showNotification('Please enter the word and the translation', 'error') 
                }
            });

            // Listen for Enter key in the input fields
            wordInput.addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                translationInput.focus();
                }
            });

            translationInput.addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                addBtn.click();
                }
            });


            // Save changes
            saveBtn.addEventListener("click", async () => {
                if (entries.length === 0) {
                showNotification("The list don't contains a single word. Please add at least one word!", 'error')
                return;
                }

                try {
                saveBtn.disabled = true;
                saveBtn.textContent = "Wird gespeichert...";
                
                const res = await fetch('/api/data/editList', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                    username: userName, 
                    password, 
                    list: entries, 
                    route, 
                    lesson 
                    }),
                    signal: AbortSignal.timeout(10000) // 10 seconds timeout
                });

                const data = await res.json();
                if (data.state === "success") {
                    showNotification('List successfully saved!', 'success')
                    window.location.href = \`/learn?route=\${encodeURIComponent(route)}\`;
                } else {
                    showNotification(\`Error while saving: \${data.message || 'Unknown error'}\`, 'error')
                    saveBtn.disabled = false;
                    saveBtn.textContent = "Save changes";
                }
                } catch (err) {
                console.error("Saving failed:", err);
                showNotification(\`Error while connecting to server: \${err.message || 'Network problem'}\`, 'error')
                saveBtn.disabled = false;
                saveBtn.textContent = "Save changes";
                }
            });

            cancelBtn.addEventListener("click", () => {
                if (hasChanges()) {
                if (confirm("Are you sure that you want to lose your changes?")) {
                    goBack();
                }
                } else {
                goBack();
                }
            });

            function goBack() {
                window.location.href = \`/learn?route=\${encodeURIComponent(route)}\`;
            }

            // Check if there are unsaved changes
            let originalEntries = [];
            function hasChanges() {
                if (entries.length !== originalEntries.length) return true;
                
                for (let i = 0; i < entries.length; i++) {
                if (entries[i].german !== originalEntries[i].german || 
                    entries[i].translation !== originalEntries[i].translation) {
                    return true;
                }
                }
                return false;
            }


            // Delete entry
            function deleteEntry(index) {
                if (confirm("Are you sure that you want to delete this word?")) {
                entries.splice(index, 1);
                renderList();
                }
            }
            window.deleteEntry = deleteEntry;

            // Update entry
            function updateWord(index, value) {
                entries[index].german = value;
            }
            window.updateWord = updateWord;

            function updateTranslation(index, value) {
                entries[index].translation = value;
            }
            window.updateTranslation = updateTranslation;

            // Show error message
            function showError(message) {
                document.getElementById("loadingIndicator").style.display = "none";
                document.getElementById("mainContent").style.display = "none";
                document.getElementById("errorMessage").style.display = "block";
                document.getElementById("errorText").textContent = message;
            }

            // Load vocabulary data
            try {
                const res = await fetch('/api/data/getvoclist', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: userName, password, route, lesson }),
                });

                if (!res.ok) {
                throw new Error(\`Server responded with status: \${res.status}\`);
                }

                const data = await res.json();
                
                if (data.state === "error") {
                showError(data.message || "Error while loading list");
                return;
                }

                if (!data.list || !Array.isArray(data.list)) {
                showError("Unable to load list (invalid format)");
                return;
                }

                // Load vocabulary into entries array
                entries = data.list;
                originalEntries = JSON.parse(JSON.stringify(entries)); // Deep copy for change tracking
                renderList();

                // Hide loading indicator and show content
                document.getElementById("loadingIndicator").style.display = "none";
                document.getElementById("mainContent").style.display = "block";

            } catch (err) {
                console.error("Error while loading list:", err);
                showError(err.message || "Connection to server failed");
            }
            });
        </script>
        </body>
        </html>
    `);
};

const createTable = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Create Table</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>

        ${fastInit}
        </head>
        <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">

        ${notificationContainer}

        ${header}

        <!-- Main Content -->
        <main class="flex-1 p-4 sm:p-6">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Create Table</h2>
            
            <!-- Tabellenname -->
            <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md dark:shadow-gray-900/20 mb-4 sm:mb-6 border dark:border-gray-700 transition-all duration-300">
            <input id="tableNameInput" type="text" placeholder="Name of the table" class="w-full border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base" />
            </div>

            <!-- Table Setup Controls -->
            <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md dark:shadow-gray-900/20 mb-4 sm:mb-6 border dark:border-gray-700 transition-all duration-300">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Tablestructure</h3>
            
            <!-- Column Management -->
            <div class="mb-4">
                <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Manage Columns</h4>
                <div class="flex flex-col sm:flex-row gap-2 mb-2">
                <input id="columnInput" type="text" placeholder="Column Name" class="flex-1 border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base" />
                <button id="addColumnBtn" class="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300 text-sm sm:text-base">Add Column</button>
                </div>
                <div id="columnsList" class="flex flex-wrap gap-2"></div>
            </div>
            
            <!-- Row Management -->
            <div class="mb-4">
                <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Row Management</h4>
                <div class="flex flex-col sm:flex-row gap-2 mb-2">
                <input id="rowInput" type="text" placeholder="Name of the row" class="flex-1 border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base" />
                <button id="addRowBtn" class="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-all duration-300 text-sm sm:text-base">Add row</button>
                </div>
                <div id="rowsList" class="flex flex-wrap gap-2"></div>
            </div>
            </div>

            <!-- Dynamic Table -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-900/20 mb-6 border dark:border-gray-700 transition-all duration-300">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Your table</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse" id="dynamicTable">
                <thead>
                    <tr>
                    <th class="p-3 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                </table>
            </div>
            <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Add rows and columns to create the table. Click on the cells, to enter a value.
            </div>
            <button id="saveBtn" class="mt-6 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-800 transition-all duration-300">Save table</button>
            </div>
        </main>

        ${footer}

        <!-- Script -->
        <script>
        ${notificationScript}
            // Dark mode functionality
            class ThemeManager {
            constructor() {
                this.init();
            }

            init() {
                const savedTheme = this.getSavedTheme() || 'system';
                this.applyTheme(savedTheme);
            }

            getSavedTheme() {
                try {
                return window.theme || 'system';
                } catch (e) {
                return 'system';
                }
            }

            saveTheme(theme) {
                try {
                window.theme = theme;
                } catch (e) {
                // Silent fail if unable to save
                }
            }

            applyTheme(theme) {
                const html = document.documentElement;
                
                if (theme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                html.classList.toggle('dark', systemDark);
                } else if (theme === 'dark') {
                html.classList.add('dark');
                } else {
                html.classList.remove('dark');
                }
                
                this.saveTheme(theme);
            }
            }

            document.addEventListener("DOMContentLoaded", async () => {
            // Initialize theme manager
            new ThemeManager();

            const params = new URLSearchParams(window.location.search);
            const route = params.get("route");

            const columnInput = document.getElementById("columnInput");
            const addColumnBtn = document.getElementById("addColumnBtn");
            const rowInput = document.getElementById("rowInput");
            const addRowBtn = document.getElementById("addRowBtn");
            const saveBtn = document.getElementById("saveBtn");
            const dynamicTable = document.getElementById("dynamicTable");
            const columnsList = document.getElementById("columnsList");
            const rowsList = document.getElementById("rowsList");

            let columns = [];
            let rows = [];
            let tableData = []; // Changed from object to array

            // Helper function to get array index from row and column indices
            function getTableIndex(rowIndex, columnIndex) {
                return rowIndex * columns.length + columnIndex;
            }

            // Helper function to get value from tableData array
            function getTableValue(rowIndex, columnIndex) {
                const index = getTableIndex(rowIndex, columnIndex);
                return tableData[index] || '';
            }

            // Helper function to set value in tableData array
            function setTableValue(rowIndex, columnIndex, value) {
                const index = getTableIndex(rowIndex, columnIndex);
                // Ensure array is large enough
                while (tableData.length <= index) {
                tableData.push('');
                }
                tableData[index] = value;
            }

            function updateColumnsList() {
                columnsList.innerHTML = '';
                columns.forEach((column, index) => {
                const tag = document.createElement('span');
                tag.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
                tag.innerHTML = \`
                    \${column}
                    <button onclick="removeColumn(\${index})" class="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100">×</button>
                \`;
                columnsList.appendChild(tag);
                });
            }

            function updateRowsList() {
                rowsList.innerHTML = '';
                rows.forEach((row, index) => {
                const tag = document.createElement('span');
                tag.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
                tag.innerHTML = \`
                    \${row}
                    <button onclick="removeRow(\${index})" class="ml-2 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100">×</button>
                \`;
                rowsList.appendChild(tag);
                });
            }

            function renderTable() {
                const thead = dynamicTable.querySelector('thead tr');
                const tbody = dynamicTable.querySelector('tbody');
                
                // Clear existing content
                thead.innerHTML = '<th class="p-3 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"></th>';
                tbody.innerHTML = '';
                
                // Add column headers
                columns.forEach(column => {
                const th = document.createElement('th');
                th.className = 'p-3 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300';
                th.textContent = column;
                thead.appendChild(th);
                });

                // Add rows
                rows.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');
                
                // Row header
                const th = document.createElement('th');
                th.className = 'p-3 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300';
                th.textContent = row;
                tr.appendChild(th);
                
                // Data cells
                columns.forEach((column, columnIndex) => {
                    const td = document.createElement('td');
                    td.className = 'p-3 border dark:border-gray-600';
                    
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'w-full p-2 border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded';
                    input.placeholder = 'Value...';
                    
                    input.value = getTableValue(rowIndex, columnIndex);
                    
                    input.addEventListener('input', (e) => {
                    setTableValue(rowIndex, columnIndex, e.target.value);
                    });
                    
                    td.appendChild(input);
                    tr.appendChild(td);
                });
                
                tbody.appendChild(tr);
                });
            }

            // Add column
            addColumnBtn.addEventListener("click", () => {
                const column = columnInput.value.trim();
                if (column && !columns.includes(column)) {
                columns.push(column);
                columnInput.value = "";
                updateColumnsList();
                renderTable();
                }
            });

            // Add row
            addRowBtn.addEventListener("click", () => {
                const row = rowInput.value.trim();
                if (row && !rows.includes(row)) {
                rows.push(row);
                rowInput.value = "";
                updateRowsList();
                renderTable();
                }
            });

            // Allow Enter key
            columnInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") addColumnBtn.click();
            });

            rowInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") addRowBtn.click();
            });

            // Global functions for removing columns and rows
            window.removeColumn = function(columnIndex) {
                // Create new tableData array without the removed column
                const newTableData = [];
                for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                for (let colIndex = 0; colIndex < columns.length; colIndex++) {
                    if (colIndex !== columnIndex) {
                    const oldIndex = getTableIndex(rowIndex, colIndex);
                    newTableData.push(tableData[oldIndex] || '');
                    }
                }
                }
                
                columns.splice(columnIndex, 1);
                tableData = newTableData;
                
                updateColumnsList();
                renderTable();
            };

            window.removeRow = function(rowIndex) {
                // Create new tableData array without the removed row
                const newTableData = [];
                for (let rIndex = 0; rIndex < rows.length; rIndex++) {
                if (rIndex !== rowIndex) {
                    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
                    const oldIndex = getTableIndex(rIndex, colIndex);
                    newTableData.push(tableData[oldIndex] || '');
                    }
                }
                }
                
                rows.splice(rowIndex, 1);
                tableData = newTableData;
                
                updateRowsList();
                renderTable();
            };

            saveBtn.addEventListener("click", async () => {
                
                const userName = localStorage.getItem("username");
                const password = localStorage.getItem("password");
                
                const tableNameInput = document.getElementById("tableNameInput");
                const tableName = tableNameInput.value.trim();

                if (!tableName) {
                showNotification('Please enter a name for the table', 'error')
                
                return;
                }

                if (columns.length === 0 || rows.length === 0) {
                showNotification('Please add atleast one row and one column', 'error')
                return;
                }

                // Format data for saving - tableData is now an array of strings
                const saveData = {
                columns: columns,
                rows: rows,
                tableData: tableData // This is now an array of strings
                };

                console.log("Saving table data:", saveData);

                try {
                const res = await fetch("/api/data/savetable", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                    username: userName, 
                    password, 
                    table: saveData, 
                    route, 
                    name: tableName 
                    })
                });

                const data = await res.json();
                if (data.state === "success") {
                    showNotification('Successfully saved!', 'success')
                    window.location.href = \`/learn?route=\${route}\`;
                } else {
                    showNotification(data.message || 'Error while saving', 'error')
                }
                } catch (err) {
                console.error("Error while Saving:", err);
                showNotification('Error while connecting to server', 'error')
                }
            });

            // Simple authentication check (adapted for artifact environment)
            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            
            if (!userName || !password) {
                window.location.href = "/login";
                return;
            }

            // Single authentication check
            try {
                const res = await fetch('/api/auth/checkData', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
                });
                
                const data = await res.json();
                
                if (data.state === "error") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                window.location.href = "/login";
                return;
                } else if (data.state === "success" && data.sessionExpired === "true") {
                window.location.href = "/ad";
                return;
                } else if (data.state === "success" && data.verified === "false") {
                    window.location.href = "/verify"
                } else {
                console.log("Successful login");
                }
            } catch (err) {
                console.error("Error while checking data:", err);
                window.location.href = "/login";
                return;
            }
            });
        </script>
        </body>
        </html>
    `);
};

const table = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blearn - Table</title>
        <script src="https://cdn.tailwindcss.com"></script>

        ${fastInit}
        </head>
        ${notificationContainer}
        <body class="bg-gray-900 text-white min-h-screen flex flex-col items-center py-6 sm:py-8">
        <div class="w-full max-w-6xl px-4">
            <!-- Header -->
            <header class="mb-6 sm:mb-8 text-center">
            <h1 class="text-2xl sm:text-3xl font-bold mb-2" id="lessonTitle">Table</h1>
            <a href="/learn" class="text-sm sm:text-base text-blue-400 hover:underline">Back to your files</a>
            </header>

            <!-- Quiz Table -->
            <div class="overflow-x-auto mb-6 sm:mb-8">
            <table class="w-full rounded-lg overflow-hidden min-w-[500px]">
                <thead class="bg-gray-700" id="tableHeader">
                <!-- Table headers will be inserted here by JavaScript -->
                </thead>
                <tbody id="tableBody" class="bg-gray-800 divide-y divide-gray-700">
                <!-- Table rows will be inserted here by JavaScript -->
                </tbody>
            </table>
            </div>

            <!-- Check Answers Button -->
            <div class="text-center">
            <button onclick="checkAnswers()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                Check answers
            </button>
            </div>
        </div>

        <script>
            ${notificationScript}
            // Get route and lesson from URL
            const urlParams = new URLSearchParams(window.location.search);
            const route = urlParams.get('route') || '/';
            const lesson = urlParams.get('lesson');
            
            // Correct answers object
            let correctAnswers = {};
            let tableStructure = {};

            document.addEventListener('DOMContentLoaded', async () => {
            // Set lesson title
            
            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            
            if (!userName || !password) {
                window.location.href = "/login";
                return;
            }

            try {
                const res = await fetch("/api/auth/checkData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
                });
                
                const data = await res.json();
                
                if (data.state === "error") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                window.location.href = "/login";
                } else if (data.state === "success" && data.sessionExpired === "true") {
                window.location.href = "/ad";
                } else if (data.state === "success" && data.verified === "false") {
                window.location.href = "/verify"
                } else{
                console.log("Successful login");
                }
            } catch (err) {
                console.error("Error while checking data:", err);
                window.location.href = "/login";
            }
            
            if (lesson) {
                document.getElementById('lessonTitle').textContent = lesson;
            }

            // Get table data from server
            try {
                const userName = localStorage.getItem('username');
                const password = localStorage.getItem('password');

                if (!userName || !password) {
                window.location.href = '/login';
                return;
                }

                const res = await fetch("/api/data/gettable", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: userName, password, route, lesson })
                });

                if (!res.ok) {
                throw new Error('Server responded with error');
                }

                const data = await res.json();
                
                if (!data || !data.table) {
                throw new Error('Invalid data format received');
                }

                const table = data.table;
                tableStructure = table;

                // Create table structure
                buildTable(table);

            } catch (error) {
                showNotification(error, 'error')
                console.error('Error loading table:', error);
                document.getElementById('tableBody').innerHTML = \`
                <tr>
                    <td colspan="100%" class="py-4 text-center text-red-400">
                    Error while loading table. Try again later.
                    </td>
                </tr>
                \`;
            }
            });

            function buildTable(table) {
            const { columns, rows, tableData } = table;
            const tableHeader = document.getElementById('tableHeader');
            const tableBody = document.getElementById('tableBody');
            
            // Clear existing content
            tableHeader.innerHTML = '';
            tableBody.innerHTML = '';

            // Create header row
            const headerRow = document.createElement('tr');
            
            // Empty cell for row headers
            const emptyHeaderCell = document.createElement('th');
            emptyHeaderCell.className = 'py-3 px-4 text-left bg-gray-600';
            headerRow.appendChild(emptyHeaderCell);
            
            // Column headers
            columns.forEach(column => {
                const th = document.createElement('th');
                th.className = 'py-3 px-4 text-left';
                th.textContent = column;
                headerRow.appendChild(th);
            });
            
            tableHeader.appendChild(headerRow);

            // Create data rows
            rows.forEach((rowHeader, rowIndex) => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-gray-700';
                
                // Row header
                const rowHeaderCell = document.createElement('td');
                rowHeaderCell.className = 'py-3 px-4 font-semibold bg-gray-700';
                rowHeaderCell.textContent = rowHeader;
                row.appendChild(rowHeaderCell);
                
                // Data cells
                columns.forEach((column, colIndex) => {
                const cell = document.createElement('td');
                cell.className = 'py-3 px-4';
                
                const dataIndex = rowIndex * columns.length + colIndex;
                const cellId = \`cell-\${rowIndex}-\${colIndex}\`;
                const correctValue = tableData[dataIndex] || '';
                
                // Store correct answer
                correctAnswers[cellId] = correctValue.toLowerCase();
                
                const input = document.createElement('input');
                input.type = 'text';
                input.id = cellId;
                input.className = 'w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';
                input.placeholder = 'Enter answer';
                
                const solutionSpan = document.createElement('span');
                solutionSpan.id = \`\${cellId}-solution\`;
                solutionSpan.className = 'hidden text-red-400 text-sm mt-1 block';
                
                cell.appendChild(input);
                cell.appendChild(solutionSpan);
                row.appendChild(cell);
                });
                
                tableBody.appendChild(row);
            });

            // Table is now ready with correct answers in their proper positions
            }



            function checkAnswers() {
            for (const id in correctAnswers) {
                const inputField = document.getElementById(id);
                const solutionSpan = document.getElementById(\`\${id}-solution\`);
                
                if (!inputField) continue;
                
                const userAnswer = inputField.value.trim().toLowerCase();
                const correctAnswer = correctAnswers[id].toLowerCase();

                // Remove previous styling
                inputField.classList.remove('bg-green-700', 'bg-red-700', 'border-green-500', 'border-red-500');
                
                if (userAnswer === correctAnswer) {
                // Correct answer
                inputField.classList.add('bg-green-700', 'border-green-500');
                if (solutionSpan) solutionSpan.classList.add('hidden');
                } else {
                // Incorrect answer
                inputField.classList.add('bg-red-700', 'border-red-500');
                if (solutionSpan) {
                    solutionSpan.textContent = \`Right answer: \${correctAnswers[id]}\`;
                    solutionSpan.classList.remove('hidden');
                }
                }
            }
            }
        </script>
        </body>
        </html>
    `);
};

const editTable = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Edit Table</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>

        ${fastInit}
        </head>
        <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">

        ${notificationContainer}

        ${header}

        <!-- Main Content -->
        <main class="flex-1 p-4 sm:p-6">
            <!-- Loading Indicator -->
            <div id="loadingIndicator" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 dark:border-blue-400 border-opacity-50"></div>
            </div>

            <div id="mainContent" class="hidden">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
                <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Edit Table</h2>
                <span id="tablePath" class="text-blue-600 dark:text-blue-400 text-xs sm:text-sm mt-1 sm:mt-0"></span>
            </div>
            
            <!-- Tabellenname -->
            <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md mb-4 sm:mb-6 transition-colors duration-300">
                <label for="tableNameInput" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name of the table</label>
                <input id="tableNameInput" type="text" placeholder="Name of the table" class="w-full border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" disabled />
            </div>

            <!-- Table Setup Controls -->
            <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md mb-4 sm:mb-6 transition-colors duration-300">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Table structure</h3>
            
            <!-- Column Management -->
            <div class="mb-4">
                <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Manage Columns</h4>
                <div class="flex flex-col sm:flex-row gap-2 mb-2">
                <input id="columnInput" type="text" placeholder="Column Name" class="flex-1 border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm sm:text-base" />
                <button id="addColumnBtn" class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition text-sm sm:text-base">Add Column</button>
                </div>
                <div id="columnsList" class="flex flex-wrap gap-2"></div>
            </div>
            
            <!-- Row Management -->
            <div class="mb-4">
                <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Row Management</h4>
                <div class="flex flex-col sm:flex-row gap-2 mb-2">
                <input id="rowInput" type="text" placeholder="Name of the row" class="flex-1 border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm sm:text-base" />
                <button id="addRowBtn" class="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition text-sm sm:text-base">Add row</button>
                </div>
                <div id="rowsList" class="flex flex-wrap gap-2"></div>
            </div>
            </div>

            <!-- Dynamic Table -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6 transition-colors duration-300">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Your table</h3>
            <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">You can edit the table data. Click on the cells to enter a value.</div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse" id="dynamicTable">
                <thead>
                    <tr>
                    <th class="p-3 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                </table>
            </div>
            <div class="mt-6 flex justify-between">
                <button id="cancelBtn" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition">Cancel</button>
                <button id="saveBtn" class="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition">Save changes</button>
            </div>
            </div>
            </div>

            <!-- Error Message -->
            <div id="errorMessage" class="hidden bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 p-4 rounded shadow-md">
            <p class="font-bold">Error</p>
            <p id="errorText"></p>
            <button onclick="window.location.reload()" class="mt-2 px-4 py-1 bg-red-600 dark:bg-red-500 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition">
                Reload
            </button>
            </div>
        </main>

        ${footer}

        <!-- Script -->
        <script>
        ${notificationScript}
            // Dark mode functionality
            class ThemeManager {
            constructor() {
                this.init();
            }

            init() {
                const savedTheme = this.getSavedTheme() || 'system';
                this.applyTheme(savedTheme);
            }

            getSavedTheme() {
                try {
                return window.theme || 'system';
                } catch (e) {
                return 'system';
                }
            }

            saveTheme(theme) {
                try {
                window.theme = theme;
                } catch (e) {
                // Silent fail if unable to save
                }
            }

            applyTheme(theme) {
                const html = document.documentElement;
                
                if (theme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                html.classList.toggle('dark', systemDark);
                } else if (theme === 'dark') {
                html.classList.add('dark');
                } else {
                html.classList.remove('dark');
                }
                
                this.saveTheme(theme);
            }
            }

            document.addEventListener("DOMContentLoaded", async () => {
            // Initialize theme manager
            new ThemeManager();
            
            const userName = localStorage.getItem("username")
            const password = localStorage.getItem("password")

            try {
                const res = await fetch("/api/auth/checkData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
                });
                
                const data = await res.json();
                
                if (data.state === "error") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                window.location.href = "/login";
                } else if (data.state === "success" && data.sessionExpired === "true") {
                window.location.href = "/ad";
                } else if (data.state === "success" && data.verified === "false") {
                window.location.href = "/verify"
                } else{
                console.log("Successful login");
                }
            } catch (err) {
                console.error("Error while checking data:", err);
                window.location.href = "/login";
            }
            
            // Query parameters
            const params = new URLSearchParams(window.location.search);
            const route = params.get("route") || "/";
            const tableName = params.get("lesson");
            
            if (!tableName) {
                showError("No table specified!");
                return;
            }
            
            // Update breadcrumb/path info
            document.getElementById("tablePath").textContent = \`\${route}/\${tableName}\`;
            document.getElementById("tableNameInput").value = tableName;

            // DOM Elements
            const columnInput = document.getElementById("columnInput");
            const addColumnBtn = document.getElementById("addColumnBtn");
            const rowInput = document.getElementById("rowInput");
            const addRowBtn = document.getElementById("addRowBtn");
            const saveBtn = document.getElementById("saveBtn");
            const dynamicTable = document.getElementById("dynamicTable");
            const columnsList = document.getElementById("columnsList");
            const rowsList = document.getElementById("rowsList");
            const cancelBtn = document.getElementById("cancelBtn");

            let columns = [];
            let rows = [];
            let tableData = [];
            let originalData = null; // For change tracking

            // Helper function to get array index from row and column indices
            function getTableIndex(rowIndex, columnIndex) {
                return rowIndex * columns.length + columnIndex;
            }

            // Helper function to get value from tableData array
            function getTableValue(rowIndex, columnIndex) {
                const index = getTableIndex(rowIndex, columnIndex);
                return tableData[index] || '';
            }

            // Helper function to set value in tableData array
            function setTableValue(rowIndex, columnIndex, value) {
                const index = getTableIndex(rowIndex, columnIndex);
                // Ensure array is large enough
                while (tableData.length <= index) {
                tableData.push('');
                }
                tableData[index] = value;
            }

            function updateColumnsList() {
                columnsList.innerHTML = '';
                columns.forEach((column, index) => {
                const tag = document.createElement('span');
                tag.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
                tag.innerHTML = \`
                    \${escapeHTML(column)}
                    <button onclick="removeColumn(\${index})" class="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100">×</button>
                \`;
                columnsList.appendChild(tag);
                });
            }

            function updateRowsList() {
                rowsList.innerHTML = '';
                rows.forEach((row, index) => {
                const tag = document.createElement('span');
                tag.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
                tag.innerHTML = \`
                    \${escapeHTML(row)}
                    <button onclick="removeRow(\${index})" class="ml-2 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100">×</button>
                \`;
                rowsList.appendChild(tag);
                });
            }

            function renderTable() {
                const thead = dynamicTable.querySelector('thead tr');
                const tbody = dynamicTable.querySelector('tbody');
                
                // Clear existing content
                thead.innerHTML = '<th class="p-3 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"></th>';
                tbody.innerHTML = '';
                
                // Add column headers
                columns.forEach(column => {
                const th = document.createElement('th');
                th.className = 'p-3 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300';
                th.textContent = column;
                thead.appendChild(th);
                });

                // Add rows
                rows.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200';
                
                // Row header
                const th = document.createElement('th');
                th.className = 'p-3 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300';
                th.textContent = row;
                tr.appendChild(th);
                
                // Data cells
                columns.forEach((column, columnIndex) => {
                    const td = document.createElement('td');
                    td.className = 'p-3 border dark:border-gray-600';
                    
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'w-full p-2 border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent rounded';
                    input.placeholder = 'Value...';
                    
                    input.value = getTableValue(rowIndex, columnIndex);
                    
                    input.addEventListener('input', (e) => {
                    setTableValue(rowIndex, columnIndex, e.target.value);
                    });
                    
                    td.appendChild(input);
                    tr.appendChild(td);
                });
                
                tbody.appendChild(tr);
                });
            }

            // Escape HTML to prevent XSS
            function escapeHTML(str) {
                return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
            }

            // Add column
            addColumnBtn.addEventListener("click", () => {
                const column = columnInput.value.trim();
                if (column && !columns.includes(column)) {
                // When adding a new column, we need to expand the tableData array
                const newTableData = [];
                for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
                    const oldIndex = getTableIndex(rowIndex, colIndex);
                    newTableData.push(tableData[oldIndex] || '');
                    }
                    // Add empty value for the new column
                    newTableData.push('');
                }
                
                columns.push(column);
                tableData = newTableData;
                columnInput.value = "";
                updateColumnsList();
                renderTable();
                columnInput.focus();
                }
            });

            // Add row
            addRowBtn.addEventListener("click", () => {
                const row = rowInput.value.trim();
                if (row && !rows.includes(row)) {
                // When adding a new row, add empty values for all columns
                for (let i = 0; i < columns.length; i++) {
                    tableData.push('');
                }
                
                rows.push(row);
                rowInput.value = "";
                updateRowsList();
                renderTable();
                rowInput.focus();
                }
            });

            // Allow Enter key
            columnInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") addColumnBtn.click();
            });

            rowInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") addRowBtn.click();
            });

            // Global functions for removing columns and rows
            window.removeColumn = function(columnIndex) {
                if (!confirm("Are you sure you want to delete this column? All data in this column will be lost.")) {
                return;
                }
                
                // Create new tableData array without the removed column
                const newTableData = [];
                for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                for (let colIndex = 0; colIndex < columns.length; colIndex++) {
                    if (colIndex !== columnIndex) {
                    const oldIndex = getTableIndex(rowIndex, colIndex);
                    newTableData.push(tableData[oldIndex] || '');
                    }
                }
                }
                
                columns.splice(columnIndex, 1);
                tableData = newTableData;
                
                updateColumnsList();
                renderTable();
            };

            window.removeRow = function(rowIndex) {
                if (!confirm("Are you sure you want to delete this row? All data in this row will be lost.")) {
                return;
                }
                
                // Create new tableData array without the removed row
                const newTableData = [];
                for (let rIndex = 0; rIndex < rows.length; rIndex++) {
                if (rIndex !== rowIndex) {
                    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
                    const oldIndex = getTableIndex(rIndex, colIndex);
                    newTableData.push(tableData[oldIndex] || '');
                    }
                }
                }
                
                rows.splice(rowIndex, 1);
                tableData = newTableData;
                
                updateRowsList();
                renderTable();
            };

            // Check if there are unsaved changes
            function hasChanges() {
                if (!originalData) return false;
                
                if (columns.length !== originalData.columns.length ||
                    rows.length !== originalData.rows.length ||
                    tableData.length !== originalData.tableData.length) {
                    return true;
                }
                
                for (let i = 0; i < columns.length; i++) {
                if (columns[i] !== originalData.columns[i]) return true;
                }
                
                for (let i = 0; i < rows.length; i++) {
                if (rows[i] !== originalData.rows[i]) return true;
                }
                
                for (let i = 0; i < tableData.length; i++) {
                if (tableData[i] !== originalData.tableData[i]) return true;
                }
                
                return false;
            }

            // Cancel button
            cancelBtn.addEventListener("click", () => {
                if (hasChanges()) {
                if (confirm("Are you sure you want to lose your changes?")) {
                    goBack();
                }
                } else {
                goBack();
                }
            });

            function goBack() {
                window.location.href = \`/learn?route=\${encodeURIComponent(route)}\`;
            }

            // Save changes
            saveBtn.addEventListener("click", async () => {
                if (columns.length === 0 || rows.length === 0) {
                showNotification('Please add atleast one row and one column', 'error')
                return;
                }

                // Format data for saving
                const saveData = {
                columns: columns,
                rows: rows,
                tableData: tableData
                };

                console.log("Saving table data:", saveData);

                try {
                saveBtn.disabled = true;
                saveBtn.textContent = "Saving...";
                
                const res = await fetch('/api/data/edittable', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                    username: userName, 
                    password, 
                    table: saveData, 
                    route, 
                    lesson: tableName 
                    }),
                    signal: AbortSignal.timeout(10000) // 10 seconds timeout
                });

                const data = await res.json();
                if (data.state === "success") {
                    showNotification('Table successfully saved!', 'success')
                    window.location.href = \`/learn?route=\${encodeURIComponent(route)}\`;
                } else {
                    showNotification(\`Error while saving: \${data.message || 'Unknown error'}\`, 'error')
                    saveBtn.disabled = false;
                    saveBtn.textContent = "Save changes";
                }
                } catch (err) {
                console.error("Saving failed:", err);
                showNotification(\`Error while connecting to server: \${err.message || 'Network problem'}\`, 'error')
                saveBtn.disabled = false;
                saveBtn.textContent = "Save changes";
                }
            });

            // Show error message
            function showError(message) {
                document.getElementById("loadingIndicator").style.display = "none";
                document.getElementById("mainContent").style.display = "none";
                document.getElementById("errorMessage").style.display = "block";
                document.getElementById("errorText").textContent = message;
            }

            // Load table data
            try {
                const res = await fetch('/api/data/gettable', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: userName, password, route, lesson: tableName }),
                });

                if (!res.ok) {
                throw new Error(\`Server responded with status: \${res.status}\`);
                }

                const data = await res.json();
                
                if (data.state === "error") {
                showError(data.message || "Error while loading table");
                return;
                }

                if (!data.table || !data.table.columns || !data.table.rows || !Array.isArray(data.table.tableData)) {
                showError("Unable to load table (invalid format)");
                return;
                }

                // Load table data
                columns = [...data.table.columns];
                rows = [...data.table.rows];
                tableData = [...data.table.tableData];
                
                // Store original data for change tracking
                originalData = {
                columns: [...columns],
                rows: [...rows],
                tableData: [...tableData]
                };
                
                updateColumnsList();
                updateRowsList();
                renderTable();

                // Hide loading indicator and show content
                document.getElementById("loadingIndicator").style.display = "none";
                document.getElementById("mainContent").style.display = "block";

            } catch (err) {
                console.error("Error while loading table:", err);
                showError(err.message || "Connection to server failed");
            }
            });
        </script>
        </body>
        </html>
    `);
};

const importlist = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Import Vocablist</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>

        ${fastInit}
        </head>
        <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">

        ${notificationContainer}

        ${header}

        <!-- Main Content -->
        <main class="flex-1 p-4 sm:p-6">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">📥 Import Vocablist</h2>
            
            <!-- Import Formular -->
            <div class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md dark:shadow-gray-900/20 max-w-2xl mx-auto border dark:border-gray-700 transition-all duration-300">
            
            <!-- Name Feld -->
            <div class="mb-6">
                <label for="listNameInput" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Name of vocablist
                </label>
                <input 
                id="listNameInput" 
                type="text" 
                placeholder="Name of the imported list" 
                class="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300 text-sm sm:text-base"
                disabled
                />
                
                <!-- Keep Name Checkbox -->
                <div class="mt-3 flex items-center">
                <input 
                    id="keepNameCheckbox" 
                    type="checkbox" 
                    checked 
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-300"
                />
                <label for="keepNameCheckbox" class="ml-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    Keep name
                </label>
                </div>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                If checked the original name of the list is being used
                </p>
            </div>

            <!-- ID Feld -->
            <div class="mb-8">
                <label for="idInput" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                List-ID
                </label>
                <input 
                id="idInput" 
                type="text" 
                placeholder="Enter the ID of the list" 
                class="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                required
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                The ID of the list, you want to import
                </p>
            </div>

            <!-- Import Button -->
            <div class="flex justify-between items-center">
                <button 
                onclick="goBack()" 
                class="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300"
                >
                ← Back
                </button>
                
                <button 
                id="importBtn" 
                class="px-8 py-3 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-md"
                >
                📥 Import List
                </button>
            </div>
            </div>

            <!-- Info Box -->
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mt-6 max-w-2xl mx-auto border dark:border-blue-800/30 transition-all duration-300">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-400 dark:text-blue-300 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
                </div>
                <div class="ml-3">
                <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200 transition-colors duration-300">
                    Information to import
                </h3>
                <div class="mt-1 text-sm text-blue-700 dark:text-blue-300 transition-colors duration-300">
                    <p>Make sure that you are using the right ID. The list will be saved in your current directory.</p>
                </div>
                </div>
            </div>
            </div>
        </main>

        ${footer}

        <!-- Script -->
        <script>
        ${notificationScript}
            // Dark mode functionality with localStorage
            class ThemeManager {
            constructor() {
                this.init();
            }

            init() {
                // Get theme from localStorage or default to 'system'
                const savedTheme = localStorage.getItem('theme') || 'system';
                this.applyTheme(savedTheme);
            }

            applyTheme(theme) {
                const html = document.documentElement;
                
                if (theme === 'system') {
                // Use system preference
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                html.classList.toggle('dark', systemDark);
                } else if (theme === 'dark') {
                html.classList.add('dark');
                } else {
                html.classList.remove('dark');
                }
                
                // Save to localStorage
                localStorage.setItem('theme', theme);
            }
            }

            document.addEventListener("DOMContentLoaded", async () => {
            // Initialize theme manager
            new ThemeManager();

            const params = new URLSearchParams(window.location.search);
            const route = params.get("route");

            const listNameInput = document.getElementById("listNameInput");
            const keepNameCheckbox = document.getElementById("keepNameCheckbox");
            const idInput = document.getElementById("idInput");
            const importBtn = document.getElementById("importBtn");

            // Checkbox Event Listener
            keepNameCheckbox.addEventListener("change", () => {
                if (keepNameCheckbox.checked) {
                listNameInput.disabled = true;
                listNameInput.classList.add("disabled:bg-gray-100", "dark:disabled:bg-gray-700", "disabled:text-gray-500", "dark:disabled:text-gray-400");
                } else {
                listNameInput.disabled = false;
                listNameInput.classList.remove("disabled:bg-gray-100", "dark:disabled:bg-gray-700", "disabled:text-gray-500", "dark:disabled:text-gray-400");
                listNameInput.focus();
                }
            });

            // Import Button Event Listener
            importBtn.addEventListener("click", async () => {
                const id = idInput.value.trim();
                
                if (!id) {
                showNotification('Please enter a List-ID', 'error')
                idInput.focus();
                return;
                }

                const userName = localStorage.getItem("username");
                const password = localStorage.getItem("password");
                
                if (!userName || !password) {
                window.location.href = "/login";
                return;
                }

                // Button während des Imports deaktivieren
                importBtn.disabled = true;
                importBtn.innerHTML = "⏳ Importing...";
                importBtn.classList.add("opacity-75", "cursor-not-allowed");

                try {
                const requestData = {
                    username: userName,
                    password,
                    route,
                    oldId: id,
                    keepname: keepNameCheckbox.checked
                };

                // Wenn keepName false ist, dann auch den Namen mitschicken
                if (!keepNameCheckbox.checked) {
                    const customName = listNameInput.value.trim();
                    if (!customName) {
                    showNotification('Please enter a name', 'error')
                    importBtn.disabled = false;
                    importBtn.innerHTML = "📥 Import List";
                    importBtn.classList.remove("opacity-75", "cursor-not-allowed");
                    listNameInput.focus();
                    return;
                    }
                    requestData.name = customName;
                }

                const res = await fetch("/api/data/importlist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestData)
                });

                const data = await res.json();
                
                if (data.state === "success") {
                    showNotification('Import done successfully!', 'success')
                    window.location.href = \`/learn?route=\${encodeURIComponent(route)}\`;
                } else {
                    showNotification(\`Error while importing: \${data.message || 'Unknown error'}\`, 'error')
                }
                } catch (err) {
                console.error("Import failed:", err);
                showNotification(\`Error while connecting to server: \${err.message}\`, 'error')
                
                } finally {
                // Button wieder aktivieren
                importBtn.disabled = false;
                importBtn.innerHTML = "📥 Import List";
                importBtn.classList.remove("opacity-75", "cursor-not-allowed");
                }
            });

            // Enter-Taste für ID-Input
            idInput.addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                importBtn.click();
                }
            });

            // Enter-Taste für Name-Input (falls aktiviert)
            listNameInput.addEventListener("keyup", (event) => {
                if (event.key === "Enter" && !listNameInput.disabled) {
                importBtn.click();
                }
            });

            // Authentifizierung prüfen
            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");

            if (!userName || !password) {
                window.location.href = "/login";
                return;
            }

            try {
                const res = await fetch("/api/auth/checkData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
                });
                
                const data = await res.json();
                
                if (data.state === "error") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                window.location.href = "/login";
                } else if (data.state === "success" && data.sessionExpired === "true") {
                window.location.href = "/ad";
                } else if (data.state === "success" && data.verified === "false") {
                window.location.href = "/verify"
                } else{
                console.log("Successful login");
                }
            } catch (err) {
                console.error("Error while checking data:", err);
                window.location.href = "/login";
            }
            });

            // Zurück-Funktion
            function goBack() {
            const params = new URLSearchParams(window.location.search);
            const route = params.get("route");
            window.location.href = \`/learn?route=\${encodeURIComponent(route)}\`;
            }
        </script>
        </body>
        </html>
    `);
};

const ad = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>Blearn - Ads</title>
        <style>
            html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            }

            iframe {
            width: 100%;
            height: 100%;
            border: none;
            }
        </style>
        </head>
        <body>
        <iframe id="mainFrame" src=""></iframe>

        <script>
            const userName = localStorage.getItem('username');
            if (userName) {
            document.getElementById('mainFrame').src = \`/api/ads/ad/\${encodeURIComponent(userName)}\`;
            } else {
            // Optional: Wenn kein userName vorhanden ist, zeige einen Platzhalter oder eine Meldung
            document.body.innerHTML = "<h1 style='text-align:center;margin-top:20%;font-family:sans-serif;'>No username found.</h1>";
            }
        </script>
        </body>
        </html>
    `);
};

const timetable = (req, res) => {
  res.send(`
      <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Timetable</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
        tailwind.config = {
        darkMode: 'class'
        }
        </script>
        <script>
        (function() {
            const savedTheme = localStorage.getItem('theme') || 'system';
            const html = document.documentElement;
            
            if (savedTheme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (systemDark) html.classList.add('dark');
            } else if (savedTheme === 'dark') {
                html.classList.add('dark');
            }
        })();
        </script>
        <style>
        .dragging {
            opacity: 0.5;
        }
        .drag-over {
            background-color: rgba(59, 130, 246, 0.2) !important;
            border: 2px dashed #3b82f6 !important;
        }
        .selected-subject {
            ring: 2px;
            ring-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        </style>
        </head>
        <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">

        <div id="notificationContainer" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"></div>

        <!-- Header -->
        <header class="bg-white dark:bg-gray-800 shadow-md py-3 px-4 sm:py-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <a href="/dashboard" class="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-400">Blearn</a>
            <div class="flex gap-2 sm:gap-4">
                <a href="/homework" class="px-3 py-2 sm:px-4 text-xs sm:text-base bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-lg transition">📝 Homework</a>
                <a href="/homework-view" class="px-3 py-2 sm:px-4 text-xs sm:text-base bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white rounded-lg transition">📋 View Tasks</a>
            </div>
        </header>

        <main class="flex-1 p-4 sm:p-6">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">📅 School Timetable</h2>

            <!-- Instructions -->
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4 sm:mb-6 border dark:border-blue-800/30">
                <p class="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                    <strong>How to use:</strong> Click on a subject below to select it (it will be highlighted), then click on any cell in the timetable to add it there. Click on filled cells to remove them.
                </p>
            </div>

            <!-- Add Subject Section -->
            <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md mb-4 sm:mb-6 border dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add Subject</h3>
                <div class="flex flex-col sm:flex-row gap-3">
                    <input id="subjectNameInput" type="text" placeholder="Subject name (e.g. Math)" 
                        class="flex-1 border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base" />
                    <div class="flex gap-3">
                        <input id="subjectColorInput" type="color" value="#3b82f6"
                            class="w-16 h-10 border dark:border-gray-600 rounded-lg cursor-pointer" />
                        <button id="addSubjectBtn" class="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm sm:text-base">
                            Add Subject
                        </button>
                    </div>
                </div>
            </div>

            <!-- Subjects List -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6 border dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Your Subjects 
                    <span id="selectedIndicator" class="hidden text-sm font-normal text-blue-600 dark:text-blue-400">(Click a cell below to place it)</span>
                </h3>
                <div id="subjectsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <!-- Subjects will be inserted here -->
                </div>
            </div>

            <!-- Timetable -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Weekly Timetable</h3>
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse min-w-[800px]">
                        <thead>
                            <tr class="bg-gray-100 dark:bg-gray-700">
                                <th class="border dark:border-gray-600 p-2 text-gray-800 dark:text-white">Period</th>
                                <th class="border dark:border-gray-600 p-2 text-gray-800 dark:text-white">Monday</th>
                                <th class="border dark:border-gray-600 p-2 text-gray-800 dark:text-white">Tuesday</th>
                                <th class="border dark:border-gray-600 p-2 text-gray-800 dark:text-white">Wednesday</th>
                                <th class="border dark:border-gray-600 p-2 text-gray-800 dark:text-white">Thursday</th>
                                <th class="border dark:border-gray-600 p-2 text-gray-800 dark:text-white">Friday</th>
                            </tr>
                        </thead>
                        <tbody id="timetableBody">
                            <!-- Timetable will be generated here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

        <footer class="bg-white dark:bg-gray-800 text-center text-sm py-4 border-t dark:border-gray-700 mt-8 text-gray-500 dark:text-gray-400">
            © 2025 Blearn. All rights reserved.
        </footer>

        <!-- Edit Subject Modal -->
        <div id="editModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-80">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Edit Subject</h3>
                <input id="editNameInput" type="text" class="w-full border dark:border-gray-600 p-2 rounded mb-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                <input id="editColorInput" type="color" class="w-full h-10 border dark:border-gray-600 rounded mb-4 cursor-pointer" />
                <div class="flex justify-end gap-2">
                    <button onclick="closeEditModal()" class="px-4 py-2 text-gray-600 dark:text-gray-400">Cancel</button>
                    <button id="saveEditBtn" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
            </div>
        </div>

        <script>
        let subjects = [];
        let timetable = Array(5).fill(null).map(() => Array(8).fill(null));
        let currentEditId = null;
        let selectedSubjectId = null;

        function showNotification(message, type = 'success') {
            const container = document.getElementById('notificationContainer');
            const notification = document.createElement('div');
            const baseClasses = 'p-4 rounded-xl shadow-lg border backdrop-blur-sm transform transition-all duration-300 ease-in-out mb-3';
            const typeClasses = type === 'success' 
                ? 'bg-green-50/90 dark:bg-green-900/80 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200'
                : 'bg-red-50/90 dark:bg-red-900/80 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200';
            
            notification.className = \`\${baseClasses} \${typeClasses} translate-y-[-20px] opacity-0\`;
            notification.innerHTML = \`
                <div class="flex items-center justify-between">
                    <span class="font-medium">\${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-current opacity-60 hover:opacity-100">×</button>
                </div>
            \`;
            container.appendChild(notification);
            setTimeout(() => notification.classList.remove('translate-y-[-20px]', 'opacity-0'), 10);
            setTimeout(() => notification.remove(), 4000);
        }

        async function loadSubjects() {
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/subjects/get', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    subjects = data.subjects;
                    renderSubjects();
                }
            } catch (err) {
                console.error('Error loading subjects:', err);
            }
        }

        async function loadTimetable() {
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/schedule/get', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    timetable = data.timetable || Array(5).fill(null).map(() => Array(8).fill(null));
                    if(timetable.length == 0) timetable = Array(5).fill(null).map(() => Array(8).fill(null));
                    renderTimetable();
                }
            } catch (err) {
                console.error('Error loading timetable:', err);
            }
        }

        function selectSubject(subjectId) {
            selectedSubjectId = subjectId;
            
            // Remove selection from all subjects
            document.querySelectorAll('.subject-card').forEach(card => {
                card.classList.remove('selected-subject');
            });
            
            // Add selection to clicked subject
            const selectedCard = document.querySelector(\`[data-subject-id="\${subjectId}"]\`);
            if (selectedCard) {
                selectedCard.classList.add('selected-subject');
            }
            
            // Show indicator
            document.getElementById('selectedIndicator').classList.remove('hidden');
            showNotification('Subject selected! Click on a timetable cell to place it.');
        }

        function renderSubjects() {
            const container = document.getElementById('subjectsList');
            container.innerHTML = '';
            
            subjects.forEach(subject => {
                const usageCount = subject.usageCount || 0;
                const div = document.createElement('div');
                div.className = 'subject-card p-4 border-2 rounded-lg cursor-pointer hover:shadow-md transition';
                div.style.borderColor = subject.color;
                div.dataset.subjectId = subject.id;
                
                div.innerHTML = \`
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded" style="background-color: \${subject.color}"></div>
                            <span class="font-semibold text-gray-800 dark:text-white">\${subject.name}</span>
                        </div>
                        <span class="text-sm text-gray-600 dark:text-gray-400">\${usageCount}x</span>
                    </div>
                    <div class="mt-2 flex gap-2">
                        <button onclick="event.stopPropagation(); openEditModal('\${subject.id}')" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                        <button onclick="event.stopPropagation(); deleteSubject('\${subject.id}')" class="text-sm text-red-600 dark:text-red-400 hover:underline">Delete</button>
                    </div>
                \`;
                
                // Click to select
                div.addEventListener('click', () => selectSubject(subject.id));
                
                // Also keep drag-and-drop as backup
                div.draggable = true;
                div.addEventListener('dragstart', (e) => {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', subject.id);
                    div.classList.add('dragging');
                });
                
                div.addEventListener('dragend', () => {
                    div.classList.remove('dragging');
                });
                
                container.appendChild(div);
            });
            
            // Restore selection if exists
            if (selectedSubjectId) {
                const selectedCard = document.querySelector(\`[data-subject-id="\${selectedSubjectId}"]\`);
                if (selectedCard) {
                    selectedCard.classList.add('selected-subject');
                    document.getElementById('selectedIndicator').classList.remove('hidden');
                }
            }
        }

        function renderTimetable() {
            const tbody = document.getElementById('timetableBody');
            tbody.innerHTML = '';
            
            for (let period = 0; period < 8; period++) {
                const row = document.createElement('tr');
                row.innerHTML = \`<td class="border dark:border-gray-600 p-2 text-center font-semibold text-gray-800 dark:text-white">\${period + 1}</td>\`;
                
                for (let day = 0; day < 5; day++) {
                    const cell = document.createElement('td');
                    cell.className = 'border dark:border-gray-600 p-2 text-center min-h-[60px] hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer';
                    cell.dataset.day = day;
                    cell.dataset.period = period;

                    // Fill cell if subject exists
                    
                    const subjectId = timetable[day][period];
                    if (subjectId) {
                        const subject = subjects.find(s => s.id === subjectId);
                        if (subject) {
                            cell.innerHTML = \`
                                <div class="px-2 py-1 rounded text-white font-medium text-sm" style="background-color: \${subject.color}">
                                    \${subject.name}
                                </div>
                            \`;
                        }
                    } else {
                        cell.innerHTML = '<div class="text-gray-400 dark:text-gray-600 text-xs">Empty</div>';
                    }
                    
                    // Click to add/remove
                    cell.addEventListener('click', () => {
                        if (subjectId) {
                            // Clear cell if already filled
                            clearSlot(day, period);
                        } else if (selectedSubjectId) {
                            // Add selected subject
                            updateSlot(day, period, selectedSubjectId);
                        } else {
                            showNotification('Please select a subject first', 'error');
                        }
                    });
                    
                    // Drag and drop support
                    cell.addEventListener('dragover', (e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                        cell.classList.add('drag-over');
                    });
                    
                    cell.addEventListener('dragleave', () => {
                        cell.classList.remove('drag-over');
                    });
                    
                    cell.addEventListener('drop', (e) => {
                        e.preventDefault();
                        cell.classList.remove('drag-over');
                        const subjectId = e.dataTransfer.getData('text/plain');
                        if (subjectId) {
                            updateSlot(day, period, subjectId);
                        }
                    });
                    
                    row.appendChild(cell);
                }
                tbody.appendChild(row);
            }
        }

        async function addSubject() {
            const name = document.getElementById('subjectNameInput').value.trim();
            const color = document.getElementById('subjectColorInput').value;
            
            if (!name) {
                showNotification('Please enter a subject name', 'error');
                return;
            }
            
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/subjects/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password, name, color })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    showNotification('Subject added successfully!');
                    document.getElementById('subjectNameInput').value = '';
                    loadSubjects();
                } else {
                    showNotification(data.message || 'Error adding subject', 'error');
                }
            } catch (err) {
                showNotification('Error connecting to server', 'error');
            }
        }

        async function deleteSubject(subjectId) {
            if (!confirm('Delete this subject? It will be removed from the timetable.')) return;
            
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/subjects/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password, subjectId })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    showNotification('Subject deleted');
                    if (selectedSubjectId === subjectId) {
                        selectedSubjectId = null;
                        document.getElementById('selectedIndicator').classList.add('hidden');
                    }
                    loadSubjects();
                    loadTimetable();
                }
            } catch (err) {
                showNotification('Error deleting subject', 'error');
            }
        }

        async function updateSlot(day, period, subjectId) {
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/schedule/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password, day, period, subjectId })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    timetable[day][period] = subjectId;
                    renderTimetable();
                    renderSubjects();
                }
            } catch (err) {
                showNotification('Error updating timetable', 'error');
            }
        }

        async function clearSlot(day, period) {
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/schedule/clear', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password, day, period })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    timetable[day][period] = null;
                    renderTimetable();
                    renderSubjects();
                }
            } catch (err) {
                showNotification('Error clearing slot', 'error');
            }
        }

        function openEditModal(subjectId) {
            currentEditId = subjectId;
            const subject = subjects.find(s => s.id === subjectId);
            document.getElementById('editNameInput').value = subject.name;
            document.getElementById('editColorInput').value = subject.color;
            document.getElementById('editModal').classList.remove('hidden');
        }

        function closeEditModal() {
            document.getElementById('editModal').classList.add('hidden');
            currentEditId = null;
        }

        async function saveEdit() {
            const name = document.getElementById('editNameInput').value.trim();
            const color = document.getElementById('editColorInput').value;
            
            if (!name) {
                showNotification('Please enter a name', 'error');
                return;
            }
            
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/subjects/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password, subjectId: currentEditId, name, color })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    showNotification('Subject updated!');
                    closeEditModal();
                    loadSubjects();
                    renderTimetable();
                }
            } catch (err) {
                showNotification('Error updating subject', 'error');
            }
        }

        document.getElementById('addSubjectBtn').addEventListener('click', addSubject);
        document.getElementById('saveEditBtn').addEventListener('click', saveEdit);
        document.getElementById('subjectNameInput').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') addSubject();
        });

        document.addEventListener('DOMContentLoaded', async () => {
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            if (!userName || !password) {
                window.location.href = '/login';
                return;
            }
            
            await loadSubjects();
            await loadTimetable();
        });
        </script>
        </body>
        </html>
    `);
};

const homework = (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Blearn - Homework</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
        tailwind.config = {
        darkMode: 'class'
        }
        </script>
        <script>
        (function() {
            const savedTheme = localStorage.getItem('theme') || 'system';
            const html = document.documentElement;
            
            if (savedTheme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (systemDark) html.classList.add('dark');
            } else if (savedTheme === 'dark') {
                html.classList.add('dark');
            }
        })();
        </script>
        </head>
        <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">

        <div id="notificationContainer" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"></div>

        <header class="bg-white dark:bg-gray-800 shadow-md py-3 px-4 sm:py-4 sm:px-6">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <a href="/dashboard" class="text-xl font-bold text-blue-700 dark:text-blue-400">Blearn</a>
                <div class="flex gap-2 sm:gap-4">
                    <a href="/timetable" class="px-3 py-2 sm:px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition text-sm sm:text-base">📅 Timetable</a>
                </div>
            </div>
        </header>

        <main class="flex-1 p-4 sm:p-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">📝 Homework Manager</h2>

                <!-- Add Homework Form -->
                <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border dark:border-gray-700 mb-4 sm:mb-6">
                    <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">Add New Homework</h3>
                    
                    <form id="homeworkForm" class="space-y-3 sm:space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <!-- Subject Selection -->
                            <div>
                                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                                    Subject <span class="text-red-500">*</span>
                                </label>
                                <select id="subjectSelect" required
                                        class="w-full border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                                    <option value="">Select subject...</option>
                                </select>
                            </div>

                            <!-- Due Date -->
                            <div>
                                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                                    Due Date <span class="text-red-500">*</span>
                                </label>
                                <input type="date" id="dueDateInput" required
                                    class="w-full border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base" />
                            </div>
                        </div>

                        <!-- Description -->
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                                Description <span class="text-red-500">*</span>
                            </label>
                            <textarea id="descriptionInput" rows="3" placeholder="What needs to be done?" required
                                    class="w-full border dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"></textarea>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" 
                                class="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-lg font-medium transition text-sm sm:text-base">
                            Add Homework
                        </button>
                    </form>
                </div>

                <!-- Homework List -->
                <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border dark:border-gray-700">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
                        <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Your Homework</h3>
                        
                        <!-- Filter Buttons -->
                        <div class="flex gap-2 text-xs sm:text-sm">
                            <button onclick="filterHomework('all')" id="filterAll" class="px-3 py-1 rounded-lg bg-blue-600 text-white">All</button>
                            <button onclick="filterHomework('pending')" id="filterPending" class="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Pending</button>
                            <button onclick="filterHomework('completed')" id="filterCompleted" class="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Done</button>
                        </div>
                    </div>

                    <div id="homeworkList" class="space-y-3">
                        <div class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                            Loading homework...
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer class="bg-white dark:bg-gray-800 text-center text-xs sm:text-sm py-3 sm:py-4 border-t dark:border-gray-700 mt-6 sm:mt-8 text-gray-500 dark:text-gray-400">
            © 2025 Blearn. All rights reserved.
        </footer>

        <!-- Edit Homework Modal -->
        <div id="editModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-lg">
                <h3 class="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">Edit Homework</h3>
                
                <div class="space-y-3 sm:space-y-4">
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Subject</label>
                        <select id="editSubjectSelect" class="w-full border dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base">
                            <option value="">Select subject...</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Due Date</label>
                        <input type="date" id="editDueDateInput" class="w-full border dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base" />
                    </div>
                    
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Description</label>
                        <textarea id="editDescriptionInput" rows="3" class="w-full border dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none text-sm sm:text-base"></textarea>
                    </div>
                </div>
                
                <div class="flex justify-end gap-2 mt-4 sm:mt-6">
                    <button onclick="closeEditModal()" class="px-3 sm:px-4 py-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">Cancel</button>
                    <button onclick="saveEdit()" class="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded text-sm sm:text-base">Save</button>
                </div>
            </div>
        </div>

        <script>
        let subjects = [];
        let homework = [];
        let currentFilter = 'all';
        let editingId = null;

        function showNotification(message, type = 'success') {
            const container = document.getElementById('notificationContainer');
            const notification = document.createElement('div');
            const baseClasses = 'p-3 sm:p-4 rounded-xl shadow-lg border backdrop-blur-sm transform transition-all duration-300 ease-in-out mb-3';
            const typeClasses = type === 'success' 
                ? 'bg-green-50/90 dark:bg-green-900/80 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200'
                : 'bg-red-50/90 dark:bg-red-900/80 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200';
            
            notification.className = \`\${baseClasses} \${typeClasses} translate-y-[-20px] opacity-0\`;
            notification.innerHTML = \`
                <div class="flex items-center justify-between">
                    <span class="font-medium text-sm sm:text-base">\${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-current opacity-60 hover:opacity-100 text-xl">×</button>
                </div>
            \`;
            container.appendChild(notification);
            setTimeout(() => notification.classList.remove('translate-y-[-20px]', 'opacity-0'), 10);
            setTimeout(() => notification.remove(), 4000);
        }

        async function loadSubjects() {
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/subjects/get', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    subjects = data.subjects || [];
                    populateSubjectSelects();
                }
            } catch (err) {
                console.error('Error loading subjects:', err);
            }
        }

        function populateSubjectSelects() {
            const selects = [document.getElementById('subjectSelect'), document.getElementById('editSubjectSelect')];
            
            selects.forEach(select => {
                const currentValue = select.value;
                select.innerHTML = '<option value="">Select subject...</option>';
                
                subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject.id;
                    option.textContent = subject.name;
                    option.style.color = subject.color;
                    select.appendChild(option);
                });
                
                if (currentValue) select.value = currentValue;
            });
        }

        async function loadHomework() {
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/homework/get', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    homework = data.homework || [];
                    renderHomework();
                }
            } catch (err) {
                console.error('Error loading homework:', err);
                document.getElementById('homeworkList').innerHTML = \`
                    <div class="text-center py-8 text-red-500 dark:text-red-400 text-sm sm:text-base">
                        Error loading homework. Please refresh.
                    </div>
                \`;
            }
        }

        function filterHomework(filter) {
            currentFilter = filter;
            
            document.querySelectorAll('[id^="filter"]').forEach(btn => {
                btn.className = 'px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
            });
            document.getElementById(\`filter\${filter.charAt(0).toUpperCase() + filter.slice(1)}\`).className = 'px-3 py-1 rounded-md bg-blue-600 text-white';
            
            renderHomework();
        }

        function renderHomework() {
            const container = document.getElementById('homeworkList');
            
            let filtered = homework;
            if (currentFilter === 'pending') {
                filtered = homework.filter(hw => !hw.completed);
            } else if (currentFilter === 'completed') {
                filtered = homework.filter(hw => hw.completed);
            }
            
            filtered.sort((a, b) => {
                if (a.completed !== b.completed) return a.completed ? 1 : -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
            
            if (filtered.length === 0) {
                container.innerHTML = \`
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                        \${currentFilter === 'all' ? 'No homework yet. Add one above!' : \`No \${currentFilter} homework.\`}
                    </div>
                \`;
                return;
            }
            
            container.innerHTML = '';
            
            filtered.forEach(hw => {
                const subject = subjects.find(s => s.id === hw.subjectId);
                const dueDate = new Date(hw.dueDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const dueDateOnly = new Date(dueDate);
                dueDateOnly.setHours(0, 0, 0, 0);
                const daysUntil = Math.ceil((dueDateOnly - today) / (1000 * 60 * 60 * 24));
                
                let dueDateClass = 'text-gray-600 dark:text-gray-400';
                let dueDateText = dueDate.toLocaleDateString();
                
                if (!hw.completed) {
                    if (daysUntil < 0) {
                        dueDateClass = 'text-red-600 dark:text-red-400 font-semibold';
                        dueDateText += ' (Overdue!)';
                    } else if (daysUntil === 0) {
                        dueDateClass = 'text-orange-600 dark:text-orange-400 font-semibold';
                        dueDateText += ' (Today!)';
                    } else if (daysUntil === 1) {
                        dueDateClass = 'text-yellow-600 dark:text-yellow-400 font-semibold';
                        dueDateText += ' (Tomorrow)';
                    } else if (daysUntil <= 3) {
                        dueDateClass = 'text-yellow-600 dark:text-yellow-400';
                        dueDateText += \` (in \${daysUntil} days)\`;
                    }
                }
                
                const card = document.createElement('div');
                card.className = \`p-3 sm:p-4 border-l-4 rounded-lg \${hw.completed ? 'bg-gray-50 dark:bg-gray-700/50 opacity-75' : 'bg-white dark:bg-gray-700'} transition\`;
                card.style.borderColor = subject ? subject.color : '#6b7280';
                
                card.innerHTML = \`
                    <div class="flex items-start gap-3">
                        <input type="checkbox" \${hw.completed ? 'checked' : ''} 
                            onchange="toggleComplete('\${hw.id}')"
                            class="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0">
                        
                        <div class="flex-1 min-w-0">
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <span class="font-semibold text-gray-800 dark:text-white text-sm sm:text-base \${hw.completed ? 'line-through' : ''}">
                                        \${subject ? subject.name : 'Unknown Subject'}
                                    </span>
                                    \${hw.completed ? '<span class="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">Done</span>' : ''}
                                </div>
                                <span class="text-xs sm:text-sm \${dueDateClass}">\${dueDateText}</span>
                            </div>
                            
                            <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2 \${hw.completed ? 'line-through' : ''} break-words">
                                \${hw.description}
                            </p>
                            
                            <div class="flex gap-2 text-xs sm:text-sm">
                                <button onclick="openEditModal('\${hw.id}')" class="text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                                <button onclick="deleteHomework('\${hw.id}')" class="text-red-600 dark:text-red-400 hover:underline">Delete</button>
                            </div>
                        </div>
                    </div>
                \`;
                
                container.appendChild(card);
            });
        }

        async function addHomework(e) {
            e.preventDefault();
            
            const subjectId = document.getElementById('subjectSelect').value;
            const dueDate = document.getElementById('dueDateInput').value;
            const description = document.getElementById('descriptionInput').value.trim();
            
            if (!subjectId || !dueDate || !description) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/homework/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password, subjectId, dueDate, description })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    showNotification('Homework added!');
                    document.getElementById('homeworkForm').reset();
                    await loadHomework();
                } else {
                    showNotification(data.message || 'Error adding homework', 'error');
                }
            } catch (err) {
                console.error('Add homework error:', err);
                showNotification('Error connecting to server', 'error');
            }
        }

        async function toggleComplete(id) {
            const hw = homework.find(h => h.id === id);
            if (!hw) return;
            
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/homework/complete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        username: userName, 
                        password, 
                        homeworkId: id, 
                        completed: !hw.completed
                    })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    hw.completed = !hw.completed;
                    renderHomework();
                } else {
                    showNotification(data.message || 'Error updating homework', 'error');
                }
            } catch (err) {
                console.error('Toggle complete error:', err);
                showNotification('Error updating homework', 'error');
            }
        }

        function openEditModal(id) {
            editingId = id;
            const hw = homework.find(h => h.id === id);
            if (!hw) return;
            
            document.getElementById('editSubjectSelect').value = hw.subjectId;
            document.getElementById('editDueDateInput').value = hw.dueDate;
            document.getElementById('editDescriptionInput').value = hw.description;
            document.getElementById('editModal').classList.remove('hidden');
        }

        function closeEditModal() {
            document.getElementById('editModal').classList.add('hidden');
            editingId = null;
        }

        async function saveEdit() {
            const subjectId = document.getElementById('editSubjectSelect').value;
            const dueDate = document.getElementById('editDueDateInput').value;
            const description = document.getElementById('editDescriptionInput').value.trim();
            
            if (!subjectId || !dueDate || !description) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/homework/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        username: userName, 
                        password, 
                        homeworkId: editingId,
                        subjectId,
                        dueDate,
                        description
                    })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    showNotification('Homework updated!');
                    closeEditModal();
                    await loadHomework();
                } else {
                    showNotification(data.message || 'Error updating homework', 'error');
                }
            } catch (err) {
                console.error('Update homework error:', err);
                showNotification('Error updating homework', 'error');
            }
        }

        async function deleteHomework(id) {
            if (!confirm('Delete this homework?')) return;
            
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            try {
                const res = await fetch('/api/timetable/homework/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userName, password, homeworkId: id })
                });
                const data = await res.json();
                if (data.state === 'success') {
                    showNotification('Homework deleted');
                    await loadHomework();
                } else {
                    showNotification(data.message || 'Error deleting homework', 'error');
                }
            } catch (err) {
                console.error('Delete homework error:', err);
                showNotification('Error deleting homework', 'error');
            }
        }

        document.getElementById('homeworkForm').addEventListener('submit', addHomework);

        document.addEventListener('DOMContentLoaded', async () => {
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            
            if (!userName || !password) {
                window.location.href = '/login';
                return;
            }
            
            document.getElementById('dueDateInput').valueAsDate = new Date();
            
            await loadSubjects();
            await loadHomework();
        });
        </script>
        </body>
        </html>
    `);
};

const privacy = (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Blearn - Privacy Policy</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          darkMode: 'class'
        }
      </script>
      ${fastInit}
    </head>
    <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
    
      <!-- Main Content -->
      <main class="flex-1 p-4 sm:p-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Privacy Policy</h2>
    
        <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-xl dark:shadow-gray-900/20 border dark:border-gray-700 transition-all duration-300 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            At <strong>Blearn</strong>, we value your privacy and are committed to protecting it. 
            This Privacy Policy explains how we handle your personal information and what data is collected when you use our services.
          </p>
    
          <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-4">1. Data Collection</h3>
          <p class="text-gray-700 dark:text-gray-300">
            <strong>Blearn does not collect, store, or process any personal data.</strong>  
            We do not track users, gather analytics, or create profiles based on user behavior.  
            Your activity on Blearn remains entirely private and local to your device.
          </p>
    
          <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-4">2. Cookies and Tracking</h3>
          <p class="text-gray-700 dark:text-gray-300">
            Blearn itself does not use any cookies, trackers, or analytics tools.  
            However, we require you to watch advertisements on third-party providers such as <strong>Linkvertise</strong>.  
            These third parties may collect information according to their own privacy policies.  
            We encourage you to review <a href="https://linkvertise.com/privacy" target="_blank" class="text-blue-500 dark:text-blue-400 hover:underline">Linkvertise’s Privacy Policy</a> for more details.
          </p>
    
          <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-4">3. External Links</h3>
          <p class="text-gray-700 dark:text-gray-300">
            Our website may contain links to external sites that are not operated by Blearn.  
            We are not responsible for the content or privacy practices of these websites.  
            Please review the privacy statements of any third-party sites you visit.
          </p>
    
          <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-4">4. Security</h3>
          <p class="text-gray-700 dark:text-gray-300">
            Since Blearn does not collect or store any user data, there is no risk of personal data breaches through our platform.  
            Nevertheless, we strive to maintain a secure and trustworthy environment for all users.
          </p>
    
          <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-4">5. Updates to This Policy</h3>
          <p class="text-gray-700 dark:text-gray-300">
            We may update this Privacy Policy from time to time.  
            Any changes will be clearly posted on this page, and the "last updated" date will be revised accordingly.
          </p>
    
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-6">
            <em>Last updated: October 2025</em>
          </p>
        </div>
      </main>
    
    </body>
    </html>    
    `);
};

module.exports = {
  landing,
  register,
  verify,
  login,
  dashboard,
  logout,
  settings,
  forgotpassword,
  learn,
  createlist,
  list,
  editlist,
  createTable,
  table,
  editTable,
  importlist,
  ad,
  timetable,
  homework,
  privacy,
};
