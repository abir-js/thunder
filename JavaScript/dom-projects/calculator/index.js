import "./style.css"; // Adjust the file name to match your setup

/**
 * ============================================================================
 * LARGE JAVASCRIPT SAMPLE CODE: TASK MANAGEMENT & ANALYTICS SYSTEM
 * Features: OOP, State Management, Custom Events, Metrics, Logging Pipeline
 * ============================================================================
 */

// --- 1. CONFIGURATION & CORE UTILITIES ---
const SYSTEM_CONFIG = {
  version: "2.4.1",
  env: "production",
  maxStorageLimit: 5000,
  logPrefix: "[CoreEngine]",
};

class Utility {
  static generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) {
      return obj.map(item => Utility.deepClone(item));
    }
    const clonedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = Utility.deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  static formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  }
}

// --- 2. LOGGER PIPELINE MODULE ---
class Logger {
  constructor(prefix) {
    this.prefix = prefix;
    this.logs = [];
  }

  log(message, type = "INFO") {
    const timestamp = Utility.formatDate(new Date());
    const logEntry = `${this.prefix} [${timestamp}] [${type}]: ${message}`;
    this.logs.push({ timestamp, type, message });
    
    if (SYSTEM_CONFIG.env !== "production") {
      console.log(logEntry);
    }
  }

  error(message) { this.log(message, "ERROR"); }
  warn(message) { this.log(message, "WARN"); }
  
  getLogHistory() { return Utility.deepClone(this.logs); }
}

const sysLogger = new Logger(SYSTEM_CONFIG.logPrefix);

// --- 3. DATA MODELS (OOP) ---
class Task {
  constructor(title, description, priority = "MEDIUM", estimatedHours = 1) {
    this.id = Utility.generateUUID();
    this.title = title;
    this.description = description;
    this.priority = priority; // LOW, MEDIUM, HIGH, CRITICAL
    this.status = "TODO";     // TODO, IN_PROGRESS, REVIEW, DONE
    this.estimatedHours = estimatedHours;
    this.actualHours = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.completedAt = null;
  }

  updateStatus(newStatus) {
    const validStatuses = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status conversion: ${newStatus}`);
    }
    this.status = newStatus;
    this.updatedAt = new Date();
    if (newStatus === "DONE") {
      this.completedAt = new Date();
    }
    sysLogger.log(`Task ${this.id} updated status to ${newStatus}`);
  }

  logTime(hours) {
    if (hours <= 0) return;
    this.actualHours += hours;
    this.updatedAt = new Date();
  }
}

// --- 4. STATE MANAGEMENT & FILTERING ENGINE ---
class TaskEngine extends EventTarget {
  constructor() {
    super();
    this.tasks = new Map();
  }

  addTask(task) {
    if (!(task instanceof Task)) {
      throw new TypeError("Object must be an instance of Task class.");
    }
    this.tasks.set(task.id, task);
    sysLogger.log(`Task successfully created: ${task.title}`);
    this.dispatchEvent(new CustomEvent('taskAdded', { detail: task }));
  }

  deleteTask(id) {
    if (this.tasks.has(id)) {
      const task = this.tasks.get(id);
      this.tasks.delete(id);
      sysLogger.warn(`Task deleted: ${task.title}`);
      this.dispatchEvent(new CustomEvent('taskDeleted', { detail: id }));
      return true;
    }
    return false;
  }

  getTask(id) {
    return this.tasks.get(id) || null;
  }

  getAllTasks() {
    return Array.from(this.tasks.values());
  }

  filterTasks(criteria = {}) {
    let result = this.getAllTasks();

    if (criteria.priority) {
      result = result.filter(t => t.priority === criteria.priority);
    }
    if (criteria.status) {
      result = result.filter(t => t.status === criteria.status);
    }
    if (criteria.searchQuery) {
      const q = criteria.searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }
}

// --- 5. ANALYTICS & METRICS CALCULATOR ---
class AnalyticsEngine {
  constructor(taskEngine) {
    this.engine = taskEngine;
  }

  generateReport() {
    const allTasks = this.engine.getAllTasks();
    const totalCount = allTasks.length;

    if (totalCount === 0) {
      return { total: 0, statusBreakdown: {}, completionRate: 0, efficiencyIndex: 0 };
    }

    const statusBreakdown = { TODO: 0, IN_PROGRESS: 0, REVIEW: 0, DONE: 0 };
    let totalEstimated = 0;
    let totalActual = 0;
    let completedCount = 0;

    allTasks.forEach(task => {
      statusBreakdown[task.status] = (statusBreakdown[task.status] || 0) + 1;
      totalEstimated += task.estimatedHours;
      totalActual += task.actualHours;
      if (task.status === "DONE") {
        completedCount++;
      }
    });

    const completionRate = parseFloat(((completedCount / totalCount) * 100).toFixed(2));
    const efficiencyIndex = totalActual > 0 ? parseFloat((totalEstimated / totalActual).toFixed(2)) : 1.0;

    return {
      totalTasks: totalCount,
      statusBreakdown,
      completionRatePercent: completionRate,
      efficiencyIndex,
      timeTracking: {
        allocated: totalEstimated,
        consumed: totalActual,
        variance: totalEstimated - totalActual
      },
      generatedAt: Utility.formatDate(new Date())
    };
  }
}

// --- 6. ASYNC MOCK API SYNC SERVICE ---
class DataSyncService {
  static async fetchRemoteBackup() {
    sysLogger.log("Initiating asynchronous sync profile fetch...");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const mockRemoteData = [
            { title: "Optimize Webpack Compilation Pipeline", desc: "Reduce bundle size by splitting vendor chunks", prio: "HIGH", est: 6 },
            { title: "Refactor Database Schema Migrations", desc: "Add indexing to audit log trails", prio: "CRITICAL", est: 12 },
            { title: "Update Localization Definitions", desc: "Inject missing French translation strings", prio: "LOW", est: 2 }
          ];
          sysLogger.log("Remote database payload retrieved successfully.");
          resolve(mockRemoteData);
        } catch (err) {
          reject("Failed processing JSON serialization stream.");
        }
      }, 1200);
    });
  }
}

// --- 7. APPS RUNTIME ORCHESTRATION & DEMO ---
async function runSystemDemonstration() {
  sysLogger.log("Initializing Dashboard Engine Execution Context.");
  
  const appWorkspace = new TaskEngine();
  const analytics = new AnalyticsEngine(appWorkspace);

  // Hooking System Subscriptions (Event-Driven architecture)
  appWorkspace.addEventListener('taskAdded', (e) => {
    sysLogger.log(`[Event Dispatched]: Monitor Catch -> Task with ID ${e.detail.id} injected.`);
  });

  // Adding Local Tasks manually
  const localTask1 = new Task("Implement OAuth2 Device Code Flow", "Support smart TV authentications profiles", "HIGH", 8);
  localTask1.logTime(5);
  localTask1.updateStatus("IN_PROGRESS");
  appWorkspace.addTask(localTask1);

  const localTask2 = new Task("Write Unit Integration Tests", "Reach minimum 85% block code coverage metrics", "MEDIUM", 4);
  localTask2.logTime(3.5);
  localTask2.updateStatus("DONE");
  appWorkspace.addTask(localTask2);

  // Fetching Async Data over Mock Network Stream
  try {
    const remotePayload = await DataSyncService.fetchRemoteBackup();
    remotePayload.forEach(item => {
      const dynamicTask = new Task(item.title, item.desc, item.prio, item.est);
      // Simulate partial progression randomly
      if (item.prio === "CRITICAL") {
        dynamicTask.logTime(14);
        dynamicTask.updateStatus("REVIEW");
      }
      appWorkspace.addTask(dynamicTask);
    });
  } catch (error) {
    sysLogger.error(error);
  }

  // Perform Query Filter Operation
  sysLogger.log("Executing strict prioritization structural query filter...");
  const highPriorityItems = appWorkspace.filterTasks({ priority: "HIGH" });
  sysLogger.log(`Found ${highPriorityItems.length} matching tracking profiles.`);

  // Generate Comprehensive Operations Intelligence Report
  const finalSummaryReport = analytics.generateReport();
  
  return {
    engineInstance: appWorkspace,
    report: finalSummaryReport,
    auditLogs: sysLogger.getLogHistory()
  };
}

// --- 8. GLOBAL UTILITY FOR CLIPBOARD MANAGEMENT ---
function copyTextToSystemClipboard(textData) {
  if (!navigator.clipboard) {
    sysLogger.error("Modern Clipboard API unavailable inside this system node.");
    return false;
  }
  navigator.clipboard.writeText(textData)
    .then(() => sysLogger.log("Target text content flashed to host clipboard context."))
    .catch(err => sysLogger.error(`System clipboard block exception: ${err}`));
  return true;
}

// --- INITIALIZE EXECUTION LOOP ---
runSystemDemonstration().then(runtimeContext => {
  console.log("=========================================");
  console.log("SYSTEM ENGINE RUNTIME SNAPSHOT GENERATED");
  console.log("=========================================");
  console.log("Metrics Analytics:", JSON.stringify(runtimeContext.report, null, 2));
  console.log(`Total System Activity Events Registered: ${runtimeContext.auditLogs.length}`);
});
