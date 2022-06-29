var addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
  };
  
  const putInCache = async (request, response) => {
    const cache = await caches.open('v1');
    await cache.put(request, response);
  };
  
  const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
      console.info('using preload response', preloadResponse);
      putInCache(request, preloadResponse.clone());
      return preloadResponse;
    }
  
    try {
      const responseFromNetwork = await fetch(request);
      putInCache(request, responseFromNetwork.clone());
      return responseFromNetwork;
    } catch (error) {
      const fallbackResponse = await caches.match(fallbackUrl);
      if (fallbackResponse) {
        return fallbackResponse;
      }
      return new Response('Network error happened', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  };
  
  const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
  };
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(enableNavigationPreload());
  });
  
  self.addEventListener('install', (event) => {
    event.waitUntil(
      addResourcesToCache([
        '/',
        '/login',
        '/shop',
        '/signup',
        '/user',
      ])
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      cacheFirst({
        request: event.request,
        preloadResponsePromise: event.preloadResponse,
        fallbackUrl: './logo192.png',
      })
    );
  });

  var addResourcesToCache = async (resources) => {
    const cache = await caches.open('v2')
    await cache.addAll(resources);
  }
  
  // self.addEventListener('install', (event) => {
  //   event.waitUntil(addResourcesToCache(
  //     [
  //       '/',
  //       './index.html',
  //       '../src/pages/Login/Login.tsx',
  //       '../src/pages/Shop/Shop.tsx',
  //       '../src/pages/Signug/Signup.tsx',
  //       '../src/pages/User/User.tsx',
  //     ]
  //   ));
  // });

  const deleteCache = async key => {
    await caches.delete(key)
  }
  
  const deleteOldCaches = async () => {
     const cacheKeepList = ['v2'];
     const keyList = await caches.keys()
     const cachesToDelete = keyList.filter(key => !cacheKeepList.includes(key))
     await Promise.all(cachesToDelete.map(deleteCache));
  }
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(deleteOldCaches());
  });








// const staticCacheName = "cache-v1";
// const assets = ["/", "/index.html"];

// // ajout fichiers en cache
// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       cache.addAll(assets);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }

//       // IMPORTANT: Cloner la requête.
//       // Une requete est un flux et est à consommation unique
//       // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
//       var fetchRequest = event.request.clone();

//       return fetch(fetchRequest).then(function (response) {
//         if (!response || response.status !== 200 || response.type !== "basic") {
//           return response;
//         }

//         // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
//         var responseToCache = response.clone();

//         caches.open(staticCacheName).then(function (cache) {
//           cache.put(event.request, responseToCache);
//         });

//         return response;
//       });
//     })
//   );
// });

// // supprimer caches
// self.addEventListener("activate", (e) => {
//   e.waitUntil(
//     caches.keys().then((keys) => {
//       return Promise.all(
//         keys
//           .filter((key) => key !== staticCacheName)
//           .map((key) => caches.delete(key))
//       );
//     })
//   );
// });