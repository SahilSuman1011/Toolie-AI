# Content Moderation Setup Guide

## 🎉 Implementation Complete!

I've successfully implemented a **FREE, automated content moderation system** with multiple layers of protection.

---

## ✅ What's Been Implemented

### 1. **Keyword Blocklist Filter** (First Layer)

- Instant blocking of 50+ inappropriate keywords
- Checks for: sexual content, violence, hate speech, drug references
- Zero latency, zero cost
- Location: `aiController.js` - `BLOCKED_KEYWORDS` array

### 2. **OpenAI Moderation API** (Second Layer - FREE!)

- Uses OpenAI's free moderation endpoint
- AI-powered detection of:
  - Sexual content
  - Hate speech
  - Violence
  - Self-harm
  - Harassment
- Location: `aiController.js` - `checkContentModeration()` function

### 3. **Database Schema Updates**

- Added 3 new columns to `creations` table:
  - `is_flagged` (BOOLEAN) - Whether content was flagged
  - `moderation_status` (TEXT) - Status: pending, approved, rejected
  - `moderation_categories` (JSONB) - Array of flagged categories
- Location: `migrations/add_moderation_columns.sql`

### 4. **Automated Publish Control**

- Flagged content is **automatically rejected** before generation
- Failed attempts are logged in database with reason
- Only approved content can be published
- Location: `aiController.js` - `generateImage()` function

---

## 🚀 Setup Instructions

### Step 1: Get OpenAI API Key (FREE)

1. Go to: https://platform.openai.com/
2. Sign up or log in to your OpenAI account
3. Navigate to **Organization Settings** in your dashboard
4. Go to **API Keys** section
5. Click "Create new secret key"
6. Copy the key (starts with `sk-...`)
7. **Important**: The Moderation API is 100% FREE - no billing/credit card required!

**API Details:**

- **Endpoint**: `https://api.openai.com/v1/moderations`
- **Model**: `omni-moderation-latest` (recommended, most accurate)
- **Cost**: $0.00 (completely free for all developers)
- **Rate Limits**: Generous limits for moderation endpoint

### Step 2: Add to .env file

Add this line to your `server/.env` file:

```env
OPENAI_API_KEY=sk-your-actual-key-here
```

**Security Best Practices:**

- ✅ Store in environment variables (never hardcode)
- ✅ Add `.env` to `.gitignore`
- ❌ Never commit API keys to version control
- ❌ Never share keys publicly

### Step 3: Update Database Schema

Run the SQL migration in your Neon DB console:

1. Open Neon DB dashboard
2. Go to SQL Editor
3. Copy contents from: `server/migrations/add_moderation_columns.sql`
4. Run the SQL script

### Step 4: Restart Server

```bash
cd server
npm start
```

---

## 🛡️ How It Works

### When a user tries to generate an image:

1. **Keyword Check** → Instant rejection if blocked words found
2. **OpenAI Moderation** → AI analyzes prompt for policy violations
3. **If Flagged** → Rejected + logged to database with reason
4. **If Approved** → Image generated + saved with moderation status
5. **Publish Control** → Only approved content can be public

### Example Flow:

```
User prompt: "Generate big chest woman in red dress"
↓
Keyword Filter: BLOCKED (contains "chest")
↓
Response: "Your prompt contains inappropriate content"
↓
Logged to DB: is_flagged=true, moderation_status='rejected'
```

---

## 📊 Tracking Flagged Content

You can query flagged attempts in your database:

```sql
-- View all flagged content
SELECT
    user_id,
    prompt,
    moderation_categories,
    created_at
FROM creations
WHERE is_flagged = true
ORDER BY created_at DESC;

-- Count flagged attempts by user
SELECT
    user_id,
    COUNT(*) as flagged_count
FROM creations
WHERE is_flagged = true
GROUP BY user_id
ORDER BY flagged_count DESC;
```

---

## 🔧 Customization

### Add More Blocked Keywords

Edit the `BLOCKED_KEYWORDS` array in `aiController.js`:

```javascript
const BLOCKED_KEYWORDS = [
  // Add your custom keywords here
  "your_keyword",
  "another_keyword",
];
```

### Adjust Moderation Sensitivity

The OpenAI API returns confidence scores. Currently, any flagged category rejects the prompt. You can adjust this if needed.

---

## 🎯 Benefits

✅ **100% Free** - No paid APIs used
✅ **Fully Automated** - No manual approval needed
✅ **Multi-Layer Defense** - Keyword + AI detection
✅ **Audit Trail** - All attempts logged in database
✅ **User-Friendly** - Clear error messages
✅ **Scalable** - Works for unlimited users

---

## 📝 Next Steps (Optional)

1. **Admin Dashboard** - Create a page to view flagged content statistics
2. **User Warnings** - Track repeat offenders, warn or suspend accounts
3. **Appeal System** - Allow users to appeal false positives
4. **Community Reporting** - Add report button for community-generated content

---

## ⚠️ Important Notes

- OpenAI Moderation API is FREE but requires an API key
- The keyword blocklist should be updated periodically
- Flagged attempts are logged for security and compliance
- Legitimate prompts with body parts (e.g., "portrait showing chest up") might be blocked - adjust keywords if needed

---

## 🐛 Troubleshooting

**Issue**: "OpenAI API Key not found"

- **Solution**: Add `OPENAI_API_KEY` to your `.env` file

**Issue**: Database error about missing columns

- **Solution**: Run the SQL migration from `migrations/add_moderation_columns.sql`

**Issue**: Legitimate prompts getting blocked

- **Solution**: Remove overly broad keywords from `BLOCKED_KEYWORDS` array

---

**Implementation Status**: ✅ Complete
**Cost**: $0 (100% Free)
**Ready to Deploy**: Yes

Need help with anything? Let me know!
