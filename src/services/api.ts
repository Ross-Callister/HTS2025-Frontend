export class ApiClient {
  private baseUrl: string = "https://api.example.com"; // Replace with your actual API URL

  async sendData(input: string): Promise<string> {
    // This is a placeholder method that simulates an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Received: ${input}`);
      }, 500);
    });
  }
}
