using ChoCin_App.Server;
using ChoCin_App.Server.Helpers;
using ChoCin_App.Server.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

var services = new ProgramServices(builder.Services);
services.RegisterServices();
services.RegisterDatabase(builder.Configuration.GetConnectionString("DbContext"));
services.ConfigureServices();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi();
    app.UseReDoc(options =>
    {
        options.Path = "/redoc";
    });
}

app.UseHttpsRedirection();

app.UseMiddleware<JwtMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();