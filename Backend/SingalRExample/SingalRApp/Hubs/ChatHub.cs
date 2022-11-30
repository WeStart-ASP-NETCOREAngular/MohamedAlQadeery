using Microsoft.AspNetCore.SignalR;

namespace SingalRApp.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessageToAll(string user, string message)
        {
            await Clients.All.SendAsync("onMessageRecived", user, message);
        }

        public async Task SendMessageToClient(string connectionId, Message message)
        {
            await Clients.Client(connectionId).SendAsync("onMessageRecived",message);
        }

        public override  Task OnConnectedAsync()
        {
            UserList.ConnectedClients.Add(Context.ConnectionId);
             Clients.All.SendAsync("onConnectedClientsUpdated", UserList.ConnectedClients.ToList());
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            UserList.ConnectedClients.Remove(Context.ConnectionId);
            Clients.All.SendAsync("onConnectedClientsUpdated", UserList.ConnectedClients.ToList());

            return base.OnDisconnectedAsync(exception);
        }

    }


    public static class UserList
    {
        public static HashSet<string> ConnectedClients = new HashSet<string>();
    }


    public class Message
    {
        public string Username { get; set; }
        public string Body { get; set; }
    }
}
