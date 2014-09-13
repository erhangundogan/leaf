# product

product schema

    name: { type:String },
    brand: { type:String },
    type: { type:String, default:'water' },
    image: { type:String },
    barcode: { type:String },
    impact: Number,
    consumed: {
      longitude:Number,
      latitude:Number,
      country:String,
      city:String,
      district:String
    },
    produced: {
      longitude:Number,
      latitude:Number,
      country:String,
      city:String,
      district:String
    },
    active: { type:Boolean, default:true },
    recordDate: { type:Date, "default":Date.now },
    recordedBy: { type:ObjectId, index:true, ref:'user' }

product sample

    name: 'Bottle 0.5lt',
    brand: 'Erikli',
    type: 'water',
    image: 'http://www.kiyasmatik.com/assets/i/p/big/5419.jpg',
    barcode: '123',
    impact: 0.3,
    consumed: {
      longitude: 41.02612,
      latitude: 28.98155,
      country: 'turkey',
      city: 'istanbul',
      district: 'beyoglu'
    },
    produced: {
      longitude: 40.18285,
      latitude: 29.06708,
      country: 'turkey',
      city: 'bursa',
      district: null
    },
    active: true,
    recordDate: '2014-09-27T11:13:25.819Z',
    recordedBy: ObjectId('u2HjSnQpD-M-uEoJzo1XO-QQqqOkQDUr')