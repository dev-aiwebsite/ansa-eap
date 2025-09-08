import pool from "./db";

async function migrate() {

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
    profile_img TEXT NOT NULL,
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


  const createPostsTable = `
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY, -- nanoid
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,  
    category TEXT NOT NULL,  
    author TEXT NOT NULL,
    tags TEXT, -- could also be TEXT[] if you want multiple tags
    video TEXT, -- optional (e.g. video URL),
    audio TEXT, -- optional (e.g. video URL),
    thumbnail TEXT, -- optional (image URL)
    description TEXT,
    duration_hours INTEGER DEFAULT 0,
    duration_minutes INTEGER DEFAULT 0,
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



const createRolesTable = `
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);
`;

const createUserRolesTable = `
CREATE TABLE IF NOT EXISTS user_roles (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);
`

const insertDefaultRole = `
  INSERT INTO roles (name)
  VALUES ('user')
  ON CONFLICT (name) DO NOTHING;

  -- 4. Assign default role to all existing users
  INSERT INTO user_roles (user_id, role_id)
  SELECT u.id, r.id
  FROM users u
  CROSS JOIN (SELECT id FROM roles WHERE name = 'user') r
  ON CONFLICT DO NOTHING;
  `



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
    await pool.query(createPostsTable);
    await pool.query(createTagsTable);
    await pool.query(createRolesTable);
    await pool.query(createUserRolesTable);
    await pool.query(insertDefaultRole); 
 

    console.log("✅ Tables created successfully.");


    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    pool.end();
  }
}

migrate()