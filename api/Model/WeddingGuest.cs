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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; internal set; }
        public string PhoneNumber { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Address { get; set; }
        public string Message { get; set; }

        public WeddingGuest Normalize() {
            FirstName = FirstName.Trim();
            LastName = LastName.Trim();
            Email = Email.Trim();
            PhoneNumber = PhoneNumber.Trim();
            Country = Country.Trim();
            City = City.Trim();
            PostCode = PostCode.ToUpper().Trim();
            Address = Address.Trim();
            Message = Message.Trim();
            return this;
        }
    }
}
