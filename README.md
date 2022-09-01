# Pushing from an HTTP server

Original HTTP was request/response which isn't great for web client that want real-time updates (e.g. likes or comments that update live without reloading a web page). Don't want client to be polling a server for updates.

- Using HTTP1.1: [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).
  - Upgrade a vanilla HTTP connection with an upgrade header.
  - Easy to use, lots of libraries that implement WebSockets. Been around for a while.
  - Sort of like TCP sockets (one layer lower on the network stack), WebSockets also have a send and receive API.
  - But HTTP1.1 is in the slow process of being superceded by HTTP2 (SPDY, multiplex many requests over a single TCP connection) and now HTTP3 (QUIC, HTTP over UDP).
  - WebSockets will not be integrated into HTTP2 :( [because *someone* has to do it!](https://daniel.haxx.se/blog/2016/06/15/no-websockets-over-http2/): 
- Using HTTP2: [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
  - Part of HTTP2. Been around long enough to also have support from many web browsers.
  - Client requests some kind of push-only connection from server. Not bidirectional like WebSockets. Seems annoying because of that, but have yet to try them out.
  - HTTP2 has a feature called [Server Push](https://en.wikipedia.org/wiki/HTTP/2_Server_Push) which is kind of a misnomer and doesn't seem related. Used to prefetch content instead?

Other random links:
- [Are WebSockets obsolete?](https://stackoverflow.com/a/42465368/1411590). Maybe, maybe not? Unclear.
