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
import { Spinner } from "@/components/ui/spinner.tsx";
import { ResponseStyle, Tone } from "@/gql/graphql.ts";
import { GetUser, UpdateUserPreferences } from "@/utils/graphql/index.ts";
import { useMutation, useQuery } from "@apollo/client";
import { User } from "@auth0/auth0-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3),
  chatModel: z.string(),
  preferredLanguage: z.string(),
  responseStyle: z.enum([ResponseStyle.Conversational, ResponseStyle.Direct]),
  timezone: z.string(),
  tone: z.enum([Tone.Friendly, Tone.Concise, Tone.Professional]),
});

interface ProfileSettingsFormProps {
  user: User | undefined;
  formEditable: boolean;
  setFormEditable: (editable: boolean) => void;
}

export const ProfileSettingsForm = ({
  user,
  formEditable,
  setFormEditable,
}: ProfileSettingsFormProps) => {
  const {
    data,
    loading: userLoading,
    error: userError,
  } = useQuery(GetUser, {
    variables: { auth0Sub: user?.sub || "" },
    onCompleted: (data) => {
      form.reset({
        username: user?.nickname ?? "",
        chatModel: data.user.preferences?.chatModel ?? "",
        preferredLanguage: data.user.preferences?.preferredLanguage ?? "",
        responseStyle:
          data.user.preferences?.responseStyle ?? ResponseStyle.Conversational,
        timezone: data.user.preferences?.timezone ?? "",
        tone: data.user.preferences?.tone ?? Tone.Friendly,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const [updateUserPreferences] = useMutation(UpdateUserPreferences);

  const userPreferences = data?.user?.preferences;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.nickname || "",
      chatModel: userPreferences?.chatModel || "",
      preferredLanguage: userPreferences?.preferredLanguage || "",
      responseStyle:
        userPreferences?.responseStyle || ResponseStyle.Conversational,
      timezone: userPreferences?.timezone || "",
      tone: userPreferences?.tone || Tone.Friendly,
    },
  });

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    updateUserPreferences({
      variables: {
        auth0sub: user?.sub ?? "",
        preferences: {
          chatModel: data.chatModel,
          preferredLanguage: data.preferredLanguage,
          responseStyle: data.responseStyle,
          timezone: data.timezone,
          tone: data.tone,
        },
      },
    });
    setFormEditable(false);
  };

  if (userLoading) {
    return <Spinner size="large" />;
  }

  if (userError) {
    return <div>Error loading user data</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => handleFormSubmit(data))}>
        <FormField
          control={form.control}
          name={"username"}
          render={({ field }) => (
            <FormItem className="text-start lg:w-1/2 mt-2">
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input disabled {...field} id="username" />
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
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
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
          name={"preferredLanguage"}
          render={({ field }) => (
            <FormItem className="text-start lg:w-1/2 mt-2">
              <FormLabel htmlFor="preferredLanguage">
                Preferred Language
              </FormLabel>
              <FormControl>
                {formEditable ? (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"English"}>English</SelectItem>
                      <SelectItem value={"Spanish"}>Spanish</SelectItem>
                      <SelectItem value={"French"}>French</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input disabled {...field} id="preferredLanguage" />
                )}
              </FormControl>
              <FormDescription>
                Your preferred language for responses
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"responseStyle"}
          render={({ field }) => (
            <FormItem className="text-start lg:w-1/2 mt-2">
              <FormLabel htmlFor="responseStyle">Response Style</FormLabel>
              <FormControl>
                {formEditable ? (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ResponseStyle.Conversational}>
                        Conversational
                      </SelectItem>
                      <SelectItem value={ResponseStyle.Direct}>
                        Direct
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input disabled {...field} id="responseStyle" />
                )}
              </FormControl>
              <FormDescription>Your preferred response style</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"tone"}
          render={({ field }) => (
            <FormItem className="text-start lg:w-1/2 mt-2">
              <FormLabel htmlFor="tone">Tone</FormLabel>
              <FormControl>
                {formEditable ? (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Tone.Friendly}>Friendly</SelectItem>
                      <SelectItem value={Tone.Concise}>Concise</SelectItem>
                      <SelectItem value={Tone.Professional}>
                        Professional
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input disabled {...field} id="tone" />
                )}
              </FormControl>
              <FormDescription>
                Your preferred tone for responses
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl hover:scale-105 transition-transform rounded-lg px-6 py-2 mt-4"
            onClick={(e) => {
              e.preventDefault();
              setFormEditable(!formEditable);
            }}
          >
            {formEditable ? "Cancel" : "Edit Profile"}
          </Button>
          {formEditable && (
            <Button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl hover:scale-105 transition-transform rounded-lg px-6 py-2 mt-4"
            >
              {"Save Changes"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
