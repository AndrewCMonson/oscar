import { motion } from "framer-motion";

export const LoadingScreen = ({ message }: { message: string }) => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-white relative flex items-center justify-center"
  >
    <p className="text-2xl text-zinc-400">{message}</p>
  </motion.main>
);
