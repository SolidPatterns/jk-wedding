using System;
using Microsoft.Azure.Cosmos.Table;

namespace JKWedding.Model
{
    public class RsvpResponse : TableEntity
    {
        public RsvpResponse()
        {
            PartitionKey = "JKWedding";
            RowKey = Guid.NewGuid().ToString();
        }
        public string Id => RowKey;
        public bool Rsvp { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public string Song { get; set; }
        public string Dietary { get; set; }
        public string Message { get; set; }

        public RsvpResponse Normalize() {
            Name = Name?.Trim();
            SecondName = SecondName?.Trim();
            Email = Email?.Trim();
            MobileNumber = MobileNumber?.Trim();
            Song = Song?.Trim();
            Dietary = Dietary?.Trim();
            Message = Message?.Trim();
            return this;
        }
    }
}
