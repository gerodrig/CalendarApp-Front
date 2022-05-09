/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js'
);

//definde the background sync
workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

//destructure registerRout, CacheFirst and backgroundsync
const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

//definen cache network first urls
const cacheNetworkFirst = ['/api/auth/renew', '/api/events'];

registerRoute(({ request, url }) => {
	if (cacheNetworkFirst.includes(url.pathname)) return true;
	return false;
}, new NetworkFirst());

// registerRoute(
// 	//register our api to renew the token in the cache
// 	new RegExp('https://mern-calendar-gerry.herokuapp.com/api/auth/renew'),
// 	new NetworkFirst()
// );

// registerRoute(
// 	//register our api to post events inthe cache
// 	new RegExp('https://mern-calendar-gerry.herokuapp.com/api/events'),
// 	new NetworkFirst()
// );

const cacheFirstNetwork = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css',
];

registerRoute(({ request, url }) => {
	if (cacheFirstNetwork.includes(url.href)) return true;
	return false;
}, new CacheFirst());

// registerRoute(
// 	//register boostrap cdn in our cache. caceh first with network fallback
// 	new RegExp(
// 		'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css'
// 	),
// 	new CacheFirst()
// );

// registerRoute(
// 	//register fontawesome cdn in our cache. caceh first with network fallback
// 	new RegExp(
// 		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
// 	),
// 	new CacheFirst()
// );

//Offline postings
//create the plugin
const bgSyncPlugin = new BackgroundSyncPlugin('post-offline', {
	maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
});

registerRoute(
	//register our api to post events inthe cache
	new RegExp('https://mern-calendar-gerry.herokuapp.com/api/events'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'POST'
);

registerRoute(
	//register our api to post events inthe cache
	new RegExp('https://mern-calendar-gerry.herokuapp.com/api/events'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'DELETE'
);

registerRoute(
	//register our api to post events inthe cache
	new RegExp('https://mern-calendar-gerry.herokuapp.com/api/events'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'PUT'
);
