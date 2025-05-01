export class ApiClient {
  private baseUrl: string = "http://localhost:3000";

  async sendData(input: string): Promise<string> {
    // This is a placeholder method that simulates an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Received: ${input}`);
      }, 500);
    });
  }

  async widgets(text: string): Promise<{ response: string }> {
    const response = await fetch(`${this.baseUrl}/widgets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  }
}
