import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectType } from "@/__generated__/graphql.ts";
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
import { useMutation } from "@apollo/client";
import { CreateProject } from "@/utils/graphql/mutations.ts";
import { Spinner } from "./ui/spinner.tsx";

const formSchema = z.object({
  projectName: z.string().min(3),
  description: z.string().min(10),
  type: z
    .enum([ProjectType.Client, ProjectType.Internal, ProjectType.Personal])
    .describe("The type of project"),
});

interface CreateProjectFormProps {
  setOpen: (open: boolean) => void;
}

export const CreateProjectForm = ({ setOpen }: CreateProjectFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
      type: ProjectType.Client,
    },
  });

  const [createProject, { loading }] = useMutation(CreateProject, {
    onCompleted: (data) => {
      setOpen(false);
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createProject({
      variables: {
        name: values.projectName,
        description: values.description,
        type: values.type,
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={"projectName"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input {...field} id="name" />
              </FormControl>
              <FormDescription>A unique name for your project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Input {...field} id="description" />
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
          name={"type"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="type">Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue>{field.value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ProjectType.Client}>Client</SelectItem>
                    <SelectItem value={ProjectType.Internal}>
                      Internal
                    </SelectItem>
                    <SelectItem value={ProjectType.Personal}>
                      Personal
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
          {loading ? <Spinner /> : "Create Project"}
        </Button>
      </form>
    </Form>
  );
};
