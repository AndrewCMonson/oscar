import { ProfileSettingsForm } from "@/components/ProfileSettingsForm.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { SidebarNav } from "@/components/ui/sidebar-nav.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Github } from "./Github.tsx";
import { useSearchParams } from "react-router";
import { CreateProjectDialog } from "./CreateProjectDialog.tsx";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [formEditable, setFormEditable] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSettings, setSelectedSettings] = useState<string>(() => {
    const settings = searchParams.get("settings");
    return settings ? settings : "user";
  });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [repositoryId, setRepositoryId] = useState<number | null>(null);

  const handleSelectedSettings = (selectedItem: string) => {
    setSelectedSettings(selectedItem);
    if (selectedItem) {
      setSearchParams({ settings: selectedItem });
    } else {
      setSearchParams({});
    }
  };

  if (isLoading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white relative flex items-center justify-center"
      >
        <Spinner />
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

  const NavItems = [
    {
      selectedItem: "profile",
      name: "user",
      title: "User Settings",
    },
    {
      selectedItem: "github",
      name: "github",
      title: "GitHub",
    },
    // {
    //   selectedItem: "assistant",
    //   name: "assistant",
    //   title: "Assistant Settings",
    // },
  ];

  return (
    isAuthenticated && (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col text-white container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar"
        aria-label="User Profile Page"
      >
        <div
          className="absolute inset-0 bg-grid-white/5 opacity-20 pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col h-full"
        >
          <div className="flex flex-col items-start mb-6">
            <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 pb-2 mb-2">
              Account
            </motion.h1>
            <p className="text-lg sm:text-xl text-zinc-500">
              Welcome back
              {user?.name && (
                <span className="font-semibold"> {user?.name}</span>
              )}
              !
            </p>
          </div>
          <Separator />
          <div className="flex flex-col lg:flex-row gap-4 lg:flex-1 lg:h-full">
            <div className="flex flex-col flex-1 h-1/3 pt-4 pr-4 gap-2">
              <SidebarNav
                items={NavItems}
                selectedItem={selectedSettings}
                setSelectedItem={handleSelectedSettings}
              ></SidebarNav>
            </div>

            <div className="lg:w-3/4 bg-transparent shadow-lg ">
              <div className="h-full bg-transparent transition-colors duration-300 backdrop-blur-sm pt-4 ">
                {selectedSettings === "user" && (
                  <div className="text-start mb-6">
                    <div className="text-lg sm:text-xl text-white font-semibold">
                      User Settings
                    </div>
                    <div className="text-zinc-500">
                      This is where you can configure your profile settings.
                    </div>
                  </div>
                )}
                {/* {selectedSettings === "assistant" && (
                  <div className="text-start mb-6">
                    <div className="text-lg sm:text-xl text-white font-semibold">
                      Assistant Settings
                    </div>
                    <div className="text-zinc-500">
                      {`This is where you can configure your assistant's
                        settings.`}
                    </div>
                  </div>
                )} */}
                {selectedSettings === "github" && (
                  <div className="text-start mb-6">
                    <div className="text-lg sm:text-xl text-white font-semibold">
                      GitHub
                    </div>
                    <div className="text-zinc-500">
                      {`Manage and view your GitHub repositories`}
                    </div>
                  </div>
                )}
                <Separator />
                <div className="mt-2 h-[calc(100vh-4rem)]">
                  {selectedSettings === "user" && (
                    <ProfileSettingsForm
                      user={user}
                      formEditable={formEditable}
                      setFormEditable={setFormEditable}
                    />
                  )}
                  {/* {selectedSettings === "assistant" && (
                    <AssistantSettingsForm
                      user={user}
                      formEditable={formEditable}
                      setFormEditable={setFormEditable}
                    />
                  )} */}
                  {selectedSettings === "github" && (
                    <div className="mt-2 h-full overflow-y-auto no-scrollbar">
                      {user && (
                        <Github
                          user={user}
                          setDialogOpen={setDialogOpen}
                          setRepositoryId={setRepositoryId}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subtle Glow Effects */}
        <div
          className="absolute top-1/3 left-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 -z-10"
          aria-hidden="true"
        />
        <CreateProjectDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          repositoryId={repositoryId}
        />
      </motion.main>
    )
  );
};
