using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace JKWedding.Function
{
    public static partial class JKWeddingFunction
    {
        [FunctionName("photos")]
        public static async Task<IActionResult> PostPhotos(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("photos function processed a request.");

            if (!HttpMethods.IsPost(req.Method))
            {
                return new StatusCodeResult(StatusCodes.Status405MethodNotAllowed);
            }

            var connectionString = System.Environment.GetEnvironmentVariable("TableStorageConnectionString", EnvironmentVariableTarget.Process);
            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new NullReferenceException("Connection string cannot be null");
            }

            var form = await req.ReadFormAsync();
            if (!req.Form.Files.Any())
            {
                return new BadRequestObjectResult("No files selected.");
            }

            if (req.Form.Files.Count > 1)
            {
                return new BadRequestObjectResult("You cannot upload more than 1 file at a time.");
            }
            
            var file = req.Form.Files[0];
            if (file.ContentType != System.Net.Mime.MediaTypeNames.Image.Jpeg)
            {
                return new StatusCodeResult(StatusCodes.Status415UnsupportedMediaType);
            }

            string blobName = await UploadBlob(connectionString, file);
            return new OkObjectResult($"Uploaded blob {blobName} successfully.");
        }

        private static async Task<string> UploadBlob(string connectionString, IFormFile file)
        {
            // Create a BlobServiceClient object which will be used to create a container client
            BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
            // Create the container and return a container client object
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient("jk-wedding-photos");
            // Get a reference to a blob
            string blobName = $"{Guid.NewGuid().ToString()}.jpeg";
            BlobClient blobClient = containerClient.GetBlobClient(blobName);
            BlobContentInfo response = null;
            using (var stream = file.OpenReadStream())
            {
                response = await blobClient.UploadAsync(stream);
            }
            return blobName;
        }
    }
}