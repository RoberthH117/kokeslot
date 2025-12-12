using kokeslot_Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace kokeslot_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AffiliateController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly RoobetService _roobet;
        private readonly IConfiguration _config;

        private readonly string _validateUrl;
        private readonly string _affiliateId;

        public AffiliateController(RoobetService roobet, IConfiguration config)
        {
            _roobet = roobet;
            _config = config;

            _validateUrl = _config["Roobet:ValidateUserUrl"];
            _affiliateId = _config["Roobet:AffiliateId"];

            var token = _config["Roobet:Token"];

            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        }

        // --- VALIDATE USER ---
        [HttpGet("validateUser")]
        public async Task<IActionResult> ValidateUser([FromQuery] string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return BadRequest(new { error = "username requerido" });

            if (string.IsNullOrWhiteSpace(_validateUrl))
                return BadRequest(new { error = "ValidateUserUrl está vacío en appsettings.json" });

            string url = $"{_validateUrl}?username={username}&affiliateId={_affiliateId}";

            var response = await _httpClient.GetAsync(url);
            var json = await response.Content.ReadAsStringAsync();

            return Content(json, "application/json");
        }

        // --- LEADERBOARD / STATS ---
        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard(
            [FromQuery] string startDate,
            [FromQuery] string endDate)
        {
            try
            {
                var data = await _roobet.GetStats(startDate, endDate);
                return Content(data, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
