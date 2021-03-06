# LOCAL LEAF

#### Hack4good 0.6 Istanbul, hack against catastrophic climate change

[Our hackathon project](https://geekli.st/hackathon/hack4good-06/project/5415635be2d0f95708c4cfae) won Turkey qualifications. But we could not able to make it worldwide.
Project nominated as a "[Personal Impact and Compelling Visualisation Challenge Runner up](http://blog.geekli.st/post/97978462607/announcing-12-challenge-theme-winners-hackers)"

We had great 48 hours code rush together with great people. They were all trying to accomplish something good for our world! I am very pleased to attend and being a part of this organization.

This application provides web server and api for the web and mobile leaf applications.

## Presentation

[http://www.slideshare.net/localleaf/hack4good-local-leaf-pitch](http://www.slideshare.net/localleaf/hack4good-local-leaf-pitch)

## Website / Web Client

[http://leaf.gelistirme.org](http://leaf.gelistirme.org)

## Git Repositories

[https://github.com/leafteam/leaf](https://github.com/leafteam/leaf)

[https://git.geekli.st/leaf/webserver](https://git.geekli.st/leaf/webserver)

## Tech Stack

Frameworks, libraries, products used in a project briefly.

* Nginx
* NodeJS (Web Server, API Server)
* AngularJS (Web Client)
* Android (Mobile Client)
* MongoDB (Database)


# API

Get Product
-----------

You may use any [product](schema/) property for data query as below. It will return one product if the criterias matched.

Request (GET):

    http://leaf.gelistirme.org/api/product?name=…&brand=…&consumed.longitude=…&consumed.latitude=…
    
Response:

    { 
      data: { 
        name: …,
        brand: …,
        …
      }
    } // found
    
    { data: null } // not found    
    
    { error: … } // error state  
    
Get Products
------------

You may use any [product](schema/) property for data query as below. It will return product list if the criterias matched.

Request (GET):

    http://leaf.gelistirme.org/api/products?name=…&brand=…&consumed.longitude=…&consumed.latitude=…
    
Response:
    
    { 
      data: [{ 
        name: …,
        brand: …,
        …
      }, { 
        name: …,
        brand: …,
        …
      }],
      count: … 
    } // found
    
Post Product
------------

Request (POST):

    http://leaf.gelistirme.org/api/product?code=…


More information will be provided...


### Authors

[Erhan Gundogan](http://www.github.com/erhangundogan)

[Kaan Ozcan](http://www.github.com/knozcan)

[Christoph Portmann](http://www.github.com/chrisport)

[Mohamed Fouad](http://www.github.com/Mo7amedFouad)

[Niels Van Der Linden](http://www.github.com/dtdid)


License
---------------------

Copyright 2014 Hack4good Istanbul Leaf Team

Licensed under [GNU General Public License, version 3 (GPL-3.0)](http://opensource.org/licenses/GPL-3.0)
