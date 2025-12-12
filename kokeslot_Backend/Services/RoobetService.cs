using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;

namespace kokeslot_Backend.Services
{
    public class RoobetService
    {
        private readonly HttpClient _http;
        private readonly string _statsUrl;
        private readonly string _affiliateId;

        public RoobetService(IConfiguration config, IHttpClientFactory httpFactory)
        {
            _http = httpFactory.CreateClient();

            var token = config["Roobet:Token"];
            _statsUrl = config["Roobet:StatsUrl"];
            _affiliateId = config["Roobet:AffiliateId"];

            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        }

        public async Task<string> GetStats(string startDate, string endDate)
        {
            if (string.IsNullOrWhiteSpace(_statsUrl))
                throw new Exception("StatsUrl vacío o no definido en appsettings.json");

            var url =
                $"{_statsUrl}?userId={_affiliateId}&startDate={startDate}&endDate={endDate}&categories=slots";

            var response = await _http.GetAsync(url);
            return await response.Content.ReadAsStringAsync();
        }
    }
}
