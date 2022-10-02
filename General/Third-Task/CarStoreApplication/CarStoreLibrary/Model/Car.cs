using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStoreLibrary.Model
{
    public class Car
    {
        public Car(string model, string year, string color)
        {
            Model = model;
            Year = year;
            Color = color;
        }

        public string Model { get; set; }
        public string Year { get; set; }
        public string Color { get; set; }

       
        public string GetModel()
        {
            return Model;
        }

        public string GetYear()
        {
            return Year;
        }

        public string GetColor()
        {
            return Color;
        }

        public string GetFullInfo()
        {
            return $"Car Model : {Model} - Year : {Year} - Color {Color}";
        }


    }
}
