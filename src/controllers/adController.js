const UserData = require('../models/userData')

const ad = async (req, res) => {
  const username = req.params.userName;
  
  const length = 16;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  console.log(token)

  const userData = await UserData.findOne({ userName: username });
  console.log(username)
  userData.earnToken = token;
  userData.save();

  res.send(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Ad – Blearn</title>
    <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">


    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-300">
        <h1 class="text-xl font-bold text-blue-700 dark:text-blue-400">Blearn</h1>
        <button href="/logout" class="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-all">
        Logout
        </button>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-6 flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-gray-900/20 border dark:border-gray-700 transition-all duration-300 text-center max-w-md w-full">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Advertisment</h2>
        
        <div class="mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-lg mb-6 transition-colors duration-300">
            Watch an ad now and unlock Blearn for the next 24 hours!
            </p>
        </div>
        
        <a id="earnBtn" href="/api/ads/earn/${username}/${token}" class="w-full px-6 py-3 bg-green-600 dark:bg-green-700 text-white text-lg font-semibold rounded-md hover:bg-green-700 dark:hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Let's go
        </a>
        
        <div class="mt-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            <p>Click on Let's go to start</p>
        </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 text-center text-sm py-4 border-t dark:border-gray-700 mt-8 text-gray-500 dark:text-gray-400 transition-colors duration-300">
        © 2025 Blearn. All rights reserved.
    </footer>
    <script src="https://publisher.linkvertise.com/cdn/linkvertise.js"></script><script>linkvertise(1328821, {whitelist: [], blacklist: [""]});</script>
    </body>
    </html>
    `
  );
};

const earn = async (req, res) => {
  const { username, token } = req.params;

  const userData = await UserData.findOne({userName: username, earnToken: token});
  if(!userData){
    res.json({"Error": "User and Token combination not found."})
    return;
  }

  res.send(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Ad – Blearn</title>
    <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">


    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-300">
        <h1 class="text-xl font-bold text-blue-700 dark:text-blue-400">Blearn</h1>
        <button href="/logout" class="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-all">
        Logout
        </button>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-6 flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-gray-900/20 border dark:border-gray-700 transition-all duration-300 text-center max-w-md w-full">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Advertisment</h2>
        
        <div class="mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-lg mb-6 transition-colors duration-300">
            Unlock Blearn now!
            </p>
        </div>
        
        <a id="earnBtn" href="https://blearn.onrender.com/api/ads/claim/${username}/${token}" class="w-full px-6 py-3 bg-green-600 dark:bg-green-700 text-white text-lg font-semibold rounded-md hover:bg-green-700 dark:hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Unlock
        </a>
        
        <div class="mt-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            <p>Click on "unlock" to use Blearn for the next 24 hours.</p>
        </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 text-center text-sm py-4 border-t dark:border-gray-700 mt-8 text-gray-500 dark:text-gray-400 transition-colors duration-300">
        © 2025 Blearn. All rights reserved.
    </footer>
    </body>
    </html>
    `
  );
};

const claim =  async (req, res) => {
  const { userName, token } = req.params;

  const userData = await UserData.findOne({userName, earnToken: token})
  if(!userData){
    res.json({"Error": "Can not get combination of user and token"});
    return;
  }
  userData.unlockedTime = Date.now() + 1000 * 60 * 60 * 24
  await userData.save();

  res.send(
    `
      <script>window.location.href = "/dashboard"</script>
    `
  )
};

module.exports = { ad, earn, claim }