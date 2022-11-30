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


    }


    public class Message
    {
        public string Username { get; set; }
        public string Body { get; set; }
    }
}
