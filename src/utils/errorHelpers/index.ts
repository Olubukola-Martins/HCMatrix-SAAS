type TError = {
  message: string;
  errors?: { message: string; path: string }[];
};

export const errorFormatter = (_error: unknown): TError => {
  const DEFAULT_ERR_MESSAGE = "Ooops! Something went wrong!";
  const error = _error as Record<
    string,
    Record<string, Record<string, string> | string>
  >;
  const ans: TError = {
    message:
      (error as Record<string, Record<string, Record<string, string>>>)
        ?.response?.data?.message ??
      (
        error as unknown as Record<
          string,
          Record<string, Record<string, Record<string, string>>>
        >
      )?.response?.data?.error?.message ??
      DEFAULT_ERR_MESSAGE,
    errors: (
      (error as Record<string, Record<string, Record<string, string>>>)
        ?.response?.data?.error as unknown as ApiErrorResponse["errors"]
    )?.map((err) => ({
      message: err?.message,
      path: err?.path.toString(),
    })),
  };
  return ans;
};

export interface ApiErrorResponse {
  message: string;
  errors: Error[];
}

interface Error {
  message: string;
  path: string;
}
