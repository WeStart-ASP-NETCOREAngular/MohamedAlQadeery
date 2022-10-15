namespace PortfolioMvc.ViewModels
{

    public abstract class AbstractPostVM
    {
        public string Title { get; set; }
        public string Body { get; set; }
    }
    public class CreatePostVM : AbstractPostVM
    {
     
    }


    public class EditPostVM : AbstractPostVM
    {
        public int Id { get; set; }
       
    }
    public class ShowPostVM : AbstractPostVM
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
