using Microsoft.EntityFrameworkCore;
using Hongsa.Rtms.Api.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Entity Framework Core MS SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Adding Identity (Trng karn add for num sh Identity)
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options => 
{
    // (True is use) and (false is non-use)
    // บังคับว่าต้องมีตัวเลข (0-9)
    options.Password.RequireDigit = false;    
    // บังคับว่าต้องมีตัวหนังสือเล็ก
    options.Password.RequireLowercase = false;
    // บังคับว่าต้องมีตัวหนังสือใหย่
    options.Password.RequireUppercase = false;
    // บังคับว่าต้องมีตัวหนังสือพิเสด ( @, !, ...)
    options.Password.RequireNonAlphanumeric = false;
    // บังคับว่าต้องมีความยาวกี่ตัวหนังสือ /*Can adjust the leght of number/
    options.Password.RequiredLength = 8;  
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Adding Authentication
    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })

// Adding Jwt Bearer
.AddJwtBearer(options  => {
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration.GetSection("JWT:ValidAudience").Value!,
        ValidIssuer = builder.Configuration.GetSection("JWT:ValidIssuer").Value!,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JWT:Secret").Value!))
    };
});

// Show JWT:Secrect
// Console.WriteLine($"JWT:secret: {builder.Configuration.GetSection("JWT:Secret").Value}");

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    // Scalar API Reference Configuration
    app.MapScalarApiReference(options =>
    {
        options
            .WithTitle("Hongsa RTMS API (Scalar)")
            .WithTheme(ScalarTheme.Laserwave) // light, dark, purple
            .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
    });
}
// ปิดการใช้งาน HTTPS ชั่วคราว (ถ้าจำเป็น)
// app.UseHttpsRedirection();

// Add Authentication
app.UseAuthentication();

// Add Authorization
app.UseAuthorization();

app.MapControllers();

app.Run();