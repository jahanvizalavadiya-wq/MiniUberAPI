namespace MiniUberAPI.Models
{
    public class Driver
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public bool IsOnline { get; set; }
    }
}
