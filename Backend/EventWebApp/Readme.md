Events Web Application (Mohamed AlQadeery)
-----------------------
Web application for users who are intersted in joining or creating events with people who have smiliar interstets  
for example events for people who are intersted in "league of legends" game where they can set a time and location for event and people can join 
together and have group chat  
The project is developed using  a ASP.NET Core Web API following the principles of Clean Architecture  

--------------------------------
Project Overiew
-------
### Domain

This will contain all models ,interfaces, and logic specific to the domain layer.

### Data Access Layer (DAL)

This layer contains all database logic and dbcontext 

### Service

This layer contains classes services like JWT Service , image upload services etx.. 

### Api

This layer is a web api application where contains the api controllers and api logic

Main features 
-----------
1-Guest 
---------
- guests can search for events and check its info but cant join them (should have an account)  
- filter events by location/category  

2-Registerd Users 
-----------
- can search for events and check its info  
- filter events by location/category/newset  
- create/join/leave events  
- after joinning event it will have group chat   
- Authenticaion system using external providers (facebook,google etc.. )  
- manage his profile  
- Realtime notifcation if somone joined his event (only if he was the event creator)
-----
3-Admin 
---------------------------
- Manage all events (CRUD)  
- Manage all users (CRUD)  
- Manage All Categories (CRUD)  
- Manage All Tags (CRUD)  


-----------------------------------------
Models 
--------------------------------------
- class User : IdentityUser  
- class Category  
- class Tag  
- class Event  
- class EventTag  
- class EventUser  


