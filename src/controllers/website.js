const autologin = `
    document.addEventListener('DOMContentLoaded', async function() {
    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (savedUser && savedPass) {
      try {
        const res = await fetch("https://verbose-palm-tree-g449pxr7gjg9396pr-3000.app.github.dev/api/auth/checkData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: savedUser, password: savedPass })
        });

        const data = await res.json();

        if (data.state === "success") {
          window.location.href = "/dashboard";
          return;
        }
      } catch (err) {
        console.warn("Autologin fehlgeschlagen:", err);
      }
    }
});
`

const autologin2 = `
    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (savedUser && savedPass) {
      try {
        const res = await fetch("https://verbose-palm-tree-g449pxr7gjg9396pr-3000.app.github.dev/api/auth/checkData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: savedUser, password: savedPass })
        });

        const data = await res.json();

        if (data.state === "success") {
          window.location.href = "/dashboard";
          return;
        }
      } catch (err) {
        console.warn("Autologin fehlgeschlagen:", err);
      }
    }
`;

const header = `
    <header class="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-300">
    <a href="/dashboard" class="text-xl font-bold text-blue-700 dark:text-blue-400">Blearn</a>
    
    <!-- Profile Dropdown -->
    <div class="relative">
      <button id="profileToggle" class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
        <!-- Profile Avatar -->
        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <!-- Username -->
        <span id="profileName" class="font-medium text-sm">Profile</span>
        <!-- Dropdown Arrow -->
        <svg class="w-4 h-4 text-white/80 transition-transform duration-200 group-hover:text-white" id="profileArrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
`



const landing = async (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Welcome to Learnify</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>
        </head>
        <body class="bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center px-4">

        <div class="max-w-3xl text-center bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl border dark:border-gray-700 transition-colors duration-300">
            <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
            Welcome to <span class="text-blue-600 dark:text-blue-400">Blearn</span>
            </h1>
            <p class="text-gray-600 dark:text-gray-300 text-lg mb-8 transition-colors duration-300">
            Your all-in-one platform to learn vocabulary! Let's make learning a fun experinence!
            </p>
            <div class="flex justify-center gap-4">
            <a href="/register"
                class="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
                Register
            </a>
            <a href="/login"
                class="px-8 py-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg">
                Login
            </a>
            </div>
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
    `)
};

// Express route implementation
const register = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Signup</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
                tailwind.config = {
                    darkMode: 'class'
                }
            </script>
        </head>
        <body class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
            <div class="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 transition-colors duration-300">
                <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white transition-colors duration-300">Create an account</h1>
                
                <form id="signupForm" class="space-y-4">
                    <input 
                        id="username" 
                        type="text" 
                        placeholder="Username" 
                        class="w-full px-4 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        required>
                    
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="E-Mail Adress" 
                        class="w-full px-4 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        required>
                    
                    <div class="relative">
                        <input 
                            id="password" 
                            type="password" 
                            placeholder="Password" 
                            class="w-full px-4 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
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
                        class="w-full px-4 py-2 font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        Sign Up
                    </button>
                </form>
                
                <div id="message" class="text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300"></div>
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
                    submitBtn.textContent = 'Erstelle Account...';
                    submitBtn.disabled = true;

                    try {
                        const response = await fetch('https://verbose-palm-tree-g449pxr7gjg9396pr-3000.app.github.dev/api/auth/register', {
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
                            showMessage('Account erfolgreich erstellt!');

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
    `)
};

const verify = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
                tailwind.config = {
                    darkMode: 'class'
                }
            </script>
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
                        class="w-full px-4 py-3 text-center text-lg font-mono border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300 tracking-widest"
                        maxlength="6"
                        required>
                    
                    <button 
                        type="submit" 
                        class="w-full px-4 py-2 font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
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
                        const response = await fetch('https://verbose-palm-tree-g449pxr7gjg9396pr-3000.app.github.dev/api/auth/verify', {
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
                        const response = await fetch('https://verbose-palm-tree-g449pxr7gjg9396pr-3000.app.github.dev/api/auth/resend-code', {
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
    `)
}

const login = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Login</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>
        </head>
        <body class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div class="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 transition-colors duration-300">
            <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white transition-colors duration-300">Welcome back!</h1>
            
            <div class="space-y-4">
            <input id="username" type="text" placeholder="Username"
                    class="w-full px-4 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300" />

            <div class="relative">
                <input id="password" type="password" placeholder="Password"
                    class="w-full px-4 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300" />
                <button id="togglePassword" type="button"
                        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
                👁️
                </button>
            </div>

            <button id="loginBtn"
                    class="w-full px-4 py-2 font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
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
                const res = await fetch("https://verbose-palm-tree-g449pxr7gjg9396pr-3000.app.github.dev/api/auth/checkData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
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
    `)
}

const forgotpassword = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Login</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>
        </head>
        <body class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div class="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 transition-colors duration-300">
            <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white transition-colors duration-300">Reset password!</h1>
            
            <div class="space-y-4">
            <input id="email" type="text" placeholder="Email"
                    class="w-full px-4 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300" />

            <button id="resetBtn"
                    class="w-full px-4 py-2 font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
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

            ${autologin2}

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
                const res = await fetch("https://verbose-palm-tree-g449pxr7gjg9396pr-3000.app.github.dev/api/auth/resetpassword", {
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
    `)
}

const dashboard = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Dashboard</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>
        </head>
        <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
        
        ${header}

        <!-- Main Content -->
        <main class="flex-1 p-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300" id="header">Welcome back!</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg dark:shadow-gray-900/20 transition-all duration-300 border dark:border-gray-700">
                <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">Learn now!</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">Create your own cue cards.</p>
                <a href="/learn" class="text-blue-500 dark:text-blue-400 text-sm mt-4 inline-block hover:underline transition-colors duration-300">Start now →</a>
            </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-white dark:bg-gray-800 text-center text-sm py-4 border-t dark:border-gray-700 mt-8 text-gray-500 dark:text-gray-400 transition-colors duration-300">
            © 2025 Lernplattform. Alle Rechte vorbehalten.
        </footer>

        <script>
            // Dark mode functionality with localStorage - same as welcome page
            class ThemeManager {
            constructor() {
                this.init();
                this.setupEventListeners();
            }

            init() {
                // Get theme from localStorage or default to 'system'
                const savedTheme = localStorage.getItem('theme') || 'system';
                this.applyTheme(savedTheme);
                this.updateActiveButton(savedTheme);
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

            const userName = localStorage.getItem("userName");
            const password = localStorage.getItem("password");
            
            if (!userName || !password) {
                window.location.href = "/login";
                return;
            }

            try {
                const res = await fetch("https://blearnend.onrender.com/checkData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
                });
                
                const data = await res.json();
                
                if (data.state === "error") {
                localStorage.removeItem("userName");
                localStorage.removeItem("password");
                window.location.href = "/login";
                } else if (data.state === "success" && data.sessionExpired === "true") {
                window.location.href = "https://blearn.netlify.app/ad";
                } else {
                console.log("Successful login");
                }
            } catch (err) {
                console.error("Fehler beim Prüfen der Daten:", err);
                window.location.href = "/login";
            }

            document.getElementById("logoutBtn").addEventListener("click", () => {
                localStorage.removeItem("userName");
                localStorage.removeItem("password");
                window.location.href = "/login";
            });
            
            document.getElementById("header").innerHTML = "Willkommen zurück, " + userName + "!";
            });
        </script>
        </body>
        </html>
    `)
}

const logout = (req, res) => {
    res.send(`
        <script>
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            window.location.href = "/";
        </script>
    `)
}

const settings = (req, res) => {
    res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Settings</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class'
        }
    </script>
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

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 text-center text-sm py-4 border-t dark:border-gray-700 mt-8 text-gray-500 dark:text-gray-400 transition-colors duration-300">
        © 2025 Lernplattform. Alle Rechte vorbehalten.
    </footer>

    <script>
        // Simple theme management
        let currentTheme = 'system';
        
        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            loadSettings();
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
        
        // Save profile
        document.getElementById('savePass').addEventListener('click', async function() {
            const userName = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            const newpass = document.getElementById('password').value.trim()
            
            
            try {
                const res = await fetch("https://verbose-palm-tree-g449pxr7gjg9396pr-3000.app.github.dev/api/auth/changePass", {
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
    </script>
</body>
</html>
    `)
}

const learn = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Lernen</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            darkMode: 'class'
            }
        </script>
        </head>
        <body class="bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col transition-colors duration-300">

        ${header}
        
        <div id="folderModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-80 transition-colors duration-300">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">📁 Create Folder</h3>
            <input id="folderNameInput" type="text" placeholder="Foldername" class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
            <div class="flex justify-end space-x-2">
                <button onclick="closeFolderModal()" class="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">Cancel</button>
                <button onclick="submitFolder()" class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded">Create</button>
            </div>
            </div>
        </div>
        
        <!-- Kontextmenü -->
        <div id="contextMenu" class="absolute bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-lg hidden z-50 transition-colors duration-300">
            <button onclick="openRenameModal()" class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">Rename</button>
            <button onclick="editList()" class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">Edit</button>
            <button onclick="shareItem()" class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400">Share</button>
            <button onclick="confirmDelete()" class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 dark:text-red-400">Delete</button>
        </div>

        <!-- Umbenennen Modal -->
        <div id="renameModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
            <div class="bg-white dark:bg-gray-800 p-6 rounded shadow w-80 transition-colors duration-300">
            <h3 class="text-lg font-bold mb-4 text-gray-800 dark:text-white">✏️ Rename</h3>
            <input id="renameInput" type="text" class="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
            <div class="flex justify-end space-x-2">
                <button onclick="closeRenameModal()" class="px-3 py-2 text-sm text-gray-600 dark:text-gray-400">Cancel</button>
                <button onclick="submitRename()" class="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded">Rename</button>
            </div>
            </div>
        </div>

        <!-- Share Modal -->
        <div id="shareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-96 transition-colors duration-300">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">🔗 Share</h3>
            
            <div id="shareLoader" class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-opacity-50"></div>
                <span class="ml-2 text-gray-600 dark:text-gray-400">ID is being requested...</span>
            </div>
            
            <div id="shareContent" class="hidden">
                <p class="text-gray-600 dark:text-gray-400 mb-4">Share this exercise with others:</p>
                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded border dark:border-gray-600 mb-4">
                <label class="text-sm text-gray-500 dark:text-gray-400 block mb-1">Share-ID:</label>
                <div class="flex items-center space-x-2">
                    <input id="shareId" type="text" readonly class="flex-1 bg-transparent border-none focus:outline-none font-mono text-sm text-gray-800 dark:text-gray-200" />
                    <button onclick="copyShareId()" class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
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
                <button onclick="retryFetchId()" class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                Try again
                </button>
            </div>
            
            <div class="flex justify-end space-x-2 mt-4">
                <button onclick="closeShareModal()" class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">Close</button>
            </div>
            </div>
        </div>

        <!-- Main -->
        <main class="flex-1 p-6">
            <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">📂 Your Exercises</h2>
            <div class="space-x-2 flex items-center">
                <button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onclick="createFolder()">📁 Create Folder</button>
                
                <!-- Dropdown für Vokabelliste -->
                <div class="relative">
                <button id="vocabDropdownBtn" onclick="toggleVocabDropdown()" class="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center space-x-2 transition-all duration-200">
                    <span>➕ New Exercise</span>
                    <svg id="dropdownArrow" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div id="vocabDropdownMenu" class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 hidden z-40 overflow-hidden transition-colors duration-300">
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
                        <div class="text-sm text-gray-500 dark:text-gray-400">Import a vocablist</div>
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

        <!-- Footer -->
        <footer class="bg-white dark:bg-gray-800 text-center text-sm py-4 border-t dark:border-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-300">
            © 2025 Blearn
        </footer>

        <script>
        let route;
        const API_BASE_URL = 'https://verbose-palm-tree-g449pxr7gjg9396pr-3000.app.github.dev/';

        // Dark mode functionality - same as dashboard
        class ThemeManager {
            constructor() {
            this.init();
            this.setupEventListeners();
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
            const res = await fetch(\`\${API_BASE_URL}/api/auth/checkData\`, {
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
                window.location.href = "https://blearn.netlify.app/ad";
            } else {
                console.log("Successful login");
            }
            } catch (err) {
            console.error("Error while checking data:", err);
            window.location.href = "/login";
            }


            const params = new URLSearchParams(window.location.search);
            route = params.get("route") || "/";

            renderBreadcrumb(route);

            try {
                const res = await fetch(\`\${API_BASE_URL}/api/data/getlist\`, {
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
                
                    // Event-Handler mit Fehlerbehandlung
                    item.onclick = (e) => {
                    try {
                        if (lesson.type === 1) { // Wenn es ein Ordner ist
                        window.location.href = \`/learn?route=\${route}/\${encodeURIComponent(lesson.name)}\`;
                        } else if (lesson.type === 2) {
                        window.location.href = \`/table?route=\${route}&lesson=\${encodeURIComponent(lesson.name)}\`;
                        } else { // Wenn es eine Vokabelliste ist
                        window.location.href = \`/list?route=\${encodeURIComponent(route)}&lesson=\${encodeURIComponent(lesson.name)}\`;
                        }
                    } catch (error) {
                        console.error("Error while navigation:", error);
                    }
                };
                
                    
                    let icon = "📁"
                    if(lesson.type === 0) icon = "📗"
                    if(lesson.type === 2) icon = "📑"
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
            alert("Please enter a folder name.");
            return;
            }

            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");

            try {
            const res = await fetch(\`\${API_BASE_URL}/api/data/createFolder\`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password, route, folderName }),
                signal: AbortSignal.timeout(10000)
            });

            if (!res.ok) {
                throw new Error(\`Server responded with status: \${res.status}\`);
            }

            const data = await res.json();

            if (data.state === "success") {
                alert("Folder created!");
                closeFolderModal();
                location.reload();
            } else {
                alert(\`Error while creating folder: \${data.message || 'Unbekannter Fehler'}\`);
            }
            } catch (err) {
            console.error("Error:", err);
            alert(\`An error is occured: \${err.message || 'Verbindungsproblem'}\`);
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
            const res = await fetch(\`\${API_BASE_URL}/api/data/rename\`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                userName, 
                password, 
                route,
                oldName: selectedItem.name, 
                newName
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
                alert(\`Error while renaming: \${data.message || 'Unbekannter Fehler'}\`);
            }
            } catch (err) {
            console.error(err);
            alert(\`An error is occured: \${err.message || 'Verbindungsproblem'}\`);
            }
        }

        // NEU: Liste bearbeiten Funktion
        function editList() {
            // Nur für Listen, nicht für Ordner
            if (selectedItem.type === 0) {
            window.location.href = \`/editList?route=\${encodeURIComponent(route)}&lesson=\${encodeURIComponent(selectedItem.name)}\`;
            } else {
            alert("Only vacob lists can be edited.");
            }
        }

        // NEU: Share-Funktionen
        function shareItem() {
            // Nur für Listen, nicht für Ordner
            if (selectedItem.type === 0) {
            document.getElementById("shareModal").classList.remove("hidden");
            fetchShareId();
            } else {
            alert("Only vobablists can be shared!");
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
            const res = await fetch(\`\${API_BASE_URL}/api/data/fetchid\`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                userName, 
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
            alert('Copying failed. Please copy it manually.');
            }
        }

        // Löschen
        async function confirmDelete() {
            if (!confirm(\`Are you sure that you want to delete "\${selectedItem.name}"?\`)) return;

            const userName = localStorage.getItem("username");
            const password = localStorage.getItem("password");

            try {
            const res = await fetch(\`\${API_BASE_URL}/api/data/delete\`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                userName, 
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
                alert(\`Error while deleting: \${data.message || 'Unknown error'}\`);
            }
            } catch (err) {
            console.error(err);
            alert(\`An error is occured: \${err.message || 'Connection issues'}\`);
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
    `)
}

module.exports = { landing, register, verify, login, dashboard, logout, settings, forgotpassword, learn }