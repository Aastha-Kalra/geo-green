const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");

/**
 * Ensures there is at least one admin user in the database.
 * If none exists and ADMIN_USERNAME/ADMIN_PASSWORD are provided via env,
 * it creates a default admin with a hashed password.
 */
async function ensureAdminExists() {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      console.warn(
        "ADMIN_USERNAME or ADMIN_PASSWORD not set; skipping default admin creation"
      );
      return;
    }

    const adminByUsername = await Admin.findOne({ username });
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!adminByUsername) {
      const admin = new Admin({ username, password: hashedPassword });
      await admin.save();
      console.log("Default admin user created successfully");
      return;
    }

    // If exists but password does not match env, update it to env
    const stored = adminByUsername.password || "";
    const isHash = typeof stored === "string" && stored.startsWith("$2");
    const matches = isHash ? bcrypt.compareSync(password, stored) : stored === password;
    if (!matches) {
      adminByUsername.password = hashedPassword;
      await adminByUsername.save();
      console.log("Existing admin password updated from env");
    }
  } catch (error) {
    console.error("Error ensuring admin exists:", error);
  }
}

module.exports = ensureAdminExists;


