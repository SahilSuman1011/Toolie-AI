-- Add moderation tracking columns to creations table
-- Run this SQL in your Neon DB console

ALTER TABLE creations 
ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS moderation_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS moderation_categories JSONB DEFAULT '[]'::jsonb;

-- Add index for faster queries on flagged content
CREATE INDEX IF NOT EXISTS idx_creations_is_flagged ON creations(is_flagged);
CREATE INDEX IF NOT EXISTS idx_creations_moderation_status ON creations(moderation_status);

-- Update existing records to have default values
UPDATE creations 
SET 
    is_flagged = false,
    moderation_status = 'approved',
    moderation_categories = '[]'::jsonb
WHERE is_flagged IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN creations.is_flagged IS 'Whether content was flagged by moderation system';
COMMENT ON COLUMN creations.moderation_status IS 'Status: pending, approved, rejected';
COMMENT ON COLUMN creations.moderation_categories IS 'Array of flagged categories from OpenAI moderation';
