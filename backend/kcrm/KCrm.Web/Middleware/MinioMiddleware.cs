using System.Net;
using KCrm.Data.Files.Reader;
using KCrm.Storage;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;


namespace KCrm.Web.Middleware {
    public static class MinioMiddleware {
        public static IEndpointRouteBuilder UseMinioService(this IEndpointRouteBuilder builder) {

            builder.MapGet ("api/file/{id}", async context => {

                var scopeFactor = context.RequestServices.GetRequiredService<IServiceScopeFactory> ( );

                using (var scope = scopeFactor.CreateScope ( )) {
                    var fileReader = scope.ServiceProvider.GetRequiredService<IFileReader> ( );
                    var minioService = scope.ServiceProvider.GetRequiredService<IMinioService> ( );
                    var id = context.GetRouteValue ("id") as string;
                    var storeId = await fileReader.GetFileStoreIdAsync (id).ConfigureAwait (false);

                    try {
                        if (!string.IsNullOrEmpty (storeId)) {
                            await minioService.GetFileAsync (
                                storeId.ToLower ( ), "avatars", context.Response.Body,
                                context.RequestAborted).ConfigureAwait (false);
                        }
                        else {
                            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                            await context.Response.WriteAsync ("Invalid file id");
                        }
                    }
                    catch {
                        // ignore error
                    }

                }
            });

            return builder;
        }
    }
}
