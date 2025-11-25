namespace Hongsa.Rtms.Api.Models;

public class User
{
// Id is the primary key for the user
// Username, Email, and Fullname are required properties
// required keyword ensures that these properties must be set when creating an instance of User
// Id is an integer that uniquely identifies each user
// Use this for the interface of username
    public int Id {get; set;}
    public required string Username { get; set; }
    public required string Email {get; set;}
    public required string Fullname {get; set;}
    
}
    
