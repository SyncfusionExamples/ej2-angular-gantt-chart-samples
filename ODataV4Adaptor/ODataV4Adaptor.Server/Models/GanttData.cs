using System.ComponentModel.DataAnnotations;

namespace ODataV4Adaptor.Server.Models
{
    public class GanttData
    {
        public static List<GanttData> ganttData = new List<GanttData>();

        public GanttData()
        {
        }

        public GanttData(
            int taskId,
            string taskName,
            DateTime startDate,
            DateTime? endDate,
            int? duration,
            int progress,
            int? parentId,
            string dependency, Segments[]? segments, ResourceInfo[]? resourceInfos)
        {
            TaskID = taskId;
            TaskName = taskName;
            StartDate = startDate;
            EndDate = endDate;
            Duration = duration;
            Progress = progress;
            ParentID = parentId;
            Dependency = dependency;
            Segments = segments;
            ResourceInfos = resourceInfos;
        }

        public static List<GanttData> GetAllRecords()
        {
            if (ganttData.Count == 0)
            {
                DateTime start = DateTime.Today;
                Segments[] segments = [ new Segments{ StartDate = start, Duration = 2 },
                new Segments { StartDate = start.AddDays(2), Duration = 2 }
                ];
                ResourceInfo[] singleResource = [new ResourceInfo { resourceId = 1 }];
                ResourceInfo[] multipleResource = [new ResourceInfo { resourceId = 2, resourceUnit = 50 }, new ResourceInfo { resourceId = 3, resourceUnit = 50 }];
                // Parent Task
                ganttData.Add(new GanttData(
                    1, "Project Planning",
                    start, null,
                    null, 40, null, null, null, null
                ));

                // Child Tasks
                ganttData.Add(new GanttData(
                    2, "Requirement Analysis",
                    start, start.AddDays(4),
                    4, 100, 1, null, segments, singleResource
                ));

                ganttData.Add(new GanttData(
                    3, "Design",
                    start.AddDays(3), start.AddDays(6),
                    3, 70, 1, "2FS", null, multipleResource
                ));

                ganttData.Add(new GanttData(
                    4, "Development",
                    start.AddDays(6), start.AddDays(9),
                    3, 40, 1, "3FS", null, null
                ));

                ganttData.Add(new GanttData(
                    5, "Testing",
                    start.AddDays(9), start.AddDays(10),
                    1, 0, 1, "4FS", null, null
                ));
            }

            return ganttData;
        }

        // Gantt Fields
        [Key]
        public int TaskID { get; set; }

        public string? TaskName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? Duration { get; set; }

        public int Progress { get; set; }

        public string? Dependency { get; set; }

        public int? ParentID { get; set; }
        public Segments[]? Segments { get; set; }
        public ResourceInfo[]? ResourceInfos { get; set; }
    }
    public class ResourceInfo
    {
        public int? resourceId { get; set; }
        public string? resourceName { get; set; }
        public int? resourceUnit { get; set; }
        public string? resourceGroup { get; set; }
    }
    public class Segments
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Duration { get; set; }
    }
}