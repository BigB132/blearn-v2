const Subscription = require('../models/subscription');
const User = require('../models/userData');
const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:your-email@example.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

exports.subscribe = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const { subscription } = req.body;
    const userId = req.session.user._id;

    try {
        const newSubscription = new Subscription({
            endpoint: subscription.endpoint,
            keys: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
            },
            user: userId,
        });

        await newSubscription.save();
        res.status(201).json({ message: 'Subscription saved.' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Subscription already exists.' });
        }
        console.error('Error saving subscription:', error);
        res.status(500).json({ message: 'Failed to save subscription.' });
    }
};

exports.unsubscribe = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const { endpoint } = req.body;
    const userId = req.session.user._id;

    try {
        const result = await Subscription.findOneAndDelete({ endpoint: endpoint, user: userId });
        if (!result) {
            return res.status(404).json({ message: 'Subscription not found.' });
        }
        res.status(200).json({ message: 'Subscription removed.' });
    } catch (error) {
        console.error('Error removing subscription:', error);
        res.status(500).json({ message: 'Failed to remove subscription.' });
    }
};

exports.getVapidPublicKey = (req, res) => {
    res.status(200).json({ publicKey: process.env.VAPID_PUBLIC_KEY });
};
