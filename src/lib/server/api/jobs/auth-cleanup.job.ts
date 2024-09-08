import { inject, injectable } from "tsyringe";
import { JobsService } from "../services/jobs.service";

// Example on how to create a job that runs once a week at midnight on Sunday

@injectable()
export class AuthCleanupJobs {
  private queue;

  constructor(@inject(JobsService) private jobsService: JobsService) {
    // create queue
    this.queue = this.jobsService.createQueue('auth_cleanup')

    // register workers
    this.worker();
  }

  async deleteStaleEmailVerificationRequests() {
    this.queue.add('delete_stale_email_verifiactions', null, {
      repeat: {
        pattern: '0 0 * * 0' // Runs once a week at midnight on Sunday
      }
    })
  }

  async deleteStaleLoginRequests() {
    this.queue.add('delete_stale_login_requests', null, {
      repeat: {
        pattern: '0 0 * * 0' // Runs once a week at midnight on Sunday
      }
    })
  }

  private async worker() {
    return this.jobsService.createWorker(this.queue.name, async (job) => {
      if (job.name === "delete_stale_email_verifiactions") {
        // delete stale email verifications
      }
      if (job.name === "delete_stale_login_requests") {
        // delete stale email verifications
      }
    })
  }
}