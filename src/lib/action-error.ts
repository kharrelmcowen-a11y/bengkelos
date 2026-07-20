type FieldError = { _errors?: string[] };

type ActionResult = {
  serverError?: string;
  validationErrors?: unknown;
};

export function firstActionError(result: ActionResult): string | undefined {
  if (result.serverError) return result.serverError;
  if (!result.validationErrors || typeof result.validationErrors !== "object")
    return undefined;

  for (const [key, value] of Object.entries(result.validationErrors)) {
    if (key === "_errors") {
      const rootErrors = value as string[] | undefined;
      if (rootErrors?.[0]) return rootErrors[0];
      continue;
    }
    const fieldError = value as FieldError | undefined;
    if (fieldError?._errors?.[0]) return fieldError._errors[0];
  }
  return undefined;
}
