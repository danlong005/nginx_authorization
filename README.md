# nginx_authorization

We are grabbing the authorization from the original request and pushing it out to the 
identity service to validate the token. That returns a 200 or a 401. If we have a 
200 then the request is forwarded on to the protected resource. Otherwise, the 401
is pushed back to the client.


I have set up a simple example
```
        <--------------------------------------------------------------------------------------------------------
                                                                                                                 |
Request                                                                                                          |
GET www.mynginx_server.com/v1/membership ----> NGINX -----------------------------------> Safe_Api/v1/membership   
Authorization: [some_jwt]                        | ^
                                                 | |
                                                 |  -------------------------------------------------------------------
                                                 |                                                                     | 200
                                                  -----------------------------------------------> Auth_Api/v1/validate 
                                            POST Auth_Api                                                          |
                                            Authorization: [some_jwt]                                              | 401
                                                                                                                   |
        <----------------------------------------------------------------------------------------------------------
```


nginx.conf
```
events {
  worker_connections  4096;
}

http {
  server {
      listen 80;

      location / {       
          # forwards all requests to _check_auth to create the subrequest                                                    
          auth_request /_check_auth;  

          # sets the authorization header on the subrequest to 
          # what it was in the original request                             
          proxy_set_header authorization $upstream_http_authorization;

          # if the subrequest returns a 200 then we move on to location
          # of the original request
          proxy_pass http://api:3001;                                                            
      }                                                                                         
                                                                                                
      location = /_check_auth {                                                             
          internal;

          # makes the request out to validate the token
          # in the authorization header
          proxy_method      POST;
          proxy_pass        http://auth:3000/v1/validate;
      }
  }
}
```