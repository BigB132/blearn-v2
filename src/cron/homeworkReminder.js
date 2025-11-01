const cron = require('node-cron');
const webpush = require('web-push');
const UserData = require('../models/userData');
const Subscription = require('../models/subscription');

// Sendet Push an alle Subscriptions eines Users
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

async function checkHomework() {
    const now = Date.now();
    const in24h = now + 24 * 60 * 60 * 1000;

    try {
        const users = await UserData.find();

        for (const user of users) {
            let changed = false;

            for (const hw of user.homeworks) {
                if (!hw.completed && !hw.notified) {
                    const dueTime = new Date(hw.dueDate).getTime();

                    // Wenn dueDate in den nächsten 24 Stunden liegt
                    if (dueTime <= in24h && dueTime > now) {
                        const payload = {
                            title: `Homework Reminder for ${hw.subjectId}`,
                            body: hw.description,
                            url: '/homework'
                        };

                        await sendPushToUser(user._id, payload);
                        hw.notified = true;
                        changed = true;
                    }
                }
            }

            if (changed) await user.save();
        }
    } catch (err) {
        console.error('Error checking homework reminders:', err);
    }
}

// jede Minute ausführen
cron.schedule('* * * * *', checkHomework);
console.log('Homework reminder cron job started');
