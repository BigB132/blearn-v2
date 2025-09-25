// A set of trusted email domains.
// This is used to prevent users from signing up with disposable email addresses.
const TRUSTED_DOMAINS = new Set([
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'icloud.com',
    'protonmail.com',
    'zoho.com',
    'aol.com',
    'live.com',
    'msn.com',
    'yandex.com',
    'mail.com',
    'gmx.de'
    // Add corporate or other trusted domains here
]);

module.exports = TRUSTED_DOMAINS;
