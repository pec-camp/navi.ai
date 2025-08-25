export type AuthFormState = null | { message: string };

export type ReviewFormState = null | {
  success?: boolean;
  message: string;
  errors?: Partial<Record<string, string[]>>;
};
