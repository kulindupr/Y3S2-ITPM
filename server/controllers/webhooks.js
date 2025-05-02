import { Webhook } from "svix";
import User from "../models/User.js";

export const celeryWebhook = async (req, res) => {
  try {
    //crte a Svix
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //veryfy

    //veryfiy header
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (key) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        breakk;
      }
      case "user.deleted": {
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Webhooks Error" });
  }
};
