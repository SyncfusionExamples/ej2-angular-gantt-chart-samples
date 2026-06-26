using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using ODataV4Adaptor.Server.Models;

namespace ODataV4Adaptor.Server.Controllers
{
    [Route("[controller]")]
    public class GanttTasksController : ODataController
    {
        [EnableQuery]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(GanttData.GetAllRecords().AsQueryable());
        }

        [HttpPost]
        [EnableQuery]
        public IActionResult Post([FromBody] GanttData task)
        {
            if (task == null)
                return BadRequest();

            GanttData.GetAllRecords().Add(task);
            return Created(task);
        }

        [HttpPatch("{key}")]
        [EnableQuery]
        public IActionResult Patch([FromODataUri] int key, [FromBody] GanttData updateRecord)
        {
            var task = GanttData.GetAllRecords()
                .FirstOrDefault(t => t.TaskID == key);

            if (task == null || task.TaskID != updateRecord.TaskID)
                return NotFound();
            task = updateRecord;

            return Ok(task);
        }

        [HttpDelete("{key}")]
        [EnableQuery]
        public IActionResult Delete(int key)
        {
            var task = GanttData.GetAllRecords()
                .FirstOrDefault(t => t.TaskID == key);

            if (task == null)
                return NotFound();

            GanttData.GetAllRecords().Remove(task);
            return NoContent();
        }

    }
}
