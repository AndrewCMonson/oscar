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
import { UserMetadata } from "@/hooks/useUserMetadata.tsx";
import { ResponseStyle, Tone } from "@/types.js";
import { User } from "@auth0/auth0-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  userMetadata: UserMetadata | null;
  formEditable: boolean;
  setFormEditable: (editable: boolean) => void;
}

export const ProfileSettingsForm = ({
  user,
  userMetadata,
  formEditable,
  setFormEditable,
}: ProfileSettingsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.nickname || "",
      chatModel: userMetadata?.chatModel || "",
      integrations: userMetadata?.integrations || [],
      preferredLanguage: userMetadata?.preferredLanguage || "",
      responseStyle: userMetadata?.responseStyle || ResponseStyle.Conversational,
      timezone: userMetadata?.timezone || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <FormField
          control={form.control}
          name={"username"}
          render={({ field }) => (
            <FormItem className="text-start lg:w-1/2 mt-2">
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                {formEditable ? (
                  <Input {...field} id="username" />
                ) : (
                  <Input disabled {...field} id="username" />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"chatModel"}
          render={({ field }) => (
            <FormItem className="text-start lg:w-1/2 mt-2">
              <FormLabel htmlFor="chatModel" className="">
                Chat Model
              </FormLabel>
              <FormControl>
                {formEditable ? (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"GPT-3.5-turbo"}>
                        GPT-3.5 Turbo
                      </SelectItem>
                      <SelectItem value={"GPT-4o"}>GPT-4o</SelectItem>
                      <SelectItem value={"GPT-4o-mini"}>GPT-4o Mini</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input disabled {...field} id="chatModel" />
                )}
              </FormControl>
              <FormDescription>
                Your preferred chat model for generating responses
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"timezone"}
          render={({ field }) => (
            <FormItem className="text-start lg:w-1/2 mt-2">
              <FormLabel htmlFor="timezone">Timezone</FormLabel>
              <FormControl>
                {formEditable ? (
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
                ) : (
                  <Input disabled {...field} id="timezone" />
                )}
              </FormControl>
              <FormDescription>Your current timezone</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"integrations"}
          render={({ field }) => (
            <FormItem className="text-start lg:w-1/2 mt-2">
              <FormLabel htmlFor="integrations">Integrations</FormLabel>
              <FormControl>
                {userMetadata?.integrations?.length > 0 ? userMetadata?.integrations.map((integration, index) => (
                  <>
                  <div>{integration}</div>
                  <Input
                    key={index}
                    disabled={!formEditable}
                    {...field}
                    id={`integrations.${index}`}
                  />
                  </>
                )):
                <Input disabled {...field} id="integrations" />}
              </FormControl>
              <FormDescription>Your current timezone</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl hover:scale-105 transition-transform rounded-lg px-6 py-2 mt-4"
            onClick={() => setFormEditable(!formEditable)}
          >
            {formEditable ? "Cancel" : "Edit Profile"}
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl hover:scale-105 transition-transform rounded-lg px-6 py-2 mt-4"
          >
            {"Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
