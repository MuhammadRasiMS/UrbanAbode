const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const Place = require("../models/Place.js");
const Booking = require("../models/Booking.js");
const jwt = require("jsonwebtoken");
const jwtSecret = "jdxfgeshibbkjbigkxbzskdbfbajhbkzgbizksbdf";
const bcryptSalt = bcrypt.genSaltSync(10);
const imageDownloader = require("image-downloader");
const fs = require("fs");

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

module.exports = {
  userRegister: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  },

  userLogin: async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.json("Password not Ok");
      }
    } else {
      res.json("not found");
    }
  },

  userProfile: (req, res) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      });
    } else {
      res.json(null);
    }
  },

  logout: (req, res) => {
    res.cookie("token", "").json(true);
  },

  uploadByLink: async (req, res) => {
    const { link } = req.body;

    const newName = "photo" + Date.now() + ".jpg";

    await imageDownloader.image({
      url: link,
      dest: "D:/UrbanAbode/api/uploads/" + newName,
      // dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  },

  uploadPhoto: (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads", ""));
    }
    res.json(uploadedFiles);
  },

  addPlace: (req, res) => {
    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json(placeDoc);
    });
  },

  viewPlaces: (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      const { id } = userData;
      res.json(await Place.find({ owner: id }));
    });
  },

  viewPlaceById: async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
  },

  editPlace: async (req, res) => {
    const { token } = req.cookies;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        await placeDoc.save();
        res.json("ok");
      }
    });
  },

  viewAllPlaces: async (req, res) => {
    res.json(await Place.find());
  },

  bookingsPost: async (req, res) => {
    const userData = await getUserDataFromReq(req);
    console.log(userData)
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;
    Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id,
    })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        throw err;
      });
  },

  bookingsGet: async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate("place"));
  },
};
