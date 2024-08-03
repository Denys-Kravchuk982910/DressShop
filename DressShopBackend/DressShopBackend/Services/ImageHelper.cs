﻿using System.Drawing;

namespace DressShopBackend.Services
{
    public static class ImageHelper
    {
        public static Bitmap ConvertToBitmap(string base64)
        {
            try
            {
                byte[] img = Convert.FromBase64String(base64);
                using (MemoryStream ms = new MemoryStream(img))
                {
                    ms.Position = 0;
                    Image image = Image.FromStream(ms);
                    ms.Close();
                    img = null;
                    return new Bitmap(image);
                }
            }
            catch
            {
                return null;
            }
        }
    
    }
}