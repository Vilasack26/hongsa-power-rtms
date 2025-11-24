using Microsoft.AspNetCore.Mvc;
using Hongsa.Rtms.Api.Models;

namespace Hongsa.Rtms.Api.Controllers;

[ApiController]
[Route("api/[controller]")] //api/User
public class Usercontroller:ControllerBase
{
    [HttpGet ("User")]
    public string GetUser()
    {
        return "Welcome Brother";
        return "Welcome Brother";

    }
 
    [HttpPost ("Dashboard")]
    public string PostUser()
    {
        return "User Posted";
    }
    [HttpPut ("UserPut")]
    public string PutUser()
    {
        return "User Put";
    }

    [HttpDelete ("Userdelete")]
    public string DeleteUser()
    {
        return "User deleted";
    }

}