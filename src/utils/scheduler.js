const webpush = require('web-push');
const User = require('../models/userData');
const Subscription = require('../models/subscription');

async function sendNotifications() {
  const now = new Date();
  const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const users = await User.find({
    'homeworks.dueDate': { $lte: twentyFourHoursFromNow, $gte: now },
    'homeworks.completed': false,
    'homeworks.notified': false,
  });

  for (const user of users) {
    const subscriptions = await Subscription.find({ user: user._id });

    for (const homework of user.homeworks) {
      if (
        new Date(homework.dueDate) <= twentyFourHoursFromNow &&
        new Date(homework.dueDate) > now &&
        !homework.completed &&
        !homework.notified
      ) {
        const payload = JSON.stringify({
          title: 'Homework Reminder',
          body: `Your homework "${homework.description}" is due in 24 hours!`,
        });

        for (const subscription of subscriptions) {
          try {
            await webpush.sendNotification(subscription, payload);
          } catch (error) {
            if (error.statusCode === 404 || error.statusCode === 410) {
              await Subscription.findByIdAndDelete(subscription._id);
            } else {
              console.error('Error sending notification:', error);
            }
          }
        }

        homework.notified = true;
      }
    }
    await user.save();
  }
}

function start() {
  setInterval(sendNotifications, 10 * 60 * 1000); // every 10 minutes
}

module.exports = { start };
