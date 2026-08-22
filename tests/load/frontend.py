from locust import HttpUser, between, task


class WebUser(HttpUser):
    host = "http://localhost:8000"
    wait_time = between(1,3)

    @task
    def health(self):
        self.client.get("/")