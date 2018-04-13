const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const User = require('../models/user');

const SECRET = process.env.APP_SECRET;

const PaymentController = {
  async process(req, res) {
    try {
      const { token, options } = req.body;
      const authToken = req.headers.authorization.replace('Bearer ', '');
      const decodedToken = await jwt.verify(authToken, SECRET);
      const username = decodedToken.username;
      const user = await User.findOne({ username }).exec();
      const { customerID } = user;
      console.log(customerID);
      const { email, name } = options;
      if (customerID) {
        const charge = await stripe.charges.create({
          amount: 1485,
          currency: 'usd',
          description: 'Bought 15 awesome cards',
          customer: customerID,
        });
        console.log('charge', charge);
      } else {
        const customer = await stripe.customers.create({
          source: token.id,
          email,
        });
        const { id } = customer;
        user.set('customerID', id);
        const updatedUser = await user.save();
        const charge = await stripe.charges.create({
          amount: 1485,
          currency: 'usd',
          description: 'Bought 15 awesome cards',
          customer: updatedUser.customerID,
        });
        console.log('charge', charge);
      }
      res.json({ hello: 'world' });
    } catch (e) {
      console.log('Processing Error:', e);
      res.status(422).json({ error: 'Failed to process payment' });
    }
  },
};

module.exports = PaymentController;
