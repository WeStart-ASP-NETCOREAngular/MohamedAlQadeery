using Microsoft.AspNetCore.SignalR;

namespace SingalRApp.Hubs
{
    public class ChatHub:Hub
    {
        public async Task SendMessageToAll(string user,string message)
        {
            await Clients.All.SendAsync("onMessageRecived", user,message);
        }


    }
}
