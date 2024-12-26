import { Button } from "@/components/ui/button/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { FC } from "react";
import { useUserMetadata } from "@/hooks/useUserMetadata.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";

export const Profile: FC = () => {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();

  const { userMetadata } = useUserMetadata(getAccessTokenSilently, user);

  if (isLoading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white relative flex items-center justify-center"
      >
        <p className="text-2xl text-zinc-400">Loading profile...</p>
      </motion.main>
    );
  }

  if (!isAuthenticated) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white relative flex items-center justify-center"
      >
        <p className="text-2xl text-zinc-400">
          Please log in to view your profile.
        </p>
      </motion.main>
    );
  }

  return (
    isAuthenticated && (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative text-white"
        aria-label="User Profile Page"
      >
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 bg-grid-white/5 opacity-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Profile Section */}
        <section
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center relative z-10"
          aria-labelledby="profile-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            {/* User Avatar */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
              <img
                src={user?.picture}
                alt={`${user?.name}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Name */}
            <motion.h1
              id="profile-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            >
              {user?.name}
            </motion.h1>

            {/* User Email */}
            <p className="text-lg sm:text-xl text-zinc-400">{user?.email}</p>

            {/* User Metadata (Optional) */}
            {user?.nickname && (
              <p className="text-sm sm:text-base text-zinc-500">
                Nickname:{" "}
                <span className="font-semibold">{user?.nickname}</span>
              </p>
            )}
            {userMetadata && (
              <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors duration-300 hover:bg-zinc-800/50 backdrop-blur-sm">
                <CardHeader
                  title="User Metadata"
                  className="flex flex-col items-center"
                >
                  <CardTitle
                    className="text-lg sm:text-xl text-center text-white"
                    aria-hidden="true"
                  >
                    User Metadata
                  </CardTitle>
                </CardHeader>
                <CardContent>

                <p className="text-sm sm:text-base text-zinc-500">
                  Chat Model:{" "}
                  <span className="font-semibold">
                    {userMetadata.chatModel}
                  </span>
                </p>
                <p className="text-sm sm:text-base text-zinc-500">
                  Integrations:{" "}
                  <span className="font-semibold">
                    {userMetadata.integrations}
                  </span>
                </p>
                <p className="text-sm sm:text-base text-zinc-500">
                  Preferred Language:{" "}
                  <span className="font-semibold">
                    {userMetadata.preferredLanguage}
                  </span>
                </p>
                <p className="text-sm sm:text-base text-zinc-500">
                  Response Style:{" "}
                  <span className="font-semibold">
                    {userMetadata.responseStyle}
                  </span>
                </p>
                <p className="text-sm sm:text-base text-zinc-500">
                  Timezone:{" "}
                  <span className="font-semibold">{userMetadata.timezone}</span>
                </p>
                <p className="text-sm sm:text-base text-zinc-500">
                  Tone:{" "}
                  <span className="font-semibold">{userMetadata.tone}</span>
                </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                size="lg"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded shadow-lg transition-transform hover:scale-105"
                aria-label="Logout"
              >
                Logout
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Subtle Glow Effects */}
        <div
          className="absolute top-1/3 left-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 -z-10"
          aria-hidden="true"
        />
      </motion.main>
    )
  );
};
