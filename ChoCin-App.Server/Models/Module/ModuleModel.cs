namespace ChoCin_App.Server.Models.Module
{
    public class ModuleModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Icon { get; set; }
        public string? Path { get; set; }
        public int Order { get; set; }
        public Guid? SubId { get; set; }
        public virtual List<ModuleModel>? Children { get; set; }
    }
}