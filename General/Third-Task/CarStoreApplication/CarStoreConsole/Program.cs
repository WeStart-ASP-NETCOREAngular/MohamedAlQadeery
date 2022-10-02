using CarStoreLibrary;
using CarStoreLibrary.Model;
using System;
using System.Collections.Generic;
using TodosLibrary;

namespace CarStoreConsole
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Car car = new Car("BMW","2022","Black");

            //Console.WriteLine(car.GetModel());
            //Console.WriteLine("----------------");
            //Console.WriteLine(car.GetYear());
            //Console.WriteLine("----------------");

            //Console.WriteLine(car.GetColor());
            //Console.WriteLine("----------------");

            //Console.WriteLine(car.GetFullInfo());


            List<Todo> todos = new List<Todo> {
            new Todo("first desc",Status.IN_PROGRESS),
            new Todo("sec desc",Status.COMPLETED),
            new Todo("third desc",Status.NOT_STARTED),
            new Todo("four desc",Status.DELETED),
            new Todo("delete desc",Status.DELETED),
            };

            TodosList todosList = new TodosList(todos);
            Console.WriteLine($"Deleted Count : {todosList.GetDeletedTasksCount()}");
            foreach (var complelteTask in todosList.GetCompletedTasks())
            {
                Console.WriteLine($"{complelteTask.Description}");
            }


            foreach (var progressTask in todosList.GetInProgressTasks())
            {
                Console.WriteLine($"{progressTask.Description}");
            }
        }
    }
}
