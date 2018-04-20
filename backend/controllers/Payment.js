const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const User = require('../models/user');

const { handleSubscription, handleCharge } = require('../actions/payments');

const SECRET = process.env.APP_SECRET;

const PaymentController = {
  async process(req, res) {
    try {
      const { token, options } = req.body;
      const authToken = req.headers.authorization.replace('Bearer ', '');
      const decodedToken = await jwt.verify(authToken, SECRET);
      const { username } = decodedToken;
      const user = await User.findOne({ username }).exec();
      let { customerID, subscriber } = user;
      const { email, purchaseType, numCardsOrdered } = options;

      if (!customerID) {
        const customer = await stripe.customers.create({
          source: token.id,
          email,
        });
        const { id } = customer;
        customerID = id;
        user.set('customerID', id);
        await user.save();
      }

      let success = false;
      if (purchaseType === 'subscription') {
        success = await handleSubscription({ customerID }, token);
      }

      if (purchaseType === 'oneTime') {
        success = await handleCharge({ customerID, numCardsOrdered }, token);
      }

      if (success) {
        if (purchaseType === 'subscription') {
          user.set('subscriber', true);
        }
        res.json({ sucess: 200 });
      } else {
        res.status(422).json({ error: 'Payment could not be processed' });
      }
    } catch (e) {
      console.log('Processing Error:', e);
      res.status(422).json({ error: 'Failed to process payment' });
    }
  },
};

module.exports = PaymentController;
