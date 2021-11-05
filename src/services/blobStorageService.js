// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and shared key in main()
*/

const { BlobServiceClient } = require('@azure/storage-blob')

// Load the .env file if it exists
// require("dotenv").config();
class BlobStorageService {
  account
  sas

  constructor(account, sas) {
    this.account = account
    this.sas = sas
  }

  // exampple usage of this method
  // Create a blob
  // for (let i = 0; i < this.fileInput.current.files.length; i++) {
  //   this.handleUploadUpdate(i + 1, this.fileInput.current.files.length)
  //   let content = this.fileInput.current.files[i]
  //   let blobName = `${uuidv4()}_${new Date().getTime()}`
  //   let blockBlobClient = this.blobStorageService.getBlockBlobClient(blobName)
  //   let uploadBlobResponse = await blockBlobClient.upload(
  //     content,
  //     Buffer.byteLength(content)
  //   )
  //   console.log(
  //     `Upload block blob ${blobName} successfully`,
  //     uploadBlobResponse.requestId
  //   )
  // }
  // this.handleSuccess();
  getBlockBlobClient(blobName) {
    if (!blobName) {
      throw 'blobname cannot be null or empty.'
    }
    // Enter your storage account name and shared key
    //   const account = process.env.GATSBY_ACCOUNT_NAME || ''
    //   const sas =
    //     process.env.GATSBY_SAS ||
    //     ''

    // ONLY AVAILABLE IN NODE.JS RUNTIME
    // If you are using the browser, you can use the InteractiveBrowserCredential provided via @azure/identity or any other feasible implementation of TokenCredential.
    // DefaultAzureCredential will first look for Azure Active Directory (AAD)
    // client secret credentials in the following environment variables:
    //
    // - AZURE_TENANT_ID: The ID of your AAD tenant
    // - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
    // - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
    //
    // If those environment variables aren't found and your application is deployed
    // to an Azure VM or App Service instance, the managed service identity endpoint
    // will be used as a fallback authentication source.
    // const defaultAzureCredential = new DefaultAzureCredential();

    // You can find more TokenCredential implementations in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library
    // to use client secrets, certificates, or managed identities for authentication.

    // Use AnonymousCredential when url already includes a SAS signature
    //   const anonymousCredential = new AnonymousCredential();

    // List containers
    const blobServiceClient = new BlobServiceClient(
      // When using AnonymousCredential, following url should include a valid SAS or support public access
      `https://${this.account}.blob.core.windows.net?${this.sas}`
    )

    // Create a container
    const containerName = 'jk-wedding-photos'
    const containerClient = blobServiceClient.getContainerClient(containerName)
    return containerClient.getBlockBlobClient(blobName)

    // // Create a blob
    // for (let i = 0; i < files.length; i++) {
    //   let content = files[i]
    //   let blobName = `${uuidv4()}_${new Date().getTime()}`
    //   let blockBlobClient = containerClient.getBlockBlobClient(blobName)
    //   let uploadBlobResponse = await blockBlobClient.upload(
    //     content,
    //     Buffer.byteLength(content)
    //   )
    //   console.log(
    //     `Upload block blob ${blobName} successfully`,
    //     uploadBlobResponse.requestId
    //   )
    // }
  }
}
export default BlobStorageService
