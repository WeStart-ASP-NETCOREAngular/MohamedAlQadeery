namespace CustomerApp.MVC.DTOs
{
    public class CreateCustomerDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class ListCustomerDto
    {
        public string FullName { get; set; }
    }
}
