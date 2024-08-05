

using SkiaSharp;

namespace DressShopBackend.Services
{
    public static class ImageHelper
    {
        public static void SaveImageFromBase64(string base64String, string outputPath)
        {
            if (!string.IsNullOrEmpty(base64String))
            {
                //try
                //{
                byte[] imageBytes = Convert.FromBase64String(base64String);
                using (var ms = new MemoryStream(imageBytes))
                using (var bitmap = SKBitmap.Decode(ms))
                using (var image = SKImage.FromBitmap(bitmap))
                using (var data = image.Encode(SKEncodedImageFormat.Png, 100))
                {
                    using (var stream = File.OpenWrite(outputPath))
                    {
                        data.SaveTo(stream);
                    }
                }
                //    }
                //    catch (FormatException ex)
                //    {
                //        Console.WriteLine("Invalid base64 string format: " + ex.Message + 
                //            "\n" + "Data: " + ex.Data + "\nStackTrace: " + ex.StackTrace + "\nSource" + ex.Source);
                //    }
                //    catch (Exception ex)
                //    {
                //        Console.WriteLine("Error processing image: " + ex.Message +
                //            "\n" + "Data: " + ex.Data + "\nStackTrace: " + ex.StackTrace + "\nSource" + ex.Source);
                //    }
                //}
                //else
                //{
                //    Console.WriteLine("Base64 string is null or empty.");
                //}
            }
        }
    }
}
