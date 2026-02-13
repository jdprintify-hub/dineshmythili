import userConfig from "../config.json" with { type: "json" };

// Import assets so Vite resolves them to correct production URLs
import cuteBear from "./assets/cute-bear.gif";
import musicBear from "./assets/music-bear.gif";
import comfortBear from "./assets/comfort-bear.gif";
import kissBears from "./assets/kiss-bears.gif";
import photoBear from "./assets/photo-bear.gif";
import loveYouBear from "./assets/love-you-bear.gif";
import childGif from "./assets/child.gif";
import roseBear from "./assets/rose-bear.gif";
import cookBear from "./assets/cook-bear.gif";
import kissBear from "./assets/kiss-bear.gif";
import leftButton from "./assets/left-button.png";
import rightButton from "./assets/right-button.png";

import gift1 from "./assets/gift/gift1.jpg";
import gift2 from "./assets/gift/gift2.jpg";
import gift3 from "./assets/gift/gift3.jpg";

import coupleMylove from "./assets/couple_photo/mylove.png";

import amaranCover from "./assets/album-covers/amaran.jpeg";
import dudeCover from "./assets/album-covers/Dude.jpg";
import katCover from "./assets/album-covers/katradhu-tamizh.jpg";
import aasaCover from "./assets/album-covers/aasa_orave.jpg";
import mundasCover from "./assets/album-covers/mundasupatti.jpg";

import song1 from "./assets/songs/Amaran.mp3";
import song2 from "./assets/songs/Oorum-Blood.mp3";
import song3 from "./assets/songs/unakagathanae.mp3";
import song4 from "./assets/songs/Aasa-Orave.mp3";
import song5 from "./assets/songs/kadhal-kanave.mp3";

const pathMap = {
	"/src/assets/cute-bear.gif": cuteBear,
	"/src/assets/music-bear.gif": musicBear,
	"/src/assets/comfort-bear.gif": comfortBear,
	"/src/assets/kiss-bears.gif": kissBears,
	"/src/assets/photo-bear.gif": photoBear,
	"/src/assets/love-you-bear.gif": loveYouBear,
	"/src/assets/child.gif": childGif,
	"/src/assets/rose-bear.gif": roseBear,
	"/src/assets/cook-bear.gif": cookBear,
	"/src/assets/kiss-bear.gif": kissBear,
	"/src/assets/left-button.png": leftButton,
	"/src/assets/right-button.png": rightButton,
	"/src/assets/gift/gift1.jpg": gift1,
	"/src/assets/gift/gift2.jpg": gift2,
	"/src/assets/gift/gift3.jpg": gift3,
	"/src/assets/couple_photo/mylove.png": coupleMylove,
	"/src/assets/album-covers/amaran.jpeg": amaranCover,
	"/src/assets/album-covers/Dude.jpg": dudeCover,
	"/src/assets/album-covers/katradhu-tamizh.jpg": katCover,
	"/src/assets/album-covers/aasa_orave.jpg": aasaCover,
	"/src/assets/album-covers/mundasupatti.jpg": mundasCover,
	"/src/assets/songs/Amaran.mp3": song1,
	"/src/assets/songs/Oorum-Blood.mp3": song2,
	"/src/assets/songs/unakagathanae.mp3": song3,
	"/src/assets/songs/Aasa-Orave.mp3": song4,
	"/src/assets/songs/kadhal-kanave.mp3": song5
};

function replacePaths(value) {
	if (typeof value === "string") {
		return pathMap[value] || value;
	}
	if (Array.isArray(value)) {
		return value.map(replacePaths);
	}
	if (value && typeof value === "object") {
		const out = {};
		for (const k of Object.keys(value)) {
			out[k] = replacePaths(value[k]);
		}
		return out;
	}
	return value;
}

// Create a resolved config where asset paths are replaced by Vite-resolved URLs
export const config = replacePaths(userConfig);
