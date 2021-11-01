using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using Azure.Storage.Blobs;

namespace JKWedding.Function
{
    public static partial class JKWeddingFunction
    {
        public static readonly int BufferSize = 4096;

        [FunctionName("photos")]
        public static async Task<IActionResult> PostPhotos(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("photos function processed a request.");

            var connectionString = System.Environment.GetEnvironmentVariable("TableStorageConnectionString", EnvironmentVariableTarget.Process);
            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new NullReferenceException("Connection string cannot be null");
            }
            // if (HttpMethods.IsGet(req.Method))
            // {
            //     if (!req.GetQueryParameterDictionary().TryGetValue("key", out string key))
            //     {
            //         return new UnauthorizedResult();
            //     }

            //     string keyToCheck = System.Environment.GetEnvironmentVariable("Key", EnvironmentVariableTarget.Process);
            //     if (!key.Equals(keyToCheck, StringComparison.OrdinalIgnoreCase))
            //     {
            //         return new UnauthorizedResult();
            //     }

            //     var guests = await TableStorageUtils.RetrieveAllRsvpsAsync(rsvpsTableName);
            //     return new OkObjectResult(guests.OrderByDescending(x => x.Timestamp));
            // }

            if (HttpMethods.IsPost(req.Method))
            {
                // Uri uri = await UploadBlobAsync(photoBase64String);
                // return req.CreateResponse(HttpStatusCode.Accepted, uri);
                var form = await req.ReadFormAsync();
                if (!req.Form.Files.Any())
                {
                    return new BadRequestObjectResult("No files selected.");
                }
                // Create a BlobServiceClient object which will be used to create a container client
                BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
                // Create the container and return a container client object
                BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient("jk-wedding-photos");

                foreach (var file in req.Form.Files)
                {
                    if(file.ContentType != System.Net.Mime.MediaTypeNames.Image.Jpeg) {
                        continue;
                    }
                    // Get a reference to a blob
                    BlobClient blobClient = containerClient.GetBlobClient(Guid.NewGuid().ToString());
                    using (var stream = file.OpenReadStream())
                    {
                        await blobClient.UploadAsync(stream);
                    }
                    // using (var stream = file.OpenReadStream())
                    // {
                    //     byte[] buffer = new byte[file.Length];
                    //     var totalBtyes = file.Length;

                    //     var read = await stream.ReadAsync(buffer, 0, buffer.Length);
                    //     await imageUploaded.WriteAsync(buffer, 0, read);
                    // }
                }

                return new OkObjectResult(req.Form.Files.Count + " files have been successfull uploaded.");
            }

            return new StatusCodeResult(StatusCodes.Status405MethodNotAllowed);
        }

        //     private static async Task Rsvp(RsvpResponse data, string tableName)
        //     {
        //         if (data == null) return;

        //         var table = await TableStorageUtils.CreateTableAsync(tableName);
        //         await TableStorageUtils.InsertOrMergeEntityAsync(table, data.Normalize());
        //     }

        //     public static async Task<bool> UploadFileToStorage(Stream fileStream, string fileName,
        //                                                 AzureStorageConfig _storageConfig)
        //     {
        //         // Create a URI to the blob
        //         Uri blobUri = new Uri("https://" +
        //                               _storageConfig.AccountName +
        //                               ".blob.core.windows.net/" +
        //                               _storageConfig.ImageContainer +
        //                               "/" + fileName);

        //         // Create StorageSharedKeyCredentials object by reading
        //         // the values from the configuration (appsettings.json)
        //         StorageSharedKeyCredential storageCredentials =
        //             new StorageSharedKeyCredential(_storageConfig.AccountName, _storageConfig.AccountKey);

        //         // Create the blob client.
        //         BlobClient blobClient = new BlobClient(blobUri, storageCredentials);

        //         // Upload the file
        //         await blobClient.UploadAsync(fileStream);

        //         return await Task.FromResult(true);
        //     }
    }
}