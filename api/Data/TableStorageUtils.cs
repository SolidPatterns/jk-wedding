using System;

namespace JKWedding.Data
{
    using System.Threading.Tasks;
    using Microsoft.Azure.Cosmos.Table;
    using Microsoft.Azure.Documents;
    using JKWedding.Model;

    public class TableStorageUtils
    {
        public static CloudStorageAccount CreateStorageAccountFromConnectionString(string storageConnectionString)
        {
            CloudStorageAccount storageAccount;
            try
            {
                storageAccount = CloudStorageAccount.Parse(storageConnectionString);
            }
            catch (FormatException)
            {
                Console.WriteLine("Invalid storage account information provided. Please confirm the AccountName and AccountKey are valid in the app.config file - then restart the application.");
                throw;
            }
            catch (ArgumentException)
            {
                Console.WriteLine("Invalid storage account information provided. Please confirm the AccountName and AccountKey are valid in the app.config file - then restart the sample.");
                Console.ReadLine();
                throw;
            }

            return storageAccount;
        }
        //  </createStorageAccount>

        //  <CreateTable>
        public static async Task<CloudTable> CreateTableAsync()
        {
            // string storageConnectionString = AppSettings.LoadAppSettings().StorageConnectionString;
            string tableName = System.Environment.GetEnvironmentVariable("TableName", EnvironmentVariableTarget.Process);
            string storageConnectionString = System.Environment.GetEnvironmentVariable("TableStorageConnectionString", EnvironmentVariableTarget.Process);

            // Retrieve storage account information from connection string.
            CloudStorageAccount storageAccount = CreateStorageAccountFromConnectionString(storageConnectionString);

            // Create a table client for interacting with the table service
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient(new TableClientConfiguration());

            Console.WriteLine("Create a Table for JKWedding");

            // Create a table client for interacting with the table service 
            CloudTable table = tableClient.GetTableReference(tableName);
            if (await table.CreateIfNotExistsAsync())
            {
                Console.WriteLine("Created Table named: {0}", tableName);
            }
            else
            {
                Console.WriteLine("Table {0} already exists", tableName);
            }

            Console.WriteLine();
            return table;
        }
        //  </CreateTable>

        public static async Task<CloudTable> CreateTableAsync(CloudTableClient tableClient, string tableName)
        {
            Console.WriteLine("Create a Table for the demo");

            // Create a table client for interacting with the table service 
            CloudTable table = tableClient.GetTableReference(tableName);
            try
            {
                if (await table.CreateIfNotExistsAsync())
                {
                    Console.WriteLine("Created Table named: {0}", tableName);
                }
                else
                {
                    Console.WriteLine("Table {0} already exists", tableName);
                }
            }
            catch (StorageException)
            {
                Console.WriteLine(
                    "If you are running with the default configuration please make sure you have started the storage emulator. Press the Windows key and type Azure Storage to select and run it from the list of applications - then restart the sample.");
                Console.ReadLine();
                throw;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            Console.WriteLine();
            return table;
        }

         //  <QueryData>
        public static async Task<WeddingGuest> RetrieveEntityUsingPointQueryAsync(CloudTable table, string partitionKey, string rowKey)
        {
            try
            {
                TableOperation retrieveOperation = TableOperation.Retrieve<WeddingGuest>(partitionKey, rowKey);
                TableResult result = await table.ExecuteAsync(retrieveOperation);
                WeddingGuest weddingGuest = result.Result as WeddingGuest;
                if (weddingGuest != null)
                {
                    Console.WriteLine("\t{0}\t{1}\t{2}\t{3}", weddingGuest.PartitionKey, weddingGuest.RowKey, weddingGuest.Email, weddingGuest.MobileNumber);
                }

                if (result.RequestCharge.HasValue)
                {
                    Console.WriteLine("Request Charge of Retrieve Operation: " + result.RequestCharge);
                }

                return weddingGuest;
            }
            catch (StorageException e)
            {
                Console.WriteLine(e.Message);
                Console.ReadLine();
                throw;
            }
        }
        //  </QueryData>

        //  <InsertItem>
        public static async Task<WeddingGuest> InsertOrMergeEntityAsync(CloudTable table, WeddingGuest entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                // Create the InsertOrReplace table operation
                TableOperation insertOrMergeOperation = TableOperation.InsertOrMerge(entity);

                // Execute the operation.
                TableResult result = await table.ExecuteAsync(insertOrMergeOperation);
                WeddingGuest insertedweddingGuest = result.Result as WeddingGuest;

                if (result.RequestCharge.HasValue)
                {
                    Console.WriteLine("Request Charge of InsertOrMerge Operation: " + result.RequestCharge);
                }

                return insertedweddingGuest;
            }
            catch (StorageException e)
            {
                Console.WriteLine(e.Message);
                Console.ReadLine();
                throw;
            }
        }
        //  </InsertItem>

        //  <DeleteItem>
        public static async Task DeleteEntityAsync(CloudTable table, WeddingGuest deleteEntity)
        {
            try
            {
                if (deleteEntity == null)
                {
                    throw new ArgumentNullException("deleteEntity");
                }

                TableOperation deleteOperation = TableOperation.Delete(deleteEntity);
                TableResult result = await table.ExecuteAsync(deleteOperation);

                if (result.RequestCharge.HasValue)
                {
                    Console.WriteLine("Request Charge of Delete Operation: " + result.RequestCharge);
                }

            }
            catch (StorageException e)
            {
                Console.WriteLine(e.Message);
                Console.ReadLine();
                throw;
            }
        }
        //  </DeleteItem>

        /// <summary>
        /// Check if given connection string is for Azure Table storage or Azure CosmosDB Table.
        /// </summary>
        /// <returns>true if azure cosmosdb table</returns>
        public static bool IsAzureCosmosdbTable()
        {
            return false;
        }
    }
}