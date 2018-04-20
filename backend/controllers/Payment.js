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
      const { username } = decodedToken;
      const user = await User.findOne({ username }).exec();
      const { customerID } = user;
      const { email, purchaseType, numCardsOrdered } = options;

      if (purchaseType === 'subscription') {
        // const product = await stripe.products.create({
        //   name: 'BangarangBingo Subscription 30 Day',
        //   type: 'service',
        // });
        // const plan = await stripe.plans.create({
        //   product: 'prod_CiXEzh3YehtKPg',
        //   nickname: '30 Day Bingo USD',
        //   currency: 'usd',
        //   interval: 'month',
        //   amount: 1000,
        // });
        const productID = 'prod_CiXEzh3YehtKPg';
        const planID = 'plan_CiXHqMVHOOztnp';

        const customer = await stripe.customers.create({
          email,
          source: token.id,
        });

        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ plan: 'plan_CiXHqMVHOOztnp', quantity: 1 }],

        });
      }

      if (purchaseType === 'oneTime') {
        if (customerID) {
          const charge = await stripe.charges.create({
            amount: numCardsOrdered * 99,
            currency: 'usd',
            description: `Bought ${numCardsOrdered} awesome cards`,
            customer: customerID,
          });
        } else {
          const customer = await stripe.customers.create({
            source: token.id,
            email,
          });
          const { id } = customer;
          user.set('customerID', id);
          const updatedUser = await user.save();
          const charge = await stripe.charges.create({
            amount: numCardsOrdered * 99,
            currency: 'usd',
            description: `Bought ${numCardsOrdered} awesome cards`,
            customer: updatedUser.customerID,
          });
        }
      }

      res.json({ hello: 'world' });
    } catch (e) {
      console.log('Processing Error:', e);
      res.status(422).json({ error: 'Failed to process payment' });
    }
  },
};

module.exports = PaymentController;
