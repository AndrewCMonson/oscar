import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion"
import { UserIcon, MailIcon, GlobeIcon } from "lucide-react";
import { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"

export const Profile: FC  = () => {
  const { user, isAuthenticated, isLoading } =
    useAuth0();

  // const { userMetadata } = useUserMetadata(getAccessTokenSilently, user);

  const containerVariants = {
     hidden: { opacity: 0 },
     visible: {
       opacity: 1,
       transition: {
         delayChildren: 0.3,
         staggerChildren: 0.2,
       },
     },
   };

  const itemVariants = {
     hidden: { y: 20, opacity: 0 },
     visible: {
       y: 0,
       opacity: 1,
       transition: {
         duration: 0.5,
         ease: "easeOut",
       },
     },
   };

  if (isLoading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen text-white overflow-hidden relative flex items-center justify-center"
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
         className="min-h-screen text-white overflow-hidden relative flex items-center justify-center"
       >
         <p className="text-2xl text-zinc-400">
           Please log in to view your profile.
         </p>
       </motion.main>
     );
   }

   const profileDetails = [
     {
       icon: <UserIcon className="w-12 h-12 text-blue-500" />,
       title: "Name",
       description: user?.name || "Not provided",
     },
     {
       icon: <MailIcon className="w-12 h-12 text-green-500" />,
       title: "Email",
       description: user?.email || "Not provided",
     },
     {
       icon: <GlobeIcon className="w-12 h-12 text-purple-500" />,
       title: "Nickname",
       description: user?.nickname || "Not provided",
     },
   ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-white overflow-hidden relative"
      aria-label="Oscar User Profile Page"
    >
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 bg-grid-white/5 opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Profile Section */}
      <section
        className="container mx-auto px-6 pt-24 pb-16 text-center relative z-10"
        aria-labelledby="profile-title"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 0.5,
          }}
          className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        >
          {user?.nickname}
        </motion.h1>

        {user?.picture && (
          <motion.img
            src={user.picture}
            alt="User Profile"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mb-8 w-20 rounded-full border-4 border-purple-600"
          />
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <div
            className="grid md:grid-cols-3 gap-8"
            role="list"
            aria-label="User Profile Details"
          >
            {profileDetails.map((detail) => (
              <motion.div
                key={detail.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                role="listitem"
                aria-label={detail.title}
              >
                <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors duration-300 hover:bg-zinc-800/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-col items-center">
                    <div className="mb-4" aria-hidden="true">
                      {detail.icon}
                    </div>
                    <CardTitle className="text-xl text-center text-white">
                      {detail.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-zinc-400 break-words">
                      {detail.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.7,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="mt-12"
        >
          <button
            onClick={handleLogout}
            className="px-8 py-3 text-lg bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white shadow-xl shadow-red-500/20 hover:scale-105 transition-transform rounded"
          >
            Log Out
          </button>
        </motion.div> */}
      </section>

      {/* Subtle Glow Effects */}
      <div
        className="absolute top-1/3 left-1/2 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 right-1/3 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -z-10"
        aria-hidden="true"
      />
    </motion.main>
  );
};
