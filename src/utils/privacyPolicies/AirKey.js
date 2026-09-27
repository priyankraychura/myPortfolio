export const airkey = {
  "appName": "AirKey",
  // Hardcoded date. Update this manually only when you change the text below.
  "lastUpdated": "September 27, 2026",
  "sections": [
    {
      "id": 1,
      "title": "Introduction",
      "description": "Welcome to AirKey - Smart Passkey. AirKey lets you unlock and lock your Windows PC with your phone's fingerprint. We respect your privacy. This Privacy Policy explains how the AirKey phone app and the AirKey Windows app handle your data."
    },
    {
      "id": 2,
      "title": "Information Collection and Use",
      "description": "AirKey collects only what it needs to connect your phone and your PC.",
      "points": [
        "Your fingerprint never leaves your phone. AirKey never sees or stores it. Android checks your fingerprint and only then lets the app use a key kept in your phone's secure hardware (Android Keystore).",
        "Your Windows password never leaves your PC. It is stored encrypted on your PC and is never sent to your phone, to us or to any server.",
        "AirKey has no ads, no analytics and no crash reporting.",
        "An account (email and password, or Google sign-in) is only needed for the Internet connection. Wi-Fi works without it."
      ]
    },
    {
      "id": 3,
      "title": "Data Stored on Your Devices",
      "description": "",
      "subSections": [
        {
          "title": "On Your Phone",
          "content": "The keys used to approve unlocks (kept in Android Keystore and usable only after your fingerprint), the list of paired PCs and your app settings. When you pair, your phone's model name is sent to your PC so you can recognise it."
        },
        {
          "title": "On Your PC",
          "content": "Your Windows password (encrypted with Windows DPAPI), the PC's own keys, the list of paired phones, your settings and the unlock and lock history. We recommend turning on BitLocker or Device Encryption to protect this data if your PC is stolen."
        },
        {
          "title": "Permissions",
          "content": "Camera: only to scan the pairing QR code shown on your PC. Biometrics: to confirm it is you before an unlock. Notifications: to show unlock requests and alerts. Internet: to talk to your PC over Wi-Fi or the Internet."
        }
      ]
    },
    {
      "id": 4,
      "title": "Third-Party Services",
      "description": "The Internet connection uses these services only as a relay. Every message is encrypted with a key that only your phone and your PC share, so these services cannot read or change it:",
      "points": [
        "Firebase Authentication (Google): stores your account email and sign-in details so your devices can sign in.",
        "Firebase Realtime Database (Google): stores pairing records (account ids, the PC name and your phone's notification token) and encrypted messages that are deleted as soon as they are read.",
        "Firebase Cloud Messaging (Google): delivers a notification to your phone when your PC asks for an unlock.",
        "Cloudflare Workers: asks Firebase Cloud Messaging to send that notification. It only learns which pairing to notify."
      ],
      "closingDescription": "These providers may process standard request information (such as your IP address) in accordance with their own privacy policies. The app is also distributed through app stores (such as the Google Play Store), which may collect usage data under their own policies."
    },
    {
      "id": 5,
      "title": "Deleting Your Data",
      "description": "You are in control of your data:",
      "points": [
        "Remove a paired phone or PC at any time from the AirKey app. It stops working immediately.",
        "Delete your account from the Profile page in the phone app. This permanently removes your account and its online pairing data.",
        "Uninstalling the apps removes the data stored on your devices."
      ]
    },
    {
      "id": 6,
      "title": "Children’s Privacy",
      "description": "Our Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13."
    },
    {
      "id": 7,
      "title": "Changes to This Privacy Policy",
      "description": "We may update this Privacy Policy from time to time. We will post any changes on this page and update the \"Last Updated\" date."
    }
  ],
  "contact": {
    "text": "If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:",
    "email": "priyankraychura@gmail.com",
    "website": "https://priyank-raychura.vercel.app"
  }
}
