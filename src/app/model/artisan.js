const mongoose = require('mongoose');
const geocoder = require('../../../utils/geocoder');

const artisanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    contactEmail: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: [true, 'Please add an address'],
    },
    adress: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    socialMedia: {
      type: [String],
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


artisanSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.location);

  if (loc.length > 0) {
    this.adress = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      state: loc[0].stateCode,
      zipcode: loc[0].zipcode,
      country: loc[0].countryCode,
    };

    // Overwrite the initial location with the formatted address
    this.location = loc[0].formattedAddress;
  } else {
    throw new Error('Geocoding failed. Please provide a valid address.');
  }

  next();
});

artisanSchema.index({ name: 'text', bio: 'text', skills: 'text' });

module.exports = mongoose.model('Artisan', artisanSchema);
