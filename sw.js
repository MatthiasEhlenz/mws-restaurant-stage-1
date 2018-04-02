/**
 * @Date:   2018-04-01T20:37:13+02:00
 * @Last modified time: 2018-04-02T16:21:53+02:00
 */



var cacheName = 'mws-restaurant-v4';
var contentImgsCache ='mws-restaurant-imgs-v5';

self.addEventListener('install',(event)=>{
    var urlsToCache = [
        '/',
        'sw.js',
        'restaurant.html',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'css/styles.css',
        'css/resp.css',
        'data/restaurants.json'
  ];

    event.waitUntil(
        caches.open(cacheName).then((cache)=>{
          console.log('Caching it all!');
            return cache.addAll(urlsToCache);

        })
    );
});

self.addEventListener('activate',(event)=>{
    event.waitUntil(
        caches.keys().then((cacheNames)=>{
            return Promise.all(
                cacheNames.filter((name)=>{
                    return name.startsWith('mws-restaurant-v') &&
                        name != cacheName;
                }).map((name)=>{
                    return caches.delete(name);
                })
            );
        })
    )
});

self.addEventListener('fetch', (event)=>{
    event.respondWith( composeCachedResponse(event)   );
});

composeCachedResponse = (event)=>{
  let requestUrl = new URL(event.request.url);

  if (requestUrl.pathname.startsWith('/img-res/')) {
    return caches.open(contentImgsCache).then(function(cache) {
        return cache.match(requestUrl).then(function(response) {
          if (response) return response;

          return fetch(event.request).then(function(networkResponse) {
            cache.put(requestUrl, networkResponse.clone());
            return networkResponse;
          });
        });
      });
  }

  return caches.match(event.request).then((response)=>{
        if(response) {
            console.log('Take from cache: ' + event.request.url);
            return response;
        }
        return fetch(event.request).then((response)=>{
                if(response.status == 404) {
                    return new Response("Not found!");
                }
                return response;
            }).catch((err)=>{
                console.log(`Caching failed! Error: ${err}`);
            })
    })

}
