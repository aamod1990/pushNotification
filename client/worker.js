console.log("Service worker loaded....");

self.addEventListener('push',e=>{
    const data = e.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title,{
        body:'Notified by Aamod Tiwari',
        icon:'https://avatars3.githubusercontent.com/u/8774992?s=400&v=4'
    });

});