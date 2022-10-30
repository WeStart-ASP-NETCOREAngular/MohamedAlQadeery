namespace PortfolioApp.Api.Extensions
{
    public static class LocaliztionExtenstion
    {

        public static IApplicationBuilder UseLocalization(this IApplicationBuilder app)
        {
            var supportedCultures = new[] { "en-US", "ar" };
            var localizationOptions =
                new RequestLocalizationOptions().SetDefaultCulture(supportedCultures[0])
                .AddSupportedCultures(supportedCultures)
                .AddSupportedUICultures(supportedCultures);

            app.UseRequestLocalization(localizationOptions);
            localizationOptions.ApplyCurrentCultureToResponseHeaders = true;

            return app;
        }
    }
}
