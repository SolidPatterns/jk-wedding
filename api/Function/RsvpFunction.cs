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
    public static partial class JKWeddingFunction
    {

        [FunctionName("rsvps")]
        public static async Task<IActionResult> GetOrPostRsvps(
            [HttpTrigger(AuthorizationLevel.Function, "post", "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("rsvps function processed a request.");

            var rsvpsTableName = System.Environment.GetEnvironmentVariable("RsvpsTableName", EnvironmentVariableTarget.Process);

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

                var guests = await TableStorageUtils.RetrieveAllRsvpsAsync(rsvpsTableName);
                return new OkObjectResult(guests.OrderByDescending(x => x.Timestamp));
            }

            if (HttpMethods.IsPost(req.Method))
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var data = JsonConvert.DeserializeObject<RsvpResponse>(requestBody, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });

                await Rsvp(data, rsvpsTableName);
                return new OkObjectResult(null);

            }

            return new StatusCodeResult(StatusCodes.Status405MethodNotAllowed);
        }

        private static async Task Rsvp(RsvpResponse data, string tableName)
        {
            if (data == null) return;

            var table = await TableStorageUtils.CreateTableAsync(tableName);
            await TableStorageUtils.InsertOrMergeEntityAsync(table, data.Normalize());
        }
    }
}