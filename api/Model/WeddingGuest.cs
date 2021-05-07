using System;
using Microsoft.Azure.Cosmos.Table;

namespace JKWedding.Model
{
    public class WeddingGuest : TableEntity
    {
        public WeddingGuest()
        {
            PartitionKey = "JKWedding";
            RowKey = Guid.NewGuid().ToString();
        }
        public string Id => RowKey;
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Address { get; set; }
        public string Message { get; set; }

        public WeddingGuest Normalize() {
            Name = Name.Trim();
            SecondName = SecondName.Trim();
            Email = Email.Trim();
            MobileNumber = MobileNumber.Trim();
            Country = Country.Trim();
            City = City.Trim();
            PostCode = PostCode.ToUpper().Trim();
            Address = Address.Trim();
            Message = Message.Trim();
            return this;
        }
    }
}
