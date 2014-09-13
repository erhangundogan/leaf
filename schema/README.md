# product

product schema

    name: { type:String },
    brand: { type:String },
    company: { type:String },
    image: { type:String },
    barcode: { type:String },
    impact: Number,
    description: { type:String },
    tags: [String],    
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
    company: 'Erikli',
    type: 'water',
    image: 'http://www.kiyasmatik.com/assets/i/p/big/5419.jpg',
    barcode: '123',
    impact: 0.3,
    description: 'half liter bottle',
    tags: ['plastic', 'recyclable'],
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
    recordedBy: ObjectId('53ad390b8873e58a46c5e06b')