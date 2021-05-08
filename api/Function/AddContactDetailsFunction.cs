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
using System;
using System.Linq;

namespace JKWedding.Function
{
    public static partial class AddWeddingGuestFunction
    {

        [FunctionName("guests")]
        public static async Task<IActionResult> Post(
            [HttpTrigger(AuthorizationLevel.Function, "post", "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP post trigger function processed a request.");

            if (HttpMethods.IsGet(req.Method))
            {
                if (!req.GetQueryParameterDictionary().TryGetValue("key", out string key))
                {
                    return new UnauthorizedResult();
                }

                string keyToCheck = System.Environment.GetEnvironmentVariable("Key", EnvironmentVariableTarget.Process);
                if (!key.Equals(keyToCheck, StringComparison.OrdinalIgnoreCase))
                {
                    return new UnauthorizedResult();
                }

                var guests = await TableStorageUtils.RetrieveAllAsync();
                return new OkObjectResult(guests.OrderByDescending(x=>x.Timestamp));
            }

            if (HttpMethods.IsPost(req.Method))
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var data = JsonConvert.DeserializeObject<WeddingGuest>(requestBody, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });

                await AddNewWeddingGuest(data);
                return new OkObjectResult(null);

            }

            return new StatusCodeResult(StatusCodes.Status405MethodNotAllowed);
        }

        private static async Task AddNewWeddingGuest(WeddingGuest data)
        {
            if (data == null) return;

            var table = await TableStorageUtils.CreateTableAsync();
            await TableStorageUtils.InsertOrMergeEntityAsync(table, data.Normalize());
        }
    }
}