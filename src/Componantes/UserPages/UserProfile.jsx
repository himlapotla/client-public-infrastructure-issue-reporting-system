import React, { useContext, useEffect, useState } from "react";
import { AllContext } from "../Provider/AuthProvider";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "../MainComponents/CheckOut";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const UserProfile = () => {
  const { user, setUser, updateUserProfile } = useContext(AllContext);

  const [clientSecret, setClientSecret] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/${user.email}`)
        .then((res) => setDbUser(res.data));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleSubscribe = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-subscription-intent`,
      { email: user.email }
    );
    setClientSecret(res.data.clientSecret);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formDataImg = new FormData();
    formDataImg.append("image", image);

    try {
      setUploading(true);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formDataImg
      );

      setFormData((prev) => ({
        ...prev,
        photoURL: res.data.data.url,
      }))

    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/update/${user.email}`,
        {
          name: formData.name,
          photoURL: formData.photoURL,
        }
      );

      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      setUser({
        ...user,
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      toast.success("Profile updated successfully");
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">

      <div className="flex items-center justify-between bg-emerald-500 p-5 rounded-2xl shadow-2xl">

        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {user?.displayName}

              {dbUser?.isPremium && (
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                  ⭐ Premium
                </span>
              )}
            </h2>

            <p className="text-sm text-black">{user?.email}</p>
          </div>
        </div>

        {!dbUser?.isPremium && (
          <button
            onClick={handleSubscribe}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow hover:scale-105 transition"
          >
            Upgrade to Premium ৳1000
          </button>
        )}

        <button
          onClick={() => setIsOpen(true)}
          className="btn bg-white"
        >
          Update Profile
        </button>
      </div>

      {clientSecret && (
        <Elements stripe={stripePromise}>
          <CheckOut
            clientSecret={clientSecret}
            onSuccess={async () => {
              await axios.patch(
                `${import.meta.env.VITE_API_URL}/users/premium`,
                { email: user.email }
              );
              toast.success("Subscription successful!");
              setClientSecret(null);
            }}
          />
        </Elements>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">

            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">

              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Profile Photo
                </label>

                <input
                  type="file"
                  className='input'
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {uploading && (
                  <p className="text-sm text-blue-500 mt-1">
                    Uploading image...
                  </p>
                )}

               
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-white"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
