import "@tanstack/react-query";
import { ErrorResponseDto } from "./errorResponseDto";

declare module "@tanstack/react-query" {
    interface Register {
        defaultError: ErrorResponseDto;
    }
}
