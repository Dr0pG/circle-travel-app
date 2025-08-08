import { z } from "zod";

import i18n from "@/i18n";

const signInSchema = z.object({
  email: z
    .email(i18n.t("validations.email.invalid"))
    .max(100, i18n.t("validations.email.too_long")),
  password: z
    .string()
    .min(8, i18n.t("validations.password.must_be_at_least", { value: 8 }))
    .max(30, i18n.t("validations.password.too_long"))
    .regex(/[a-z]/, i18n.t("validations.password.must_contain_one_lowercase"))
    .regex(/[A-Z]/, i18n.t("validations.password.must_contain_one_uppercase"))
    .regex(/[0-9]/, i18n.t("validations.password.must_contain_one_number"))
    .regex(
      /[^a-zA-Z0-9]/,
      i18n.t("validations.password.must_contain_one_symbol")
    ),
});

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, i18n.t("validations.name.must_have_at_least", { value: 2 }))
      .max(50, i18n.t("validations.name.must_have_maximum", { value: 50 })),
    email: z
      .email(i18n.t("validations.email.invalid"))
      .max(100, i18n.t("validations.email.too_long")),
    password: z
      .string()
      .min(8, i18n.t("validations.password.must_be_at_least", { value: 8 }))
      .max(30, i18n.t("validations.password.too_long"))
      .regex(/[a-z]/, i18n.t("validations.password.must_contain_one_lowercase"))
      .regex(/[A-Z]/, i18n.t("validations.password.must_contain_one_uppercase"))
      .regex(/[0-9]/, i18n.t("validations.password.must_contain_one_number"))
      .regex(
        /[^a-zA-Z0-9]/,
        i18n.t("validations.password.must_contain_one_symbol")
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      JSON.stringify(data.password) === JSON.stringify(data.confirmPassword),
    {
      message: i18n.t("validations.password.do_not_match"),
      path: ["confirmPassword"],
    }
  );

export type SignInForm = z.infer<typeof signInSchema>;

const validateSignIn = (form: SignInForm) => {
  const result = signInSchema.safeParse(form);

  if (!result.success) {
    const fieldErrors: Record<keyof SignInForm, string> = {
      email: "",
      password: "",
    };

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof SignInForm;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    return {
      success: false,
      errors: fieldErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};

export type SignUpForm = z.infer<typeof signUpSchema>;

const validateSignUp = (form: SignUpForm) => {
  const result = signUpSchema.safeParse(form);

  if (!result.success) {
    const fieldErrors: Record<keyof SignUpForm, string> = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof SignUpForm;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    return {
      success: false,
      errors: fieldErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};

export default {
  validateSignIn,
  validateSignUp,
};
