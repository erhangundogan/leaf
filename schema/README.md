# production

production schema

    {
      name: String,
      brand: String,
      company: String,
      image: String,
      code: String,
      impact: Number,
      description: String,
      tags: [String],
      type: String,
      longitude: Number,
      latitude: Number,
      country: String,
      city: String,
      district: String,
      valid: Boolean, // true
      recordDate: Date, // Date.now
      recordedBy: ObjectId // ref:'user'
    }

production sample

    {
      name: 'Erikli half liter natural spring water',    
      brand: 'Erikli',
      company: 'Erikli',
      image: 'http://www.kiyasmatik.com/assets/i/p/big/5419.jpg',
      code: '123',
      impact: 0.3,
      description: 'half liter bottle of erikli, tastes good',
      tags: ['plastic', 'recyclable'],
      type: 'bottled-water',
      longitude: 40.18285,
      latitude: 29.06708,
      country: 'turkey',
      city: 'bursa',
      district: null,
      active: true,
      recordDate: '2014-09-27T11:13:25.819Z',
      recordedBy: ObjectId('53ad390b8873e58a46c5e06b')
    }
    
# consumption

consumption schema

    {
      longitude: Number,
      latitude: Number,
      country: String,
      city: String,
      district: String,
      distance: Number,
      quantity: Number, // 1
      production: ObjectId, //ref:'production'
      valid: Boolean, // true
      recordDate: Date, // Date.now
      recordedBy: ObjectId // ref:'user'
    }
    
consumption sample

    {
      longitude: 41.02612,
      latitude: 28.98155,
      country: 'turkey',
      city: 'istanbul',
      district: 'beyoglu'
      distance: 320, // km
      quantity: 1,
      production: ObjectId, // ref:'production'
      valid: true,
      recordDate: '2014-09-17T09:13:35.819Z', // Date.now
      recordedBy: ObjectId // ref:'user'
    }