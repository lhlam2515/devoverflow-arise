"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { toast } from "sonner";
import z, { ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { ActionResponse } from "@/types";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast.success(
        formType === "SIGN_IN"
          ? "Signed in successfully!"
          : "Signed up successfully!"
      );

      router.push(ROUTES.HOME);
    } else {
      toast.error(`Error ${result?.status}`, {
        description: result?.error?.message,
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="mt-10 space-y-6"
    >
      <FieldGroup className="gap-6">
        {Object.keys(defaultValues).map((field) => (
          <Controller
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field, fieldState }) => (
              <Field className="flex w-full flex-col gap-2.5">
                <FieldLabel className="paragraph-medium! text-dark400-light700">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FieldLabel>
                <Input
                  required
                  type={field.name === "password" ? "password" : "text"}
                  {...field}
                  className="paragraph-normal bg-light900-dark300! border-light700-dark400 text-dark300-light700 no-focus! min-h-12 rounded-sm border"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}
      </FieldGroup>

      <Button
        disabled={form.formState.isSubmitting}
        className="bg-primary-gradient paragraph-medium! font-inter text-light-900 min-h-12 w-full cursor-pointer rounded-lg px-4 py-3"
      >
        {form.formState.isSubmitting
          ? buttonText === "Sign In"
            ? "Signing In..."
            : "Signing Up..."
          : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.SIGN_UP}
            className="paragraph-semibold text-primary-gradient"
          >
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link
            href={ROUTES.SIGN_IN}
            className="paragraph-semibold text-primary-gradient"
          >
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
