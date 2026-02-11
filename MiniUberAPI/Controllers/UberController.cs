using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiniUberAPI.Models;
using MiniUberAPI.Services;

namespace MiniUberAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UberController : ControllerBase
    {
        private readonly UberService _service = new();

        [HttpGet("drivers")]
        public IActionResult GetDrivers()
        {
            return Ok(_service.GetOnlineDrivers());
        }

        [HttpPost("route")]
        public IActionResult GetRoute(RouteRequest request)
        {
            return Ok(_service.CalculateRoute(request));
        }

    }
}
