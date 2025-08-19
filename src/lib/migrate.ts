import pool from "./db";

async function migrate(){

    const resetDatabase = `
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
    GRANT ALL ON SCHEMA public TO ansaadmin;
    GRANT ALL ON SCHEMA public TO public;
  `;

  const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE
  );
`;

const createDailyActivitiesTable = `
  CREATE TABLE daily_activities (
  id TEXT PRIMARY KEY, -- nanoid
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  reading_minutes INTEGER DEFAULT 0,
  video_minutes INTEGER DEFAULT 0,
  writing_minutes INTEGER DEFAULT 0,
  task_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);`

 const createDailyCheckInsTable = `
  CREATE TABLE IF NOT EXISTS daily_check_ins (
    id TEXT PRIMARY KEY, -- nanoid
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    responses JSONB NOT NULL, -- stores [{question: "...", answer: 1}, ...]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
`;


const createWebinarsTable = `
  CREATE TABLE IF NOT EXISTS webinars (
    id TEXT PRIMARY KEY, -- nanoid
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    tags TEXT, -- could also be TEXT[] if you want multiple tags
    video TEXT, -- optional (e.g. video URL)
    thumbnail TEXT, -- optional (image URL)
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
`;
const createBlogsTable = `
  CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY, -- nanoid
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    tags TEXT, -- could also be TEXT[] if you want multiple tags
    video TEXT, -- optional (e.g. video URL)
    thumbnail TEXT, -- optional (image URL)
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
`;
const createYogasTable = `
  CREATE TABLE IF NOT EXISTS yogas (
    id TEXT PRIMARY KEY, -- nanoid
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    tags TEXT, -- could also be TEXT[] if you want multiple tags
    video TEXT, -- optional (e.g. video URL)
    thumbnail TEXT, -- optional (image URL)
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
`;

const createTagsTable = `
CREATE TABLE tags (
  id TEXT PRIMARY KEY,      -- nanoid
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);`;

try {
    console.log("🚀 Starting migration...");

    // Uncomment this line if you want to reset the database
    await pool.query(resetDatabase);
    console.log("✅ Database schema reset (if uncommented).");

    console.log("✅ Dropping existing triggers if they exist...");
   
    console.log("✅ Creating tables...");
    await pool.query(createUsersTable);
    await pool.query(createDailyActivitiesTable);
    await pool.query(createDailyCheckInsTable);
    await pool.query(createWebinarsTable);
    await pool.query(createTagsTable);
    await pool.query(createBlogsTable);
    await pool.query(createYogasTable);

    console.log("✅ Tables created successfully.");


    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    pool.end();
  }
}

migrate()