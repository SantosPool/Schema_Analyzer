using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Schema_Analyzer.Entities.Entities;
using Schema_Analyzer.Services;
using Schema_Analyzer.WebUtils;

namespace Schema_Analyzer.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SchemaController : BaseController
    {
        private ISchemaService schemaService;

        public SchemaController(ISchemaService _schemaService)
        {
            this.schemaService = _schemaService;
        }

        [HttpPost("GetallTablesandProperties")]
        public IActionResult GetallTablesandProperties([FromBody]Connection con)
        {
            Schema _tablesSchema = this.schemaService.GetallTablesandProperties(con);
            if (_tablesSchema == null)
                return BadRequest(new { message = "DB Not Contain Tables..." });

            return Ok(new
            {
                _tablesSchema
            });
        }
    }
}