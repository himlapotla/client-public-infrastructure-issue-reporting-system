import React, { useContext, useState } from 'react'
import { AllContext } from '../Provider/AuthProvider'
import axios from "axios"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckOut from '../MainComponents/CheckOut'

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
)

const UserProfile = () => {

    const { user } = useContext(AllContext)
    const [clientSecret, setClientSecret] = useState(null)

    const handleSubscribe = async () => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/create-subscription-intent`,
            { email: user.email }
        )

        setClientSecret(res.data.clientSecret);
    }


    return (
        <div className="p-4 border rounded">
            <h2 className="text-xl font-bold flex items-center gap-2">
                {user?.displayName}
                {user?.isPremium && (
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded text-sm">
                        Premium ⭐
                    </span>
                )}
            </h2>
            <p>{user?.email}</p>

            {!user?.isPremium ? (
                <button
                    onClick={handleSubscribe}
                    className="btn bg-purple-600 text-white"
                >
                    Subscribe (1000tk)
                </button>
            ) : (
                <button disabled className="btn">
                    Premium User
                </button>
            )}

            {clientSecret && (
                <Elements stripe={stripePromise}>
                    <CheckOut
                        clientSecret={clientSecret}
                        onSuccess={async () => {
                            await axios.patch(
                                `${import.meta.env.VITE_API_URL}/users/premium`,
                                { email: user.email }
                            );

                            toast.success("Subscription successful!")
                            setClientSecret(null)
                        }}
                    />
                </Elements>
            )}
        </div>
    )
}

export default UserProfile