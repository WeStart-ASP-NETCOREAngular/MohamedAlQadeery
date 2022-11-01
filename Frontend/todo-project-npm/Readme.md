## Create ASP.NET Core Web api (ToDo List) with Database (MySql Or SQL Server)

- Should have database
- ToDo Category contains:
    - Id(int), Name(string)
        - Sample : Important , Completed, Deleted
- ToDo Model contains:
    - Id(int), Task(string), IsCompleted(Boolean), DueDate(datetime), Description(string: MinLength:100 character), CategoryId(ForeignKey for ToDo Category Table)
- CRUD Operations for both ToDo Category as well as ToDo tables
- Enable Cross-Origin Requests (CORS) in ASP.NET core Web Api (program.cs above app.UseAuthorization)
    ```
    app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().WithOrigins("APP_URL"));
    ```
- Response of ToDo (list/specific) should contains the name of the category

## FrontEnd project

- Use the give template by clicking [HERE](https://github.com/WeStart-ASP-NETCOREAngular/todo-npm-template) to get started for Plain Javascript project to implement UI for ToDo web api project (using parcel as bundler)
- Make sure to use npm install to install the required packages
- use Axios to do the Http transactions
- Make sure to include /node_modules within .gitignore file in case you created it from scratch
- UI should Show Form to add or edit To do and list with button to delete an individual to do item. 
- Feel free to install bootstrap (using npm) or any package you want to enhance your project!
