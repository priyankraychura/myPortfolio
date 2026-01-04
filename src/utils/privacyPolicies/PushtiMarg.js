export const pushtimarg = {
  "appName": "Pushtimarg",
  // 1. FIX: Hardcoded date. Update this manually only when you change the text below.
  "lastUpdated": "January 4, 2026", 
  "sections": [
    {
      "id": 1,
      "title": "Introduction",
      "description": "Welcome to Pushtimarg. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we handle your data when you use our mobile application."
    },
    {
      "id": 2,
      "title": "Information Collection and Use",
      "description": "Pushtimarg is a content-focused application.",
      "points": [
        "We do not require you to create an account or log in to use the application.",
        "We do not collect or store personal identifiers (like names or emails) on our servers.",
        // 2. FIX: Clarified that content is fetched, not just static/offline
        "The application fetches content (such as Aarti lyrics, Varta, and Tithi) from external servers to ensure you have the latest data. This requires an active internet connection." 
      ]
    },
    {
      "id": 3,
      "title": "Log Data and Device Storage",
      "description": "",
      "subSections": [
        {
          "title": "Local Storage",
          "content": "Any preferences (such as bookmarks or font settings) are stored locally on your specific device. This data is not shared with us."
        },
        {
          "title": "Server Logs",
          // 3. FIX: Added disclosure about server requests
          "content": "Because content is delivered via the internet, standard web server logs (containing your IP address) may be processed by our hosting provider when your device requests new data."
        }
      ]
    },
    {
      "id": 4,
      "title": "Third-Party Services",
      "description": "To provide you with the most up-to-date content, we use the following third-party service:",
      "points": [
         // 4. FIX: Added Netlify specifically
        "**Netlify:** We use Netlify to host and deliver the JSON content files for the app. When your app fetches this data, Netlify may process standard request information (such as your IP address) in accordance with their privacy policy."
      ],
      "closingDescription": "Additionally, the application is distributed via app stores (Google Play Store, Apple App Store) which may collect anonymous usage data governed by their own policies."
    },
    {
      "id": 5,
      "title": "Children’s Privacy",
      "description": "Our Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13."
    },
    {
      "id": 6,
      "title": "Future Changes to This Privacy Policy",
      "description": "We may update our Privacy Policy from time to time, especially as we introduce new features like:",
      "points": [
        "Interactive Community Features",
        "User Accounts",
        "Personalized Calendars"
      ],
      "closingDescription": "We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last Updated\" date."
    }
  ],
  "contact": {
    "text": "If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:",
    "email": "priyankraychura@gmail.com",
    "website": "https://priyank.space"
  }
}