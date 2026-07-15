export type ApiErrorCode =
  | "INVALID_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN_DOMAIN"
  | "SSRF_BLOCKED"
  | "CHECK_FAILED"
  | "NOT_IMPLEMENTED";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function successResponse<T>(data: T, init?: ResponseInit): Response {
  return Response.json(
    {
      success: true,
      data,
    } satisfies ApiSuccessResponse<T>,
    init
  );
}

export function errorResponse(
  code: ApiErrorCode,
  message: string,
  status = 400
): Response {
  return Response.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    } satisfies ApiErrorResponse,
    { status }
  );
}

export function notImplementedResponse(message: string): Response {
  return errorResponse("NOT_IMPLEMENTED", message, 501);
}
