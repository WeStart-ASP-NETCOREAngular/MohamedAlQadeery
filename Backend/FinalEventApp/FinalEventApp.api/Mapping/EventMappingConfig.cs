using FinalEventApp.api.DTOs;
using FinalEventApp.api.DTOs.EventDto.Request;
using FinalEventApp.api.DTOs.EventDto.Response;
using FinalEventApp.api.Models;
using Mapster;

namespace FinalEventApp.api.Mapping
{
    public class EventMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Event, SingleEventResponse>()
                .Map(er => er.Tags,e=>e.Tags.Select(t=>t.Tag).ToList()); 
            
            config.NewConfig<Event, ListEventResponse>()
                .Map(er => er.Tags,e=>e.Tags.Select(t=>t.Tag).ToList());

            config.NewConfig<PostEventRequest, Event>()
                .Map(e => e.Tags, er => er.TagsId.Select(t => new EventTag { TagId = t }).ToList()); 
            
            config.NewConfig<PutEventRequest, Event>()
                .Map(e => e.Tags, er => er.TagsId.Select(t => new EventTag { TagId = t }).ToList());


                
        }
    }
}
