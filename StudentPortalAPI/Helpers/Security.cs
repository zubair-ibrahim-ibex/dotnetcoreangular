using System;
using System.Text;
using System.Security.Cryptography;

namespace StudentPortalAPI.Helpers 
{
    public class Security
    {
        public static string ComputeSha26Hash(string input)
        {
            string salt = "";
            input = input + salt;
            using (SHA512 sha256Hash = SHA512.Create())  
            {  
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(input));  
  
                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();  
                for (int i = 0; i < bytes.Length; i++)  
                {  
                    builder.Append(bytes[i].ToString("x2"));  
                }  
                return builder.ToString();  
            } 
        }
    }
}