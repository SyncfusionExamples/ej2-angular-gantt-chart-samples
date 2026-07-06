namespace RemoteSaveAdaptor.Server.Model
{
    public class GanttTask
    {
        public int? TaskId { get; set; }
        public string? TaskName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public object? Duration { get; set; }
        public object? Progress { get; set; }
        public object? ParentId { get; set; }
    }
}
