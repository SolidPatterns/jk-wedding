using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using JKWedding.Model;
using Newtonsoft.Json.Serialization;
using JKWedding.Data;
using System.Threading;

namespace JKWedding.Function
{
    public static partial class AddWeddingGuestFunction
    {

        [FunctionName("guests")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<WeddingGuest>(requestBody, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });

            await AddNewWeddingGuest(data);
            return new OkObjectResult(null);
        }

        private static async Task AddNewWeddingGuest(WeddingGuest data)
        {
            if (data == null) return;

            var table = await TableStorageUtils.CreateTableAsync();
            await TableStorageUtils.InsertOrMergeEntityAsync(table, data.Normalize());
        }
    }
}