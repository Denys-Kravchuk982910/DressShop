using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using DressShopBackend.Data.Entities.Identity;
using DressShopBackend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DressShopBackend.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});


builder.Services.AddDbContext<EFContext>((DbContextOptionsBuilder b) => {
    b.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentity<AppUser, AppRole>((IdentityOptions opts) => {
    opts.Password.RequireNonAlphanumeric = false;
    opts.Password.RequireDigit = false;
    opts.Password.RequireLowercase = false;
    opts.Password.RequireUppercase = false;
    opts.Password.RequiredLength = 5;
})
    .AddEntityFrameworkStores<EFContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication((AuthenticationOptions opts) =>
{
    opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer((JwtBearerOptions jwt) =>
    {
        jwt.RequireHttpsMetadata = false;
        jwt.SaveToken = true;
        jwt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateLifetime = false,
            ValidateIssuer = false,

            ValidateIssuerSigningKey = true,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                builder.Configuration.GetValue<string>("private_key")))
        };
    });

builder.Services.AddControllers().AddNewtonsoftJson(opts => {

    opts.SerializerSettings.DefaultValueHandling = DefaultValueHandling.Include;
    opts.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
    opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
});

builder.Services.AddScoped<IJwtBearerService, JwtBearerService>();

builder.Services.AddCors();

var app = builder.Build();

app.MigrateToDatabase();
app.SeedAll();

app.UseCors((CorsPolicyBuilder builder) =>
{
    builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
});

ForwardedHeadersOptions opts = new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
};

opts.KnownNetworks.Clear();
opts.KnownProxies.Clear();

app.UseForwardedHeaders(opts);


app.UseAuthentication();
app.UseAuthorization();

string dir = Path.Combine(Directory.GetCurrentDirectory(), "Images");
if (!Directory.Exists(dir))
{
    Directory.CreateDirectory(dir);
}

app.UseStaticFiles(new StaticFileOptions
{

    FileProvider = new PhysicalFileProvider(dir),
    RequestPath = "/Images"
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
