import Stripe from 'stripe'

//const stripeKey = new stripe(process.env.STRIPE_KEY);
const stripeKey = new Stripe(process.env.STRIPE_KEY)

export const stripePayment = async (req, res) => {

    await stripeKey.customers.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd',
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            console.log(stripeErr)

            res.status(200).json(stripeErr)
        } else {
            console.log('HI')
            res.status(200).json(stripeRes)
        }
    })


}