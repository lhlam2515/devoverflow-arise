"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ROUTES from "@/constants/routes";
import { updateUser } from "@/lib/actions/user.action";
import { ProfileSchema } from "@/lib/validations";
import { _User } from "@/types/global";

interface Params {
  user: _User;
}

const UserForm = ({ user }: Params) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolio: user.portfolio || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  const handleUpdateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
      const result = await updateUser({
        ...values,
      });

      if (result.success) {
        toast.success("Your profile has been updated successfully!");

        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast.error(`Error (${result.status})`, {
          description: result.error?.message,
        });
      }
    });
  };

  return (
    <form
      className="mt-9 flex w-full flex-col gap-9"
      onSubmit={form.handleSubmit(handleUpdateProfile)}
    >
      <FieldGroup className="gap-9">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field className="space-y-3.5">
              <FieldLabel className="paragraph-semibold! text-dark400-light800">
                Name <span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                className="no-focus! paragraph-normal border-light700-dark400 bg-light800-dark300! text-dark300-light700 min-h-[56px] border"
                placeholder="Your Name"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <Field className="space-y-3.5">
              <FieldLabel className="paragraph-semibold text-dark400-light800">
                Username <span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                className="no-focus! paragraph-normal border-light700-dark400 bg-light800-dark300! text-dark300-light700 min-h-[56px] border"
                placeholder="Your username"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="portfolio"
          render={({ field, fieldState }) => (
            <Field className="space-y-3.5">
              <FieldLabel className="paragraph-semibold text-dark400-light800">
                Portfolio Link
              </FieldLabel>
              <Input
                type="url"
                className="no-focus! paragraph-normal border-light700-dark400 bg-light800-dark300! text-dark300-light700 min-h-[56px] border"
                placeholder="Your Portfolio link"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="location"
          render={({ field, fieldState }) => (
            <Field className="space-y-3.5">
              <FieldLabel className="paragraph-semibold text-dark400-light800">
                Location <span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                className="no-focus! paragraph-normal border-light700-dark400 bg-light800-dark300! text-dark300-light700 min-h-[56px] border"
                placeholder="Where do you live?"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="bio"
          render={({ field, fieldState }) => (
            <Field className="space-y-3.5">
              <FieldLabel className="paragraph-semibold text-dark400-light800">
                Bio <span className="text-primary-500">*</span>
              </FieldLabel>
              <Textarea
                rows={5}
                className="no-focus! paragraph-normal border-light700-dark400 bg-light800-dark300! text-dark300-light700 min-h-[56px] border"
                placeholder="What's special about you?"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            className="bg-primary-gradient w-fit cursor-pointer"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default UserForm;
