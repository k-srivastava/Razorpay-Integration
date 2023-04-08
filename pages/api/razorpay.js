const Razorpay = require('razorpay');
const shortID = require('shortid');

export default async function handler(request, resolver) {
    if (request.method === 'POST') {
        const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET });

        const paymentCapture = 1;
        const amount = 499;
        const currency = 'INR';
        const options = {
            amount: (amount * 100).toString(),
            currency,
            receipt: shortID.generate(),
            payment_capture: paymentCapture
        };

        try {
            const response = await razorpay.orders.create(options);
            resolver.status(200).json({
                id: response.id,
                currency: response.currency,
                amount: response.amount
            });
        } catch (err) {
            console.log(err);
            resolver.status(400).json(err);
        }
    }
}
