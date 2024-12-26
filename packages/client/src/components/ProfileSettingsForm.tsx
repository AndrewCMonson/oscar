import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@auth0/auth0-react";
import { UserMetadata } from "@/hooks/useUserMetadata.tsx";
import { ResponseStyle, Tone } from '@/types.js';



const formSchema = z.object({
  username: z.string().min(3),
  chatModel: z.string(),
  integrations: z.array(z.string()),
  preferredLanguage: z.string(),
  responseStyle: z.enum([ResponseStyle.Conversational, ResponseStyle.Direct]),
  timezone: z.string(),
  tone: z.enum([Tone.Friendly, Tone.Concise, Tone.Professional]),
});

interface ProfileSettingsFormProps {
  user: User | undefined;
  userMetadata: UserMetadata;
}

export const ProfileSettingsForm = ({
  user,
  userMetadata,
}: ProfileSettingsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.nickname,
      chatModel: userMetadata.chatModel,
      integrations: userMetadata.integrations,
      preferredLanguage: userMetadata.preferredLanguage,
      responseStyle: userMetadata.responseStyle,
      timezone: userMetadata.timezone,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <FormField
          control={form.control}
          name={"username"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input {...field} id="username" />
              </FormControl>
              <FormDescription>A unique name for your project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"chatModel"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="chatModel">Chat Model</FormLabel>
              <FormControl>
                <Input {...field} id="chatModel" />
              </FormControl>
              <FormDescription>
                A brief description of your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"timezone"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="timezone">Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue>{field.value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"America/New_York"}>
                      America/New York
                    </SelectItem>
                    <SelectItem value={"America/Chicago"}>
                      America/Chicago
                    </SelectItem>
                    <SelectItem value={"America/Los_Angeles"}>
                      America/Los Angeles
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>The type of project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl hover:scale-105 transition-transform rounded-lg px-6 py-2 mt-4"
        >
          {"Save Changes"}
        </Button>
      </form>
    </Form>
  );
};
