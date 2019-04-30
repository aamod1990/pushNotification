const publicVapidKey = 'BB9ISCKuGYRHa1-_OxiAXhrLmemrCGkieysFVh7U8cOgMJ_3dzBwogq9k7uXZTJt9vUTZ3LSy1e1lTHHxW0mjhs';

// check for service worker
if('serviceWorker' in navigator){
    console.log("enter in if serviceWorker");
    send().catch(err => console.error(err));
}

// In this function register the service worker, register push, send push notification
async function send() {
    // Register Service worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register('/worker.js',{
        scope:'/'
    });
    console.log("service worker registered...");

    // Register push 
    console.log("Registering push....");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Registered....");
    
    // Send push Notification
    console.log("sending push...");
    await fetch('/subscribe',{
        method:'POST',
        body:JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    });
    console.log("push sent...")
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}