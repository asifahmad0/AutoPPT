
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cors from "cors";
import { generateSlideHTML } from "./generateSlide";

admin.initializeApp();
const corsHandler = cors({ origin: true });

export const generateSlide = functions
  .runWith({
    secrets: ["AIzaSyDx1nmfJRev7l95gGQgHch5Q86ubKojcIw","https://ik.imagekit.io/m5tbjdhwo/"],
  })
  .https.onRequest((req, res) => {
    corsHandler(req, res, async () => { 
      try {
        if (req.method !== "POST") {
          return res.status(405).send("Method Not Allowed");
        }

        const { designStyle, colors, metadata } = req.body;

        const html = await generateSlideHTML({
          designStyle,
          colors,
          metadata,
        });

        res.status(200).json({ html });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI generation failed" });
      }
    });
  });
