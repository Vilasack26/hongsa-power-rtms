using System.ComponentModel.DataAnnotations;

namespace Hongsa.Rtms.Api.Models;

public class RegisterModel
{
    [Required(ErrorMessage = "Username is required")]

    // number on the front is the leght of letter that we setting
    [StringLength(30, ErrorMessage = "Username is too long")]
    [MinLength(5, ErrorMessage = "Username is too short")]
    public required string Username { get; set; }
    
    [Required(ErrorMessage = "Email is required")]
    
    //EmailAddress is requir letter email form have @ and .com
    [EmailAddress(ErrorMessage = "Email is not valid")]
    public required string Email { get; set; }
    
    [Required(ErrorMessage = "Password is required")]
    public required string Password { get; set; }
}