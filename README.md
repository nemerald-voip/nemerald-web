# Website
# nemerald-web

The app documentation lives at /docs/apps, linked from **Nemerald Apps Help**
in the footer. Other documentation can have separate sections and sidebars.

See [the Ringotel import guide](integrations/ringotel/README.md) for setup,
branding, manual review, and the daily import workflow.

## Google Ads measurement

The shared privacy provider loads Google tag `AW-781845970` on all routes in
production after the visitor allows **Google Ads measurement**. The contact form
sends conversion `AW-781845970/HCQ5CLzjppQBENKL6PQC` only after a successful response
from the contact service. Form fields are not sent to Google. YouTube permission
does not grant ad measurement permission; Global Privacy Control blocks both.

Run `node --test scripts/google-ads.test.mjs` and `npm run build` to validate changes.
After deployment, use [Google Tag Assistant](https://tagassistant.google.com/) with
ad measurement allowed to verify the tag and a successful contact submission.
Development mode (`npm start`) does not load the tag or report conversions.
