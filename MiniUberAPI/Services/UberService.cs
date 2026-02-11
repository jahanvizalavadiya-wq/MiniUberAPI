using MiniUberAPI.Models;

namespace MiniUberAPI.Services
{
    public class UberService
    {
        private static List<Driver> drivers = new()
        {
            new Driver{ Id="1", Name="John", Lat=30.2672, Lng=-97.7431, IsOnline=true },
            new Driver{ Id="2", Name="Alex", Lat=30.2700, Lng=-97.7500, IsOnline=true },
            new Driver{ Id="3", Name="Mike", Lat=30.2600, Lng=-97.7400, IsOnline=false }
        };

        public List<Driver> GetOnlineDrivers()
        {
            return drivers.Where(d => d.IsOnline).ToList();
        }

        public object CalculateRoute(RouteRequest req)
        {
            double distance = Math.Sqrt(
                Math.Pow(req.DropLat - req.PickupLat, 2) +
                Math.Pow(req.DropLng - req.PickupLng, 2)
            );

            return new
            {
                Distance = Math.Round(distance * 111, 2), // km approx
                ETA = Math.Round(distance * 5, 0), // fake ETA
                Polyline = new List<object>
                {
                    new { lat = req.PickupLat, lng = req.PickupLng },
                    new { lat = req.DropLat, lng = req.DropLng }
                }
            };
        }
    }
}
