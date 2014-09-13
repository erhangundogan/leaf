# leaf server

#### Hack4good 0.6 Istanbul, hack against catastrophic climate change

Provides web server and api for the web and mobile leaf application.

## API

Get Product
-----------

You may use any [product](schema/) property for data query as below. It will return one product if the criterias matched.

Request:

    http://leaf.gelistirme.org/api/product?name=…&brand=…&consumed.longitude=…&consumed.latitude=…
    
Response:

    // found
    { 
      data: { 
        name: …,
        brand: …,
        …
      }
    }
    
    // not found
    { data: null }
    
    // error state
    { error: … } 
    
Get Products
------------

You may use any [product](schema/) property for data query as below. It will return product list if the criterias matched.

Request:

    http://leaf.gelistirme.org/api/products?name=…&brand=…&consumed.longitude=…&consumed.latitude=…
    
Response:

    // found
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
    }
    
    // not found
    { data: null }
    
    // error state
    { error: … }   


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
