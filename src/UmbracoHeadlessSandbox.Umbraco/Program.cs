using Umbraco.Cms.Api.Common.DependencyInjection;
using Umbraco.Cms.Core;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
 
// NOTE: this CORS policy is way too lenient, but works for demo purposes. make sure you know what you're doing when applying CORS policies.
builder.Services.AddCors(opt =>
    opt.AddPolicy("AllowAll", options => options
        .AllowAnyHeader()
        .AllowAnyOrigin()
        .AllowAnyMethod()
    )
);

builder.Services.AddControllers().AddJsonOptions(
    Constants.JsonOptionsNames.DeliveryApi,
    options =>
    {
        options.JsonSerializerOptions.MaxDepth = 64;
    });

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddDeliveryApi()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

#if (UseHttpsRedirect)
    app.UseHttpsRedirection();
#endif

app.UseCors("AllowAll");

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseInstallerEndpoints();
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

await app.RunAsync();
