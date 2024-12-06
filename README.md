### A simple NodeJS app to download images from an API and save it to local drive.

1. Use Axios to send HTTP request to API and get response (imageUrl)
   
2. Use Axios again to send HTTP request to imageUrl and get response as stream
   
3. Create file using this stream and save to local drive
   
4. Use pm2 & pm2-windows-service to start application and run on Windows startup (even after reboot)

   Detail:
   
   Install: npm i pm2 & npm i pm2-windows-service -g

   pm2 start index.js --name "simple_nodejs_app_download"
   
   pm save (🔴important)

   As administrator, open command line, run: pm2-service-install -n PM2 (🔴before this, make sure go to Service > search for PM2, and stop it if it is running :)
   
   ![image](https://github.com/user-attachments/assets/51d7e97a-5e4e-4f2f-9b70-f96578f909b0)

   To test:

  1. Restart Windows

  2. Just after restart, open command prompt (🔴as Administrator) and run: pm2 status → our application is running ;)
