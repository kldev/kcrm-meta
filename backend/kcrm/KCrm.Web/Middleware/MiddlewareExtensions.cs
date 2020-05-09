﻿using Microsoft.AspNetCore.Builder;

namespace KCrm.Web.Middleware {
    public static class MiddlewareExtensions {
        public static IApplicationBuilder UseMachineIdMiddleware(this IApplicationBuilder builder) {
            return builder.UseMiddleware<ContainerIdResponse> ( );
        }

        public static IApplicationBuilder UseErrorHandlingMiddleware(this IApplicationBuilder builder) {
            return builder.UseMiddleware<ErrorHandlingMiddleware> ( );
        }
    }
}
