const cron = require('node-cron');
const webpush = require('web-push');
const UserData = require('../models/userData');
const Subscription = require('../models/subscription');

// Send push to all subscriptions of a user
async function sendPushToUser(userId, payload) {
    const subs = await Subscription.find({ user: userId });
    for (const sub of subs) {
        try {
            await webpush.sendNotification(sub, JSON.stringify(payload));
        } catch (err) {
            console.error('Push failed:', err.message);
            if (err.statusCode === 410 || err.statusCode === 404) {
                await Subscription.deleteOne({ _id: sub._id });
            }
        }
    }
}

// Send daily participation reminder at 7 AM
async function sendParticipationReminder() {
    console.log('Participation reminder cron job started');

    try {
        const users = await UserData.find();

        for (const user of users) {
            // Check if today is a weekday (Monday-Friday)
            const today = new Date().getDay();
            if (today === 0 || today === 6) continue; // Skip weekends

            // Check if user has classes today
            const dayIndex = today - 1;
            const todaySchedule = user.schedule[dayIndex];
            
            if (todaySchedule && Object.keys(todaySchedule).length > 0) {
                const payload = {
                    title: "Blearn",
                    body: "Ready to log your class participation today? 🎯",
                    data: {
                        url: '/participation'
                    },
                    tag: 'participation-reminder'
                };

                await sendPushToUser(user._id, payload);
                console.log(`Sent participation reminder to ${user.userName}`);
            }
        }
    } catch (err) {
        console.error('Error sending participation reminders:', err);
    }
}

// Send at 07:00 every weekday (Monday-Friday)
cron.schedule('0 7 * * 1-5', sendParticipationReminder);
