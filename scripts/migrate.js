/**
 * Migration Script for VIP AI Symphony
 * Handles data migration and version upgrades
 */

const migrations = {
  '6.1.0': {
    name: 'Add cognitive stream preferences',
    up: () => {
      const prefs = JSON.parse(localStorage.getItem('user_preferences') || '{}');
      if (!prefs.cognitiveStream) {
        prefs.cognitiveStream = {
          enabled: true,
          autoScroll: true,
          maxLines: 100,
        };
        localStorage.setItem('user_preferences', JSON.stringify(prefs));
      }
    },
    down: () => {
      const prefs = JSON.parse(localStorage.getItem('user_preferences') || '{}');
      delete prefs.cognitiveStream;
      localStorage.setItem('user_preferences', JSON.stringify(prefs));
    },
  },
  '6.2.0': {
    name: 'Mobile-first UI preferences',
    up: () => {
      const prefs = JSON.parse(localStorage.getItem('user_preferences') || '{}');
      if (!prefs.mobile) {
        prefs.mobile = {
          touchTargetSize: 'comfortable',
          bottomNav: true,
          swipeGestures: true,
        };
        localStorage.setItem('user_preferences', JSON.stringify(prefs));
      }
    },
    down: () => {
      const prefs = JSON.parse(localStorage.getItem('user_preferences') || '{}');
      delete prefs.mobile;
      localStorage.setItem('user_preferences', JSON.stringify(prefs));
    },
  },
  '7.0.0': {
    name: 'Modernization update - secure storage',
    up: () => {
      // Move API key from localStorage to secure storage
      const apiKey = localStorage.getItem('openai_api_key');
      if (apiKey) {
        console.warn('API key found in localStorage. Please move to environment variables.');
        // In production, this would use a secure storage mechanism
      }

      // Initialize new error tracking
      if (!localStorage.getItem('error_log')) {
        localStorage.setItem('error_log', JSON.stringify([]));
      }

      // Set migration flag
      localStorage.setItem('migrated_to_v7', 'true');
    },
    down: () => {
      localStorage.removeItem('migrated_to_v7');
    },
  },
};

/**
 * Run migrations
 */
function runMigrations(targetVersion) {
  const currentVersion = localStorage.getItem('app_version') || '6.2.0';
  console.log(`Migrating from ${currentVersion} to ${targetVersion}`);

  const versions = Object.keys(migrations).sort();
  const currentIndex = versions.indexOf(currentVersion);
  const targetIndex = versions.indexOf(targetVersion);

  if (targetIndex > currentIndex) {
    // Run up migrations
    for (let i = currentIndex + 1; i <= targetIndex; i++) {
      const version = versions[i];
      const migration = migrations[version];
      console.log(`Running migration: ${version} - ${migration.name}`);
      try {
        migration.up();
        console.log(`✅ Migration ${version} completed`);
      } catch (error) {
        console.error(`❌ Migration ${version} failed:`, error);
        throw error;
      }
    }
  } else if (targetIndex < currentIndex) {
    // Run down migrations
    for (let i = currentIndex; i > targetIndex; i--) {
      const version = versions[i];
      const migration = migrations[version];
      console.log(`Rolling back migration: ${version} - ${migration.name}`);
      try {
        migration.down();
        console.log(`✅ Rollback ${version} completed`);
      } catch (error) {
        console.error(`❌ Rollback ${version} failed:`, error);
        throw error;
      }
    }
  }

  localStorage.setItem('app_version', targetVersion);
  console.log(`✅ Migration to ${targetVersion} completed successfully`);
}

/**
 * Backup data
 */
function backupData() {
  const backup = {
    timestamp: new Date().toISOString(),
    version: localStorage.getItem('app_version'),
    data: {},
  };

  // Backup all localStorage data
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    backup.data[key] = localStorage.getItem(key);
  }

  // Save backup
  const backupKey = `backup_${Date.now()}`;
  try {
    localStorage.setItem(backupKey, JSON.stringify(backup));
    console.log(`✅ Backup created: ${backupKey}`);
    return backupKey;
  } catch (error) {
    console.error('❌ Backup failed:', error);
    throw error;
  }
}

/**
 * Restore from backup
 */
function restoreBackup(backupKey) {
  try {
    const backup = JSON.parse(localStorage.getItem(backupKey));
    if (!backup) {
      throw new Error('Backup not found');
    }

    // Clear current data
    localStorage.clear();

    // Restore backup
    Object.entries(backup.data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    console.log(`✅ Restored from backup: ${backupKey}`);
  } catch (error) {
    console.error('❌ Restore failed:', error);
    throw error;
  }
}

/**
 * List available backups
 */
function listBackups() {
  const backups = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('backup_')) {
      try {
        const backup = JSON.parse(localStorage.getItem(key));
        backups.push({
          key,
          timestamp: backup.timestamp,
          version: backup.version,
        });
      } catch (e) {
        // Skip invalid backups
      }
    }
  }
  return backups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Export functions
export { runMigrations, backupData, restoreBackup, listBackups };

// CLI usage
if (typeof window !== 'undefined') {
  window.migrations = {
    run: runMigrations,
    backup: backupData,
    restore: restoreBackup,
    list: listBackups,
  };
  console.log('Migration tools available: window.migrations');
}
