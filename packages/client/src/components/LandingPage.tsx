import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpenIcon, CalendarIcon, CodeIcon, RocketIcon } from "lucide-react";
import { FC } from "react";
import { Button } from "./ui/button/button.tsx";
import { Link } from "@tanstack/react-router";
import { useAuth0 } from "@auth0/auth0-react";

export const OscarLandingPage: FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const features = [
    {
      icon: <CodeIcon className="w-12 h-12 text-blue-500" />,
      title: "Code Guidance",
      description: "Receive expert coding advice from a senior developer AI",
    },
    {
      icon: <CalendarIcon className="w-12 h-12 text-green-500" />,
      title: "Project Management",
      description: "Streamline tasks across Motion, Github, and Notion",
    },
    {
      icon: <BookOpenIcon className="w-12 h-12 text-purple-500" />,
      title: "Architecture Support",
      description: "Get intelligent architectural recommendations",
    },
    {
      icon: <RocketIcon className="w-12 h-12 text-red-500" />,
      title: "Rapid Development",
      description: "Accelerate your project with AI-powered insights",
    },
  ];

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

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-white overflow-hidden relative"
      aria-label="Oscar AI Developer Assistant Landing Page"
    >
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 bg-grid-white/5 opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Section */}
      <section
        className="container mx-auto px-6 pt-24 pb-16 text-center relative z-10"
        aria-labelledby="hero-title"
      >
        <motion.h1
          id="hero-title"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 0.5,
          }}
          className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Oscar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-zinc-400"
          aria-describedby="hero-title"
        >
          AI-Powered Developer Assistant for Seamless Project Management
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {isAuthenticated ? (
            <Link to="/chat">
              <Button
                size="lg"
                aria-label="Get Started with Oscar"
                className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform rounded"
              >
                Get Started
              </Button>
            </Link>
          ) : (
              <Button
                size="lg"
                aria-label="Get Started with Oscar"
                className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform rounded"
                onClick={() => loginWithRedirect()}
              >
                Get Started
              </Button>
          )}
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        className="container mx-auto px-6 py-16 relative z-10"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="sr-only">
          Oscar Features
        </h2>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            role="list"
            aria-label="Oscar Features List"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                role="listitem"
                aria-label={feature.title}
              >
                <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors duration-300 hover:bg-zinc-800/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-col items-center">
                    <div className="mb-4" aria-hidden="true">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-center text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-zinc-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Subtle Glow Effect */}
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
